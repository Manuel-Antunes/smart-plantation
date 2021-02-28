const { Router } = require('express');
const PlantationsController = require('./app/controllers/PlantationsController');
const UsersController = require('./app/controllers/UsersController');

const routes = Router();

routes.post('/users', UsersController.store);
routes.post('/plantations', PlantationsController.store);

module.exports = routes;
