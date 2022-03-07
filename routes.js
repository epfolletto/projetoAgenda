// Carrega o Express
const express = require('express');
// Instancia o express
const route = express.Router();
// Importa os controllers da home, login e contato
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

// Importa a verificação de usuário logado
const {loginRequired} = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas da login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas da contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

// Exporta todas as rotas
module.exports = route;