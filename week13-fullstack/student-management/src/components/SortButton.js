// ======== Bài 6: Bước 1 - Tạo component SortButton để sắp xếp ========
import React from 'react';

function SortButton({ sortAsc, onSortToggle }) {
  // ======== Bài 6: Bước 1 - Render nút sắp xếp ========
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <label style={{ 
        fontWeight: 'bold',
        color: '#333',
        marginRight: '15px'
      }}>
        Sắp xếp danh sách:
      </label>
      
      <button
        onClick={onSortToggle}
        style={{
          padding: '10px 20px',
          backgroundColor: sortAsc ? '#28a745' : '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseOver={e => e.target.style.backgroundColor = sortAsc ? '#218838' : '#138496'}
        onMouseOut={e => e.target.style.backgroundColor = sortAsc ? '#28a745' : '#17a2b8'}
      >
        <span style={{ fontSize: '16px' }}>
          {sortAsc ? '↓' : '↑'}
        </span>
        Tên: {sortAsc ? 'A → Z' : 'Z → A'}
      </button>
      
      <small style={{ color: '#666', fontStyle: 'italic' }}>
        {sortAsc ? 'Đang sắp xếp tăng dần' : 'Đang sắp xếp giảm dần'}
      </small>
    </div>
  );
  // ======== Kết thúc Bài 6: Bước 1 ========
}

export default SortButton;
