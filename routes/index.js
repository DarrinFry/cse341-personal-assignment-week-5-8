const routes = require('express').Router();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


// routes.get('/', (req, res) => {
//     res.send('Someone I know A.K.A. Darrin Fry (That was an attempt at some dad humor.)')
// });


routes.use('/', requiresAuth(), require('./swagger'));
routes.use('/customer', require('./customer'));
routes.use('/metal', require('./metal'));

module.exports = routes;
