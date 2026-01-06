// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const News = require('./models/News');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔗 เชื่อมต่อ MongoDB (เปลี่ยนลิ้งค์ตรงนี้เป็นของเครื่องคุณหรือ MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/rpk26_school')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// ================= API Routes =================

// 1. ดึงข่าวทั้งหมด (เรียงจากใหม่ไปเก่า)
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. เพิ่มข่าวใหม่ (สำหรับหน้า Admin)
app.post('/api/news', async (req, res) => {
    try {
        const newNews = new News(req.body);
        await newNews.save();
        res.json({ message: 'News added successfully!', data: newNews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. ลบข่าว
app.delete('/api/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เริ่มต้น Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});