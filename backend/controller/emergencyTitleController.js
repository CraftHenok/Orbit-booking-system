const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../utitlity/roleManager');
const {statusCode} = require('../utitlity/statusCodes');

exports.deleteEmergencyTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("emergencyTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from EmergencyTitle WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.errorInData);
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};

exports.saveEmergencyTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("emergencyTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const newEmergencyTitle = {
    title: req.body.title
  };

  await db.run("INSERT INTO EmergencyTitle(title) VALUES(?)", [newEmergencyTitle.title],
    function (err) {
      if (err) {
        return res.status(statusCode.errorInData).send(err.message);
      } else {
        return res.status(statusCode.saveOk).json(newEmergencyTitle);
      }
    });
};

exports.getAllEmergencyTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("emergencyTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * FROM EmergencyTitle", function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};

exports.updateEmergencyTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("emergencyTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const emergencyTitle = {
    title: req.body.title,
    id: req.params["id"]
  };

  await db.run("Update EmergencyTitle set title=? where id=?", [emergencyTitle.title, emergencyTitle.id], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.updateOKNoData).json(this.changes);
    }
  });
};
