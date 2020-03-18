const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');
const {getGrants} = require('../../utitlity/roleManager');

exports.saveNewPatient = async (req, res) => {

  const permission = getGrants.can(req.user.role).createAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  const patientData = {
    patientTitleId: req.body.patientTitleId,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth || '',
    nationality: req.body.nationality,
    contact: req.body.contact,
    address: req.body.address,
    emergencyInfo: req.body.emergencyInfo,
    age: req.body.age,
    active: 0,
    regDate: new Date()
  };
  //save to contact
  db.run("INSERT into contact(email,phoneNumber,alternatePhoneNumber) VALUES (?,?,?)",
    [patientData.contact.email, patientData.contact.phoneNumber,
      patientData.contact.alternatePhoneNumber], (err) => {
      if (err) {
        console.log(err);
      }
    });

  //save to address
  db.run("INSERT into address(line1,line2,city,country) VALUES (?,?,?,?)",
    [patientData.address.line1, patientData.address.line2,
      patientData.address.city, patientData.address.country], function (err) {
      if (err) {
        console.log(err);
      }
    });

  // save to contact info
  db.run("INSERT into EmergencyContact(emergencyTitleId,name,phoneNumber,alternatePhoneNumber) VALUES (?,?,?,?)",
    [patientData.emergencyInfo.emergencyTitleId, patientData.emergencyInfo.name,
      patientData.emergencyInfo.phoneNumber, patientData.emergencyInfo.alternatePhoneNumber], function (err) {
      if (err) {
        console.log(err);
      }
    });

  db.run("INSERT into Patient(patientTitleId,firstName,middleName,lastName," +
    "gender,dateOfBirth,nationality,contactId,addressId,emergencyInfoId,age,active,regDate) " +
    "VALUES (?,?,?,?,?,?,?," +
    "(select seq from sqlite_sequence where name='Contact')," +
    "(select seq from sqlite_sequence where name='Address')," +
    "(select seq from sqlite_sequence where name='EmergencyContact'),?,?,?)",
    [patientData.patientTitleId, patientData.firstName, patientData.middleName,
      patientData.lastName, patientData.gender, patientData.dateOfBirth, patientData.nationality,
      patientData.age, patientData.active, patientData.regDate], function (err) {
      if (err) {
        console.error(err);
      } else {
        res.json(patientData);
      }
    });


};

exports.getPatientByNameAndPn = (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  const quickPatientData = {
    firstName: req.params["firstName"],
    phoneNumber: req.params['pn']
  };


  db.all("SELECT * from Patient where firstName like ? or contactId = (select id from Contact where phoneNumber=?);",
    [`%${quickPatientData.firstName}%`, quickPatientData.phoneNumber], (err, row) => {
      if (err) {
        res.json(err).status(400);
      } else {
        res.json(row);
      }
    })
};

exports.getPatientByIdPartial = (req, res) => {
  const permission = getGrants.can(req.user.role).readAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  db.get("Select * from patient where id = ?", req.params["patientId"], (err, row) => {
    if (err) {
      res.json(err).status(400);
    } else {
      res.json(row);
    }
  })
};

exports.getPatientByIdFull = async (req, res) => {

  const permission = getGrants.can(req.user.role).readAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  // get patient
  db.get("SELECT p.*,c.email as ce,c.phoneNumber as cp,c.alternatePhoneNumber as cap,e.*,a.* from Patient p\n" +
    "INNER JOIN Address a on p.addressId = a.id\n" +
    "INNER join Contact c  on p.contactId = c.id \n" +
    "INNER join EmergencyContact e on p.emergencyInfoId = e.id where p.id = ?;",
    [req.params["patientId"]], (err, row) => {
      if (err) {
        console.log(err)
      } else {
        if (row === undefined) {
          return res.status(404).json("resource doesn't exist")
        } else {
          const result = {
            "id": row.id,
            "patientTitleId": row.patientTitleId,
            "firstName": row.firstName,
            "middleName": row.middleName,
            "lastName": row.lastName,
            "gender": row.gender,
            "dateOfBirth": row.dateOfBirth,
            "age": row.age,
            "nationality": row.nationality,
            "active": row.active,
            "regDate": row.regDate,
            "contact": {
              "id": row.contactId,
              "email": row.ce,
              "phoneNumber": row.cp,
              "alternatePhoneNumber": row.cap,
            },
            "address": {
              "id": row.addressId,
              "line1": row.line1,
              "line2": row.line2,
              "city": row.city,
              "country": row.country
            },
            "emergencyInfo": {
              "id": row.emergencyInfoId,
              "emergencyTitleId": row.emergencyTitleId,
              "name": row.name,
              "phoneNumber": row.phoneNumber,
              "alternatePhoneNumber": row.alternatePhoneNumber,
            },
          };

          return res.json(result);
        }
      }
    })
};

exports.getAllPatients = async (req, res) => {
  const permission = getGrants.can(req.user.role).readAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  await db.all("SELECT * from Patient ORDER by regDate DESC", function (err, rows) {
    return res.json(rows);
  });
};


exports.updatePatientById = async (req, res) => {

  const permission = getGrants.can(req.user.role).updateAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

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
    active: 0,
    id: req.params['patientId']
  };

  //update contact
  db.run("update contact set email=?,phoneNumber=?,alternatePhoneNumber=? where id=?",
    [updatePatientData.contact.email, updatePatientData.contact.phoneNumber,
      updatePatientData.contact.alternatePhoneNumber, updatePatientData.contact.id], (err) => {
      if (err) {
        console.log(err);
      }
    });

  //update address
  db.run("update address set line1=?,line2=?,city=?,country=? where id=?",
    [updatePatientData.address.line1, updatePatientData.address.line2,
      updatePatientData.address.city, updatePatientData.address.country, updatePatientData.address.id], function (err) {
      if (err) {
        console.log(err);
      }
    });

  // update contact-info
  db.run("update EmergencyContact set emergencyTitleId=?,name=?,phoneNumber=?,alternatePhoneNumber=? where id=?",
    [updatePatientData.emergencyInfo.emergencyTitleId, updatePatientData.emergencyInfo.name,
      updatePatientData.emergencyInfo.phoneNumber, updatePatientData.emergencyInfo.alternatePhoneNumber, updatePatientData.emergencyInfo.id], function (err) {
      if (err) {
        console.log(err);
      }
    });


  //update patient
  await db.run("update Patient set patientTitleId=?,firstName=?,middleName=?,lastName=?," +
    "gender=?,dateOfBirth=?,nationality=?,age=?,active=? where id = ?",
    [updatePatientData.patientTitleId, updatePatientData.firstName, updatePatientData.middleName,
      updatePatientData.lastName, updatePatientData.gender, updatePatientData.dateOfBirth, updatePatientData.nationality,
      updatePatientData.age, updatePatientData.active, updatePatientData.id], function (err) {
      if (err) {
        console.log(err);
        return res.json(err).status(401);
      } else {
        return res.json(this.changes);
      }
    });


};

exports.deleteByPatientId = async (req, res) => {

  const permission = getGrants.can(req.user.role).deleteAny("patient");
  if (!permission.granted) {
    return res.status(403).json("Access forbidden " + req.user.role);
  }

  db.run("DELETE from address WHERE id= ?", req.params['addressId'], (err) => {
    if (err) console.log(err);
  });
  db.run("DELETE from contact WHERE id= ?", req.params['contactId'], (err) => {
    if (err) console.log(err);
  });
  db.run("DELETE from EmergencyContact WHERE id= ?", req.params['emergencyInfoId'], (err) => {
    if (err) console.log(err);
  });

  await db.run("DELETE from patient WHERE id= ?", req.params['patientId'], function (err) {
    if (err) {
      res.json(err).status(404);
    } else {
      res.json(this.changes);
    }
  });

};


exports.getContactById = async (req, res) => {
  await db.get("Select * from Contact where id = ?", req.params["contactId"], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.json(row);
    }
  });

};

exports.getAddressById = async (req, res) => {
  await db.get("select * from address WHERE id = ?", req.params['addressId'], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.json(row);
    }
  })
};

exports.getEmergencyInfoById = async (req, res) => {
  await db.get("select * from EmergencyContact WHERE id = ?", req.params['emergencyInfoId'], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
      res.json(row);
    }
  })
};
