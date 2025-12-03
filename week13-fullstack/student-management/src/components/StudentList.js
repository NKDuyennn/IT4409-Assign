// ======== Bài 1: Bước 7 - Tạo component riêng cho danh sách học sinh ========

function StudentList({ students, loading, error }) {
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
  );
  // ======== Kết thúc Bài 1: Bước 7 ========
}

export default StudentList;
