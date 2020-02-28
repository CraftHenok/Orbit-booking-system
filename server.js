const compression = require('compression');
const express = require('express');
const path = require('path');
const cors = require('cors');
const migrationManager = require('./backend/utitlity/migrationManager');
const stateManager = require("./backend/utitlity/stateManager");

const app = express();
app.use(compression());
app.use(express.json());
app.use(cors());

// ---------For angular only-------
// app.use(express.static(__dirname + '/dist/bookingsystem'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/bookingsystem'));
// });


//---------For node api--------
// migration and seeding
if (stateManager.createTables()) {
  //create tables
  console.log("Need to create tables");
  migrationManager.doMigrationThenSeeding();
  stateManager.createFile();
}


// apis
app.use('/appointment', require('./backend/route/appointmetsRoute'));
app.use('/doctor', require('./backend/route/doctorRoute'));
app.use('/patient', require('./backend/route/patientRoute'));


// In case there comes a need to migrate data without file use
// don't run this if there are already table or don't know what you are doing
app.get("/doManualMigration/OrbitHealth", () => {
  migrationManager.doMigrationThenSeeding();
  stateManager.createFile();
});


//check if we need to create
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
