const routes = require('express').Router();

const metalsController = require('../controllers/metal_data');
const validation = require('../middleware/validation-middleware');


routes.get('/', metalsController.getAll);

routes.get('/:id', metalsController.getSingle);

//routes.post('/', metalsController.postNewMetal); //ALL METALS ARE ADDED. UPDATE ONLY

routes.put('/:id', validation.metalValidation, metalsController.putUpdateMetal);

//routes.delete('/:id', metalsController.deleteMetal); //MAKE IT SO YOU CAN'T DELETE

module.exports = routes;
