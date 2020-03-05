const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Orbit booking system API Doc', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['server.js', './backend/route/*.js', './backend/route/appointment/*.js', './backend/route/patient/*.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
exports.swaggerSpec = swaggerJSDoc(options);
