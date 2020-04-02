const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');
const {statusCode} = require('../../utitlity/statusCodes');
const {scheduleBlockingCheck} = require('../../controller/scheduleBlockingController');

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

  console.log(forScheduleBlocking);

  await scheduleBlockingCheck(forScheduleBlocking, (response) => {
    console.table(response);
    if (response.suc) {
      if (response.msg === 0) {
        saveAppointment();
      } else {
        return res.status(statusCode.errorInData).json("Doctor blocked this area can't add");
      }
    } else {
      res.status(statusCode.errorInData).json(response.msg)
    }
  });

  async function saveAppointment() {
    await db.run("INSERT into Appointment(patientId,appointmentTypeId,appointmentStatusId," +
      "startDateTime,endDateTime,isServed,servedBy,userId)\n" +
      "VALUES (?,?,?,?,?,?,?,?)", [appointmentData.patientId, appointmentData.appointmentTypeId, appointmentData.appointmentStatusId,
      appointmentData.startDateTime, appointmentData.endDateTime, appointmentData.isServed,
      appointmentData.servedBy, appointmentData.userId], function (err) {
      if (err) {
        res.status(statusCode.errorInData).send(err.message);
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


exports.getPatientAppointment = async (req, res) => {
  if (!hasReadAnyAccess(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.all("select * from appointment where patientId = ?", [req.params['patientId']], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};


function checkDoctorRole(role) {
  const permission1 = getGrants.can(role).readAny("appointment");
  const permission2 = getGrants.can(role).readOwn("appointment");
  return !(!permission1.granted && !permission2.granted);
}


exports.getLogedInDoctorAppointment = async (req, res) => {
  if (!checkDoctorRole(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }
  await db.all("select * from appointment where servedBy = ?", [req.user.userId], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};

exports.getDoctorAppointmentByItsId = async (req, res) => {
  if (!checkDoctorRole(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }
  await db.all("select * from appointment where servedBy = ?", [req.params['doctorId']], function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};


exports.getAllAppointments = async (req, res) => {

  if (!hasReadAnyAccess(req.user.role)) {
    return res.status(statusCode.forbidden).json("Access forbidden for " + req.user.role);
  }

  await db.all("SELECT * FROM appointment", function (err, rows) {
    return res.status(statusCode.getOk).json(rows);
  });
};
