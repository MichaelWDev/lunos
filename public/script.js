//———————————————————————————————————————//
// SECTION Global Variables              //
//———————————————————————————————————————//

let emailInput              = document.getElementById('email-input');
let usernameInput           = document.getElementById('username-input');
let passwordInput           = document.getElementById('password-input');
let profileImage            = document.getElementById('profile-image');
let profileUsername         = document.getElementById('profile-username');

const titleContainer        = document.getElementById('title');
const entryPage             = document.getElementById('entry-page');
const registerPage          = document.getElementById('register-page');
const chatApp               = document.getElementById('chat-app');
const chatContainer         = document.getElementById('chat-container');
const chatBarInput          = document.getElementById('chat-bar-input');
const channelList           = document.getElementById('channel-list');
const userList              = document.getElementById('user-list');
const loginButton           = document.getElementById('login-button');
const registerButton        = document.getElementById('register-button');
const accountRegisterButton = document.getElementById('account-register-button');
const incorrectText         = document.getElementById('incorrect-text');
const emailRegex 			= /^\S+@\S+\.\S+$/;

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
			if (emailInput.value.match(emailRegex)) {
				incorrectText.classList.add('hide');
				socket.emit('login', emailInput.value, passwordInput.value);
			} else {
				incorrectText.classList.remove('hide');
			}
		break

		case 2: // Register
			validatePassword('register-account');
		break;
	}
}

// Password Validation
function validatePassword (registerAccount) {
	let upperCase     = /[A-Z]/g;
	let lowerCase     = /[a-z]/g;
	let symbols       = /\W|_/g;
	let numbers       = /[0-9]/g;
	let emailMatch    = 0
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

	// NOTE: Validates Email
	if (emailInput.value.match(emailRegex)) {
		emailMatch = emailMatch + 1;
	} else {
		emailMatch = emailMatch - 1;
	}

	// TODO: Username validation: Make sure accounts don't have the same username.

	// NOTE: Validation Confirmation
	if (passwordMatch == 5) {
		securitySpan.classList.remove('red');
		securitySpan.classList.add('green');
	} else {
		securitySpan.classList.add('red');
		securitySpan.classList.remove('green');
	}

	// NOTE: Create Account!
	if (passwordMatch == 5 && emailMatch == 1 && registerAccount) {
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
		const message = messageInput.value;
		appendMessage(message);
		socket.emit('send-chat-message', message);
		messageInput.value = '';
	}
}

// TODO
// Appends the entered message to the chat.
function appendMessage(message) {
	const messageElement = document.createElement('p');
	messageElement.classList.add('text');
	messageElement.innerText = message;

	messageContainer.insertBefore(messageElement, messageContainer.firstChild);
}

// TODO
// Assigns all usernames to the right.
function appendUsername(username) {}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

socket.on('login-successful', (username) => {
	entryPage.classList.add('hide');
	chatApp.classList.remove('hide');
	incorrectText.classList.add('hide');

	// Adds the user to the userlist.
	const userElement         = document.createElement('p');
	userElement.id            = 'userlist-' + username;
	userElement.classList.add('user-list');
	userElement.innerText     = username;

	usernameContainer.insertBefore(userElement, usernameContainer.firstChild);

	profileUsername.innerText = username;
	appendMessage(username + ' has connected connected.');
});

socket.on('login-unsuccessful', () => {
	incorrectText.classList.remove('hide');
});

// TODO
socket.on('chat-message', text => {
	appendMessage(text);
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