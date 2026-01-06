const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://footballcggg1234_db_user:rungraditnetsawang@schoolrpg26.50zttky.mongodb.net/?appName=schoolrpg26';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// --- 1. Model: ข่าว (News) ---
const NewsSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now }
});
const News = mongoose.model('News', NewsSchema);

// --- 2. Model: บุคลากร (Personnel) [เพิ่มใหม่] ---
const PersonnelSchema = new mongoose.Schema({
    name: String,       // ชื่อ-สกุล
    position: String,   // ตำแหน่ง (ผอ., ครู, ฯลฯ)
    department: String, // กลุ่มสาระ/ฝ่าย
    image: String,      // รูปภาพ
    rank: { type: Number, default: 99 } // ลำดับการเรียง (เผื่อไว้)
});
const Personnel = mongoose.model('Personnel', PersonnelSchema);


// ================= API ROUTES =================

// --- API ข่าว ---
app.get('/api/news', async (req, res) => {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
});
app.post('/api/news', async (req, res) => {
    await new News(req.body).save();
    res.json({ message: 'Success' });
});
app.delete('/api/news/:id', async (req, res) => {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// --- API บุคลากร [เพิ่มใหม่] ---
app.get('/api/personnel', async (req, res) => {
    // เรียงตามตำแหน่ง (ผู้บริหารขึ้นก่อน) หรือตามวันที่สร้าง
    const personnel = await Personnel.find();
    res.json(personnel);
});
app.post('/api/personnel', async (req, res) => {
    await new Personnel(req.body).save();
    res.json({ message: 'Success' });
});
app.delete('/api/personnel/:id', async (req, res) => {
    await Personnel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// --- Serve HTML ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));