const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');

exports.deleteAppointmentStatus = async (req, res) => {

  const permission1 = getGrants.can(req.user.role).deleteAny("appointmentStatus");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.run("DELETE from AppointmentStatus WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });


};

exports.saveAppointmentStatus = async (req, res) => {
  const permission = getGrants.can(req.user.role).createAny("appointmentStatus");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  const newAppointmentStatus = {
    status: req.body.status
  };

  await db.run("INSERT INTO AppointmentStatus(status) VALUES(?)", [newAppointmentStatus.status], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(newAppointmentStatus);
    }
  });


};

exports.getAllAppointmentStatus = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).readAny("appointmentStatus");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.all("SELECT * FROM appointmentStatus", function (err, rows) {
    return res.json(rows);
  });

};

exports.updateAppointmentStatus = async (req, res) => {

  const permission1 = getGrants.can(req.user.role).updateAny("appointmentStatus");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.run("update AppointmentStatus set Status=? where id=?", [req.body.status, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });


};
