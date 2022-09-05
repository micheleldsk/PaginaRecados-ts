if (!localStorage.getItem('usuarioLogado')) {
    window.location.href = 'index.html'
}

document.getElementById('logout').addEventListener('click', () => {
    atualizaMessages()
    localStorage.removeItem('usuarioLogado')
    setTimeout(() => {
        window.location.href = 'index.html'
    }, 1000)
})

let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

printMessage()

function atualizaMessages() {
    let usuarioCadastrado = JSON.parse(localStorage.getItem('usuarios'));

    usuarioCadastrado.forEach(element => {
        if (element.email === usuario.email) {
            element.messages = usuario.messages
        }
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarioCadastrado))
}

const btnSalvarMensagem = document.getElementById('salvarMensagem')
btnSalvarMensagem.addEventListener('click', createMessage)


function createMessage() {
    let id = 1
    const contato = document.getElementById('contato').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!contato || !mensagem) {
        alert('Campos devem ser preenchidos.')
        return;
    }

    if (usuario.messages.length > 0) {
        const idLastMessage = usuario.messages.reduce((acc, next) => {
            if (acc.id < next.id) {
                return next
            }
            return acc
        })
        id = idLastMessage.id + 1
    }

    usuario.messages.push({ id, contato, mensagem })

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

    printMessage()
    reset()
}

function printMessage() {
    let table = document.getElementById('tbody')
    table.innerHTML = ''

    for (const index in usuario.messages) {
        let order = Number(index) + 1
        table.innerHTML += `
        <tr>
              <th scope="row">${order}</th>
              <td>${usuario.messages[index].contato}</td>
              <td>${usuario.messages[index].mensagem}</td>
              <td id="action">
              <button id="btnEditar" onclick = "editMessage(${usuario.messages[index].id})">Editar</button>
              <button id="btnApagar" onclick = "removeMessage(${usuario.messages[index].id})">Apagar</button>
              </td>
            </tr>
        `
    }
}

let modalContato = document.getElementById('contatoEdit');
let modalMensagem = document.getElementById('mensagemEdit');

function editMessage(id) {
    showModal();
    modalPrintMessage(id);

    const btnSave = document.getElementById('btnSave');
    btnSave.onclick = () => {
        changeMessage(id)
        setTimeout(() => {
            closeModal();
        }, 500)
    }

    const btnCancel = document.getElementById('btnCancel');
    btnCancel.addEventListener('click', closeModal);
}

function modalPrintMessage(id) {
    const tempMessage = searchMessage(id);
    modalContato.value = usuario.messages[tempMessage].contato;
    modalMensagem.value = usuario.messages[tempMessage].mensagem;
}

function searchMessage(id) {
    return usuario.messages.findIndex((message) => message.id === id);
}

function changeMessage(id) {
    const tempMessage = searchMessage(id);
    usuario.messages[tempMessage].contato = modalContato.value;
    usuario.messages[tempMessage].mensagem = modalMensagem.value;

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    printMessage()
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showModal() {
    document.getElementById('modal').style.display = 'block';
}

function removeMessage(id) {
    const confirmation = confirm('A mensagem será apagada. Confirma?');

    if (confirmation) {
        const remove = usuario.messages.filter((message) => message.id !== id)
        usuario.messages = remove
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario))

        printMessage()
    }
}

function reset() {
    document.getElementById('contato').value = '';
    document.getElementById('mensagem').value = '';
}
