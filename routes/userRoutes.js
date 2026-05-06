const express = require('express')
const router = express.Router()

const {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
} = require('../controllers/userController')

// Sem ID — para a coleção inteira
router.route('/')
  .post(criarUsuario)    // POST   /api/usuarios
  .get(listarUsuarios)   // GET    /api/usuarios

// Com ID — para um usuário específico
router.route('/:id')
  .get(buscarUsuarioPorId)  // GET    /api/usuarios/:id
  .put(atualizarUsuario)    // PUT    /api/usuarios/:id
  .delete(deletarUsuario)   // DELETE /api/usuarios/:id

module.exports = router