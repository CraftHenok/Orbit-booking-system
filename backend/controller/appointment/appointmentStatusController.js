const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.deleteAppointmentStatus = async (req, res) => {
  await db.run("DELETE from AppointmentStatus WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.saveAppointmentStatus = async (req, res) => {
  await db.run("INSERT INTO AppointmentStatus(status) VALUES(?)", [req.body.status], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(req.body.status);
    }
  });
};

exports.getAllAppointmentStatus = async (req, res) => {
  await db.all("SELECT * FROM appointmentStatus", function (err, rows) {
    return res.json(rows);
  });
};

exports.updateAppointmentStatus = async (req, res) => {
  await db.run("update AppointmentStatus set Status=? where id=?", [req.body.status, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
