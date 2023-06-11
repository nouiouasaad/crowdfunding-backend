module.exports = (sequelize, DataTypes) => {

    const Project = sequelize.define("project", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        from_date: {
            type: DataTypes.DATE
        },
        to_date: {
            type: DataTypes.DATE
        },
        total_amount: {
            type: DataTypes.FLOAT
        }
    })

    return Project

}