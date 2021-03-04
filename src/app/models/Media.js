const { Model, Sequelize } = require('sequelize');

class Media extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.HOST}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );
    return this;
  }
}
module.exports = Media;
