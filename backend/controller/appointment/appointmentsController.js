const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');
const {statusCode} = require('../../utitlity/statusCodes');
const {scheduleBlockingCheck} = require('../../controller/scheduleBlockingController');
const {responseMessages} = require("../../utitlity/responseMessages");
const {constantVariables} = require("../../utitlity/variables");

exports.saveNewAppointment = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("appointment");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const appointmentData = {
    patientId: req.body.patientId,
    appointmentTypeId: req.body.appointmentTypeId,
    appointmentStatusId: req.body.appointmentStatusId,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    isServed: req.body.isServed,
    servedBy: req.body.servedBy,
    userId: req.user.userId
  };

  const forScheduleBlocking = {
    startDate: appointmentData.startDateTime,
    endDate: appointmentData.endDateTime,
    userId: appointmentData.servedBy
  };

  await scheduleBlockingCheck(forScheduleBlocking, (response) => {
    console.table(response);
    if (response.suc) {
      if (response.msg === 0) {
        saveAppointment();
      } else {
        return res.status(statusCode.errorInData).json(responseMessages.scheduleBlocked);
      }
    } else {
      console.error(response.msg);
      res.status(statusCode.errorInData).json(responseMessages.serverError)
    }
  });

  async function saveAppointment() {
    await db.run("INSERT into Appointment(patientId,appointmentTypeId,appointmentStatusId," +
      "startDateTime,endDateTime,isServed,servedBy,userId)\n" +
      "VALUES (?,?,?,?,?,?,?,?)", [appointmentData.patientId, appointmentData.appointmentTypeId, appointmentData.appointmentStatusId,
      appointmentData.startDateTime, appointmentData.endDateTime, appointmentData.isServed,
      appointmentData.servedBy, appointmentData.userId], function (err) {
      if (err) {
        console.error(err);
        res.status(statusCode.errorInData).json(responseMessages.serverError);
      } else {
        res.status(statusCode.saveOk).json(appointmentData);
      }
    });
  }


};

exports.updateAppointment = async (req, res) => {
  const permission = getGrants.can(req.user.role).updateAny("appointment");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  const appointmentData = {
    patientId: req.body.patientId,
    appointmentTypeId: req.body.appointmentTypeId,
    appointmentStatusId: req.body.appointmentStatusId,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    isServed: req.body.isServed,
    servedBy: req.body.servedBy,
    id: req.params['appointmentId'],
  };

  const forScheduleBlocking = {
    startDate: appointmentData.startDateTime,
    endDate: appointmentData.endDateTime,
    userId: appointmentData.servedBy
  };

  await scheduleBlockingCheck(forScheduleBlocking, (response) => {
    console.table(response);
    if (response.suc) {
      if (response.msg === 0) {
        updateAppointment();
      } else {
        return res.status(statusCode.errorInData).json(responseMessages.scheduleBlocked);
      }
    } else {
      console.error(response.msg);
      res.status(statusCode.errorInData).json(responseMessages.serverError)
    }
  });

  async function updateAppointment() {
    await db.run("update Appointment set patientId =?,appointmentTypeId=?,appointmentStatusId=?," +
      "startDateTime=?,endDateTime=?,isServed=?,servedBy=? where id = ?",
      [appointmentData.patientId, appointmentData.appointmentTypeId, appointmentData.appointmentStatusId,
        appointmentData.startDateTime, appointmentData.endDateTime, appointmentData.isServed,
        appointmentData.servedBy, appointmentData.id], function (err) {
        if (err) {
          res.status(statusCode.errorInData).send(err.message);
        } else {
          res.status(statusCode.updateOkData).json(this.changes);
        }
      });
  }
};

exports.deleteAppointmentById = async (req, res) => {
  const permission = getGrants.can(req.user.role).deleteAny("appointment");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.run("DELETE from Appointment WHERE id= ?", req.params['appointmentId'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};

function hasReadAnyAccess(role) {
  return getGrants.can(role).readAny("appointment").granted;
}

function checkDoctorRole(role) {
  const permission1 = getGrants.can(role).readAny("appointment");
  const permission2 = getGrants.can(role).readOwn("appointment");
  return !(!permission1.granted && !permission2.granted);
}


exports.getLogedInDoctorAppointment = async (req, res) => {
  if (!checkDoctorRole(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }
  await db.all("select * from appointment where servedBy = ? ORDER by startDateTime LIMIT ?", [req.user.userId, constantVariables.queryLimit], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};

exports.getDoctorAppointmentByItsId = async (req, res) => {
  if (!checkDoctorRole(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }
  await db.all(`select * from appointment where servedBy = ? ORDER by startDateTime LIMIT ?`, [req.params['doctorId'], constantVariables.queryLimit], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};


exports.getAllAppointments = async (req, res) => {

  if (!hasReadAnyAccess(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.all("SELECT * FROM appointment ORDER by startDateTime LIMIT ?", [constantVariables.queryLimit], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};
