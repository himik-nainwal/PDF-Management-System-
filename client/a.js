import React, { useState } from 'react';

const AddAccountPage = () => {
  const [accountNumber, setAccountNumber] = useState(''); // Replace with random generation logic
  const [adminCode, setAdminCode] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [availableFirms, setAvailableFirms] = useState(['Firm A', 'Firm B', 'Firm C', 'Firm D', 'Firm E']);
  const [attachedFirms, setAttachedFirms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailableFirms, setSelectedAvailableFirms] = useState([]);
  const [selectedAttachedFirms, setSelectedAttachedFirms] = useState([]);

  // Function to move selected firms from available to attached
  const attachFirms = () => {
    setAttachedFirms([...attachedFirms, ...selectedAvailableFirms]);
    setAvailableFirms(availableFirms.filter((firm) => !selectedAvailableFirms.includes(firm)));
    setSelectedAvailableFirms([]);
  };

  // Function to move selected firms from attached to available
  const removeFirms = () => {
    setAvailableFirms([...availableFirms, ...selectedAttachedFirms]);
    setAttachedFirms(attachedFirms.filter((firm) => !selectedAttachedFirms.includes(firm)));
    setSelectedAttachedFirms([]);
  };

  // Filter available firms based on search term
  const filteredFirms = availableFirms.filter((firm) =>
    firm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    setAccountNumber('');
    setAdminCode('');
    setAttachedFirms([]);
    setAvailableFirms(['Firm A', 'Firm B', 'Firm C', 'Firm D', 'Firm E']);
    setSearchTerm('');
  };

  const handleSubmit = () => {
    // Submit logic here
    console.log({
      accountNumber,
      adminCode,
      date,
      attachedFirms,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#003C68' }}>Add Account</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Account Number: </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Admin Code: </label>
        <input
          type="text"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Date: </label>
        <input type="text" value={date} readOnly style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ width: '40%', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Available Firms</h3>
          <input
            type="text"
            placeholder="Search firms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            multiple
            style={{ width: '100%', height: '150px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
            value={selectedAvailableFirms}
            onChange={(e) => setSelectedAvailableFirms(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {filteredFirms.map((firm, index) => (
              <option key={index} value={firm}>
                {firm}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 10px' }}>
          <button onClick={attachFirms} style={{ marginBottom: '10px', padding: '6px 12px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>→</button>
          <button onClick={removeFirms} style={{ padding: '6px 12px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>←</button>
        </div>

        <div style={{ width: '40%', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Attached Firms</h3>
          <select
            multiple
            style={{ width: '100%', height: '150px', borderRadius: '4px', border: '1px solid #ccc', padding: '8px' }}
            value={selectedAttachedFirms}
            onChange={(e) => setSelectedAttachedFirms(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {attachedFirms.map((firm, index) => (
              <option key={index} value={firm}>
                {firm}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleClear} style={{ padding: '10px 20px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Account</button>
      </div>
    </div>
  );
};

export default AddAccountPage;
