// eslint-disable-next-line no-undef
const serverSocket = io('https://backend-challenges-production.up.railway.app/')
const list = document.getElementById('message-list')
const sendBtn = document.getElementById('send-button')
const inputMessage = document.getElementById('input-message')

const user = list.dataset.user

function createItem ({ user, message }) {
  const item = document.createElement('li')
  item.innerText = `${user} said: ${message}`
  list.appendChild(item)
}

serverSocket.on('message', ({ user, message }) => {
  createItem({ user, message })
})

serverSocket.on('getData', ({ messages }) => {
  messages.forEach(item => {
    createItem({ user: item.user, message: item.message })
  })
})

sendBtn.addEventListener('click', () => {
  const text = inputMessage.value
  // eslint-disable-next-line no-undef
  serverSocket.emit('message', { text, user })
})
