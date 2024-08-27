import React, { useState } from 'react';

const AddAccountPage = () => {
  const [accountNumber, setAccountNumber] = useState(''); 
  const [adminCode, setAdminCode] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [availableFirms, setAvailableFirms] = useState([
    { id: 1, name: 'Firm A' },
    { id: 2, name: 'Firm B' },
    { id: 3, name: 'Firm C' },
    { id: 4, name: 'Firm D' },
    { id: 5, name: 'Firm E' }
  ]);
  const [attachedFirms, setAttachedFirms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailableFirms, setSelectedAvailableFirms] = useState([]);
  const [selectedAttachedFirms, setSelectedAttachedFirms] = useState([]);

  // Function to move selected firms from available to attached
  const attachFirms = () => {
    const firmsToAttach = availableFirms.filter(firm => selectedAvailableFirms.includes(firm.id));
    setAttachedFirms([...attachedFirms, ...firmsToAttach]);
    setAvailableFirms(availableFirms.filter(firm => !selectedAvailableFirms.includes(firm.id)));
    setSelectedAvailableFirms([]);
  };

  // Function to move selected firms from attached to available
  const removeFirms = () => {
    const firmsToRemove = attachedFirms.filter(firm => selectedAttachedFirms.includes(firm.id));
    setAvailableFirms([...availableFirms, ...firmsToRemove]);
    setAttachedFirms(attachedFirms.filter(firm => !selectedAttachedFirms.includes(firm.id)));
    setSelectedAttachedFirms([]);
  };

  // Filter available firms based on search term
  const filteredFirms = availableFirms.filter((firm) =>
    firm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFirmClick = (firmId, list) => {
    if (list === 'available') {
      setSelectedAvailableFirms(prev =>
        prev.includes(firmId) ? prev.filter(id => id !== firmId) : [...prev, firmId]
      );
    } else {
      setSelectedAttachedFirms(prev =>
        prev.includes(firmId) ? prev.filter(id => id !== firmId) : [...prev, firmId]
      );
    }
  };

  const handleClear = () => {
    setAccountNumber('');
    setAdminCode('');
    setAttachedFirms([]);
    setAvailableFirms([
      { id: 1, name: 'Firm A' },
      { id: 2, name: 'Firm B' },
      { id: 3, name: 'Firm C' },
      { id: 4, name: 'Firm D' },
      { id: 5, name: 'Firm E' }
    ]);
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
      
      <div style={{ marginBottom: '10px' }}>
        <label>Account Number: </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Admin Code: </label>
        <input
          type="text"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Date: </label>
        <input type="text" value={date} readOnly style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '10px', marginTop: '10px' }}>
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '250px', overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>Available Firms</h3>
          <input
            type="text"
            placeholder="Search firms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <div style={{ height: '180px', overflowY: 'auto', paddingRight: '5px' }}>
            {filteredFirms.map((firm) => (
              <div
                key={firm.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  backgroundColor: selectedAvailableFirms.includes(firm.id) ? '#e0f7fa' : 'transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => handleFirmClick(firm.id, 'available')}
              >
                <input
                  type="checkbox"
                  checked={selectedAvailableFirms.includes(firm.id)}
                  onChange={() => handleFirmClick(firm.id, 'available')}
                  style={{ marginRight: '8px' }}
                />
                {firm.name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={attachFirms} style={{ marginBottom: '8px', padding: '6px 12px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>→</button>
          <button onClick={removeFirms} style={{ padding: '6px 12px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>←</button>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '250px', overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>Attached Firms</h3>
          <div style={{ height: '220px', overflowY: 'auto', paddingRight: '5px' }}>
            {attachedFirms.map((firm) => (
              <div
                key={firm.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  backgroundColor: selectedAttachedFirms.includes(firm.id) ? '#e0f7fa' : 'transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => handleFirmClick(firm.id, 'attached')}
              >
                <input
                  type="checkbox"
                  checked={selectedAttachedFirms.includes(firm.id)}
                  onChange={() => handleFirmClick(firm.id, 'attached')}
                  style={{ marginRight: '8px' }}
                />
                {firm.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <button onClick={handleClear} style={{ padding: '10px 20px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#003C68', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Account</button>
      </div>
    </div>
  );
};

export default AddAccountPage;
