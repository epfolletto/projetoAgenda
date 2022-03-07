// importando express
const express = require('express');
// instanciando o express
const app = express();
// cria variáveis de ambiente (armazena link de conexão com o BD pelo dotenv('.env' no '/' do projeto))
require('dotenv').config();
// importa o mongoose que faz a conexão com a BD e modela os dados
const mongoose = require('mongoose');
// conecta com a DB e emite o sinal "pronto" quando o BD estiver conectado
mongoose.connect(process.env.CONNECTIONSTRING)
    .then( () => {
        app.emit('pronto');
    })
    .catch( e => console.log(e));
// chama a sesseion e salva na memória
const session = require('express-session');
// chamando o connecct-mongo
const MongoStore = require('connect-mongo');
// mensagens autodestrutivas
const flash = require('connect-flash');
// importa as rotas
const routes = require('./routes');
// criar caminhos absolutos
const path = require('path');
// importando o helmet
const helmet = require('helmet');
// importando o csrf -> segurança
const csrf = require('csurf');
// importando middlewares
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
// usando o helmet
app.use(helmet());
// trata o POST requisitado
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// importando conteúdo estático (bundle, css, imgs e etc...) que pode ser acessado diretamente
app.use(express.static(path.resolve(__dirname, 'public')));
// Configurações de sessão
const sessionOptions = session({
    secret: 'blablabla12345',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        // Tempo de duração do cookie, em milisegundos
        maxAge: 7 * 24 * 60 * 60  * 1000,
        httpOnly: true
    }
});
// chamando a session configurada no app
app.use(sessionOptions);
// iniciando o flash messages
app.use(flash());
// 
app.set('views', path.resolve(__dirname, 'src', 'views'));
// engine que estamos utilizando para renderizar o html
app.set('view engine', 'ejs');
// iniciando o csrf
app.use(csrf());
// Nossos próprios middlewares em todas as rotas
app.use(middlewareGlobal);
// iniciando o csrf
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);
// quando o BD estiver conectado, escuta o servidor express
app.on('pronto', () => {
    // configurando a porta que escuta as requisições
    const porta = 3000;
    app.listen(porta, () => {
        console.log(`Servidor executando na porta ${porta}`);
    });
});