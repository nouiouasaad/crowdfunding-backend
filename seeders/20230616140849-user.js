const models = require('../models');
const Role = models.Role;
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {

    let role = await Role.findOne({where: {name: 'admin'}});

    return queryInterface.bulkInsert('Users',
      [
        {
          user_name: 'Admin',
          first_name: 'Admin',
          last_name: 'Admin',
          email: 'admin@admin.com',
          password: bcrypt.hashSync('admin1234', 8),
          role_id: role.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
