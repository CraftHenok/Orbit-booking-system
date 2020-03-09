const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const uuidv4 = require('uuid/v4');

exports.saveDuration = async (req, res) => {
  const newDuration = {
    id: uuidv4(),
    duration: req.body.duration
  };

  await db.run("INSERT INTO duration(id,duration) VALUES(?,?)", [newDuration.id, newDuration.duration], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(newDuration);
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
