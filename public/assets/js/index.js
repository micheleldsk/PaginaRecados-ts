if (localStorage.getItem('usuarioLogado')) {
    alert('Você já está logado!')
    window.location.href = 'messages.html'
}

document.getElementById('btnEntrar').addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let log = buscarDados();

    let verificarUsuario = log.findIndex((usuario) => usuario.email === email && usuario.senha === password)
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

function buscarDados() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    return usuarios
}

function salvarDados(usuarios) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios))
}