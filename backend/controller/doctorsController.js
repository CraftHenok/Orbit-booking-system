const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwtHash = require("../utitlity/hashToken");
const {registerToDB} = require('./accountController');
const {getGrants} = require('../utitlity/roleManager');

exports.update = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateOwn("doctor");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  const doctorData = {
    name: req.body.name,
    displayOrder: req.body.displayOrder,
    manageBlocks: req.body.manageBlocks,
    manageBooking: req.body.manageBooking,
    isDoctor: req.body.isDoctor
  };

  await db.run("update doctor set name=?,displayOrder=?,manageBlocks=?,manageBooking=?,isDoctor=? where id=?",
    [doctorData.name, doctorData.displayOrder, doctorData.manageBlocks, doctorData.manageBooking,
      doctorData.isDoctor, req.params['seq']], function (err) {
      if (err) {
        console.log(err);
        res.json(err).status(404);
      } else {
        res.json(this.changes);
      }
    });
};

exports.deleteDoctorById = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteOwn("doctor");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.run("DELETE from Doctor WHERE rowId= ?", req.params['seq'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};

exports.saveNewDoctor = async (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    role: 'D'
  };

  const doctorData = {
    ...newUser,
    name: req.body.name,
    displayOrder: req.body.displayOrder,
    manageBlocks: req.body.manageBlocks,
    manageBooking: req.body.manageBooking,
    isDoctor: req.body.isDoctor
  };

  await registerToDB(newUser, insertIntoDoctorTable);

  function insertIntoDoctorTable(response) {
    if (response.suc === false) {
      return res.json(response.msg);
    } else {
      db.run("INSERT into Doctor(userId,name,displayOrder,manageBlocks,manageBooking,isDoctor)\n" +
        "VALUES ((SELECT seq from sqlite_sequence where name='User'),?,?,?,?,?)",
        [doctorData.name, doctorData.displayOrder,
          doctorData.manageBlocks, doctorData.manageBooking, doctorData.isDoctor], function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(doctorData);
          }
        });
    }

  }


};

exports.getDoctorByName = (req, res) => {
  const permission = getGrants.can(req.user.role).readAny("doctor");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  db.all("SELECT * from Doctor WHERE name like ?", `%${req.params["name"]}%`, (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getDoctorById = (req, res) => {

  const permission = getGrants.can(req.user.role).readOwn("doctor");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }


  db.get("Select * from doctor where rowId = ?", req.params["seq"], (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getAllDoctors = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("doctor");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.all("select * from Doctor ORDER by displayOrder ASC;", (err, rows) => {
    if (err) {
      console.log(err);
    }
    return res.json(rows);
  });
};
