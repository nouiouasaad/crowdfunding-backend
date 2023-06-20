
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    User.belongsTo(models.Role, {foreignKey: 'role_id'}, { onDelete: 'CASCADE' })
    User.belongsTo(models.UserProfile, {foreignKey: 'id'})
    User.hasMany(models.Project, {foreignKey: 'user_id'})
  };

  return User;
};