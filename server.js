const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URI;

/*CONTECTING TO MONGO TEST. TEST CONFIRMED. KEEPING FOR FUTURE USE IF NEEDED

MongoClient.connect(uri, function (err, db) {
  if (err) throw err;
  var dbo = db.db(process.env.PARENT_FOLDER);
  dbo
    .collection(process.env.PROJECT_DETAILS)
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

*/

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, E-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
