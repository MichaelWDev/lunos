//———————————————————————————————————————//
// SECTION Global Variables              //
//———————————————————————————————————————//

let emailInput    = document.getElementById("email-input");
let usernameInput = document.getElementById("username-input");
let passwordInput = document.getElementById("password-input");

const entryPage    = document.getElementById("entry-page");
const registerPage = document.getElementById("register-page");
const chatApp      = document.getElementById("chat-app");
// const messageContainer  = document.getElementById('chatted-words');
// const messageInput      = document.getElementById('message-bar');
// const usernameContainer = document.getElementById('usernames');
// let username            = prompt('What is your name?');
// const profile          = document.getElementById('myImg');

const loginButton    = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const accountRegisterButton = document.getElementById("account-register-button");

// Keep this at the bottom apparently. It breaks the code.
const socket = io();

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

function button(btn) {
	switch(btn) {
		case 1: // Login
			account(1);
		break;

		case 2: // Register
			loginButton.classList.add("hide");
			registerButton.classList.add("hide");
			registerPage.classList.remove("hide");
			usernameInput.classList.remove("hide");

			//registerPage.style = "top: 30em;"
		break;

		case 3: // Register Account
			account(2);
		break;

		case 4: // Back
			loginButton.classList.remove("hide");
			registerButton.classList.remove("hide");
			registerPage.classList.add("hide");
			usernameInput.classList.add("hide");
		break;
	}
}

// Handles account login and registration.
function account(num) {
	switch(num) {
		case 1: // Login
			socket.emit("login", emailInput.value, passwordInput.value);
		break

		case 2: // Register
			validatePassword("register-account");
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

	const securitySpan   = document.getElementById("security-span");
	const characterSpan  = document.getElementById("character-span");
	const uppercaseSpan  = document.getElementById("uppercase-span");
	const lowercaseSpan  = document.getElementById("lowercase-span");
	const symbolSpan     = document.getElementById("symbol-span");
	const numberSpan     = document.getElementById("number-span");

	// NOTE: Validates Character Count
	if (passwordInput.value.length >= 8) {
		characterSpan.classList.remove("red");
		characterSpan.classList.add("green");
		
		passwordMatch = passwordMatch + 1;
	} else {
		characterSpan.classList.add("red");
		characterSpan.classList.remove("green");

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Capital Letters
	if (passwordInput.value.match(upperCase)) {
		uppercaseSpan.classList.remove("red");
		uppercaseSpan.classList.add("green");
		
		passwordMatch = passwordMatch + 1;
	} else {
		uppercaseSpan.classList.add("red");
		uppercaseSpan.classList.remove("green");

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Lowercase Letters
	if (passwordInput.value.match(lowerCase)) {
		lowercaseSpan.classList.remove("red");
		lowercaseSpan.classList.add("green");
		
		passwordMatch = passwordMatch + 1;
	} else {
		lowercaseSpan.classList.add("red");
		lowercaseSpan.classList.remove("green");

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Symbols
	if (passwordInput.value.match(symbols)) {
		symbolSpan.classList.remove("red");
		symbolSpan.classList.add("green");
		
		passwordMatch = passwordMatch + 1;
	} else {
		symbolSpan.classList.add("red");
		symbolSpan.classList.remove("green");

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Validates Numbers
	if (passwordInput.value.match(numbers)) {
		numberSpan.classList.remove("red");
		numberSpan.classList.add("green");
		
		passwordMatch = passwordMatch + 1;
	} else {
		numberSpan.classList.add("red");
		numberSpan.classList.remove("green");

		passwordMatch = passwordMatch - 1;
	}

	// NOTE: Final Validation
	if (passwordMatch == 5) {
		securitySpan.classList.remove("red");
		securitySpan.classList.add("green");

		console.log("Password checks out!");
	} else {
		securitySpan.classList.add("red");
		securitySpan.classList.remove("green");
	}

	// NOTE: Register Button Clicked
	if (passwordMatch == 5 && registerAccount) {
		socket.emit("register", emailInput.value, usernameInput.value, passwordInput.value);
		console.log("You have registered your account.\n" + emailInput.value + "\n" + usernameInput.value + "\n" + passwordInput.value)
	}
}

// TODO: Show password function, try incorporating it into an already-made function.
function myFunction() {
	var x = document.getElementById("myInput");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
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