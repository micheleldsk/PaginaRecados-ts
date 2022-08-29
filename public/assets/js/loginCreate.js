let formHtml = document.getElementById('form');
let usuarios = buscarDados();

document.getElementById('btnCreate').addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('emailCreate');
    let password = document.getElementById('passwordCreate');
    let password2 = document.getElementById('passwordCreate2');


    if (emailExiste(email)) {

        if (validarCampos(email.value, password.value, password2.value)) {
            const usuario = {
                email: email.value,
                senha: password.value,
                messages: [],
            }

            usuarios.push(usuario)
            salvarDados(usuarios)
            alert("Conta criada com sucesso!")
            reset(email, password, password2)
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1000)
        }
    }
});


function emailExiste(email) {
    let existe = usuarios.some((valor) => valor.email === email.value)
    if (existe) {
        alert("Email já cadastrado.")
        return false
    }

    return true
}

function validarCampos(email, password, password2) {
    if (!email) {
        alert("Você deve preencher o e-mail.")
        return false
    }

    if (!password.length) {
        alert("Senha precisa ser digitada.")
        return false
    }

    if (!password2.length) {
        alert("Senha precisa ser digitada novamente.")
        return false
    }

    if (password !== password2) {
        alert("As senhas não conferem.")
        return false
    }

    return true
}

function salvarDados(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

function buscarDados() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    return usuarios
}

function reset(email, password, password2) {
    email.value = ''
    password.value = ''
    password2.value = ''
}
