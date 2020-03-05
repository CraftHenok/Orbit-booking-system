const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.deletePatientTitle = async (req, res) => {
  await db.run("DELETE from PatientTitle WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.savePatientTitle = async (req, res) => {
  await db.run("INSERT INTO PatientTitle(title) VALUES(?)", [req.body.title], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(req.body.title);
    }
  });
};

exports.getAllPatientTitle = async (req, res) => {
  await db.all("SELECT * FROM PatientTitle", function (err, rows) {
    return res.json(rows);
  });
};

exports.updatePatientTitle = async (req, res) => {
  await db.run("Update PatientTitle set title=? where id=?", [req.body.title, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
