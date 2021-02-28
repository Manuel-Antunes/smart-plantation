const express = require('express');
require('dotenv/config');
const path = require('path');
const cors = require('cors');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const views = require('./views');

require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/public',
      express.static(path.resolve(__dirname, 'public'))
    );
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.engine(
      '.hbs',
      handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: path.resolve(__dirname, 'app', 'views', 'layouts'),
        partialsDir: path.resolve(__dirname, 'app', 'views', 'partials'),
      })
    );
    this.server.set('views', path.resolve(__dirname, 'app', 'views'));
    this.server.set('view engine', '.hbs');
  }

  routes() {
    this.server.use(routes);
    this.server.use(views);
  }
}
module.exports = new App().server;
