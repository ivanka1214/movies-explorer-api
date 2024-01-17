const { urlRegex } = require('../utils/constants');
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
  director: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле обязательно'],
  },
  year: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
  description: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
  image: {
    type: String,
    required: [true, 'Поле обязательно'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите url',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле обязательно'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите url',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле обязательно'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Поле обязательно'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле обязательно'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
