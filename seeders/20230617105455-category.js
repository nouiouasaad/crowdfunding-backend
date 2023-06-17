module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories',
      [
        {
          name: 'Medical',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Emergency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Education',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Nonprofit',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};