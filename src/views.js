const { Router } = require('express');
const Media = require('./app/models/Media');
const Plantation = require('./app/models/Plantation');
const auth = require('./app/middlewares/auth');

const routes = Router();

routes.get('/', (req, res) => {
  res.render('createUsers', {
    name: JSON.stringify({ oi: 'jey', nyhan: 'ajsd' }),
  });
});
routes.get('/plantation/:id', auth, (req, res) => {
  res.render('plantation');
});
routes.get('/hydricResources', (req, res) => {
  res.render('hydricResources');
});
routes.get('/test', (req, res) => {
  res.render('test');
});
routes.get('/create-plantation', (req, res) => {
  res.render('index');
});
routes.get('/plantations', auth, async (req, res) => {
  console.log(req.user);
  const plantations = await Plantation.findAll({
    include: [{ model: Media, as: 'logo' }],
  });
  const ps = plantations.map(p => {
    const plant = p.get();
    if (p.get('logo')) {
      plant.logo = p.get('logo').get();
    }
    return plant;
  });
  console.log(ps);
  res.render('plantations', {
    plantations: ps,
  });
});
module.exports = routes;
