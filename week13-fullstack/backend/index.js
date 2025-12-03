// ======== Bài 1: Bước 2 - Thiết lập máy chủ Express cơ bản ========
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Khởi tạo ứng dụng Express
const app = express();
const PORT = 5000;

// ======== Bài 1: Bước 2 - Sử dụng middleware ========
// CORS cho phép frontend truy cập API
app.use(cors());
// Parse JSON request body
app.use(express.json());
app.use(bodyParser.json());

// ======== Bài 1: Bước 4 - Kết nối Express với MongoDB ========
// Kết nối đến MongoDB đang chạy trên Docker (cổng 27017)
mongoose.connect('mongodb://localhost:27017/student_db')
  .then(() => console.log("✓ Đã kết nối MongoDB thành công"))
  .catch(err => console.error("✗ Lỗi kết nối MongoDB:", err));

// ======== Bài 1: Bước 5 - Import model Student ========
const Student = require('./models/Student');

// ======== Bài 1: Bước 6 - Tạo API GET danh sách học sinh ========
// Endpoint lấy danh sách tất cả học sinh
app.get('/api/students', async (req, res) => {
  try {
    // Tìm tất cả học sinh trong database
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route mặc định để kiểm tra server
app.get('/', (req, res) => {
  res.json({ message: 'Backend API đang chạy!' });
});

// ======== Bài 1: Bước 2 - Khởi động server ========
// Chạy server trên cổng 5000
app.listen(PORT, () => {
  console.log(`✓ Server đang chạy tại http://localhost:${PORT}`);
});
