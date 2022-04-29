//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//——————————————————————————————————————————————————————————————————————————//

// Handles every onclick event in chat.html.

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//——————————————————————————————————————————————————————————————————————————//

let username;

// TODO: Enter key is pressed to send chat.
document.addEventListener("keyup", function(event) {
	if (event.key === 13) {
		alert('Enter is pressed!');
	}
});

// ANCHOR: CHANGE CHANNELS
function changeChannel(chanBtn) {
	client.changeChannel(chanBtn);
}

// ANCHOR: SEND CHAT
function sendMessage() {
	//let chatBar = document.getElementsByClassName('chat-input')[0]
	let message = document.getElementsByClassName('chat-input')[0].value;
	
	// Refuses sending empty messages to server.
	if (message) {
		// Appends the message for the client.
		client.appendMessage(username = 'test', message);

		// Sends the message to the everyone else.
		//client.sendMessage(username, message);
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

// !SECTION ————————————————————————————————————————————————————————————————//