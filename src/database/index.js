const Sequelize = require('sequelize');
const Plantation = require('../app/models/Plantation');
const User = require('../app/models/User');
const databaseConfig = require('../config/database');

const models = [User, Plantation];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
