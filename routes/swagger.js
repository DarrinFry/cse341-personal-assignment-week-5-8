//This was learned from the team activity. The code has been transfered from team to personal assignement
//Used from previous assignements

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

router.use('/api-docs', requiresAuth(), swaggerUi.serve);
router.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDocument));

module.exports = router;
