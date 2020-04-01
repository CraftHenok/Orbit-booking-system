const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwtHash = require("../utitlity/hashToken");
const {statusCode} = require("../utitlity/statusCodes");

exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  await db.get("select * from user where email = ?", [user.email], function (err, userFromDb) {
    if (err) {
      return res.status(statusCode.errorInData).json(err);
    } else {
      if (userFromDb === undefined) {
        return res.status(statusCode.notFound).json("User doesn't exist")
      } else {
        if (userFromDb.password === user.password) {
          userFromDb.token = jwtHash({role: userFromDb.role, id: userFromDb.id});
          res.status(statusCode.getOk).json(userFromDb);
        } else {
          res.status(statusCode.errorInData).json("Password don't match")
        }
      }
    }
  })
};

exports.register = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "",
    username: req.body.username,
    status: req.body.status || "Pending"
  };

  await localRegisterToDb(newUser, function (response) {
    if (response.suc) {
      return res.status(statusCode.saveOk).json(response.msg);
    } else {
      return res.status(statusCode.errorInData).json(response.msg);
    }
  });

};


const localRegisterToDb = async function (userData, callBack) {
  db.run("INSERT into User(email,password,role,status,username)VALUES (?,?,?,?,?)",
    [userData.email, userData.password, userData.role, userData.status, userData.username], function (err) {
      if (err) {
        console.log("here");
        console.error(err);
        callBack({suc: false, msg: err});
      } else {
        callBack({suc: true, msg: userData})
      }
    });
};

const localUpdateUser = async function (userData, callBack) {
  db.run("Update user set email=?,password=?,status=?,username=? where id=?",
    [userData.email, userData.password, userData.status, userData.username, userData.id], function (err) {
      if (err) {
        console.error("here" + err);
        callBack({suc: false, msg: err});
      } else {
        callBack({suc: true, msg: this.changes})
      }
    });
};


exports.updateUser = (function () {
  return localUpdateUser;
})();


exports.registerToDB = (function () {
  return localRegisterToDb;
})();



