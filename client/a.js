import React, { useState } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from 'react-bootstrap/Pagination';

const TableGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Data
  const data = [
    {
      accountNumber: 'ACC123',
      firms: ['Firm A', 'Firm B', 'Firm C'],
      aggregators: ['Aggregator A', 'Aggregator B', 'Aggregator C'],
    },
    {
      accountNumber: 'ACC456',
      firms: ['Firm D', 'Firm E'],
      aggregators: ['Aggregator D', 'Aggregator E'],
    },
    {
      accountNumber: 'ACC789',
      firms: ['Firm F', 'Firm G'],
      aggregators: ['Aggregator F', 'Aggregator G'],
    },
  ];

  // Filtered data based on search query
  const filteredData = data.filter((item) =>
    item.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleViewFirms = (account) => {
    setSelectedAccount(account);
    setShowDialog(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Total Records: {totalRecords}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by Account Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '8px',
            width: 'calc(100% - 120px)',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button style={{
          padding: '8px 12px',
          backgroundColor: '#003C68',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Add Account</button>
      </div>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px', backgroundColor: '#f0f0f0' }}>Account Number</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px', backgroundColor: '#f0f0f0' }}>Number of Firms</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px', backgroundColor: '#f0f0f0' }}>View Firms</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px', backgroundColor: '#f0f0f0' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.accountNumber}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.firms.length}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button onClick={() => handleViewFirms(item)} style={{ cursor: 'pointer', color: '#003C68', textDecoration: 'underline', background: 'none', border: 'none' }}>View Firms</button>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <FaEye style={{ marginRight: '10px', cursor: 'pointer', color: '#003C68' }} title="View" />
                  <FaEdit style={{ marginRight: '10px', cursor: 'pointer', color: '#003C68' }} title="Edit" />
                  <FaTrash style={{ cursor: 'pointer', color: '#003C68' }} title="Delete" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#333' }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalRecords > itemsPerPage && (
        <Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}

      {/* Dialog Box */}
      {showDialog && selectedAccount && (
        <DialogBox
          firms={selectedAccount.firms}
          aggregators={selectedAccount.aggregators}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

// DialogBox Component
const DialogBox = ({ firms = [], aggregators = [], onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
      }}>
        <h2>Firms under Account</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Firm Name</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Aggregator</th>
            </tr>
          </thead>
          <tbody>
            {firms.map((firm, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{firm}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{aggregators[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} style={{
          padding: '10px 15px',
          backgroundColor: '#003C68',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto'
        }}>Close</button>
      </div>
    </div>
  );
};

export default TableGrid;
