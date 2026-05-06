// SEMPRE A PRIMEIRA LINHA
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const conectarBancoDeDados = require('./config/database')
const userRoutes = require('./routes/userRoutes')

// Conecta ao banco
conectarBancoDeDados()

// Cria o app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
app.use('/api/usuarios', userRoutes)

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: '🚀 API funcionando!' })
})

// Rota 404
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' })
})

// Inicia o servidor
const PORTA = process.env.PORT || 3000
app.listen(PORTA, () => {
  console.log(`🚀 Servidor em http://localhost:${PORTA}`)
})