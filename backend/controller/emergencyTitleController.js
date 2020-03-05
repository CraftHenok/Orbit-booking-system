const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.deleteEmergencyTitle = async (req, res) => {
  await db.run("DELETE from EmergencyTitle WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.saveEmergencyTitle = async (req, res) => {
  await db.run("INSERT INTO EmergencyTitle(title) VALUES(?)", [req.body.title], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(req.body.title);
    }
  });
};

exports.getAllEmergencyTitle = async (req, res) => {
  await db.all("SELECT * FROM EmergencyTitle", function (err, rows) {
    return res.json(rows);
  });
};

exports.updateEmergencyTitle = async (req, res) => {
  await db.run("Update EmergencyTitle set title=? where id=?", [req.body.title, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
