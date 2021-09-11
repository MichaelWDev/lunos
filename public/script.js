//———————————————————————————————————————//
// SECTION Variables                     //
//———————————————————————————————————————//

const socket = io();
const entryPage = document.getElementById("entry-page");
const chatApp = document.getElementById("chat-app");
// const messageContainer  = document.getElementById('chatted-words');
// const messageInput      = document.getElementById('message-bar');
// const usernameContainer = document.getElementById('usernames');
// let username            = prompt('What is your name?');
// const profile          = document.getElementById('myImg');

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

function button(btn) {
	let loginButton = document.getElementById("login-button");
	let registerButton = document.getElementById("register-button");
	let registerPage = document.getElementById("register-page");

	switch(btn) {
		case 1: // Login
			account(1);
		break;

		case 2: // Register
			loginButton.classList.add("hide");
			registerButton.classList.add("hide");
			registerPage.classList.remove("hide");
		break;

		case 3: // Register Account
			account(2);
		break;

		case 4: // Back
			loginButton.classList.remove("hide");
			registerButton.classList.remove("hide");
			registerPage.classList.add("hide");
		break;
	}
}

// Handles account login and registration.
function account(num) {
	let username = document.getElementById("username-input").value;
	let password = document.getElementById("password-input").value;

	switch(num) {
		case 1: // Login
			socket.emit("login", username, password);
		break

		case 2: // Register
			socket.emit("register", username, password);
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

socket.on('login-sucessful', () => {
	console.log("front-end login successful");
	
	entryPage.classList.add("hide");
	chatApp.classList.remove("hide");
});

/*
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
*/