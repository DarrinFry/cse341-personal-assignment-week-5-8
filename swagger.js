//used in previous assignments. 

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Darrin Fry Personal Assignment API Week 5-8',
    description: 'Custom Projects API',
  },
  host: 'd-fry-cse341-personal.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); 
});
