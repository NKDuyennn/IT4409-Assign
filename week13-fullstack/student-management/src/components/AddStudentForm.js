// ======== Bài 2: Bước 2 - Tạo component riêng cho Form thêm học sinh ========
import { useState } from 'react';
import axios from 'axios';

function AddStudentForm({ onStudentAdded }) {
  // ======== Bài 2: Bước 2 - State để quản lý form thêm học sinh ========
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // ======== Kết thúc Bài 2: Bước 2 ========

  // ======== Bài 2: Bước 3 - Gửi yêu cầu thêm học sinh từ Frontend ========
  const handleAddStudent = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    
    // Tạo object học sinh mới từ dữ liệu form
    const newStu = { 
      name, 
      age: Number(age), 
      class: stuClass 
    };
    
    // Gửi POST request đến API backend
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        
        // Gọi callback để cập nhật danh sách ở component cha
        onStudentAdded(res.data);
        
        // Xóa nội dung form sau khi thêm thành công
        setName("");
        setAge("");
        setStuClass("");
        
        // ======== Bài 2: Bước 4 - Hiển thị thông báo thành công ========
        setSuccessMessage("✓ Thêm học sinh thành công!");
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => setSuccessMessage(""), 3000);
        // ======== Kết thúc Bài 2: Bước 4 ========
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        alert("Lỗi khi thêm học sinh. Vui lòng kiểm tra lại!");
      });
  };
  // ======== Kết thúc Bài 2: Bước 3 ========

  // ======== Bài 2: Bước 2 - Render giao diện Form ========
  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '30px' 
    }}>
      <h2>Thêm Học sinh Mới</h2>
      
      {/* Hiển thị thông báo thành công */}
      {successMessage && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '15px',
          border: '1px solid #c3e6cb'
        }}>
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Họ tên" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          style={{ 
            padding: '10px', 
            flex: '1', 
            minWidth: '150px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input 
          type="number" 
          placeholder="Tuổi" 
          value={age} 
          onChange={e => setAge(e.target.value)} 
          required 
          min="1"
          max="100"
          style={{ 
            padding: '10px', 
            width: '100px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input 
          type="text" 
          placeholder="Lớp" 
          value={stuClass} 
          onChange={e => setStuClass(e.target.value)} 
          required 
          style={{ 
            padding: '10px', 
            flex: '1', 
            minWidth: '150px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={e => e.target.style.backgroundColor = '#007bff'}
        >
          Thêm học sinh
        </button>
      </form>
    </div>
  );
  // ======== Kết thúc Bài 2: Bước 2 ========
}

export default AddStudentForm;
