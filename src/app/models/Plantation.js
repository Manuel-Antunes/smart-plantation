import { Model, Sequelize } from 'sequelize';

class Plantation extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.STRING, primaryKey: true },
        name: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        objective_humidity: Sequelize.FLOAT,
        flow_rate: Sequelize.FLOAT,
        field_description: Sequelize.STRING,
        solo_type_coeficient: Sequelize.ENUM(['1', '2', '3', '4', '5', '6']),
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
  }
}
module.exports = Plantation;
