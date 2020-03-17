const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');

exports.deleteAppointmentType = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).deleteAny("appointmentType");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.run("DELETE from AppointmentType WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.saveAppointmentType = async (req, res) => {
  const permission = getGrants.can(req.user.role).createAny("appointmentType");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  const newAppointmentType = {
    type: req.body.type
  };

  await db.run("INSERT INTO AppointmentType(id,type) VALUES(?,?)", [newAppointmentType.id, newAppointmentType.type],
    function (err) {
      if (err) {
        return res.status(400).send(err.message);
      } else {
        return res.json(newAppointmentType);
      }
    });
};

exports.getAllAppointmentTypes = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).readAny("appointmentType");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.all("SELECT * FROM appointmentType", function (err, rows) {
    return res.json(rows);
  });
};

exports.updateAppointmentType = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).updateAny("appointmentType");
  if (!permission1.granted) {
    return res.status(403).json("Access forbidden for " + req.user.role);
  }

  await db.run("update AppointmentType set type=? where id=?", [req.body.type, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
