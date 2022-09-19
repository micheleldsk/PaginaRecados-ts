type Message = {
    id: number,
    contato: string,
    mensagem: string,
}
type User = {
    email: string,
    senha: string,
    messages: Array<Message>,
}

let formHtml = document.getElementById('form');
let usuarios = buscarDados();
const btnCreate = document.getElementById('btnCreate') as HTMLButtonElement;

btnCreate.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('emailCreate') as HTMLInputElement;
    let password = document.getElementById('passwordCreate') as HTMLInputElement;
    let password2 = document.getElementById('passwordCreate2') as HTMLInputElement;

    if (emailExiste(email)) {

        if (validarCampos(email, password, password2)) {
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

function emailExiste(email: HTMLInputElement) {
    let existe = usuarios.some((valor: User) => valor.email === email.value)
    if (existe) {
        alert("Email já cadastrado.")
        return false
    }

    return true
}

function validarCampos(email: HTMLInputElement, password: HTMLInputElement, password2: HTMLInputElement) {
    if (!email.value) {
        alert("Você deve preencher o e-mail.")
        return false
    }

    if (!password.value.length) {
        alert("Senha precisa ser digitada.")
        return false
    }

    if (!password2.value.length) {
        alert("Senha precisa ser digitada novamente.")
        return false
    }

    if (password.value !== password2.value) {
        alert("As senhas não conferem.")
        return false
    }

    return true
}

//arquivos com ignore para que eu possa usar as funções de forma duplicada; pois não comprometem o app.
// @ts-ignore
function salvarDados(usuarios: Array<User>) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

//arquivos com ignore para que eu possa usar as funções de forma duplicada; pois não comprometem o app.
// @ts-ignore
function buscarDados(): Array<User> {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    return usuarios
}

function reset(email: HTMLInputElement, password: HTMLInputElement, password2: HTMLInputElement) {
    email.value = ''
    password.value = ''
    password2.value = ''
}
