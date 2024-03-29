const { Model, Sequelize } = require('sequelize');

class Plantation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        objective_humidity: Sequelize.FLOAT,
        flow_rate: Sequelize.FLOAT,
        field_description: Sequelize.STRING,
        user_id: Sequelize.STRING,
        solo_type_coeficient: Sequelize.ENUM(['1', '2', '3', '4', '5', '6']),
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Media, {
      foreignKey: 'media_id',
      as: 'logo',
    });
  }
}
module.exports = Plantation;
