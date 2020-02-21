const sqlite3 = require('sqlite3').verbose();
const tablesCollection = require("./tablesDefinition");

const db = new sqlite3.Database('demo.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the demo.db');
});


exports.doMigrationThenSeeding = () => {

  db.serialize(function () {

    db.run(tablesCollection.appointmentTable);
    console.log("appointment table created");

    db.run(tablesCollection.appointmentType);
    console.log("appointmentType table created");

    db.run(tablesCollection.appointmentStatus);
    console.log("appointmentStatus table created");

    db.run(tablesCollection.patient);
    console.log("patient table created");

    db.run(tablesCollection.patientTitle);
    console.log("patientTitle table created");

    db.run(tablesCollection.contact);
    console.log("contact table created");

    db.run(tablesCollection.address);
    console.log("address table created");

    db.run(tablesCollection.emergencyContact);
    console.log("emergencyContact table created");

    db.run(tablesCollection.emergencyTitle);
    console.log("emergencyTitle table created");

    db.run(tablesCollection.doctor);
    console.log("doctor table created");

  });

  console.log("all tables are created");
  console.log("Seeding started");
  // Start seeding data once all tables are created
  doSeeding();

};

const doSeeding = () => {

  db.serialize(function () {
    //Seed appointment type
    db.run("INSERT into GeneralType(type)\n" +
      "VALUES (?),(?),(?),(?),(?)", ["type 1", "type 2", "type 3", "type 4", "type 5"], (err) => {
      if (err) {
        console.log(err);
      }
    });

    //Seed appointment status
    db.run("INSERT into GeneralStatus(status)\n" +
      "VALUES (?),(?),(?),(?),(?)", ["status 1", "status 2", "status 3", "status 4", "status 5"], (err) => {
      if (err) {
        console.log(err);
      }
    });

    //Seed patient title
    db.run("INSERT into PatientTitle(title)\n" +
      "VALUES (?),(?),(?),(?),(?)", ["patient title 1", "patient title 2", "patient title 3", "patient title 4", "patient title 5"], (err) => {
      if (err) {
        console.log(err);
      }
    });

    //Seed emergency title
    db.run("INSERT into EmergencyTitle(title)\n" +
      "VALUES (?),(?),(?),(?),(?)", ["emergency title 1", "emergency title 2", "emergency title 3", "emergency title 4", "emergency title 5"], (err) => {
      if (err) {
        console.log(err);
      }
    });

  });

  db.close();
};

