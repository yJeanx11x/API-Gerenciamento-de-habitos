require('dotenv').config()
const jwt = require('jsonwebtoken')


async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Acesso Negado" })
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch (error) {
        return res.status(401).json({ message: "Acesso inválido!" })

    }
}

module.exports = { verifyToken }