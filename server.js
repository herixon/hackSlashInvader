const express = require('express');
require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// スキーマとモデルの定義
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
  nickname: String,
  time: Number,
});

const Ranking = mongoose.model('Ranking', rankingSchema);

app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// ランキングの取得と送信
app.get('/api/ranking', async (req, res) => {
  const rankingList = await Ranking.find().sort({ time: 1 }).limit(100);
  res.json(rankingList);
});

// ランキングの追加
app.post('/api/ranking', async (req, res) => {
  const newRanking = new Ranking(req.body);
  await newRanking.save();
  res.sendStatus(201);
});

const PORT = process.env.PORT || 3000;

// データベース接続
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  mongoose.set('strictQuery', false);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
