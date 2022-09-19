type UserLog = {
    email: string;
    messages: Array<Message>,
}

if (localStorage.getItem('usuarioLogado')) {
    alert('Você já está logado!')
    window.location.href = 'messages.html'
}

const btnEntrar = document.getElementById('btnEntrar') as HTMLButtonElement;
btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('email') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;
    let log = buscarDados();

    let verificarUsuario = log.findIndex((usuario) => usuario.email === email.value && usuario.senha === password.value)
    console.log(verificarUsuario);
    if (verificarUsuario >= 0) {
        const usuarioLogado = {
            email: log[verificarUsuario].email,
            messages: log[verificarUsuario].messages,
        }
        salvarDados(usuarioLogado)
        setTimeout(() => {
            window.location.href = 'messages.html'
        }, 1000)
    } else {
        alert('Cadastre-se primeiro.')
    }
});


//arquivos com ignore para que eu possa usar as funções de forma duplicada; pois não comprometem o app.
// @ts-ignore
function salvarDados(usuarios: UserLog) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios))
}

//arquivos com ignore para que eu possa usar as funções de forma duplicada; pois não comprometem o app.
// @ts-ignore
function buscarDados(): Array<User> {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    return usuarios
}