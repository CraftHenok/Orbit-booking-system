const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const uuidv4 = require('uuid/v4');

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
  const newAppointmentStatus = {
    id: uuidv4(),
    status: req.body.status
  };
  await db.run("INSERT INTO AppointmentStatus(id,status) VALUES(?,?)", [newAppointmentStatus.id, newAppointmentStatus.status], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(newAppointmentStatus);
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
