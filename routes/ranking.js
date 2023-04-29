const express = require('express');
const Ranking = require('../models/ranking');
const router = express.Router();

router.post('/', async (req, res) => {
  const ranking = new Ranking({
    nickname: req.body.nickname,
    time: req.body.time
  });

  try {
    const savedRanking = await ranking.save();
    res.json(savedRanking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const rankings = await Ranking.find().sort({ time: 1 }).limit(100);
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;