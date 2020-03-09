const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const uuidv4 = require('uuid/v4');

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
  const newAppointmentType = {
    id: uuidv4(),
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
