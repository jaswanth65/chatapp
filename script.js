const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const Name = prompt('What is your Name?')
appendMessage('You joined')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
    appendMessage(`${data.Name}: ${data.message}`)
})

socket.on('user-connected', Name => {
    appendMessage(`${Name} connected`)
})

socket.on('user-disconnected', Name => {
    appendMessage(`${Name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}