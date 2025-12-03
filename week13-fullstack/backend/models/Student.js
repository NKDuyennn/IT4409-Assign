// ======== Bài 1: Bước 5 - Tạo Mongoose Schema và Model cho Student ========
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho Student với các trường: name, age, class
const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true }
}, { collection: 'students' });

// Export model Student để sử dụng trong các file khác
module.exports = mongoose.model('Student', studentSchema);
