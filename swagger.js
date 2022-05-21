//used in previous assignments. 

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Darrin Fry Personal Assignment API Week 5-8',
    description: 'Custom Projects API',
  },
  host: 'd-fry-cse341-personal.herokuapp.com',
  schemes: ['https'],
  "tags": [
    {
      "name": "Customer",
      "description": "Stuff for inputing and changing a customers project file"
    },
    {
      "name": "Metal",
      "description": "Stuff for handling the metal database: NOTE. METAL CANNOT BE DELETED OR ADDED. IT CAN ONLY BE EDITED BASED ON METAL MARKETS"
    }
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); 
});
