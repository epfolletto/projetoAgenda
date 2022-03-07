// middlewares globais
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

// middleware que checa se existe algum erro de csrf
exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }
    next();
}

// envia o token para todas as rotas
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

// middleware para verificar se existe usuário logado
exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};