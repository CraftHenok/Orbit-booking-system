const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.saveDuration = async (req, res) => {
  await db.run("INSERT INTO duration(duration) VALUES(?)", [req.body.duration], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(req.body.duration);
    }
  });
};


exports.editDuration = async (req, res) => {
  await db.run("update duration set duration=? where id=?", [req.body.duration, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};


exports.deleteDuration = async (req, res) => {
  await db.run("DELETE from duration WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.getAllDuration = async (req, res) => {
  await db.all("SELECT * FROM duration", function (err, rows) {
    return res.json(rows);
  });
};
