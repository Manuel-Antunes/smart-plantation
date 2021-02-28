const { Router } = require('express');
const multer = require('multer');
const PlantationsController = require('./app/controllers/http/PlantationsController');
const UsersController = require('./app/controllers/http/UsersController');
const multerconfig = require('./config/multer');

const routes = Router();

const upload = multer(multerconfig);
routes.post('/users', UsersController.store);
routes.post('/plantations', upload.single('file'), PlantationsController.store);

module.exports = routes;
