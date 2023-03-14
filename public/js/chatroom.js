(function connect() {
    let socket = io.connect("http://localhost:4000");

    let username = document.getElementById("username");
    let usernameBtn = document.getElementById("usernameBtn");
    let curUsername = document.querySelector(".card-header");

    usernameBtn.addEventListener('click', (e) => {
        console.log(username.value);
        socket.emit('change_username', { username: username.value });
        curUsername.textContent = username.value;
        username.value = "";
    })

    let message = document.getElementById('message');
    let messageBtn = document.getElementById('messageBtn');
    let messageList = document.getElementById('message-list');

    let info = document.querySelector('.info');

    messageBtn.addEventListener('click', (e) => {
        console.log(message.value);
        socket.emit('new_message', { message: message.value });
        message.value = "";
    })

    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem)
    })

    message.addEventListener('keypress', (e) => {
        socket.emit('typing');
    })

    socket.on('typing', data => {
        info.textContent = data.username + " is typing...";
        setTimeout(() => { info.textContent = ''; }, 2000);
    })
})();