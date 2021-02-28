const { Router } = require('express');
const Plantation = require('./app/models/Plantation');

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { name: JSON.stringify({ oi: 'jey', nyhan: 'ajsd' }) });
});
routes.get('/plantation/:id', (req, res) => {
  console.log(req.body);
  res.render('plantation');
});
routes.get('/hydricResources', (req, res) => {
  res.render('hydricResources');
});
routes.get('/test', (req, res) => {
  res.render('test');
});
routes.get('/plantations', async (req, res) => {
  Plantation.findAll({ include: [{ association: 'logo' }] }).then(
    plantations => {
      res.render('plantations', {
        plantations,
      });
    }
  );
});

module.exports = routes;
