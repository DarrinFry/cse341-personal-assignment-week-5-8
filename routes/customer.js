const routes = require('express').Router();

const customersController = require('../controllers/customer_data');

routes.get('/', customersController.getAll);

routes.get('/:id', customersController.getSingle);

routes.post('/', customersController.postNewCustomer);

routes.put('/:id', customersController.putUpdateCustomer);

routes.delete('/:id', customersController.deleteCustomer);

module.exports = routes;
