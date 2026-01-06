const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // <--- เพิ่มตัวนี้มาช่วยหาไฟล์

const News = require('./models/News');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------------
// ✅ ส่วนที่เพิ่ม: บอก Server ว่าไฟล์ HTML/CSS อยู่ที่ไหน
// ----------------------------------------------------
app.use(express.static(path.join(__dirname, '/')));

// ถ้าคนเข้าหน้าแรก (/) ให้ส่งไฟล์ index.html ไปให้ดู
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// ----------------------------------------------------

// เชื่อมต่อ MongoDB (รองรับทั้งออนไลน์และในเครื่อง)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://footballcggg1234_db_user:rungraditnetsawang@schoolrpg26.50zttky.mongodb.net/?appName=schoolrpg26';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// ================= API Routes (เหมือนเดิม) =================

app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const newNews = new News(req.body);
        await newNews.save();
        res.json({ message: 'News added successfully!', data: newNews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});