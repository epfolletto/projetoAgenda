// Importa a classe Login do Model
const Login = require('../models/loginModel');

// Método index -> se tiver usuário renderiza a página logado, se não renderiza o index
exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logado');
    res.render('login');
};

// Método de cadastro de usuário
exports.register = async function (req, res) {
    try {
        // Estancia a classe Login e armazena em login
        const login = new Login(req.body);
        await login.register();

        // Verifica se tem erros ao registrar usuário
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        // Se não tem erros, exibe mensagem de sucesso
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function () {
            return res.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

// Método de login
exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Login realizado com sucesso.');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};