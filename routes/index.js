const routes = require('express').Router();

// routes.get('/', (req, res) => {
//     res.send('Someone I know A.K.A. Darrin Fry (That was an attempt at some dad humor.)')
// });

routes.use('/', require('./swagger'));
routes.use('/customer', require('./customer'));

module.exports = routes;
