const app = require('./app');

console.log(process.env.PORT);
app.listen(3333, () => {
  console.log('roda roda roda');
});
