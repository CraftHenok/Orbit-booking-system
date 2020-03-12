const compression = require('compression');
const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const migrationManager = require('./backend/utitlity/migrationManager');
const stateManager = require("./backend/utitlity/stateManager");
const swaggerConfig = require('./backend/utitlity/swaggerConfiguration.js');
const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerSpec));


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
  console.log("No state found Need to create tables");
  migrationManager.doMigration();
  stateManager.createFile();
}


// apis
app.use('/appointment', require('./backend/route/appointment/appointmetsRoute'));
app.use('/doctor', require('./backend/route/doctorRoute'));
app.use('/patient', require('./backend/route/patient/patientRoute'));
app.use('/appointmentType', require('./backend/route/appointment/appointmentTypeRoute'));
app.use('/appointmentStatus', require('./backend/route/appointment/appointmentStatusRoute'));
app.use('/emergencyTitle', require('./backend/route/emerergencyTitleRoute'));
app.use('/patientTitle', require('./backend/route/patient/patientTitleRoute'));
app.use('/duration', require('./backend/route/durationRoute'));


// In case there comes a need to migrate data without file use
// don't run this if there are already table or don't know what you are doing
/**
 * @swagger
 * /doManualMigration/OrbitHealth:
 *  get:
 *    description: do manual migration = migration is to seed any initial data(at the start of tha app) the application handles this by default use this if special case
 *
 */
app.get("/doManualMigration/OrbitHealth", () => {
  migrationManager.doMigration();
  stateManager.createFile();
});


//check if we need to create
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
