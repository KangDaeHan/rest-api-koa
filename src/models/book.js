const mongoose = require('mongoose');
const {Schema} = mongoose;

// book에서 사용할 다큐멘트 스키마 구성
const Author = new Schema({
  name : String,
  email: String
});

const Book = new Schema({
  title: String,
  authors: [Author],
  publishedDate: Date,
  price: Number,
  tages: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 스키마를 모델로 변환하여 내보냄
module.exports = mongoose.model('Book', Book);