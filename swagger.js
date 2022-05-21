//Pulled from npmjs.com/package/swagger-autogen

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Darrin Fry Contacts Assignment API',
    description: 'Contacts API',
  },
  host: 'd-fry-cse341-api.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

//swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); // Your project's root file
});
