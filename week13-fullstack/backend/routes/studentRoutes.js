// ======== Bài 1: Bước 6 - Tạo file routes riêng cho Student ========
import express from 'express';
import Student from '../models/Student.js';
const router = express.Router();

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

// ======== Bài 3: Bước 1 - Tạo API GET chi tiết học sinh theo ID ========
// Endpoint lấy thông tin chi tiết một học sinh
// GET /api/students/:id
router.get('/:id', async (req, res) => {
  try {
    // Tìm học sinh theo ID
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// ======== Kết thúc Bài 3: Bước 1 ========

// ======== Bài 3: Bước 1 - Tạo API cập nhật học sinh (HTTP PUT) ========
// Endpoint cập nhật thông tin học sinh theo ID
// PUT /api/students/:id
router.put('/:id', async (req, res) => {
  try {
    // Tìm và cập nhật document theo ID với dữ liệu mới (req.body)
    // Option { new: true } để trả về document sau khi update
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Kiểm tra nếu không tìm thấy học sinh với ID này
    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    // Trả về học sinh đã được cập nhật
    res.json(updatedStu);
  } catch (err) {
    // Trả về lỗi nếu dữ liệu không hợp lệ hoặc ID sai format
    res.status(400).json({ error: err.message });
  }
});
// ======== Kết thúc Bài 3: Bước 1 ========

// ======== Bài 4: Bước 1 - Tạo API xóa học sinh (HTTP DELETE) ========
// Endpoint xóa học sinh theo ID
// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // Tìm và xóa học sinh theo ID
    const deleted = await Student.findByIdAndDelete(id);
    
    // Kiểm tra nếu không tìm thấy học sinh với ID này
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    // Trả về thông báo thành công và ID của học sinh đã xóa
    res.json({ 
      message: "Đã xóa học sinh thành công", 
      id: deleted._id,
      name: deleted.name 
    });
  } catch (err) {
    // Trả về lỗi nếu có vấn đề khi xóa
    res.status(500).json({ error: err.message });
  }
});
// ======== Kết thúc Bài 4: Bước 1 ========

export default router;
