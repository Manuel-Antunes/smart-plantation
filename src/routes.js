const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  res.sendFile(`${__dirname}/app/views/index.html`);
});
routes.get('/plantation', (req, res) => {
  res.sendFile(`${__dirname}/app/views/plantation.html`);
});
routes.get('/hydricResources', (req, res) => {
  res.sendFile(`${__dirname}/app/views/hydricResources.html`);
});
routes.get('/test', (req, res) => {
  res.sendFile(`${__dirname}/app/views/test.html`);
});

module.exports = routes;
