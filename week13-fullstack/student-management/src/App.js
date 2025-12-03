// ======== Bài 3: Bước 2 - Cấu hình React Router cho ứng dụng ========
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ======== Import các component pages ========
import HomePage from './components/HomePage';
import EditStudent from './components/EditStudent';
// ======== Kết thúc import components ========

function App() {
  // ======== Bài 3: Bước 2 - Thiết lập routing cho ứng dụng ========
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ======== Route trang chủ - Hiển thị danh sách và form thêm học sinh ======== */}
          <Route path="/" element={<HomePage />} />
          
          {/* ======== Bài 3: Bước 2 - Route trang chỉnh sửa học sinh ======== */}
          <Route path="/edit/:id" element={<EditStudent />} />
          {/* ======== Kết thúc Bài 3: Bước 2 ======== */}
        </Routes>
      </div>
    </Router>
  );
  // ======== Kết thúc cấu hình routing ========
}

export default App;
