const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');
const {statusCode} = require('../../utitlity/statusCodes');

exports.deletePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("patientTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from PatientTitle WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);
    } else {
      res.json(this.changes).status(statusCode.deleteOk);
    }
  });
};

exports.savePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("patientTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const newPatientTitle = {
    title: req.body.title
  };

  await db.run("INSERT INTO PatientTitle(title) VALUES(?)", [newPatientTitle.title], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.saveOk).json(newPatientTitle);
    }
  });
};

exports.getAllPatientTitle = async (req, res) => {
  const permission = getGrants.can(req.user.role).readAny("patientTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * FROM PatientTitle", function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};

exports.updatePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("patientTitle");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.run("Update PatientTitle set title=? where id=?", [req.body.title, req.params["id"]], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.updateOkData).json(this.changes);
    }
  });
};
