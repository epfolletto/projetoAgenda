import validator from 'validator';

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        if (!validator.isEmail(emailInput.value)) {
            const campo = document.querySelector('.login-email');
            this.CriaErro(campo, 'E-mail inválido.');
            error = true;
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            const campo = document.querySelector('.login-senha');
            this.CriaErro(campo, 'Senha inválida.');
            error = true;
        }

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