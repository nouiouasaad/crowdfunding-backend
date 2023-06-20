
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    total_amount: DataTypes.FLOAT,
    rest_amount: DataTypes.FLOAT,
    current_amount: DataTypes.FLOAT,
  }, {});

  Project.associate = function(models) {
    Project.belongsTo(models.User, {foreignKey: 'user_id'}, { onDelete: 'CASCADE' })
    Project.belongsTo(models.Category, {foreignKey: 'category_id'}, { onDelete: 'CASCADE' })
    Project.hasMany(models.Contrubution, {foreignKey: 'project_id'})
  };

  return Project;
};