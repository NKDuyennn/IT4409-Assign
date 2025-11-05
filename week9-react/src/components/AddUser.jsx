import React, { useState } from 'react';

function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  // Xử lý thay đổi input
  function handleChange(e) {
    const { id, value } = e.target;
    
    // Nếu là trường address (nested object)
    if (["street", "suite", "city"].includes(id)) {
      setUser(prev => ({
        ...prev,
        address: { ...prev.address, [id]: value }
      }));
    } else {
      setUser(prev => ({ ...prev, [id]: value }));
    }
  }

  // Xử lý thêm user
  function handleAdd() {
    // Validation
    if (!user.name.trim() || !user.username.trim()) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    // Validation email (nếu có)
    if (user.email && !user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Email không hợp lệ!");
      return;
    }

    // Gọi hàm onAdd từ props (setNewUser từ App)
    onAdd(user);

    // Reset form
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });
    setAdding(false);
  }

  return (
    <div className="add-user-section">
      <button className="btn-add" onClick={() => setAdding(true)}>
        + Thêm người dùng
      </button>

      {adding && (
        <div className="modal-overlay" onClick={() => setAdding(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm người dùng mới</h3>

            <label htmlFor="name">Name: <span className="required">*</span></label>
            <input
              id="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              placeholder="Nhập tên..."
            />

            <label htmlFor="username">Username: <span className="required">*</span></label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={handleChange}
              placeholder="Nhập username..."
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Nhập email..."
            />

            <label htmlFor="street">Street:</label>
            <input
              id="street"
              type="text"
              value={user.address.street}
              onChange={handleChange}
              placeholder="Nhập địa chỉ..."
            />

            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              value={user.address.city}
              onChange={handleChange}
              placeholder="Nhập thành phố..."
            />

            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              value={user.phone}
              onChange={handleChange}
              placeholder="Nhập SĐT..."
            />

            <label htmlFor="website">Website:</label>
            <input
              id="website"
              type="text"
              value={user.website}
              onChange={handleChange}
              placeholder="Nhập website..."
            />

            <div className="modal-actions">
              <button className="btn-save" onClick={handleAdd}>Thêm</button>
              <button className="btn-cancel" onClick={() => setAdding(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;