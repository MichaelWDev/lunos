//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//——————————————————————————————————————————————————————————————————————————//

// Handles every onclick event in chat.html.

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//——————————————————————————————————————————————————————————————————————————//

// TODO: Enter key is pressed to send chat.
document.addEventListener("keyup", function(event) {
	if (event.key === 13) {
		alert('Enter is pressed!');
	}
});

// ANCHOR: CHANGE CHANNELS
function changeChannel(chanBtn) {
	let chatBar = document.getElementsByClassName('chat-input')[0];

	// Removes the chatbar so people can't talk in introduction.
	if (chanBtn.innerText == `introduction`) {
		chatBar.classList.add('hide');
	} else {
		chatBar.classList.remove('hide');
	}

	client.changeChannel(chanBtn);
}

// ANCHOR: SEND CHAT
function sendMessage() {
	// let username = document.getElementById(''); // get the username at Username Here, above profile status
	// let chatBar = document.getElementsByClassName('chat-input')[0]
	// let chatContainers = document.getElementsByClassName('chat-containers');
	let message = document.getElementsByClassName('chat-input')[0].value;
	let room    = client.room;

	// Refuses sending empty messages to server.
	if (message) {
		// Appends the message for the client.
		// NOTE: Figure out how to get the username locally.
		// NOTE: [FIX] Locally appending the message to the wrong room.
		client.appendMessage(client.username, message, room);

		// Sends the message to the everyone else.
		client.sendMessage(message);
	}
}

// LOGIN


// REGISTER

function register() {
	let loginPage    = document.getElementById('login-page');
	let registerPage = document.getElementById('register-page');

	loginPage.classList.add('hide');
	registerPage.classList.remove('hide');
}

// ANCHOR: SET PROFILE STATUS
function showStatus() {
	let statusSelection = document.getElementsByClassName('set-status-selection')[0];
	statusSelection.classList.toggle('hide');
}

// TODO: Emit to the server so everyone knows what your profile status is.
// TODO: Add extra HTML for online users to display their profile statis.
function setStatus(status) {
	let statusButtons = document.getElementsByClassName('status-btns');
	let statusText    = document.getElementsByClassName('profile-status')[0];

	for (let i = 0; i < statusButtons.length; i++) {
		if (status == statusButtons[i].innerText) {
			statusButtons[i].classList.add('active-channel');
			statusText.innerText = `[ ] - ${status}`;
		} else {
			statusButtons[i].classList.remove('active-channel')
		}
	}
}

// !SECTION ————————————————————————————————————————————————————————————————//