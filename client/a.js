import pandas as pd

# Load the original and temporary Excel sheets into DataFrames
original_df = pd.read_excel('original.xlsx')
temp_df = pd.read_excel('temp.xlsx')

# Columns that you want to update if they are empty in the original
columns_to_check = ['ip', 'db', 'add']

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

# Save the updated DataFrame back to an Excel file
original_df.to_excel('updated_original.xlsx', index=False)

print("Original file updated successfully!")
