
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles',
      [
        {
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Creator',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
