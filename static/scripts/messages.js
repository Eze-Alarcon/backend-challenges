/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
// const serverSocket = io('http://localhost:8080')

// const container = document.getElementById('messagesContainer') ?? null
const form = document.getElementById('formContainer')
const submitter = document.getElementById('formButton')

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', handleSubmit)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target, submitter)
    const data = {}
    formData.forEach((value, key) => (data[key] = value))

    fetch('/api/v1/messages', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

// 🔴 eliminar el componente por una simple lista
// 🔴 implementar el tema del if en handlebars para mostrar o no mensajes (depediendo si hay o no)
// 🔴 implementar socket en esta seccion

// const template = `
// <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Usuario</h5>
//     <p class="card-text">Insertar mensaje</p>
//     <a href="#" class="card-link">Eliminar mensaje</a>
//   </div>
// </div>
// `

// const compileTemplate = Handlebars.compile(template)

// serverSocket.on('updateList', data => {
//   // console.log(data)
//   if (container !== null) {
//     container.innerHTML = compileTemplate({
//       headerTitle: 'Messages',
//       mainTitle: 'List of messages in Real Time',
//       list: data.list,
//       showList: data.showList
//     })
//   }
// })
