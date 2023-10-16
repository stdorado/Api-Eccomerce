import { io } from 'socket.io-client';

const socket = io();

// Agregar el evento de conexión
socket.on('connect', () => {
  console.log('Conectado al servidor Socket.io');
});

socket.on('chat message', (data) => {
  const { user, message } = data;
  const messageHTML = messageTemplate({ user, message });
  const messagesList = document.getElementById('messages');
  messagesList.innerHTML += messageHTML;
});

function sendMessage() {
  const user = document.getElementById('user').value;
  const messageInput = document.getElementById('m');
  const message = messageInput.value;
  socket.emit('chat message', { user, message });
  messageInput.value = '';
}

document.getElementById('sendButton').addEventListener('click', () => {
  sendMessage();
});

document.getElementById('m').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});