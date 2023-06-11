module.exports = (sequelize, DataTypes) => {

    const UserRole = sequelize.define("user_role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    })

    return UserRole

}