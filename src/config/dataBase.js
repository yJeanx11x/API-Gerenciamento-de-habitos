require('dotenv').config();
const sequelize = require('sequelize');

const Sequelize = new sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {

    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

try {
    Sequelize.authenticate()
    console.log('Database conectada')

} catch (error) {
    console.log(error)
}



module.exports ={
    sequelize:sequelize,
    Sequelize:Sequelize
}