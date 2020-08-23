var chatForm = document.getElementById('chat-form');
var chatMessages = document.querySelector('.chat-massages');

var socket = io();

// Server에서 받은 메세지
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// Message 전송
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // mesaage text 가져오기
    var msg = e.target.elements.msg.value;

    // 서버로 message emit
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// DOM으로 message 보내기
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p>${message.username} <span>${message.time}</span></p>
        <p>${message.text}</p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}