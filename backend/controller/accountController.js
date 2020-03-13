const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwtHash = require("../utitlity/hashToken");

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  await db.get("select * from user where email = ?", [user.email], (err, row) => {
    if (err) {
      return res.json(err);
    } else {
      if (row === undefined) {
        return res.json("User doesn't exist")
      } else {
        if (row.password === user.password) {
          user.token = jwtHash({role: row.role, id: row.id});
          res.json(user);
        } else {
          res.json("Password don't match")
        }
      }
    }
  })
};


const localRegisterToDb = async function (userData, callBack) {
  await db.run("INSERT into User(email,password,role)VALUES (?,?,?)",
    [userData.email, userData.password, userData.role], function (err) {
      if (err) {
        callBack({suc: false, msg: err});
      } else {
        callBack({suc: true, msg: this.lastID});
      }
    });
};


exports.registerToDB = (function () {
  return localRegisterToDb;
})();


exports.register = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  await localRegisterToDb(newUser, function (response) {
    if (response.suc) {
      newUser.id = response.msg;
      newUser.token = jwtHash({role: newUser.role, id: newUser.id});
      return res.json(newUser);
    } else {
      return res.json(response.msg);
    }
  });


};
