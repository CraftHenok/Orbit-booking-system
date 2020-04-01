const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../utitlity/roleManager');
const {statusCode} = require('../utitlity/statusCodes');

exports.getDoctorsScheduleBlocking = async (req, res) => {
  await db.all("Select * from ScheduleBlocking where userId = ?",
    [req.user.userId], function (err, row) {
      res.status(statusCode.getOk).json(row);
    });
};

exports.saveNewScheduleBlocking = async (req, res) => {
  const newScheduleBlocking = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.user.userId,
    reason: req.body.reason
  };

  await db.run("INSERT INTO ScheduleBlocking(startDate,endDate,userId,reason) VALUES(?,?,?,?)",
    [newScheduleBlocking.startDate, newScheduleBlocking.endDate, newScheduleBlocking.userId, newScheduleBlocking.reason], function (err) {
      if (err) {
        return res.status(statusCode.errorInData).send(err.message);
      } else {
        return res.status(statusCode.saveOk).json(newScheduleBlocking);
      }
    });
};

exports.deleteScheduleBlocking = async (req, res) => {
  await db.run("DELETE from ScheduleBlocking WHERE id= ? and userId = ?", [req.params['id'], req.user.userId], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};


exports.updateScheduleBlocking = async (req, res) => {
  const scheduleBlockingToUpdate = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.user.userId,
    reason: req.body.reason
  };

  await db.run("UPDATE ScheduleBlocking set reason =? ,startDate = ? ,endDate = ? where userId = ? and id=?",
    [scheduleBlockingToUpdate.reason, scheduleBlockingToUpdate.startDate, scheduleBlockingToUpdate.endDate, scheduleBlockingToUpdate.userId, req.params['id']], function (err) {
      if (err) {
        return res.status(statusCode.errorInData).send(err.message);
      } else {
        return res.status(statusCode.updateOkData).json(this.changes);
      }
    });
};

