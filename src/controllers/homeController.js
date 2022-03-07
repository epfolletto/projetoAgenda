// Importa o model e armazena em Contao
const Contato = require('../models/ContatoModel');

exports.index = async(req, res) => {
    // Busca os contatos para renderizar na tela
    const contatos = await Contato.buscaContatos();
    // Renderiza a página inicial
    res.render('index.ejs', {contatos});
};