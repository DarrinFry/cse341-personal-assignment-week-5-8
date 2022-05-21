const routes = require('express').Router();

const contactsController = require('../controllers/customer_data');

routes.get('/', contactsController.getAll);

routes.get('/:id', contactsController.getSingle);

routes.post('/', contactsController.postNewCustomer);

routes.put('/:id', contactsController.putUpdateCustomer);

routes.delete('/:id', contactsController.deleteCustomer);

module.exports = routes;
