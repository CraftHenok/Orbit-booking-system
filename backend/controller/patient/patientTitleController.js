const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');

exports.deletePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("patientTitle");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from PatientTitle WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.savePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("patientTitle");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  const newPatientTitle = {
    title: req.body.title
  };

  await db.run("INSERT INTO PatientTitle(title) VALUES(?)", [newPatientTitle.title], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(newPatientTitle);
    }
  });
};

exports.getAllPatientTitle = async (req, res) => {
  const permission = getGrants.can(req.user.role).readAny("patientTitle");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * FROM PatientTitle", function (err, rows) {
    return res.json(rows);
  });
};

exports.updatePatientTitle = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("patientTitle");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.run("Update PatientTitle set title=? where id=?", [req.body.title, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
