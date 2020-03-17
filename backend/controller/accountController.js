const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwtHash = require("../utitlity/hashToken");

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  await db.get("select * from user where email = ?", [user.email], function (err, userFromDb) {
    if (err) {
      return res.json(err);
    } else {
      if (userFromDb === undefined) {
        return res.json("User doesn't exist")
      } else {
        if (userFromDb.password === user.password) {
          userFromDb.token = jwtHash({role: userFromDb.role, id: userFromDb.id});
          res.json(userFromDb);
        } else {
          res.json("Password don't match")
        }
      }
    }
  })
};


const localRegisterToDb = async function (userData, callBack) {
  db.serialize(function () {
    db.run("INSERT into User(email,password,role)VALUES (?,?,?)",
      [userData.email, userData.password, userData.role], function (err) {
        if (err) {
          callBack({suc: false, msg: err});
        } else {
          callBack({suc: true, msg: userData})
        }
      });
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
      return res.json(response.msg);
    } else {
      return res.json(response.msg);
    }
  });


};
