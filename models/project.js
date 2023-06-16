
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    total_amount: DataTypes.FLOAT,
    rest_amount: DataTypes.FLOAT,
    current_amount: DataTypes.FLOAT,
  }, {});

  Project.associate = function(models) {
    Project.belongsTo(models.User, {foreignKey: 'user_id'})
  };

  return Project;
};