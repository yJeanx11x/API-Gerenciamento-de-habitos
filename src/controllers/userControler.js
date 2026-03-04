const validacao = require('../schemas/validacaoShemas')
const db = require('../models/userModels')



async function criarUsuario(req, res, next) {
    const z = validacao.safeParse(req.body)

    try {
        if (!z.success) {
            return res.status(400).json({ message: 'Erro na criação de usuário' })
        }
        db.create({
            nome: z.data.nome,
            email: z.data.email,
            password: z.data.password
        })


        return res.status(201).json({ message: 'Usuário criado!' })

    } catch (error) {
        next(error)
    }

}

module.exports = { criarUsuario }