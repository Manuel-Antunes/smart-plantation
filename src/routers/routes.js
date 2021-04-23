const { Router } = require('express');
const multer = require('multer');
const PlantationsController = require('../app/controllers/http/PlantationsController');
const UsersController = require('../app/controllers/http/UsersController');
const multerconfig = require('../config/multer');
const mediaToDatabase = require('../app/middlewares/mediaToDatabase');
const auth = require('../app/middlewares/auth');
const Cache = require('../lib/Cache');
const Plantation = require('../app/models/Plantation');
const AuthController = require('../app/controllers/http/AuthController');

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
routes.get('/tess/:id/:n', async (req, res) => {
  const plantation = await Plantation.findByPk(req.params.id);
  req.io
    .of('/plantation')
    .in(req.params.id)
    .emit('dados', req.params.n);
  if (plantation) {
    await Cache.set(`plantation:${req.params.id}:hresource`, {
      value: req.params.n,
    });
  }
  res.send('foi');
});
routes.get('/user', auth, (req, res) => {
  res.send('aksdaskl');
});
routes.post('/auth', AuthController.store);

module.exports = routes;
