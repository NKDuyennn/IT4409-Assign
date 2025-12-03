// ======== Bài 1: Bước 7 - Hiển thị danh sách học sinh trên React ========
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

  // ======== Bài 1: Bước 7 - Hiển thị giao diện ========
  return (
    <div className="App">
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Quản lý Học sinh</h1>
        <h2>Danh sách Học sinh</h2>
        
        {/* Hiển thị trạng thái loading */}
        {loading && <p>Đang tải dữ liệu...</p>}
        
        {/* Hiển thị lỗi nếu có */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* Hiển thị danh sách học sinh */}
        {!loading && !error && (
          <>
            {students.length === 0 ? (
              <p>Chưa có học sinh nào trong danh sách.</p>
            ) : (
              <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Tuổi</th>
                    <th>Lớp</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
