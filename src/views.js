const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index');
});
routes.get('/plantation', (req, res) => {
  res.render('plantation');
});
routes.get('/hydricResources', (req, res) => {
  res.render('hydricResources');
});
routes.get('/test', (req, res) => {
  res.render('test');
});

module.exports = routes;
