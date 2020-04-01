const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {updateUser} = require('./accountController');
const {statusCode} = require("../utitlity/statusCodes");


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

exports.updateAccountInfo = async (req, res) => {
  const doctorData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    status: "Approved",
    id: req.user.userId,
  };

  console.table(doctorData);

  await updateUser(doctorData, (response) => {
    if (response.suc) {
      res.json(response.msg).status(statusCode.updateOKNoData)
    } else {
      res.json(response.msg).status(statusCode.notFound)
    }
  });
};
