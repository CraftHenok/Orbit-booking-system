const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../utitlity/roleManager');

exports.saveDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("duration");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  const newDuration = {
    duration: req.body.duration
  };

  await db.run("INSERT INTO duration(duration) VALUES(?)", [newDuration.duration], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(newDuration);
    }
  });
};


exports.editDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("duration");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.run("update duration set duration=? where id=?", [req.body.duration, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};


exports.deleteDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("duration");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from duration WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.getAllDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("duration");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * FROM duration", function (err, rows) {
    return res.json(rows);
  });
};