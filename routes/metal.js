const routes = require('express').Router();

const metalsController = require('../controllers/metal_data');

routes.get('/', metalsController.getAll);

routes.get('/:id', metalsController.getSingle);

routes.post('/', metalsController.postNewMetal);

routes.put('/:id', metalsController.putUpdateMetal);

routes.delete('/:id', metalsController.deleteMetal);

module.exports = routes;
