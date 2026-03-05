const z = require('zod')

const validacao = z.object({
    nome: z.string().min(3, 'Mínimo De 3 caracteres'),
    email: z.email(),
    password: z.string().min(6, 'Mínimo De 6 caracteres'),
    habitos: z.string().min(3, 'Mínimo De 3 caracteres')
})

module.exports = validacao