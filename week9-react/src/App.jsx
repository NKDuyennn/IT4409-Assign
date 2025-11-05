import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser';
import ResultTable from './components/ResultTable';
import './App.css';

function App() {
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Hàm reset dữ liệu về ban đầu
  function handleReset() {
    if (window.confirm("Bạn có chắc muốn reset tất cả dữ liệu về ban đầu?")) {
      localStorage.removeItem('users');
      setResetTrigger(prev => prev + 1); // Trigger re-render
      alert("Đã reset dữ liệu thành công!");
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Quản lý người dùng</h1>
        <button 
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
          }}
        >
          Reset dữ liệu
        </button>
      </div>
      
      <SearchForm onChangeValue={setKeyword} />
      
      <AddUser onAdd={setNewUser} />
      
      <ResultTable 
        keyword={kw} 
        user={newUser} 
        onAdded={() => setNewUser(null)}
        resetTrigger={resetTrigger}
      />
    </div>
  );
}

export default App;