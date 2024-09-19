import pandas as pd

# Load the original and temporary Excel sheets into DataFrames
original_df = pd.read_excel('original.xlsx')
temp_df = pd.read_excel('temp.xlsx')

# Columns that you want to update if they are empty in the original
columns_to_check = ['ip', 'db', 'add']

# Function to assess the row based on the rules provided
def assess_row(row):
    values = [row['ip'], row['db'], row['add']]
    
    # Case insensitive check for "n", "no", "not sure"
    no_impact_conditions = all(str(value).strip().lower() in ['n', 'no', 'not sure'] for value in values)
    
    # Check if any value is alphanumeric
    impacted_condition = any(str(value).isalnum() for value in values)
    
    if no_impact_conditions:
        return 'No Impact'
    elif any(pd.isna(value) or str(value).strip() == "" for value in values):
        return 'Pending'
    elif impacted_condition:
        return 'Impacted'
    return 'Pending'

# Function to determine the submission status
def status_row(row):
    if all(pd.notna(row[col]) and str(row[col]).strip() != "" for col in columns_to_check):
        return 'Submitted'
    else:
        return 'Not Submitted'

# Iterate over rows in the original DataFrame
for index, row in original_df.iterrows():
    title = row['title']

    # Find the matching row in the temporary DataFrame
    temp_row = temp_df[temp_df['title'] == title]

    if not temp_row.empty:
        temp_row = temp_row.iloc[0]  # Get the first matching row
        
        # Check if the 'ip', 'db', and 'add' columns are empty in the original
        for column in columns_to_check:
            if pd.isna(row[column]) or row[column] == "":
                # Update the original DataFrame if the temp has a value
                if not pd.isna(temp_row[column]) and temp_row[column] != "":
                    original_df.at[index, column] = temp_row[column]

# Add 'Assessment' and 'Status' columns based on the new rules
original_df['Assessment'] = original_df.apply(assess_row, axis=1)
original_df['Status'] = original_df.apply(status_row, axis=1)

# Save the updated DataFrame back to an Excel file
original_df.to_excel('updated_original_with_assessment.xlsx', index=False)

print("Original file updated successfully with Assessment and Status columns!")
