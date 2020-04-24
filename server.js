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


app.use(compression());
app.use(express.json());
app.use(cors());


const args = process.argv;
if (args.indexOf('apionly') === -1) {
  /**
   * This serves the pwa
   * when in development only the api is served
   * user (npm run be dev) or (npm run devbe dev)
   */
  console.log("-------------The front-end is served...-----------------");
  app.use(express.static(__dirname + '/dist/bookingsystem'));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/bookingsystem'));
  });
}


// check if the app's table schema is created
// if not create
if (stateManager.createTables()) {
  //create tables
  console.log("No state found Need to create tables");
  migrationManager.doMigration();
  stateManager.createFile();
}

// api that doesn't need authentication
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerSpec));
app.use('/account', require('./backend/route/loginAndRegistrationRoute'));

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
app.use('/reception', require('./backend/route/receptionRoute'));


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


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
