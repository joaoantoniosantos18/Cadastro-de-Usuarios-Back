const Usuario = require(/models/User)

const criarUsuario = async (req, res) => {
    try {
        const {nome, email, idade, telefone} = req.body
        const novoUsuario = new Usuario({nome, email, idade, telefone})
        const salvo = await novoUsuario.save()
        res.status(201).json({ sucesso: true, mensagem: 'Usuário criado!', dados: salvo })   
    } catch (error) {
        if (error.code === 11000) //valor que o mongoDB lança quando tenta criar com um valor duplicado em um campo unique
            return res.status(400).json({ sucesso: false, mensagem: 'E-mail já cadastrado' }); // quando os dados não passam nas regras do schema
        if (erro.name === 'ValidationError') {
            const msgs = Object.values(erro.errors).map(e => e.message)
            return res.status(400).json({ sucesso: false, erros: msgs })
            }    
        res.status(500).json({ sucesso: false, mensagem: erro.message })
    }

    const usuarios = await Usuario.find({}).select('-__v')

    res.status(200).json({ sucesso: true, total: usuarios.length, dados: usuarios })

    const usuario = await Usuario.findById(req.params.id).select('-__v')

    if (!usuario)
        return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' })
    if (erro.name === 'CastError')
        return res.status(400).json({ sucesso: false, mensagem: 'ID inválido' })

    const atualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        { nome, email, idade, telefone },
        { new: true, runValidators: true }
    ).select('-__v')

    const deletado = await Usuario.findByIdAndDelete(req.params.id)
    if (!deletado)
        return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' })
        res.status(200).json({ sucesso: true, mensagem: 'Deletado!' })
}

module.exports = { criarUsuario, listarUsuarios, buscarUsuarioPorId, atualizarUsuario, deletarUsuario }