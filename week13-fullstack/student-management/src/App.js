// ======== Bài 1 & Bài 2 - Component chính App ========
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
// ======== Bài 2: Bước 2 - Import các component riêng ========
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
// ======== Kết thúc import components ========

function App() {
  // ======== Bài 1: Bước 7 - State để lưu danh sách học sinh ========
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======== Bài 1: Bước 7 - Fetch dữ liệu từ API khi component load ========
  useEffect(() => {
    // Gọi API lấy danh sách học sinh từ backend
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi fetch danh sách:", error);
        setError("Không thể kết nối đến server");
        setLoading(false);
      });
  }, []); // Empty dependency array - chỉ chạy 1 lần khi component mount
  // ======== Kết thúc Bài 1: Bước 7 ========

  // ======== Bài 2: Bước 3 - Callback để cập nhật danh sách từ component con ========
  const handleStudentAdded = (newStudent) => {
    // Cập nhật state students để hiển thị luôn học sinh mới
    setStudents(prev => [...prev, newStudent]);
  };
  // ======== Kết thúc Bài 2: Bước 3 ========

  // ======== Bài 1 & Bài 2 - Hiển thị giao diện với các components ========
  return (
    <div className="App">
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Quản lý Học sinh</h1>
        
        {/* ======== Bài 2: Bước 2 - Sử dụng component AddStudentForm ======== */}
        <AddStudentForm onStudentAdded={handleStudentAdded} />
        {/* ======== Kết thúc Bài 2: Bước 2 ======== */}
        
        {/* ======== Bài 1: Bước 7 - Sử dụng component StudentList ======== */}
        <StudentList students={students} loading={loading} error={error} />
        {/* ======== Kết thúc Bài 1: Bước 7 ======== */}
      </div>
    </div>
  );
}

export default App;
