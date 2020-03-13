const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function auth(req, res, next) {
  if (!req.header("Authorization")) return res.status(401).send("Access Denied");

  const token = req.header("Authorization").split(' ')[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const result = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = {
      userId: result.id,
      role: result.role
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Token");
  }

};
