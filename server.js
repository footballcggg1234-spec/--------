const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const News = require('./models/News');

const app = express();
// แก้ไข: ใช้ PORT ของ Server หรือถ้าไม่มีให้ใช้ 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// แก้ไข: ใช้ลิ้งค์จาก Environment Variable หรือถ้าไม่มีให้ใช้ Localhost
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://footballcggg1234_db_user:rungraditnetsawang@schoolrpg26.50zttky.mongodb.net/?appName=schoolrpg26';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// ... (ส่วน API Routes ด้านล่างเหมือนเดิม ไม่ต้องแก้) ...

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