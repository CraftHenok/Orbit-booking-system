const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
var jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  await db.get("select * from user where email = ?", [user.email], (err, row) => {
    if (row.password === user.password) {
      user.token = jwt.sign({role: row.role, id: row.id}, "123456789");
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

  await db.run("INSERT into User(email,password,role)\n" +
    "VALUES (?,?,?)", [newUser.email, newUser.password, newUser.role], (err) => {
    if (err) {
      res.status(400).send(err.message);
    } else {


      res.json(newUser);
    }
  });
};
