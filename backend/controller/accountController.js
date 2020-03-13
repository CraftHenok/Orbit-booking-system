const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  await db.get("select * from user where email = ?", [user.email], (err, row) => {
    if (row.password === user.password) {
      user.token = jwt.sign({role: row.role, id: row.id}, process.env.TOKEN_KEY);
      res.json(user);
    } else {
      res.json("Password don't match")
    }
  })

};


exports.register = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  db.serialize(function () {
    db.run("INSERT into User(email,password,role)\n" +
      "VALUES (?,?,?)", [newUser.email, newUser.password, newUser.role], (err) => {
      if (err) {
        return console.error(err);
      }
    });

    db.get("SELECT * from sqlite_sequence WHERE name = 'User'", function (err, row) {
      if (err) {
        console.error(err);
      } else {
        newUser.token = jwt.sign({role: newUser.role, id: row.seq}, process.env.TOKEN_KEY);
        return res.json(newUser);
      }
    })
  });


};
