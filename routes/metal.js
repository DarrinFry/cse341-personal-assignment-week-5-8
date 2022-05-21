const routes = require('express').Router();

const metalsController = require('../controllers/metal_data');

routes.get('/', metalsController.getAll);

routes.get('/:id', metalsController.getSingle);

//routes.post('/', metalsController.postNewMetal); //ALL METALS ARE ADDED. UPDATE ONLY

routes.put('/:id', metalsController.putUpdateMetal);

//routes.delete('/:id', metalsController.deleteMetal); //MAKE IT SO YOU CAN'T DELETE

module.exports = routes;
