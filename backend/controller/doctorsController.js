const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const jwtHash = require("../utitlity/hashToken");
const {registerToDB} = require('./accountController');

exports.update = async (req, res) => {
  const doctorData = {
    name: req.body.name,
    displayOrder: req.body.displayOrder,
    manageBlocks: req.body.manageBlocks,
    manageBooking: req.body.manageBooking,
    isDoctor: req.body.isDoctor
  };

  await db.run("update doctor set name=?,displayOrder=?,manageBlocks=?,manageBooking=?,isDoctor=? where rowId=?",
    [doctorData.name, doctorData.username, doctorData.password, doctorData.displayOrder,
      doctorData.manageBlocks, doctorData.manageBooking, doctorData.isDoctor, req.params['seq']], function (err) {
      if (err) {
        res.json(err).status(404);
      } else {
        res.json(this.changes);
      }
    });
};

exports.deleteDoctorById = async (req, res) => {
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
    userId: '',
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
    }
    doctorData.userId = response.msg;
    db.run("INSERT into Doctor(userId,name,displayOrder,manageBlocks,manageBooking,isDoctor)\n" +
      "VALUES (?,?,?,?,?,?)", [doctorData.userId, doctorData.name, doctorData.displayOrder,
      doctorData.manageBlocks, doctorData.manageBooking, doctorData.isDoctor], function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send(err.message);
      } else {
        doctorData.token = jwtHash({role: newUser.role, id: this.lastID});
        doctorData.id = this.lastID;
        return res.json(doctorData);
      }
    });
  }


};

exports.getDoctorByName = (req, res) => {
  db.all("SELECT * from Doctor WHERE name like ?", `%${req.params["name"]}%`, (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getDoctorById = (req, res) => {
  db.get("Select * from doctor where rowId = ?", req.params["seq"], (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getAllDoctors = async (req, res) => {
  await db.all("select * from Doctor ORDER by displayOrder ASC;", (err, rows) => {
    if (err) {
      console.log(err);
    }
    return res.json(rows);
  });
};
