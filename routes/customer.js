const routes = require('express').Router();

const customersController = require('../controllers/customer_data');
const validation = require('../middleware/validation-middleware');


routes.get('/', customersController.getAll);

routes.get('/:id', customersController.getSingle);

routes.post('/', validation.customerValidation, customersController.postNewCustomer);

routes.put('/:id', validation.customerValidation, customersController.putUpdateCustomer);

routes.delete('/:id', customersController.deleteCustomer);

module.exports = routes;

