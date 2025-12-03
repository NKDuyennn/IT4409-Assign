// ======== Bài 1: Bước 6 - Tạo file routes riêng cho Student ========
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ======== Bài 1: Bước 6 - Tạo API GET danh sách học sinh ========
// Endpoint lấy danh sách tất cả học sinh
// GET /api/students
router.get('/', async (req, res) => {
  try {
    // Tìm tất cả học sinh trong database
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ======== Kết thúc Bài 1: Bước 6 ========

// ======== Bài 2: Bước 1 - Tạo API thêm học sinh (HTTP POST) ========
// Endpoint thêm học sinh mới vào database
// POST /api/students
router.post('/', async (req, res) => {
  try {
    // Tạo document mới từ dữ liệu gửi lên (req.body chứa name, age, class)
    const newStudent = await Student.create(req.body);
    // Trả về học sinh vừa tạo với status 201 (Created)
    res.status(201).json(newStudent);
  } catch (e) {
    // Trả về lỗi nếu dữ liệu không hợp lệ
    res.status(400).json({ error: e.message });
  }
});
// ======== Kết thúc Bài 2: Bước 1 ========

module.exports = router;
