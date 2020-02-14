const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors);
const migrationManager = require('./utitlity/migrationManager');
const stateManager = require("./utitlity/stateManager");

if (stateManager.createTables()) {
  //create tables
  console.log("Need to create tables");
  migrationManager.doMigrationThenSeeding();
  stateManager.createFile();
}


// In case there comes a need to migrate data without file use
// don't run this if there are already table or don't know what you are doing
app.get("/doManualMigration/OrbitHealth", () => {
  migrationManager.doMigrationThenSeeding();
  stateManager.createFile();
});


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Appointment API Routes
app.use('/appointment', require('./route/appointmetsRoute'));
app.use('/doctor', require('./route/doctorRoute'));
app.use('/patient', require('./route/patientRoute'));


//check if we need to create
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
