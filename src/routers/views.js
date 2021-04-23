const { Router } = require('express');
const auth = require('../app/middlewares/auth');
const PlantationsController = require('../app/controllers/http/PlantationsController');
const AuthController = require('../app/controllers/http/AuthController');

const routes = Router();

routes.get('/', (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/plantations');
  }
  return res.render('createUsers', {
    name: JSON.stringify({ oi: 'jey', nyhan: 'ajsd' }),
  });
});
routes.get('/login', (req, res) => {
  return res.render('createUsers');
});
routes.get('/logout', AuthController.destroy);
routes.get('/hydricResources', (req, res) => {
  return res.render('hydricResources');
});
routes.get('/test', (req, res) => {
  return res.render('test');
});
routes.get('/sign-up', (req, res) => {
  return res.render('createUser');
});
routes.get('/create-plantation', (req, res) => {
  return res.render('index');
});
routes.get('/plantations', auth, PlantationsController.index);
routes.get('/plantations/:id', auth, PlantationsController.show);

module.exports = routes;
