const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (whatToHash) {
  return jwt.sign(whatToHash, process.env.TOKEN_KEY);
};
