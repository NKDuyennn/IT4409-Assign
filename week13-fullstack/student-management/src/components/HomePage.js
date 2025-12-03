// ======== Bài 1 & Bài 2 - Component trang chủ (HomePage) ========
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';
// ======== Bài 5: Bước 1 - Import component SearchBar ========
import SearchBar from './SearchBar';
// ======== Kết thúc Bài 5: Bước 1 ========
// ======== Bài 6: Bước 1 - Import component SortButton ========
import SortButton from './SortButton';
// ======== Kết thúc Bài 6: Bước 1 ========

function HomePage() {
  // ======== Bài 1: Bước 7 - State để lưu danh sách học sinh ========
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======== Bài 5: Bước 1 - State để lưu từ khóa tìm kiếm ========
  const [searchTerm, setSearchTerm] = useState("");
  // ======== Kết thúc Bài 5: Bước 1 ========

  // ======== Bài 6: Bước 1 - State để lưu trạng thái sắp xếp ========
  const [sortAsc, setSortAsc] = useState(true); // true: A→Z, false: Z→A
  // ======== Kết thúc Bài 6: Bước 1 ========

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

  // ======== Bài 5: Bước 2 - Lọc danh sách dựa trên từ khóa tìm kiếm ========
  // Lọc trên client: Tìm kiếm không phân biệt hoa thường
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // ======== Kết thúc Bài 5: Bước 2 ========

  // ======== Bài 6: Bước 2 - Sắp xếp danh sách đã lọc theo tên ========
  // Sao chép mảng và sắp xếp để không thay đổi mảng gốc
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    // Chuyển tên về chữ thường để so sánh không phân biệt hoa thường
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });
  // ======== Kết thúc Bài 6: Bước 2 ========

  // ======== Bài 5: Bước 1 - Hàm xử lý thay đổi từ khóa tìm kiếm ========
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  // ======== Kết thúc Bài 5: Bước 1 ========

  // ======== Bài 6: Bước 1 - Hàm xử lý đảo trạng thái sắp xếp ========
  const handleSortToggle = () => {
    setSortAsc(prev => !prev);
  };
  // ======== Kết thúc Bài 6: Bước 1 ========

  // ======== Bài 1, Bài 2, Bài 4, Bài 5 & Bài 6 - Hiển thị giao diện với các components ========
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Quản lý Học sinh</h1>
      
      {/* ======== Bài 2: Bước 2 - Sử dụng component AddStudentForm ======== */}
      <AddStudentForm onStudentAdded={handleStudentAdded} />
      {/* ======== Kết thúc Bài 2: Bước 2 ======== */}
      
      {/* ======== Bài 5: Bước 1 & Bước 3 - Sử dụng component SearchBar ======== */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      {/* ======== Kết thúc Bài 5: Bước 1 & Bước 3 ======== */}
      
      {/* ======== Bài 6: Bước 1 - Sử dụng component SortButton ======== */}
      <SortButton 
        sortAsc={sortAsc} 
        onSortToggle={handleSortToggle} 
      />
      {/* ======== Kết thúc Bài 6: Bước 1 ======== */}
      
      {/* ======== Bài 5: Bước 3 - Hiển thị số kết quả tìm kiếm ======== */}
      {searchTerm && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '5px', 
          marginBottom: '15px',
          color: '#004085'
        }}>
          Tìm thấy <strong>{filteredStudents.length}</strong> học sinh 
          {filteredStudents.length !== students.length && 
            ` (từ tổng số ${students.length} học sinh)`}
        </div>
      )}
      {/* ======== Kết thúc Bài 5: Bước 3 ======== */}
      
      {/* ======== Bài 1, Bài 4, Bài 5 & Bài 6: Bước 3 - Sử dụng component StudentList với danh sách đã lọc và sắp xếp ======== */}
      <StudentList 
        students={sortedStudents}
        loading={loading} 
        error={error} 
        onDelete={handleDelete} 
      />
      {/* ======== Kết thúc Bài 1, Bài 4, Bài 5 & Bài 6: Bước 3 ======== */}
    </div>
  );
}

export default HomePage;
