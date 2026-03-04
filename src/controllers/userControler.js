const validacao = require('../schemas/validacaoShemas')
const db = require('../models/userModels')
const bcrypt=require('bcrypt')




async function criarUsuario(req, res, next) {
    const z = validacao.safeParse(req.body)
    const passwordHash=await bcrypt.hash(z.data.password,12)
    
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

module.exports = { criarUsuario }