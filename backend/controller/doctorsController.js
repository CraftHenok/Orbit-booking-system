const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {registerToDB} = require('./accountController');
const {getGrants} = require('../utitlity/roleManager');
const {statusCode} = require('../utitlity/statusCodes');

exports.update = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateOwn("doctor");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  const doctorData = {
    displayOrder: req.body.displayOrder,
    id: req.params['id'],
  };

  await db.run("update doctor set displayOrder=? where id=?",
    [doctorData.displayOrder, doctorData.id], function (err) {
      if (err) {
        console.error(err);
        res.json(err).status(statusCode.notFound);
      } else {
        res.status(statusCode.updateOKNoData).json(this.changes);
      }
    });
};

exports.deleteDoctorById = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteOwn("doctor");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from Doctor WHERE id = ?", req.params['id'], function (err) {
    if (err) {
      res.json(err.message).status(statusCode.notFound);
    } else {
      res.status(statusCode.deleteOk).json(this.changes);
    }
  });
};

exports.saveNewDoctor = async (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    role: "D",
    status: req.body.status || "Pending"
  };

  const doctorData = {
    ...newUser,
    displayOrder: req.body.displayOrder,
  };

  // first save to the general user table
  await registerToDB(newUser, insertIntoDoctorTable);

  function insertIntoDoctorTable(response) {
    if (response.suc === false) {
      console.error(response.msg);
      return res.json(response.msg);
    } else {
      db.run("INSERT into Doctor(userId,displayOrder)\n" +
        "VALUES ((SELECT seq from sqlite_sequence where name='User'),?)",
        [doctorData.displayOrder], function (err) {
          if (err) {
            console.error(err);
            res.status(statusCode.errorInData).send(err);
          } else {
            res.status(statusCode.saveOk).json(doctorData);
          }
        });
    }

  }


};

exports.getDoctorById = (req, res) => {

  const permission = getGrants.can(req.user.role).readOwn("doctor");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  db.get("Select * from doctor where id = ?", req.params["id"], (err, row) => {
    if (err) {
      res.json(err).status(statusCode.errorInData);
    } else {
      if (row === undefined) {
        res.status(statusCode.notFound).json(row);
      } else {
        res.status(statusCode.getOk).json(row);
      }
    }
  })
};

exports.getAllDoctors = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("doctor");
  if (!permission.granted) {
    return res.status(statusCode.forbidden).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT User.*,displayOrder from User LEFT JOIN Doctor where User.id=Doctor.userId and User.role='D' ORDER by displayOrder DESC;", (err, rows) => {
    if (err) {
      console.error(err);
    }
    return res.status(statusCode.getOk).json(rows);
  });
};
