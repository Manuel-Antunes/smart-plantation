module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('plantations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      objective_humidity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      flow_rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      field_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      solo_type_coeficient: {
        type: Sequelize.ENUM(['1', '2', '3', '4', '5', '6']),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable('plantations');
  },
};
