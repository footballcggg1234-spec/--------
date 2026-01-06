// models/News.js
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // หัวข้อข่าว
    category: { type: String, required: true }, // หมวดหมู่ (กิจกรรม, วิชาการ, ทั่วไป)
    content: { type: String, required: true }, // เนื้อหา
    image: { type: String }, // ลิงก์รูปภาพ
    date: { type: Date, default: Date.now } // วันที่ลงข่าว
});

module.exports = mongoose.model('News', NewsSchema);