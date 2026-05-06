# 👥 Cadastro de Usuários — Backend

API REST para cadastro, listagem, edição e remoção de usuários, desenvolvida com Node.js, Express e MongoDB.

---

## 🛠️ Tecnologias

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📁 Estrutura do projeto

```
cadastro-usuarios-back/
├── config/
│   └── database.js          → conexão com o MongoDB
├── controllers/
│   └── userController.js    → lógica das operações CRUD
├── models/
│   └── User.js              → schema e validações do usuário
├── routes/
│   └── userRoutes.js        → definição das rotas da API
├── .env                     → variáveis de ambiente (não vai pro Git)
├── .gitignore
├── package.json
└── server.js                → ponto de entrada da aplicação
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuito)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/joaoantoniosantos18/Cadastro-de-Usuarios-Back.git
cd Cadastro-de-Usuarios-Back
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
PORT=3000
MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.xxxxx.mongodb.net/cadastro-usuarios?retryWrites=true&w=majority
```

> Substitua `SEU_USUARIO` e `SUA_SENHA` pelas suas credenciais do MongoDB Atlas.

**4. Inicie o servidor**
```bash
npm run dev
```

Se tudo estiver certo, você verá:
```
🚀 Servidor em http://localhost:3000
✅ MongoDB conectado com sucesso!
```

---

## 📡 Endpoints da API

Base URL: `http://localhost:3000/api`

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/usuarios` | Cria um novo usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/:id` | Busca um usuário pelo ID |
| `PUT` | `/usuarios/:id` | Atualiza um usuário pelo ID |
| `DELETE` | `/usuarios/:id` | Remove um usuário pelo ID |

### Exemplo de body (POST e PUT)

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25,
  "telefone": "(11) 91234-5678"
}
```

### Exemplo de resposta de sucesso

```json
{
  "sucesso": true,
  "mensagem": "Usuário criado!",
  "dados": {
    "_id": "abc123...",
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 25,
    "telefone": "(11) 91234-5678",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## ✅ Validações

Todos os campos são obrigatórios. O Mongoose valida automaticamente:

| Campo | Tipo | Regras |
|-------|------|--------|
| `nome` | String | mínimo 2, máximo 100 caracteres |
| `email` | String | formato válido, único no banco |
| `idade` | Number | entre 1 e 120 |
| `telefone` | String | obrigatório |

---

## 🔗 Frontend

Este backend está integrado ao frontend desenvolvido em React + Bootstrap:

[Cadastro de Usuários — Frontend](https://github.com/joaoantoniosantos18/Cadastro-de-Usuarios-Front)