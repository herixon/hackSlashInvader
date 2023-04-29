const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const Ranking = mongoose.model('Ranking', RankingSchema);
module.exports = Ranking;