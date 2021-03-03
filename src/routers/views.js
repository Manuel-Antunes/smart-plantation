const { Router } = require('express');
const auth = require('../app/middlewares/auth');
const PlantationsController = require('../app/controllers/http/PlantationsController');
const AuthController = require('../app/controllers/http/AuthController');

const routes = Router();

routes.get('/', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/plantations');
  }
  res.render('createUsers', {
    name: JSON.stringify({ oi: 'jey', nyhan: 'ajsd' }),
  });
});
routes.get('/login', (req, res) => {
  res.render('createUsers');
});
routes.get('/logout', AuthController.destroy);
routes.get('/plantation/:id', auth, PlantationsController.show);
routes.get('/hydricResources', (req, res) => {
  res.render('hydricResources');
});
routes.get('/test', (req, res) => {
  res.render('test');
});
routes.get('/sign-up', (req, res) => {
  res.render('createUser');
});
routes.get('/create-plantation', (req, res) => {
  res.render('index');
});
routes.get('/plantations', auth, PlantationsController.index);
module.exports = routes;
