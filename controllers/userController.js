const Usuario = require('../models/User')

// CRIAR
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, idade, telefone } = req.body
    const novoUsuario = new Usuario({ nome, email, idade, telefone })
    const salvo = await novoUsuario.save()
    res.status(201).json({ sucesso: true, mensagem: 'Usuário criado!', dados: salvo })
  } catch (erro) {
    if (erro.code === 11000)
      return res.status(400).json({ sucesso: false, mensagem: 'E-mail já cadastrado' })
    if (erro.name === 'ValidationError') {
      const msgs = Object.values(erro.errors).map(e => e.message)
      return res.status(400).json({ sucesso: false, erros: msgs })
    }
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
}

// LISTAR TODOS
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}).select('-__v')
    res.status(200).json({ sucesso: true, total: usuarios.length, dados: usuarios })
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
}

// BUSCAR POR ID
const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-__v')
    if (!usuario)
      return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' })
    res.status(200).json({ sucesso: true, dados: usuario })
  } catch (erro) {
    if (erro.name === 'CastError')
      return res.status(400).json({ sucesso: false, mensagem: 'ID inválido' })
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
}

// ATUALIZAR
const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, idade, telefone } = req.body
    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, idade, telefone },
      { new: true, runValidators: true }
    ).select('-__v')
    if (!atualizado)
      return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' })
    res.status(200).json({ sucesso: true, mensagem: 'Atualizado!', dados: atualizado })
  } catch (erro) {
    if (erro.code === 11000)
      return res.status(400).json({ sucesso: false, mensagem: 'E-mail já em uso' })
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
}

// DELETAR
const deletarUsuario = async (req, res) => {
  try {
    const deletado = await Usuario.findByIdAndDelete(req.params.id)
    if (!deletado)
      return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' })
    res.status(200).json({ sucesso: true, mensagem: 'Deletado!' })
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message })
  }
}

module.exports = { criarUsuario, listarUsuarios, buscarUsuarioPorId, atualizarUsuario, deletarUsuario }