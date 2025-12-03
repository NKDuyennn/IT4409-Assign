// ======== Bài 5: Bước 1 - Tạo component SearchBar cho tìm kiếm ========
import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  // ======== Bài 5: Bước 1 - Render ô tìm kiếm ========
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #ddd'
    }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '8px', 
        fontWeight: 'bold',
        color: '#333'
      }}>
        Tìm kiếm học sinh:
      </label>
      <input
        type="text"
        placeholder="Nhập tên học sinh cần tìm..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 15px',
          fontSize: '14px',
          border: '2px solid #007bff',
          borderRadius: '5px',
          outline: 'none',
          transition: 'border-color 0.3s'
        }}
        onFocus={e => e.target.style.borderColor = '#0056b3'}
        onBlur={e => e.target.style.borderColor = '#007bff'}
      />
      {searchTerm && (
        <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
          Đang tìm kiếm: "<strong>{searchTerm}</strong>"
        </small>
      )}
    </div>
  );
  // ======== Kết thúc Bài 5: Bước 1 ========
}

export default SearchBar;
