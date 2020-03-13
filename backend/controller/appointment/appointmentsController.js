const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');

exports.saveNewAppointment = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("appointment");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden");
  }

  const appointmentData = {
    patientId: req.body.patientId,
    appointmentTypeId: req.body.appointmentTypeId,
    appointmentStatusId: req.body.appointmentStatusId,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    isServed: req.body.isServed,
    servedBy: req.body.servedBy
  };

  await db.run("INSERT into Appointment(patientId,appointmentTypeId,appointmentStatusId," +
    "startDateTime,endDateTime,isServed,servedBy)\n" +
    "VALUES (?,?,?,?,?,?,?)", [appointmentData.patientId, appointmentData.appointmentTypeId, appointmentData.appointmentStatusId,
    appointmentData.startDateTime, appointmentData.endDateTime, appointmentData.isServed,
    appointmentData.servedBy], (err) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.json(appointmentData);
    }
  });

};

exports.updateAppointment = async (req, res) => {
  const permission = getGrants.can(req.user.role).updateAny("appointment");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden");
  }


  const appointmentData = {
    patientId: req.body.patientId,
    appointmentTypeId: req.body.appointmentTypeId,
    appointmentStatusId: req.body.appointmentStatusId,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    isServed: req.body.isServed,
    servedBy: req.body.servedBy
  };

  await db.run("update Appointment set patientId =?,appointmentTypeId=?,appointmentStatusId=?," +
    "startDateTime=?,endDateTime=?,isServed=?,servedBy=? where id = ?",
    [appointmentData.patientId, appointmentData.appointmentTypeId, appointmentData.appointmentStatusId,
      appointmentData.startDateTime, appointmentData.endDateTime, appointmentData.isServed,
      appointmentData.servedBy, req.params['appointmentId']], function (err) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.json(this.changes);
      }
    });
};

exports.deleteAppointmentById = async (req, res) => {
  const permission = getGrants.can(req.user.role).deleteAny("appointment");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden");
  }


  await db.run("DELETE from Appointment WHERE id= ?", req.params['appointmentId'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

function hasReadAnyAccess() {
  return getGrants.can(req.user.role).readAny("appointment");
}


exports.getPatientAppointment = async (req, res) => {
  if (!hasReadAnyAccess()) {
    return res.status(403).json("Access forbidden");
  }

  await db.all("select * from appointment where patientId = ?", [req.params['patientId']], function (err, rows) {
    return res.json(rows);
  });
};

exports.getDoctorAppointments = async (req, res) => {

  await db.all("select * from appointment where servedBy = ?", [req.params['doctorId']], function (err, rows) {
    return res.json(rows);
  });
};

exports.getAllAppointments = async (req, res) => {
  if (!hasReadAnyAccess()) {
    return res.status(403).json("Access forbidden");
  }

  await db.all("SELECT * FROM appointment", function (err, rows) {
    return res.json(rows);
  });
};
