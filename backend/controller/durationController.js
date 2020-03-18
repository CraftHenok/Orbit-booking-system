const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../utitlity/roleManager');
const {statusCode} = require('../utitlity/statusCodes');

exports.saveDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("duration");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const newDuration = {
    duration: req.body.duration
  };

  await db.run("INSERT INTO duration(duration) VALUES(?)", [newDuration.duration], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.saveOk).json(newDuration);
    }
  });
};


exports.editDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("duration");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const durationToEdit = {
    duration: req.body.duration,
    id: req.params["id"]
  };

  await db.run("update duration set duration=? where id=?", [durationToEdit.duration, durationToEdit.id], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.updateOKNoData).json(this.changes);
    }
  });
};


exports.deleteDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("duration");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from duration WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};

exports.getAllDuration = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("duration");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * FROM duration", function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};
