const db = require('../config/dataBase')

const User = db.Sequelize.define('Usuarios', {
    nome: {
        type: db.sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: db.sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: db.sequelize.STRING,
        allowNull: false,
    }
})

User.sync({ force: false });

module.exports =  User 