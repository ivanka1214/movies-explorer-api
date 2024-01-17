const UnautorizedError = require('../errors/UnautorizedError');
const { emailRegex } = require('../utils/constant');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина - 2'],
    maxlength: [30, 'Максимальная длина - 30'],
    required: [true, 'Поле обязательно'],
  },
  email: {
    type: String,
    required: [true, 'Поле обязательно'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Введите email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле обязательно'],
    select: false,
  },
}, { versionKey: false });
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
