//———————————————————————————————————————//
// SECTION Variables                     //
//———————————————————————————————————————//

// const socket            = io();
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
			getAccount();
		break;

		case 2: // Register
			loginPage.classList.add("hide");
			registerPage.classList.remove("hide");
		break;

		case 3: // Register Account
			registerAccount();
		break;
	}
}

// Enters the message upon hitting the enter key.
function enterKey(e) {
	if (e.keyCode === 13) {
		const message = messageInput.value;
		appendMessage(`You: ${message}`);
		socket.emit('send-chat-message', message);
		messageInput.value = '';
	}
}

// Chat
function appendMessage(message) {
	const messageElement         = document.createElement('p');
	messageElement.classList.add("text");
	messageElement.innerText     = message;

	messageContainer.insertBefore(messageElement, messageContainer.firstChild);
}

// Assigns all usernames to the right.
function appendUsername(username) {
	const userElement         = document.createElement('p');
	userElement.id            = "userlist-" + username;
	userElement.classList.add("user-list");
	userElement.innerText     = username;

	usernameContainer.insertBefore(userElement, usernameContainer.firstChild);
}

// Loop-Prompts the user until they provide a username.
function promptUser() {
	if (username === "" || !username || username.length < 3) {
		username = prompt('What is your name?');
		appendMessage('Please create a username with more than 3 characters.');
	} else {
		socket.emit('new-user', username);
		clearInterval(promptInterval); // Clears the interval, so it stops looping.

		// These used to just run on their own. Now waits for you to enter a proper username.
		appendMessage('You joined');
		appendUsername(username);
	}
}

// Sends whichever channel is clicked to the back-end.
function channelButton(button) {

	switch(button) {
		case 1:
			socket.emit('channel-1');
		break;

		case 2:
			socket.emit('channel-2');
		break;

		case 3:
			socket.emit('channel-3');
		break;

		default:
			socket.emit('channel-1');
			// The default is the first channel.
	}
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

socket.on('chat-message', data => {
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', username => {
	appendMessage(`${username} connected.`);
	console.log(username);
	appendUsername(`${username}`);
});

socket.on('user-disconnected', username => {
	appendMessage(`${username} disconnected.`);
	document.getElementById("userlist-" + username).remove();
});

socket.on('user-list', users => {
	for (socketId in users) {
		appendUsername(users[socketId]);
	}
});

let promptInterval = setInterval(promptUser, 5);