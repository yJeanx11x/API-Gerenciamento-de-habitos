require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const route = require('../routes/routes')
app.use(route)



const erroglobal = require('../middlewares/erroglobal')
app.use(erroglobal);
app.listen(process.env.PORT, () => console.log('Servidor rodando com sucesso!'))
