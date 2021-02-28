module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('plantations', 'media_id', Sequelize.STRING, {
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async queryInterface => {
    queryInterface.removeColumn('plantations');
  },
};
