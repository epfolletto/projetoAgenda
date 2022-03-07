const mongoose = require('mongoose');
// Importa o validator de email
const validator = require('validator');
// Pacote para fazer o hash de senha no BD
const bcryptjs = require('bcryptjs');

// Configurando o model
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        // armazena os dados do body
        this.body = body;
        // array para armazenar os erros
        this.errors = [];
        this.user = null;
    }

    async login() {
        // verifica se os dados estão corretos e retorna se tiver erros
        this.valida();
        if(this.errors.length > 0) return;        

        // verifica se existe este login no BD
        this.user = await LoginModel.findOne({email: this.body.email});

        // se não existir o login na BD, retorn e exibe erro
        if (!this.user) {
            this.errors.push('Usuário não existe');
            return;
        }

        // checa se a senha digitada é igual a senha do BD
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    // Método para registar na base de dados
    async register() {
        // verifica o válida e retorna caso exitir erro
        this.valida();
        if(this.errors.length > 0) return;

        // verifica se usuário já existe retorna caso positivo
        await this.userExist();
        if(this.errors.length > 0) return;

        // Gera um Salt para o bcrypt
        const salt = bcryptjs.genSaltSync();
        // Faz o hash da senha
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        // registar / cria o usuário no BD
        this.user = await LoginModel.create(this.body);
    }

    // método que verifica se o usuário já existe, procurando pelo e-mail
    async userExist() {
        this.user = await LoginModel.findOne({email: this.body.email});
        if (this.user) this.errors.push('Usuário já existe');
    }

    valida() {
        this.cleanUp();

        // verifica se o e-mail é válido
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        } 

        // verifica se a senha possui entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 catacteres');
        }
    }

    cleanUp() {
        // vare o body e garante que tudo é string
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        // garante que o objeto vai ter apenas os campos requeridos
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

// exporta a classe Login
module.exports = Login;