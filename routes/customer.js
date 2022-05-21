const routes = require('express').Router();

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAll);

routes.get('/:id', contactsController.getSingle);

routes.post('/', contactsController.postNewContact);

routes.put('/:id', contactsController.putUpdateContact);

routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;
