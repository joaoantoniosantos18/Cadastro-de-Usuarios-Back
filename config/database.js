const mongoose = require('mongoose');

const conectarBancoDeDados = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Se a conexão falhar, vai encerrar o processo
    }
} 

module.exports = conectarBancoDeDados;