const { Router } = require('express');
const UsersController = require('../app/controllers/http/api/UsersController');
const AuthController = require('../app/controllers/http/api/AuthController');

const routes = Router();
routes.post('/users', UsersController.store);
routes.post('/auth', AuthController.store);
module.exports = routes;
