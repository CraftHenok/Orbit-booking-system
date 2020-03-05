const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.deleteAppointmentType = async (req, res) => {
  await db.run("DELETE from AppointmentType WHERE id= ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.saveAppointmentType = async (req, res) => {
  await db.run("INSERT INTO AppointmentType(type) VALUES(?)", [req.body.type], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(req.body.type);
    }
  });
};

exports.getAllAppointmentTypes = async (req, res) => {
  await db.all("SELECT * FROM appointmentType", function (err, rows) {
    return res.json(rows);
  });
};

exports.updateAppointmentType = async (req, res) => {
  await db.run("update AppointmentType set type=? where id=?", [req.body.type, req.params["id"]], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    } else {
      return res.json(this.changes);
    }
  });
};
