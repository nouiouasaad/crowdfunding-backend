
module.exports = (sequelize, DataTypes) => {
  const Contrubution = sequelize.define('Contrubution', {
    project_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    contrubution: DataTypes.FLOAT,
    name_on_card: DataTypes.STRING,
    exp_date: DataTypes.DATE,
    card_number: DataTypes.STRING,
    security_number: DataTypes.STRING,
  }, {});

  Contrubution.associate = function(models) {
    Contrubution.belongsTo(models.Project, {foreignKey: 'project_id'})
  };

  return Contrubution;
};