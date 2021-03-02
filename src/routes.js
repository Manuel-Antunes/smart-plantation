const { Router } = require('express');
const multer = require('multer');
const PlantationsController = require('./app/controllers/http/PlantationsController');
const UsersController = require('./app/controllers/http/UsersController');
const multerconfig = require('./config/multer');
const mediaToDatabase = require('./app/middlewares/mediaToDatabase');
const auth = require('./app/middlewares/auth');

const routes = Router();

const upload = multer(multerconfig);
routes.post(
  '/users',
  upload.single('file'),
  mediaToDatabase,
  UsersController.store
);
routes.post(
  '/plantations',
  auth,
  upload.single('file'),
  mediaToDatabase,
  PlantationsController.store
);
routes.get('/tess/:n', (req, res) => {
  req.io.sockets.emit('dados', req.params.n);
  res.send('foi');
});

module.exports = routes;
