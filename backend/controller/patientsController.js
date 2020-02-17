const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const uuidv4 = require('uuid/v4');

exports.saveNewPatient = async (req, res) => {
  const patientData = {
    patientTitleId: req.body.patientTitleId,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    nationality: req.body.nationality,
    contact: req.body.contact,
    address: req.body.address,
    emergencyInfo: req.body.emergencyInfo,
    age: req.body.age,
    active: 0,
    regDate: new Date()
  };

  const contactId = uuidv4();
  const addressId = uuidv4();
  const emergencyId = uuidv4();

  db.serialize(function () {
    //save to contact
    db.run("INSERT into contact VALUES (?,?,?,?)", [contactId, patientData.contact.email, patientData.contact.phoneNumber,
      patientData.contact.alternatePhoneNumber], (err) => {
      if (err) {
        console.log(err);
      }
    });

    //save to address
    db.run("INSERT into address VALUES (?,?,?,?,?)", [addressId, patientData.address.line1, patientData.address.line2,
      patientData.address.city, patientData.address.country], function (err) {
      if (err) {
        console.log(err);
      }
    });

    // save to contact info
    db.run("INSERT into EmergencyContact VALUES (?,?,?,?,?)", [emergencyId, patientData.emergencyInfo.emergencyTitleId, patientData.emergencyInfo.name,
      patientData.emergencyInfo.phoneNumber, patientData.emergencyInfo.alternatePhoneNumber], function (err) {
      if (err) {
        console.log(err);
      }
    });

    db.run("INSERT into Patient(patientTitleId,firstName,middleName,lastName," +
      "gender,dateOfBirth,nationality,contactId,addressId,emergencyInfoId,age,active,regDate) " +
      "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [patientData.patientTitleId, patientData.firstName, patientData.middleName,
        patientData.lastName, patientData.gender, patientData.dateOfBirth, patientData.nationality,
        contactId, addressId, emergencyId, patientData.age, patientData.active, patientData.regDate], function (err) {
        if (err) {
          console.log(err);
          return res.json(err).status(401);
        } else {
          return res.json(patientData);
        }
      });
  });


};

exports.getPatientByName = (req, res) => {
  db.all("SELECT * from patient WHERE firstName like ?", `%${req.params["name"]}%`, (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getPatientById = (req, res) => {
  db.get("Select * from patient where seq = ?", req.params["patientId"], (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getAllPatients = async (req, res) => {
  await db.all("SELECT * FROM patient", function (err, rows) {
    return res.json(rows);
  });
};


exports.updatePatientById = (req, res) => {
  const updatePatientData = {
    patientTitleId: req.body.patientTitleId,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    nationality: req.body.nationality,
    contact: req.body.contact,
    address: req.body.address,
    emergencyInfo: req.body.emergencyInfo,
    age: req.body.age,
    active: 0
  };

  db.serialize(function () {
    //save to contact
    db.run("update contact set email=?,phoneNumber=?,alternatePhoneNumber=? where id=?", [updatePatientData.contact.email, updatePatientData.contact.phoneNumber,
      updatePatientData.contact.alternatePhoneNumber, updatePatientData.contact.id], (err) => {
      if (err) {
        console.log(err);
      }
    });

    //save to address
    db.run("update address set line1=?,line2=?,city=?,country=? where id=?", [updatePatientData.address.line1, updatePatientData.address.line2,
      updatePatientData.address.city, updatePatientData.address.country, updatePatientData.address.id], function (err) {
      if (err) {
        console.log(err);
      }
    });

    // save to contact info
    db.run("update EmergencyContact set emergencyTitleId=?,name=?,phoneNumber=?,alternatePhoneNumber=? where id=?", [updatePatientData.emergencyInfo.emergencyTitleId, updatePatientData.emergencyInfo.name,
      updatePatientData.emergencyInfo.phoneNumber, updatePatientData.emergencyInfo.alternatePhoneNumber, updatePatientData.emergencyInfo.id], function (err) {
      if (err) {
        console.log(err);
      }
    });

    db.run("update Patient set patientTitleId=?,firstName=?,middleName=?,lastName=?," +
      "gender=?,dateOfBirth=?,nationality=?,age=?,active=? where seq = ?",
      [updatePatientData.patientTitleId, updatePatientData.firstName, updatePatientData.middleName,
        updatePatientData.lastName, updatePatientData.gender, updatePatientData.dateOfBirth, updatePatientData.nationality,
        updatePatientData.age, updatePatientData.active, req.params['patientId']], function (err) {
        if (err) {
          console.log(err);
          return res.json(err).status(401);
        } else {
          return res.json(this.changes);
        }
      });
  });


};

exports.deleteByPatientId = async (req, res) => {
  // return res.json("delete patient by id =>" + req.params['patientId']);
  await db.run("DELETE from patient WHERE seq= ?", req.params['patientId'], function (err) {
    if (err) {
      res.json(err.message).status(404);
    } else {
      res.json(this.changes);
    }
  });
};
