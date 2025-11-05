# 📱 Ứng Dụng Quản Lý Người Dùng - React CRUD

## 🎯 Mô Tả Dự Án

Ứng dụng quản lý người dùng được xây dựng bằng **React** với đầy đủ chức năng **CRUD** (Create, Read, Update, Delete). Dự án này minh họa các khái niệm cơ bản và quan trọng của React.

## ✨ Tính Năng

- ✅ **Hiển thị danh sách** người dùng từ API
- 🔍 **Tìm kiếm** theo tên và username
- ➕ **Thêm** người dùng mới với validation
- ✏️ **Sửa** thông tin người dùng
- ❌ **Xóa** người dùng
- 📱 **Responsive Design** - Tương thích mobile
- 🎨 **UI/UX đẹp mắt** với animation

## 🛠️ Công Nghệ Sử Dụng

- **React 19** - Library UI
- **Vite** - Build tool
- **CSS3** - Styling
- **JSONPlaceholder API** - Fake REST API

## 📁 Cấu Trúc Project

```
week9-react/
├── src/
│   ├── components/
│   │   ├── AddUser.jsx      # Component thêm user
│   │   ├── SearchForm.jsx   # Component tìm kiếm
│   │   └── ResultTable.jsx  # Component hiển thị & CRUD
│   ├── App.jsx              # Component chính
│   ├── App.css              # Styling
│   └── main.jsx             # Entry point
├── package.json
├── CHECKLIST.md             # Chi tiết kiểm tra
└── README.md                # File này
```

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone project

```bash
git clone <repository-url>
cd week9-react
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu bị trùng)

### 4. Build production

```bash
npm run build
```

## 📖 Kiến Thức Áp Dụng

### React Hooks

#### useState
```javascript
const [users, setUsers] = useState([]);
const [keyword, setKeyword] = useState("");
const [editing, setEditing] = useState(null);
```

#### useEffect
```javascript
// Fetch data khi component mount
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);

// Thêm user mới khi prop thay đổi
useEffect(() => {
  if (user) {
    setUsers(prev => [...prev, { ...user, id: Date.now() }]);
  }
}, [user]);
```

### State Management

#### State Lifting
State được quản lý tập trung ở component cha (`App.jsx`) và truyền xuống các component con qua props:

```javascript
function App() {
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <>
      <SearchForm onChangeValue={setKeyword} />
      <AddUser onAdd={setNewUser} />
      <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
    </>
  );
}
```

#### Controlled Components
Form inputs được kiểm soát bởi React state:

```javascript
<input
  value={user.name}
  onChange={(e) => setUser({ ...user, name: e.target.value })}
/>
```

### Xử Lý Nested State

Khi cập nhật object lồng nhau, cần dùng spread operator để copy:

```javascript
// ❌ SAI
setUser({ address: { city: "Hanoi" } }); // Mất dữ liệu cũ

// ✅ ĐÚNG
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: "Hanoi" }
}));
```

### Deep Copy

Khi sửa dữ liệu, phải deep copy để tránh thay đổi dữ liệu gốc:

```javascript
function editUser(user) {
  setEditing({ ...user, address: { ...user.address } });
}
```

## 🎨 Component Chi Tiết

### 1. App.jsx
- Quản lý state tập trung
- Điều phối luồng dữ liệu giữa các component

### 2. SearchForm.jsx
- Input tìm kiếm
- Callback `onChangeValue` để cập nhật keyword ở App

### 3. AddUser.jsx
- Form thêm người dùng mới
- Modal overlay
- Validation (Name, Username bắt buộc, Email format)
- Xử lý nested state (address)
- Callback `onAdd` để thêm user vào App

### 4. ResultTable.jsx
- Hiển thị danh sách dạng table
- Fetch data từ API
- Lọc theo keyword
- Chức năng sửa và xóa
- Modal form sửa

## 🔄 Luồng Dữ Liệu

```
┌─────────────────────────────────────────┐
│             App (State)                 │
│  - keyword                              │
│  - newUser                              │
└─────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────────┐
   │ Search   │   │ AddUser  │   │ ResultTable  │
   │  Form    │   │          │   │              │
   └──────────┘   └──────────┘   └──────────────┘
         │              │              │
    onChange        onAdd          keyword
         │              │           user props
         ▼              ▼              ▼
   setKeyword      setNewUser     Display & CRUD
```

## 📝 CRUD Operations

### CREATE (Thêm)
```javascript
function handleAdd() {
  if (!user.name || !user.username) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  onAdd(user); // Gửi lên App
}
```

### READ (Đọc)
```javascript
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

### UPDATE (Sửa)
```javascript
function saveUser() {
  setUsers(prev => prev.map(u => 
    u.id === editing.id ? editing : u
  ));
  setEditing(null);
}
```

### DELETE (Xóa)
```javascript
function removeUser(id) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    setUsers(prev => prev.filter(u => u.id !== id));
  }
}
```

## 🎯 Các Điểm Quan Trọng

### 1. Immutability
Luôn tạo bản copy mới thay vì thay đổi trực tiếp state:

```javascript
// ✅ ĐÚNG
setUsers(prev => [...prev, newUser]);

// ❌ SAI
users.push(newUser);
setUsers(users);
```

### 2. Key trong List
Luôn cung cấp `key` unique khi render list:

```javascript
{users.map(u => (
  <tr key={u.id}>
    <td>{u.name}</td>
  </tr>
))}
```

### 3. Event Handling
```javascript
// Với tham số
<button onClick={() => removeUser(u.id)}>Xóa</button>

// Không có tham số
<button onClick={handleClick}>Click</button>
```

### 4. Conditional Rendering
```javascript
{loading && <div>Loading...</div>}
{editing && <Modal />}
{users.length === 0 ? <Empty /> : <Table />}
```

## 🐛 Debug & Testing

### Kiểm tra State
Dùng React DevTools để xem state và props của các component

### Console Logging
```javascript
useEffect(() => {
  console.log("Users updated:", users);
}, [users]);
```

### Validation Testing
- ✅ Test thêm user không có tên
- ✅ Test email không hợp lệ
- ✅ Test xóa user
- ✅ Test sửa thông tin
- ✅ Test tìm kiếm

## 📚 Tài Liệu Tham Khảo

- [React Official Docs](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## 🎓 Học Tập Thêm

Sau khi hoàn thành project này, có thể mở rộng với:

- 🔐 Authentication
- 🌐 React Router (Multi-page)
- 📦 State Management (Redux, Zustand)
- 🎨 UI Libraries (Material-UI, Ant Design)
- 🔥 Backend Integration (Node.js, Firebase)
- 📱 React Native (Mobile App)

## 👨‍💻 Tác Giả

- **Sinh viên**: Nguyen Kieu Duyen
- **Lớp**: IT4409
- **Trường**: Đại học Bách Khoa Hà Nội

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập
