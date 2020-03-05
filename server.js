const compression = require('compression');
const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const migrationManager = require('./backend/utitlity/migrationManager');
const stateManager = require("./backend/utitlity/stateManager");

const app = express();

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Orbit booking system API Doc', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['server.js', './backend/route/*.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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
/**
 * @swagger
 * /doManualMigration/OrbitHealth:
 *  get:
 *    description: do manual migration = migration is to seed any initial data(at the start of tha app) the application handles this by default use this if special case
 *
 */
app.get("/doManualMigration/OrbitHealth", () => {
  migrationManager.doMigrationThenSeeding();
  stateManager.createFile();
});


//check if we need to create
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
