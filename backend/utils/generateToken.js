const jwt = require('jsonwebtoken');

const generateToken = (userId, tipo) => {
  return jwt.sign(
    { id: userId, tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = generateToken;
