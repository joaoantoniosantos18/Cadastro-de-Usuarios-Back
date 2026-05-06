const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Mínimo 2 caracteres'],
        maxlength: [100, 'Máximo 100 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'E-mail inválido'],
    },
    idade: {
      type: Number,
      required: [true, 'A idade é obrigatória'],
      min: [1, 'Idade mínima é 1'],
    },
    telefone: {
      type: String,
      required: [true, 'O telefone é obrigatório'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario