const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {updateUser, deleteUser} = require('./accountController');
const {statusCode} = require("../utitlity/statusCodes");


// for logedin user
exports.getAccountInfo = async (req, res) => {

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

exports.deleteAccount = async (req, res) => {
  const userId = req.params['id'];
  await deleteUser(userId, function (response) {
    if (response.suc) {
      res.json(response.msg).status(statusCode.deleteOk);
    } else {
      res.json(response.msg).status(statusCode.notFound);
    }
  })
};


exports.updateAccountInfo = async (req, res) => {
  const doctorData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    status: req.body.status || "Approved",
    id: req.user.userId,
  };
  await updateUser(doctorData, (response) => {
    if (response.suc) {
      res.json(response.msg).status(statusCode.updateOKNoData)
    } else {
      res.json(response.msg).status(statusCode.notFound)
    }
  });
};


exports.updateAccountInfoById = async (req, res) => {
  const doctorData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    status: req.body.status || "Approved",
    id: req.params['id'],
  };
  await updateUser(doctorData, (response) => {
    if (response.suc) {
      res.json(response.msg).status(statusCode.updateOKNoData)
    } else {
      res.json(response.msg).status(statusCode.notFound)
    }
  });
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
