const express = require('express');
require('dotenv/config');
const path = require('path');
const cors = require('cors');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cp = require('cookie-parser');
const io = require('socket.io');
const http = require('http');
const session = require('express-session');
const flash = require('connect-flash');
const mosca = require('mosca');
const routes = require('./routers/routes');
const views = require('./routers/views');
const { defineNamespace, startSockets } = require('./routers/socket');
const { routePackets } = require('./routers/packeters');
require('./database');

class App {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app);
        this.middlewares();
        this.routes();
        this.socket();
        this.mqtt();
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
        this.app.use(
            session({
                secret: process.env.APP_KEY,
                resave: true,
                saveUninitialized: true,
            })
        );
        this.app.use(flash());
        this.app.use((req, res, next) => {
            res.locals.error_message = req.flash('error_message');
            res.locals.success_message = req.flash('success_message');
            next();
        });
    }

    routes() {
        this.app.use(routes);
        this.app.use(views);
    }

    mqtt() {
        this.mosca = new mosca.Server({
            http: this.app,
            schema: false,
            // eslint-disable-next-line radix
            port: parseInt(process.env.MQTT_PORT),
        });
        this.mosca.io = this.io;
        this.mosca.on('clientConnected', (p, c) => {
            console.log(c);
        });
        this.mosca.on('published', (p, c) => {
            routePackets(p, c, this.mosca);
        });
    }

    socket() {
        /**
         * @type {import('socket.io').Server}
         */
        this.io = io(this.server, {
            cors: {
                methods: ['GET', 'POST'],
                allowedHeaders: ['my-custom-header'],
                credentials: true,
            },
        });
        this.io.on('connect', socket => {
            startSockets(socket);
        });
        defineNamespace(this.io);
    }
}
module.exports = new App().server;