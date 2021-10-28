//———————————————————————————————————————//
// SECTION Global Variables              //
//———————————————————————————————————————//

// Other Elements
const satelliteImg          = document.getElementById('satellite-img');
const titleContainer        = document.getElementById('title');
const topNav                = document.getElementById('top-nav');
const savedServersList      = document.getElementById('saved-servers-list');
const friends               = document.getElementsByClassName('friends');

let profileImage            = document.getElementById('profile-image');
let profileUsername         = document.getElementById('profile-username');
let createTitleH1           = document.getElementById('create-title-h1');
let createTitleH2           = document.getElementById('create-title-h2');
let userHomeTitle           = document.getElementById('user-home-title');

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
const servers               = document.getElementsByClassName('servers');
const btnBox                = document.getElementById('btn-box');
const createJoinServerPage  = document.getElementById('create-join-server-page');

// Inputs
let chatBarInput            = document.getElementById('chat-bar-input');
let emailInput              = document.getElementById('email-input');
let usernameInput           = document.getElementById('username-input');
let passwordInput           = document.getElementById('password-input');
let joinServerInput         = document.getElementById('join-server-input');
let createServerInput       = document.getElementById('create-server-input');
let friendSearch            = document.getElementById('friends-search');
let messageSearch           = document.getElementById('message-friends-search');

// Containers
const incorrectText         = document.getElementById('incorrect-text');
const chatContainer         = document.getElementById('chat-container');
const channelList           = document.getElementById('channel-list');
const userListGrid          = document.getElementById('user-list-grid');
const sendChatForm          = document.getElementById('send-chat-form');
const friendsDirect         = document.getElementById('friends-direct-btn-container');
const friendsList           = document.getElementById('friends-list');
const messageFriends        = document.getElementById('message-friends');
let friendsListGrid         = document.getElementById('friends-list-grid');
let messageFriendsListGrid  = document.getElementById('message-friends-list-grid');

// Regex
const emailRegex 			= /^\S+@\S+\.\S+$/;

// Socket.io
const socket = io();

//———————————————————————————————————————//
// SECTION Functions                     //
//———————————————————————————————————————//

// TODO: Admin commands.

// Handles every button.
function button (btn) { // TODO: Re-arrange the buttons so they are organized top to bottom.
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
			if (userListGrid.style.display == 'grid') {
				console.log('test')
				userListGrid.display = 'none';
			} else {
				userListGrid.style.display = 'grid';
			}
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
		break;

		case 18: // Join
			socket.emit('join-server', joinServerInput.value);
		break;

		case 19: // Create
			socket.emit('create-server', createServerInput.value);
		break;

		case 20: // TODO: Server Icon
			// let serverIcon = document.getElementsByClassName('servers-icon');
		break;

		case 21: // Friends List
			if (friendsList.classList == 'hide') {
				friendsList.classList.remove('hide');
				messageFriends.classList.add('hide');
			} else {
				friendsList.classList.add('hide');
				messageFriends.classList.add('hide');
			}
		break;

		case 22: // TODO: Friend Information

		break;

		case 23: // TODO: Messages
			if (messageFriends.classList == 'hide') {
				messageFriends.classList.remove('hide');
				friendsList.classList.add('hide');
			} else {
				messageFriends.classList.add('hide');
			}
		break;

		case 24: // TODO: Open Friend Messages

		break;

		case 999: // NOTE: Enter Lunos
			let serverIcon = document.getElementById('temp-server-id');
			let lunosBtn   = document.getElementById('enter-lunos-btn');
			let server1    = document.getElementById('temp-server-1-id');
			lunosBtn.classList.add('hide');
			friendsDirect.classList.add('hide');
			serverIcon.classList.add('active-server');
			server1.classList.remove('hide');
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

// Appends entered messages to the chat.
function appendMessage (username, message) {
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

// TODO: Assigns all usernames to the right.
function appendUsername (username) {
	const usernameElement = document.createElement('p');
	usernameElement.classList.add('text');
	usernameElement.innerText = username;

	userList.insertBefore(usernameElement, userList.firstChild);
}

// TODO: Server Creation
function createServerList (serverListArray) {
	for (let i = 0; i < serverListArray.length; i++) {
		let div = document.createElement('div');
		div.classList.add('server-' + i + "-icon"); // Numbers each class.
		div.classList.add('servers-icon'); // Adds class for every one.
		div.setAttribute('onclick', openServer(i));

		savedServersList.appendChild(div);
	}
}

// TODO: Opens correct chat server that user clicks for.
function openServer (server) {
	let serverDiv = document.getElementsByClassName('servers-' + server); // Every div has this class.
	let serverIcon = document.getElementsByClassName('server-' + server + '-icon'); // Specific class for each server
	let previousServerIcon = document.getElementsByClassName('servers-icon');
	let previousServers = document.getElementsByClassName('servers');
	previousServerIcon.classList.remove('active-server'); // Removes active class from icon.
	previousServers.classList.add('hide'); // Hides currently opened chat server.
	serverIcon.classList.add('active-server'); // Adds active class to icon.
	serverDiv.classList.remove('hide'); // Shows newly opened chat server.
}

// TODO: Adding, removing, and blocking friends.
function friend (username) {

}

// TODO: Filtering Friends
function filterFriends (num) {
	let friendSearchValue         = friendSearch.value.toUpperCase();
	let friendsListGridText       = friendsListGrid.innerText.toUpperCase();
	let friendsListDiv            = friendsListGrid.getElementsByTagName('DIV');
	//console.log(friendsListH3[1].innerText)
	let messageFriendSearchValue  = messageSearch.value.toUpperCase();
	let messageFriendListGridText = messageFriendsListGrid.innerText.toUpperCase();
	friendsListGridText           = friendsListGridText.split(/\r?\n/);

	switch (num) {
		case 1: // Friend Search
			// Loop through all list items, and hide those who don't match the search query
			for (let i = 0; i < friendsListGridText.length; i++) {
				let result = friendsListGridText[i].localeCompare(friendSearchValue);
				//console.log("Result: ", result)
		
				if (result == 0) {

					console.log("Correct name");
					friendsListDiv.classList.remove('hide');
					break;
				} else {
					console.log("Incorrect name");
					//friendsListDiv.classList.add('hide');
				}
			}
		break;

		case 2: // Direct Messages

		break;
	}
}

//———————————————————————————————————————//
// SECTION Sockets                       //
//———————————————————————————————————————//

// Connection Error
socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

// TODO: Login Successful
socket.on('login-successful', (username) => {
	// Hide Pages
	logBtn.classList.add('hide');
	regBtn.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	incorrectText.classList.add('hide');
	topNav.classList.add('hide');
	titleContainer.classList.add('hide');
	loginRegisterPage.classList.add('hide');
	chatApp.classList.add('hide');
	createJoinServerPage.classList.add('hide');
	userHomePage.classList.remove('hide');

	// User Home Page
	userHomeTitle.innerText = `Welcome back, ${username}.`;

	// Sockets
	socket.emit('saved-servers-list', username);
	// NOTE: Sends username back to server to grab user information.
});

// TODO: Login Unsuccessful
socket.on('login-unsuccessful', () => {
	incorrectText.classList.remove('hide');
});

// TODO: Account Creation Unsuccessful
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

// TODO: Server Creation
socket.on('server-creation-successful', (serverName) => {
	// createServerList(serverName);
});

// TODO: Generate Server Code
socket.on('server-code', (serverCode) => {

});

// TODO: Users Saved Server List
socket.on('saved-servers', (serverListArray) => {
	createServerList(serverListArray);
});

/* TODO: When the user joins/creates a server.
	profileUsername.innerText = username;
	appendUsername(username);
	appendMessage(username, false);
*/

// TODO: Adds the text to the chat container.
socket.on('chat-message', (username, message) => {
	appendMessage(username, message);
});

// TODO: Displays who leaves and removes their name from the user-list.
socket.on('user-disconnected', username => {
	// appendMessage(username + ' has disconnected.');
	document.getElementById('user-list-' + username).remove();
});

// TODO: Adds whoever joins to the user-list.
socket.on('user-list', users => {
	appendUsername(users);
});