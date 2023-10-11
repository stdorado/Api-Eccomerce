const socket = io();

  document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    // Envía el mensaje al servidor a través de Socket.io
    socket.emit('chatMessage', { user, message });

    document.getElementById('message').value = '';
  });

  socket.on('newMessage', (message) => {
    // Recibe y muestra el mensaje en tiempo real
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${message.user}:</strong> ${message.message}`;
    messages.appendChild(li);
  });