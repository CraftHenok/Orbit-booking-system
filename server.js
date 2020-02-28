const express = require('express');
const app = express();
const cors = require('cors');
// const migrationManager = require('./backend/utitlity/migrationManager');
// const stateManager = require("./backend/utitlity/stateManager");
const compression = require('compression');


//compress what you serve
app.use(compression());


// Body Parser Middleware
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// cors
app.use(cors());


// if (stateManager.createTables()) {
//   //create tables
//   console.log("Need to create tables");
//   migrationManager.doMigrationThenSeeding();
//   stateManager.createFile();
// }


// In case there comes a need to migrate data without file use
// don't run this if there are already table or don't know what you are doing
// app.get("/doManualMigration/OrbitHealth", () => {
//   migrationManager.doMigrationThenSeeding();
//   stateManager.createFile();
// });

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/bookingsystem'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/bookingsystem/index.html'));
});

// available api routes
// app.use('/appointment', require('./backend/route/appointmetsRoute'));
// app.use('/doctor', require('./backend/route/doctorRoute'));
// app.use('/patient', require('./backend/route/patientRoute'));


//check if we need to create
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
