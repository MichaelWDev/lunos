//———————————————————————————————————————//
// SECTION Global Variables              //
//———————————————————————————————————————//

let emailInput = document.getElementById('email-input');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');

const entryPage = document.getElementById('entry-page');
const chatApp = document.getElementById('chat-app');

const chatContainer = document.getElementById('chat-container');
const chatBar = document.getElementById('chat-bar-input');
const userList = document.getElementById('user-list');

let profileImage = document.getElementById('profile-image');
let profileUsername = document.getElementById('profile-username');

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const accountRegisterButton = document.getElementById('account-register-button');

const socket = io();

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

// Handles every button.
function button(btn) {
	switch(btn) {
		case 1: // Login
			account(1);
		break;

		case 2: // Register
			loginButton.classList.add('hide');
			registerButton.classList.add('hide');
			registerPage.classList.remove('hide');
			usernameInput.classList.remove('hide');
		break;

		case 3: // Register Account
			account(2);
		break;

		case 4: // Back
			loginButton.classList.remove('hide');
			registerButton.classList.remove('hide');
			registerPage.classList.add('hide');
			usernameInput.classList.add('hide');
		break;

		case 5: // Show Password
			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
			} else {
				passwordInput.type = 'password';
			}
		break;

		case 6: // TODO: Hide Channels
			channelsContainer.classList.add('idk');
		break;

		case 7: // TODO: Hide Users

		break;

		case 8: // TODO: Copy Username

		break;

		case 9: // TODO: Change Profile Image

		break;

		case 10: // TODO: Profile Settings

		break;
	}
}

// Handles account login and registration.
function account(num) {
	switch(num) {
		case 1: // Login
			socket.emit('login', emailInput.value, passwordInput.value);
		break

		case 2: // Register
			validatePassword('register-account');
		break;
	}
}

// TODO: Whenever you want to, change this to switch cases.
function validatePassword (registerAccount) {
	let upperCase     = /[A-Z]/g;
	let lowerCase     = /[a-z]/g;
	let symbols       = /\W|_/g;
	let numbers       = /[0-9]/g;
	let passwordMatch = 0;

	const securitySpan  = document.getElementById('security-span');
	const characterSpan = document.getElementById('character-span');
	const uppercaseSpan = document.getElementById('uppercase-span');
	const lowercaseSpan = document.getElementById('lowercase-span');
	const symbolSpan    = document.getElementById('symbol-span');
	const numberSpan    = document.getElementById('number-span');

	// NOTE: Validates Character Count
	if (passwordInput.value.length >= 8) {
		characterSpan.classList.remove('red');
		characterSpan.classList.add('green');
		
		passwordMatch = passwordMatch + 1;
	} else {
		characterSpan.classList.add('red');
		characterSpan.classList.remove('green');

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Capital Letters
	if (passwordInput.value.match(upperCase)) {
		uppercaseSpan.classList.remove('red');
		uppercaseSpan.classList.add('green');
		
		passwordMatch = passwordMatch + 1;
	} else {
		uppercaseSpan.classList.add('red');
		uppercaseSpan.classList.remove('green');

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Lowercase Letters
	if (passwordInput.value.match(lowerCase)) {
		lowercaseSpan.classList.remove('red');
		lowercaseSpan.classList.add('green');
		
		passwordMatch = passwordMatch + 1;
	} else {
		lowercaseSpan.classList.add('red');
		lowercaseSpan.classList.remove('green');

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Symbols
	if (passwordInput.value.match(symbols)) {
		symbolSpan.classList.remove('red');
		symbolSpan.classList.add('green');
		
		passwordMatch = passwordMatch + 1;
	} else {
		symbolSpan.classList.add('red');
		symbolSpan.classList.remove('green');

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Numbers
	if (passwordInput.value.match(numbers)) {
		numberSpan.classList.remove('red');
		numberSpan.classList.add('green');
		
		passwordMatch = passwordMatch + 1;
	} else {
		numberSpan.classList.add('red');
		numberSpan.classList.remove('green');

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Final Validation
	if (passwordMatch == 5) {
		securitySpan.classList.remove('red');
		securitySpan.classList.add('green');
	} else {
		securitySpan.classList.add('red');
		securitySpan.classList.remove('green');
	}

	// NOTE: Register Button Clicked
	if (passwordMatch == 5 && registerAccount) {
		registerPage.classList.add('hide');
		loginButton.classList.remove('hide');
		registerButton.classList.remove('hide');
		usernameInput.classList.add('hide');
		chatApp.classList.remove('hide');

		socket.emit('register', emailInput.value, usernameInput.value, passwordInput.value);
	}
}

// TODO
// Enters the message with enter key.
function enterKey(e) {
	if (e.keyCode === 13) {
		const message = chatBar.value;
		appendMessage(`You: ${message}`);
		socket.emit('send-chat-message', message);
		messageInput.value = '';
	}
}

// TODO
// Chat
function appendMessage(message) {
	const messageElement = document.createElement('p');
	messageElement.classList.add('text');
	messageElement.innerText = message;

	chatContainer.insertBefore(messageElement, chatContainer.firstChild);
}

// TODO
// Assigns all usernames to the right.
function appendUsername(username) {
	const userElement         = document.createElement('p');
	userElement.id            = 'userlist-' + username;
	userElement.classList.add('user-list');
	userElement.innerText     = username;

	userList.insertBefore(userElement, usernameContainer.firstChild);
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

socket.on('login-successful', (username) => {
	entryPage.classList.add('hide');
	chatApp.classList.remove('hide');
	profileUsername.innerText = username;
});

socket.on('login-unsuccessful', () => {

});




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
	document.getElementById('userlist-' + username).remove();
});

// TODO
socket.on('user-list', users => {
	// appendUsername(users[socketId]);
});