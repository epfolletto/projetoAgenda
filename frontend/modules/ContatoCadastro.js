import validator from 'validator';

export default class ContatoCadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        if (emailInput.value !== '' && !validator.isEmail(emailInput.value)) {
            this.CriaErro(emailInput, 'E-mail inválido.');
            error = true;
        }

        if (!nomeInput.value) {
            this.CriaErro(nomeInput, 'Nome é um campo obrigatório.');
            error = true;
        }

        if (!emailInput.value && !telefoneInput.value) {
            this.CriaErro(emailInput, 'Pelo menos um contato é necessário (e-mail ou telefone).');
            this.CriaErro(telefoneInput, 'Pelo menos um contato é necessário (e-mail ou telefone).');
            error = true;
        }
        console.log(error);
        if (!error) el.submit();
    }

    CriaErro(campo, msg) {
        const div = document.createElement('div');
        let at = document.createAttribute("style");
        at.value = "color: red; font-size: 14px";
        div.setAttributeNode(at);
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}