const express = require('express');
require('dotenv/config');
const path = require('path');
const cors = require('cors');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cp = require('cookie-parser');
const io = require('socket.io');
const http = require('http');
const routes = require('./routes');
const views = require('./views');
const startSockets = require('./socket');
require('./database');

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.middlewares();
    this.routes();
    this.socket();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cp());
    this.app.use('/public', express.static(path.resolve(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.app.engine(
      '.hbs',
      handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: path.resolve(__dirname, 'app', 'views', 'layouts'),
        partialsDir: path.resolve(__dirname, 'app', 'views', 'partials'),
      })
    );
    this.app.set('views', path.resolve(__dirname, 'app', 'views'));
    this.app.set('view engine', '.hbs');
    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  routes() {
    this.app.use(routes);
    this.app.use(views);
  }

  socket() {
    this.io = io(this.server, {
      cors: {
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      },
    });
    this.io.on('connect', socket => {
      startSockets(socket);
      console.log('hello world');
    });
  }
}
module.exports = new App().server;
