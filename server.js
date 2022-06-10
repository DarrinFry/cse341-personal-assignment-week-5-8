const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const port = process.env.PORT || 8080;
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URI;
const apiRoute = 'https://d-fry-cse341-personal.herokuapp.com/api-docs/';

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

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app
  .use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Exception: ${err}\n` + `Origin: ${origin}`);
});  

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

/*
These are the sources I have used to work on Authentication.
I have chosen the 3rd party AuthO app to simplify the process.

https://www.youtube.com/playlist?list=PLZ14qQz3cfJIGJ_7GBZgr96Sq2hDeRsYY

https://www.youtube.com/watch?v=w1zvS9-k7EU
https://www.youtube.com/watch?v=QQwo4E_B0y8
https://auth0.com/docs/quickstart/webapp/express/01-login
https://www.infoworld.com/article/3629129/how-to-use-auth0-with-nodejs-and-express.html

I will update this list of references as needed
*/


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.send(`API-Docs  ---- <button><a href='${apiRoute}'>API-DOCS</a></button>`);
});


app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/swagger', requiresAuth(), (req, res) => {
  //res.send(`Hello ${req.oidc.user.sub}, this is the API-Docs Page`);
  res.redirect(apiRoute);
});
app.get('/api-docs', requiresAuth(), (req, res) => {
  //res.send(`Hello ${req.oidc.user.sub}, this is the API-Docs Page`);
  res.redirect(apiRoute);
});

// app.use(
//   auth({
//     routes: {
//       Login: false,
//       postLogoutRedirect: '/api-docs',
//     },
//   })
// );

// app.get('/login', (req, res) => res.oidc.login({ returnTo: '/api-docs'}));

// app.get('/logout', (req, res) => res.send('Bye!'));


