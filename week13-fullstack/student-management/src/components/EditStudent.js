// ======== Bài 3: Bước 2 - Component chỉnh sửa thông tin học sinh ========
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
  // ======== Bài 3: Bước 2 - Lấy ID từ URL params ========
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ======== Bài 3: Bước 2 - State để quản lý form chỉnh sửa ========
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ======== Kết thúc Bài 3: Bước 2 ========

  // ======== Bài 3: Bước 2 - Fetch thông tin học sinh hiện tại khi component load ========
  useEffect(() => {
    // Gọi API GET để lấy thông tin chi tiết học sinh theo ID
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        // Điền thông tin hiện tại vào form
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải thông tin học sinh:", err);
        setError("Không thể tải thông tin học sinh");
        setLoading(false);
      });
  }, [id]); // Chạy lại khi ID thay đổi
  // ======== Kết thúc Bài 3: Bước 2 ========

  // ======== Bài 3: Bước 3 - Gửi yêu cầu cập nhật từ Frontend ========
  const handleUpdate = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    
    // Tạo object với dữ liệu mới
    const updatedData = {
      name,
      age: Number(age),
      class: stuClass
    };
    
    // Gửi PUT request để cập nhật học sinh
    axios.put(`http://localhost:5000/api/students/${id}`, updatedData)
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        // Quay về trang danh sách sau khi cập nhật thành công
        navigate("/");
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Lỗi khi cập nhật học sinh. Vui lòng kiểm tra lại!");
      });
  };
  // ======== Kết thúc Bài 3: Bước 3 ========

  // ======== Bài 3: Bước 2 - Render giao diện chỉnh sửa ========
  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return <div style={{ padding: '20px' }}>Đang tải thông tin học sinh...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        {error}
        <br />
        <button onClick={() => navigate("/")} style={{ marginTop: '10px' }}>
          Quay về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Chỉnh Sửa Thông Tin Học Sinh</h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Họ tên:
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={{ 
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Tuổi:
            </label>
            <input 
              type="number" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
              required 
              min="1"
              max="100"
              style={{ 
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Lớp:
            </label>
            <input 
              type="text" 
              value={stuClass} 
              onChange={e => setStuClass(e.target.value)} 
              required 
              style={{ 
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                flex: '1'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#218838'}
              onMouseOut={e => e.target.style.backgroundColor = '#28a745'}
            >
              Cập nhật
            </button>
            
            <button 
              type="button"
              onClick={() => navigate("/")}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                flex: '1'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#5a6268'}
              onMouseOut={e => e.target.style.backgroundColor = '#6c757d'}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  // ======== Kết thúc Bài 3: Bước 2 ========
}

export default EditStudent;
