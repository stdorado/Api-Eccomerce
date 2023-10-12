// public/chat.js
import { io } from 'socket.io-client';

const socket = io();
const messageTemplate = Handlebars.compile(document.getElementById('message-template').innerHTML);

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
  socket.emit('chat message', { user, message }); // Emitir el evento 'chat message'
  messageInput.value = ''; // Limpiar el campo de mensaje después de enviar
}

// Agrega el evento 'click' al botón de enviar
document.getElementById('sendButton').addEventListener('click', () => {
  sendMessage();
});

// Opcional: Agregar el evento 'keydown' para enviar mensajes con la tecla "Enter"
document.getElementById('m').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});