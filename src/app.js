const express = require('express');
require('dotenv/config');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

// import './database';

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
  }

  routes() {
    this.server.use(routes);
  }
}
module.exports = new App().server;
