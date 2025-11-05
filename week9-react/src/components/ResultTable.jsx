import React, { useState, useEffect } from 'react';

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // 1. Tải dữ liệu từ API khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tải dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  // 2. Thêm user mới vào danh sách
  useEffect(() => {
    if (user) {
      // Tạo ID dựa trên timestamp để tránh trùng lặp
      const newId = Date.now();
      setUsers(prev => [...prev, { ...user, id: newId }]);
      onAdded(); // Reset newUser về null
      alert("Thêm người dùng thành công!");
    }
  }, [user, onAdded]);

  // 3. Lọc danh sách theo keyword
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(keyword.toLowerCase()) ||
    u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // 4. Hàm xóa user
  function removeUser(id) {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  }

  // 5. Hàm kích hoạt chế độ sửa
  function editUser(user) {
    // Deep copy để tránh thay đổi dữ liệu gốc
    setEditing({ ...user, address: { ...user.address } });
  }

  // 6. Hàm cập nhật dữ liệu đang sửa
  function handleEditChange(field, value) {
    if (["street", "suite", "city"].includes(field)) {
      setEditing(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setEditing(prev => ({ ...prev, [field]: value }));
    }
  }

  // 7. Hàm lưu sau khi sửa
  function saveUser() {
    // Validation
    if (!editing.name.trim() || !editing.username.trim()) {
      alert("Name và Username không được để trống!");
      return;
    }
    
    setUsers(prev => prev.map(u => 
      u.id === editing.id ? editing : u
    ));
    setEditing(null);
    alert("Cập nhật thành công!");
  }

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Không tìm thấy người dùng nào
              </td>
            </tr>
          ) : (
            filteredUsers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.address?.city}</td>
                <td>
                  <button className="btn-edit" onClick={() => editUser(u)}>
                    Sửa
                  </button>
                  <button className="btn-delete" onClick={() => removeUser(u.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Form Sửa */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Sửa thông tin người dùng</h3>
            
            <label>Name:</label>
            <input
              type="text"
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <label>Username:</label>
            <input
              type="text"
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
            />

            <label>Email:</label>
            <input
              type="email"
              value={editing.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />

            <label>Street:</label>
            <input
              type="text"
              value={editing.address.street}
              onChange={(e) => handleEditChange("street", e.target.value)}
            />

            <label>Suite:</label>
            <input
              type="text"
              value={editing.address.suite}
              onChange={(e) => handleEditChange("suite", e.target.value)}
            />

            <label>City:</label>
            <input
              type="text"
              value={editing.address.city}
              onChange={(e) => handleEditChange("city", e.target.value)}
            />

            <label>Phone:</label>
            <input
              type="text"
              value={editing.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
            />

            <label>Website:</label>
            <input
              type="text"
              value={editing.website}
              onChange={(e) => handleEditChange("website", e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn-save" onClick={saveUser}>Lưu</button>
              <button className="btn-cancel" onClick={() => setEditing(null)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultTable;