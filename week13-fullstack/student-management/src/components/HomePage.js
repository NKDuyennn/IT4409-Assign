// ======== Bài 1 & Bài 2 - Component trang chủ (HomePage) ========
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';

function HomePage() {
  // ======== Bài 1: Bước 7 - State để lưu danh sách học sinh ========
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======== Bài 1: Bước 7 - Fetch dữ liệu từ API khi component load ========
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array - chỉ chạy 1 lần khi component mount
  // ======== Kết thúc Bài 1: Bước 7 ========

  // ======== Bài 3: Bước 4 - Hàm fetch danh sách học sinh (có thể gọi lại) ========
  const fetchStudents = () => {
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
  };
  // ======== Kết thúc Bài 3: Bước 4 ========

  // ======== Bài 2: Bước 3 - Callback để cập nhật danh sách từ component con ========
  const handleStudentAdded = (newStudent) => {
    // Cập nhật state students để hiển thị luôn học sinh mới
    setStudents(prev => [...prev, newStudent]);
  };
  // ======== Kết thúc Bài 2: Bước 3 ========

  // ======== Bài 4: Bước 3 - Gửi yêu cầu xóa từ frontend ========
  const handleDelete = (id) => {
    // Gửi DELETE request đến API backend
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        
        // Cập nhật state: Lọc bỏ học sinh vừa xóa khỏi danh sách
        // Cách này hiệu quả hơn là gọi lại API GET
        setStudents(prevList => prevList.filter(student => student._id !== id));
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh. Vui lòng thử lại!");
      });
  };
  // ======== Kết thúc Bài 4: Bước 3 ========

  // ======== Bài 1, Bài 2 & Bài 4 - Hiển thị giao diện với các components ========
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Quản lý Học sinh</h1>
      
      {/* ======== Bài 2: Bước 2 - Sử dụng component AddStudentForm ======== */}
      <AddStudentForm onStudentAdded={handleStudentAdded} />
      {/* ======== Kết thúc Bài 2: Bước 2 ======== */}
      
      {/* ======== Bài 1: Bước 7 & Bài 4: Bước 2 - Sử dụng component StudentList với callback xóa ======== */}
      <StudentList 
        students={students} 
        loading={loading} 
        error={error} 
        onDelete={handleDelete} 
      />
      {/* ======== Kết thúc Bài 1: Bước 7 & Bài 4: Bước 2 ======== */}
    </div>
  );
}

export default HomePage;
