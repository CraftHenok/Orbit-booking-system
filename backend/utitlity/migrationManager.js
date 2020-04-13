const sqlite3 = require('sqlite3').verbose();
const tablesCollection = require("./tablesDefinition");

const db = new sqlite3.Database('demo.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the demo.db');
});


exports.doMigration = () => {

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

    db.run(tablesCollection.duration);
    console.log("duration table created");

    db.run(tablesCollection.user);
    console.log("User table created");

    db.run(tablesCollection.scheduleBlocking);
    console.log("scheduleBlocking table created");

};

