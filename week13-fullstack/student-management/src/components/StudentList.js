// ======== Bài 1: Bước 7 - Tạo component riêng cho danh sách học sinh ========
import { useNavigate } from 'react-router-dom';

function StudentList({ students, loading, error, onDelete }) {
  // ======== Bài 3: Bước 2 - Sử dụng useNavigate để điều hướng ========
  const navigate = useNavigate();
  
  // ======== Bài 3: Bước 2 - Hàm xử lý khi bấm nút Sửa ========
  const handleEdit = (studentId) => {
    // Điều hướng đến trang chỉnh sửa với ID của học sinh
    navigate(`/edit/${studentId}`);
  };
  // ======== Kết thúc Bài 3: Bước 2 ========

  // ======== Bài 4: Bước 2 - Hàm xử lý khi bấm nút Xóa ========
  const handleDelete = (studentId, studentName) => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    if (window.confirm(`Bạn có chắc muốn xóa học sinh "${studentName}" không?`)) {
      // Gọi callback từ component cha để xử lý xóa
      onDelete(studentId);
    }
  };
  // ======== Kết thúc Bài 4: Bước 2 ========

  // ======== Bài 1: Bước 7 - Render danh sách học sinh ========
  return (
    <div>
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
                  {/* ======== Bài 3: Bước 2 - Thêm cột Thao tác ======== */}
                  <th>Thao tác</th>
                  {/* ======== Kết thúc Bài 3: Bước 2 ======== */}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.class}</td>
                    {/* ======== Bài 3 & Bài 4: Bước 2 - Thêm nút Sửa và Xóa cho mỗi học sinh ======== */}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(student._id)}
                        style={{
                          padding: '5px 15px',
                          backgroundColor: '#ffc107',
                          color: '#000',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          marginRight: '5px'
                        }}
                        onMouseOver={e => e.target.style.backgroundColor = '#e0a800'}
                        onMouseOut={e => e.target.style.backgroundColor = '#ffc107'}
                      >
                        Sửa
                      </button>
                      
                      {/* ======== Bài 4: Bước 2 - Thêm nút Xóa ======== */}
                      <button
                        onClick={() => handleDelete(student._id, student.name)}
                        style={{
                          padding: '5px 15px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                        onMouseOver={e => e.target.style.backgroundColor = '#c82333'}
                        onMouseOut={e => e.target.style.backgroundColor = '#dc3545'}
                      >
                        Xóa
                      </button>
                      {/* ======== Kết thúc Bài 4: Bước 2 ======== */}
                    </td>
                    {/* ======== Kết thúc Bài 3 & Bài 4: Bước 2 ======== */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
  // ======== Kết thúc Bài 1: Bước 7 ========
}

export default StudentList;
