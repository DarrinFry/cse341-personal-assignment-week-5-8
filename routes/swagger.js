//This was learned from the team activity. The code has been transfered from team to personal assignement
//Used from previous assignements

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
<<<<<<< HEAD

=======
>>>>>>> parent of d68e0c2 (Attempts to implement Auth0 api-docs)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
