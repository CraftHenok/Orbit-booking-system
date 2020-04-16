const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {statusCode} = require("../utitlity/statusCodes");
const {responseMessages} = require("../utitlity/responseMessages");


exports.getAccountInfoByToken = async (req, res) => {

  db.get("SELECT email,password,username from User where id= ?", [req.user.userId], (err, row) => {
    if (err) {
      res.json(err).status(statusCode.errorInData);
    } else {
      if (row === undefined) {
        res.status(statusCode.notFound).json(row);
      } else {
        res.status(statusCode.getOk).json(row);
      }
    }
  })

};


exports.getAccountInfoById = async (req, res) => {
  db.get("SELECT * from User where id= ?", [req.params['id']], (err, row) => {
    if (err) {
      res.json(err).status(statusCode.errorInData);
    } else {
      if (row === undefined) {
        res.status(statusCode.notFound).json(row);
      } else {
        res.status(statusCode.getOk).json(row);
      }
    }
  })
};


exports.updateAccountInfoByToken = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    status: req.body.status || "Approved",
    id: req.user.userId,
  };

  await localUpdateUser(userData, (response) => {
    if (response.suc) {
      res.status(statusCode.updateOkData).json(response.msg);
    } else {
      res.status(statusCode.errorInData).json(response.msg);
    }
  })

};


exports.updateAccountInfoById = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    status: req.body.status || "Approved",
    id: req.params['id'],
  };

  await localUpdateUser(userData, (response) => {
    if (response.suc) {
      res.status(statusCode.updateOkData).json(response.msg);
    } else {
      res.status(statusCode.errorInData).json(response.msg);
    }
  })

};

exports.deleteAccount = async (req, res) => {

  await localDeleteUser(req.params['id'], (response) => {
    if (response.suc) {
      res.json(response.msg).status(statusCode.deleteOk);
    } else {
      res.json(response.msg).status(statusCode.notFound);
    }
  });
};


const localUpdateUser = async function (userData, callBack) {

  await checkEmailForUpdate(userData.email, userData.id, (response) => {
    if (response.suc) {
      update();
    } else {
      callBack({suc: false, msg: response.msg});
    }
  });

  function update() {
    db.run("Update user set email=?,password=?,status=?,username=? where id=?",
      [userData.email, userData.password, userData.status, userData.username, userData.id], function (err) {
        if (err) {
          callBack({suc: false, msg: err});
        } else {
          callBack({suc: true, msg: this.changes})
        }
      });
  }

};

const localDeleteUser = async function (userId, callBack) {
  db.run("delete from user where id = ?",
    [userId], function (err) {
      if (err) {
        callBack({suc: false, msg: err});
      } else {
        callBack({suc: true, msg: this.changes})
      }
    });
};


const checkEmailForUpdate = async (email, id, callBack) => {
  await db.get("select username from user where email =? and id != ?", [email, id], (err, row) => {
    if (err) {
      console.error(err);
      callBack({suc: false, msg: err});
    } else {
      if (row === undefined) {
        callBack({suc: true});
      } else {
        callBack({suc: false, msg: responseMessages.emailAddressTaken});
      }
    }
  });
};


exports.deleteUser = (function () {
  return localDeleteUser;
})();


exports.updateUser = (function () {
  return localUpdateUser;
})();
