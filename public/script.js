//———————————————————————————————————————//
// SECTION Global Variables              //
//———————————————————————————————————————//

const satelliteImg          = document.getElementById('satellite-img');
const titleContainer        = document.getElementById('title');
const topNav                = document.getElementById('top-nav');

let profileImage            = document.getElementById('profile-image');
let profileUsername         = document.getElementById('profile-username');
let createTitleH1           = document.getElementById('create-title-h1');
let createTitleH2           = document.getElementById('create-title-h2');

// Buttons
const logBtn                = document.getElementById('log-btn');
const regBtn                = document.getElementById('reg-btn');
const homeBtn               = document.getElementById('home-btn');
const aboutBtn              = document.getElementById('about-btn');
const contactBtn            = document.getElementById('contact-btn');
const loginBtn              = document.getElementById('login-btn');
const registerBtn           = document.getElementById('register-btn');
const accountRegisterBtn    = document.getElementById('account-register-btn');
const joinServerBtn         = document.getElementById('join-server-btn');
const createServerBtn       = document.getElementById('create-server-btn');
const joinBtn               = document.getElementById('join-btn');
const createBtn             = document.getElementById('create-btn');

// Pages
const homePage              = document.getElementById('home-page');
const aboutPage             = document.getElementById('about-page');
const supportPage           = document.getElementById('support-page');
const loginRegisterPage     = document.getElementById('login-register-page');
const registerPage          = document.getElementById('register-page');
const chatApp               = document.getElementById('chat-app');
const btnBox                = document.getElementById('btn-box');

// Inputs
let chatBarInput            = document.getElementById('chat-bar-input');
let emailInput              = document.getElementById('email-input');
let usernameInput           = document.getElementById('username-input');
let passwordInput           = document.getElementById('password-input');
let joinServerInput         = document.getElementById('join-server-input');
let createServerInput       = document.getElementById('create-server-input');

// Containers
const incorrectText         = document.getElementById('incorrect-text');
const chatContainer         = document.getElementById('chat-container');
const channelList           = document.getElementById('channel-list');
const userList              = document.getElementById('user-list');
const sendChatForm          = document.getElementById('send-chat-form');

const emailRegex 			= /^\S+@\S+\.\S+$/;

const socket = io();

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

// TODO: Admin commands.

// Handles every button.
function button(btn) { // TODO: Re-arrange the buttons so they are organized top to bottom.
	switch(btn) {
		case 1: // Login
			socket.emit('login', emailInput.value, passwordInput.value);
		break;

		case 2: // Register
			// Active Class
			logBtn.classList.remove('active-btn');
			regBtn.classList.add('active-btn');
			homeBtn.classList.remove('active-btn');
			aboutBtn.classList.remove('active-btn');
			contactBtn.classList.remove('active-btn');

			// Hide Pages
			homePage.classList.add('hide');
			aboutPage.classList.add('hide');
			supportPage.classList.add('hide');
			btnBox.classList.add('hide');
			loginRegisterPage.classList.remove('hide');
			registerPage.classList.remove('hide');
			usernameInput.classList.remove('hide');
		break;

		case 3: // Register Account
			validatePassword('register-account');
		break;

		case 4: // Back
			btnBox.classList.remove('hide');
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
			userList.classList.add('idk');
		break;

		case 8: // TODO: Copy Username

		break;

		case 9: // TODO: Change Profile Image

		break;

		case 10: // TODO: Profile Settings

		break;

		case 11: // TODO: Send Message
			if (chatBarInput.value != '') { // TODO: Also have submitting via enter key. e.keycode = 13
				socket.emit('send-chat-message', chatBarInput.value);
				chatBarInput.value = null;
			}
		break;

		case 12: // log-btn
			// Active Class
			logBtn.classList.add('active-btn');
			regBtn.classList.remove('active-btn');
			homeBtn.classList.remove('active-btn');
			aboutBtn.classList.remove('active-btn');
			contactBtn.classList.remove('active-btn');

			// Hide Pages
			homePage.classList.add('hide');
			aboutPage.classList.add('hide');
			supportPage.classList.add('hide');
			loginRegisterPage.classList.remove('hide');
			btnBox.classList.remove('hide');
			registerPage.classList.add('hide');
			usernameInput.classList.add('hide');
		break;

		case 13: // Nav: Home
			// Active Class
			logBtn.classList.remove('active-btn');
			regBtn.classList.remove('active-btn');
			homeBtn.classList.add('active-btn');
			aboutBtn.classList.remove('active-btn');
			contactBtn.classList.remove('active-btn');

			// Hide Pages
			homePage.classList.remove('hide');
			aboutPage.classList.add('hide');
			supportPage.classList.add('hide');
			loginRegisterPage.classList.add('hide');
		break;

		case 14: // Nav: About
			// Active Class
			logBtn.classList.remove('active-btn');
			regBtn.classList.remove('active-btn');
			homeBtn.classList.remove('active-btn');
			aboutBtn.classList.add('active-btn');
			contactBtn.classList.remove('active-btn');

			// Hide Pages
			homePage.classList.add('hide');
			aboutPage.classList.remove('hide');
			supportPage.classList.add('hide');
			loginRegisterPage.classList.add('hide');
		break;

		case 15: // Nav: Contact
			// Active Class
			logBtn.classList.remove('active-btn');
			regBtn.classList.remove('active-btn');
			homeBtn.classList.remove('active-btn');
			aboutBtn.classList.remove('active-btn');
			contactBtn.classList.add('active-btn');

			// Hide Pages
			homePage.classList.add('hide');
			aboutPage.classList.add('hide');
			supportPage.classList.remove('hide');
			loginRegisterPage.classList.add('hide');
		break;

		case 16: // Join Server
			// Active Class
			joinServerBtn.classList.add('active-btn');
			createServerBtn.classList.remove('active-btn');

			// Hide
			joinServerInput.classList.remove('hide');
			createServerInput.classList.add('hide');
			joinBtn.classList.remove('hide');
			createBtn.classList.add('hide');		
			
			// Socket
			joinCreateServer(1);
			socket.emit('join-server', joinServerInput.value);
		break;
	
		case 17: // Create Server
			// Active Class
			joinServerBtn.classList.remove('active-btn');
			createServerBtn.classList.add('active-btn');

			// Hide
			joinServerInput.classList.add('hide');
			createServerInput.classList.remove('hide');
			joinBtn.classList.add('hide');
			createBtn.classList.remove('hide');

			// Socket
			joinCreateServer(2);
			socket.emit('create-server', createServerInput.value);
		break;
	}
}

// Password Validation
function validatePassword (registerAccount) {
	let upperCase     = /[A-Z]/g;
	let lowerCase     = /[a-z]/g;
	let symbols       = /\W|_/g;
	let numbers       = /[0-9]/g;
	let emailMatch    = 0;
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
		socket.emit('register', emailInput.value, usernameInput.value, passwordInput.value);
	}
}

function joinCreateServer(btn) {
	switch(btn) {
		case 1: // Join Server
			
		break;

		case 2: // Create Server

		break;
	}
}

// TODO: Change this into a switch case function, to receive different types of message appends.
// Appends entered messages to the chat.
function appendMessage(username, message) {
	// TODO: When a message is sent it appends their profile picture to their text.
	// const chatMessage = document.createElement('div');
	// chatMessage.classList.add('chat-message');

	const messageElement = document.createElement('p');
	messageElement.classList.add('text');

	if (message == false) {
		messageElement.innerText = `${username} has connected.`
	} else {
		messageElement.innerText = `${username}: ${message}`;
	}

	chatContainer.insertBefore(messageElement, chatContainer.firstChild);
}

// TODO
// Assigns all usernames to the right.
function appendUsername(username) {
	const usernameElement = document.createElement('p');
	usernameElement.classList.add('text');
	usernameElement.innerText = username;

	userList.insertBefore(usernameElement, userList.firstChild);
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

socket.on('login-successful', (username) => {
	logBtn.classList.add('hide');
	regBtn.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	incorrectText.classList.add('hide');
	topNav.classList.add('hide');
	titleContainer.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	chatApp.classList.add('hide');
	createTitleH2.classList.add('hide');

	createTitleH1.innerText = `Welcome back, ${username}.`;
});

socket.on('login-unsuccessful', () => {
	incorrectText.classList.remove('hide');
});

socket.on('account-successful', () => {
	logBtn.classList.add('hide');
	regBtn.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	incorrectText.classList.add('hide');
	topNav.classList.add('hide');
	titleContainer.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	chatApp.classList.add('hide');
	createTitleH2.classList.add('hide');

	createTitleH1.innerText = `Welcome to the universe of Lunos, ${username}.`;
});

/* TODO: When the user joins/creates a server.
	profileUsername.innerText = username;
	appendUsername(username);
	appendMessage(username, false);
*/

// Adds the text to the chat container.
socket.on('chat-message', (username, message) => {
	appendMessage(username, message);
});

// Displays who leaves and removes their name from the user-list.
socket.on('user-disconnected', username => {
	// appendMessage(username + ' has disconnected.');
	document.getElementById('user-list-' + username).remove();
});

// Adds whoever joins to the user-list.
socket.on('user-list', users => {
	appendUsername(users);
});