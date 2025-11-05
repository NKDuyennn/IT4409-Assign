import React from 'react';

function SearchForm({ onChangeValue }) {
  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Tìm kiếm theo name, username..."
        onChange={(e) => onChangeValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchForm;