const compression = require('compression');
const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const migrationManager = require('./backend/utitlity/migrationManager');
const stateManager = require("./backend/utitlity/stateManager");
const swaggerConfig = require('./backend/utitlity/swaggerConfiguration.js');
const tokenVerifier = require('./backend/utitlity/verifyToken');
const app = express();

// route to access api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerSpec));


app.use(compression());
app.use(express.json());
app.use(cors());

// // ---------For angular only-------
// app.use(express.static(__dirname + '/dist/bookingsystem'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/bookingsystem'));
// });


// check if the app's table schema is created
// if not create
if (stateManager.createTables()) {
  //create tables
  console.log("No state found Need to create tables");
  migrationManager.doMigration();
  stateManager.createFile();
}

// api that doesn't need authentication
app.use('/account', require('./backend/route/accountRoute'));

// all apis below this => require user authentication
app.use(tokenVerifier);

// apis that require user authentication
app.use('/accountManager', require('./backend/route/accountManagerRoute'));
app.use('/appointment', require('./backend/route/appointment/appointmetsRoute'));
app.use('/doctor', require('./backend/route/doctorRoute'));
app.use('/patient', require('./backend/route/patient/patientRoute'));
app.use('/appointmentType', require('./backend/route/appointment/appointmentTypeRoute'));
app.use('/appointmentStatus', require('./backend/route/appointment/appointmentStatusRoute'));
app.use('/emergencyTitle', require('./backend/route/emerergencyTitleRoute'));
app.use('/patientTitle', require('./backend/route/patient/patientTitleRoute'));
app.use('/duration', require('./backend/route/durationRoute'));
app.use('/scheduleBlocking', require('./backend/route/scheduleBlockingRoute'));


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


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
