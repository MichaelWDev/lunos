//———————————————————————————————————————//
// SECTION Variables                     //
//———————————————————————————————————————//

const socket = io();
// const messageContainer  = document.getElementById('chatted-words');
// const messageInput      = document.getElementById('message-bar');
// const usernameContainer = document.getElementById('usernames');
// let username            = prompt('What is your name?');
// const profile          = document.getElementById('myImg');

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

function button(btn) {
	let loginPage = document.getElementById("login-page");
	let registerPage = document.getElementById("register-page");

	switch(btn) {
		case 1: // Login
			account(1);
		break;

		case 2: // Register
			loginPage.classList.add("hide");
			registerPage.classList.remove("hide");
		break;

		case 3: // Register Account
			account(2);
		break;

		case 4: // Back
			loginPage.classList.remove("hide");
			registerPage.classList.add("hide");
		break;
	}
}

// Handles account login and registration.
function account(num) {
	let usernameLogin    = document.getElementById("username-input");
	let passwordLogin    = document.getElementById("password-input");
	let usernameRegister = document.getElementById("register-username-input");
	let passwordRegister = document.getElementById("register-password-input");

	switch(num) {
		case 1: // Login
			socket.emit("login-username", usernameLogin, "login-password", passwordLogin);
		break

		case 2: // Register
			socket.emit("register-username", usernameRegister, "register-password", passwordRegister);
		break;
	}
}



// NOTE: Copied Code

// TODO
// Enters the message with enter key.
function enterKey(e) {
	if (e.keyCode === 13) {
		const message = messageInput.value;
		appendMessage(`You: ${message}`);
		socket.emit('send-chat-message', message);
		messageInput.value = '';
	}
}


// TODO
// Chat
function appendMessage(message) {
	const messageElement         = document.createElement('p');
	messageElement.classList.add("text");
	messageElement.innerText     = message;

	messageContainer.insertBefore(messageElement, messageContainer.firstChild);
}


// TODO
// Assigns all usernames to the right.
function appendUsername(username) {
	const userElement         = document.createElement('p');
	userElement.id            = "userlist-" + username;
	userElement.classList.add("user-list");
	userElement.innerText     = username;

	usernameContainer.insertBefore(userElement, usernameContainer.firstChild);
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

// TODO
socket.on('chat-message', data => {
	appendMessage(`${data.name}: ${data.message}`);
});

// TODO
socket.on('user-connected', username => {
	appendMessage(`${username} connected.`);
	console.log(username);
	appendUsername(`${username}`);
});

// TODO
socket.on('user-disconnected', username => {
	appendMessage(`${username} disconnected.`);
	document.getElementById("userlist-" + username).remove();
});

// TODO
socket.on('user-list', users => {
	for (socketId in users) {
		appendUsername(users[socketId]);
	}
});