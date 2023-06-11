const dbConfig = require('../config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.project = require('./project.model.js')(sequelize, DataTypes)
db.user = require('./user.model.js')(sequelize, DataTypes)
db.role = require('./role.model.js')(sequelize, DataTypes)
db.userRole = require('./userRole.model.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

db.user.belongsToMany(db.role, { through: 'UserRole'})
db.role.belongsToMany(db.user, { through: 'UserRole'})

module.exports = db