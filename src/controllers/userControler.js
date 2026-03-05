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
            password: passwordHash,
            habitos: z.data.habitos

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
            }, secret, { expiresIn: '1h' })
            if (!token) {
                return res.status(400).json({ message: 'token invalido' })
            }
            const userID = usuarioDoDB.id
            return res.status(200).json({ message: 'Login com sucesso', token, userID })
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }

}

async function habitsJwt(req, res, next) {
    try {
        const { id } = req.params
        const UserDb = await db.findOne({ where: { id }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } })
        if (!UserDb) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Usuário encontrado', user: UserDb })

    } catch (error) {
        next(error)
    }

}

async function atualizarHabitos(req, res, next) {
    const { id } = req.params
    const { habitos } = req.body

    try {
        const verificaUser = await db.findOne({ where: { id } })
        if (!verificaUser ) {
        return res.status(400).json({message:'Usuário não encontrado'})
        }

        verificaUser.update({
            habitos: habitos
        })
        return res.status(200).json({ message: 'Habistos atualizado !' })

    } catch (error) {
        next(error)
    }


}


module.exports = { criarUsuario, habitsLogin, habitsJwt, atualizarHabitos }