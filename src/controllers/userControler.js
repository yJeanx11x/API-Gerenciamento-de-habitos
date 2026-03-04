require('dotenv').config
const validacao = require('../schemas/validacaoShemas')
const db = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




async function criarUsuario(req, res, next) {
    const z = validacao.safeParse(req.body)
    const passwordHash = await bcrypt.hash(z.data.password, 12)

    try {
        if (!z.success) {
            return res.status(400).json({ message: 'Erro na criação de usuário' })
        }
        db.create({
            nome: z.data.nome,
            email: z.data.email,
            password: passwordHash
        })
        return res.status(201).json({ message: 'Usuário criado!' })

    } catch (error) {
        next(error)
    }

}

async function habitsLogin(req, res, next) {
    const { email, password } = req.body
    try {
        if (!email) {
            return res.status(400).json({ message: "Email invalido" })
        }
        if (!password) {
            return res.status(400).json({ message: "Senha invalido" })
        }
        const usuarioDoDB = await db.findOne({ where: { email } })
        if (!usuarioDoDB) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        // comparando a senha
        const SenhaUsuario = await bcrypt.compare(password, usuarioDoDB.password)
        if (!SenhaUsuario) {
            return res.status(404).json({ message: 'Senha incorreta' })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: usuarioDoDB._id
            }, secret)
            const userID = usuarioDoDB.id
            return res.status(200).json({ message: 'Login com sucesso', token, userID })
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }

}

module.exports = { criarUsuario, habitsLogin }