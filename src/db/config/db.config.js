const {Sequelize} = require('sequelize')

// appuser
// apppass

const pgconnection = 'postgres://postgres:postgres@localhost/test'

const sequelize = new Sequelize(pgconnection,{
    dialect:"postgres",
    logging:false
})


module.exports = { sequelize }