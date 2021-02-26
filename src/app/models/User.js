import { Model, Sequelize } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.STRING, primaryKey: true },
        name: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Plantation, {
      foreignKey: 'user_id',
      as: 'plantations',
    });
  }
}
module.exports = User;
