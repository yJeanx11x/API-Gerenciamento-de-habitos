📘 README — API de Gerenciamento de Hábitos
📌 Descrição

API REST desenvolvida com Node.js e Express para gerenciamento de hábitos pessoais, com autenticação baseada em JWT. O sistema permite cadastro e login de usuários, criação e controle de hábitos individuais, além de proteção de rotas com middleware de autenticação.

O projeto segue boas práticas de arquitetura MVC, validação de dados com Zod, tratamento global de erros e organização modular do código.

🚀 Tecnologias Utilizadas

Node.js

Express

Sequelize

MySQL

Zod

bcrypt

jsonwebtoken

dotenv

🔐 Funcionalidades
👤 Usuário

Cadastro de usuário

Login com geração de token JWT

Senha criptografada com bcrypt

📊 Hábitos

Criar hábito

Listar hábitos do usuário autenticado

Atualizar hábito

Deletar hábito

Controle de acesso por usuário

🛡️ Segurança

Hash de senha

Autenticação via JWT

Middleware de proteção de rotas

Validação de dados com Zod

Tratamento global de erros

🗂️ Estrutura do Projeto
src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── schemas/
 ├── app.js
 └── server.js
⚙️ Como executar o projeto

Clonar o repositório

Instalar dependências

npm install

Criar arquivo .env

JWT_SECRET=sua_chave_secreta
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha

Rodar o projeto

npm run dev

Servidor rodando em:

http://localhost:3333
📌 Autor

Desenvolvido como projeto de portfólio para Backend Júnior.