import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Cadastro from './modules/Cadastro';
import ContatoCadastro from './modules/ContatoCadastro';

const cadastro = new Cadastro('.form-cadastro');
const login = new Login('.form-login');
const contatoCadastro = new ContatoCadastro('.form-contato-cadastro');

cadastro.init();
login.init();
contatoCadastro.init();


// import './assets/css/style.css';