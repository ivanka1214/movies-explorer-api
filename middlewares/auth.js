const jwt = require('jsonwebtoken');
const { SECRET_KEY = 'anton' } = process.env;
const UnautorizedError = require('../errors/UnautorizedError');
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Не авторизован');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnautorizedError('Не авторизован');
  }
  req.user = payload;
  next();
};
