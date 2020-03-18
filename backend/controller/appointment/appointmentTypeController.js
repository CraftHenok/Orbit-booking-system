const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');
const {statusCode} = require("../../utitlity/statusCodes");

exports.deleteAppointmentType = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).deleteAny("appointmentType");
  if (!permission1.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.run("DELETE from AppointmentType WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);//fix needed
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};

exports.saveAppointmentType = async (req, res) => {
  const permission = getGrants.can(req.user.role).createAny("appointmentType");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  const newAppointmentType = {
    type: req.body.type
  };

  await db.run("INSERT INTO AppointmentType(type) VALUES(?)", [newAppointmentType.type],
    function (err) {
      if (err) {
        return res.status(statusCode.errorInData).send(err.message);
      } else {
        return res.status(statusCode.saveOk).json(newAppointmentType);
      }
    });
};

exports.getAllAppointmentTypes = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).readAny("appointmentType");
  if (!permission1.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.all("SELECT * FROM appointmentType", function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};

exports.updateAppointmentType = async (req, res) => {
  const permission1 = getGrants.can(req.user.role).updateAny("appointmentType");
  if (!permission1.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  const appointmentType = {
    type: req.body.type,
    id: req.params['id']
  };

  await db.run("update AppointmentType set type=? where id=?", [appointmentType.type, appointmentType.id], function (err) {
    if (err) {
      return res.status(statusCode.errorInData).send(err.message);
    } else {
      return res.status(statusCode.updateOKNoData).json(this.changes);
    }
  });
};
