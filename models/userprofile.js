
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING,
    facebook_link: DataTypes.STRING,
    linkedIn_link: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});

  UserProfile.associate = function(models) {
  };

  return UserProfile;
};