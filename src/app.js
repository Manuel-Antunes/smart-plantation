import 'dotenv/config';


const express = require('express');

const path = require('path');
const routes = require('./routes');
const cors = require('cors');

// import './database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }
    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")))
    }
    routes() {
        this.server.use(routes);
    }


}

export default new App().server;
