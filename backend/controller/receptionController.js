const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {statusCode} = require("../utitlity/statusCodes");

exports.getAllReception = (req, res) => {
  db.all("SELECT * from User where role = 'R' ", [], (err, row) => {
    if (err) {
      res.json(err).status(statusCode.errorInData);
    } else {
      res.json(row).status(statusCode.getOk);
    }
  });
};



