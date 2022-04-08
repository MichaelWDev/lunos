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

// ANCHOR: USER JOINED
window.onload = function() {
	console.log("[chat.js] window.onload");
	
	// Gets the username saved in the username variable in [server.js].
	// username = client.getUsername();
	// TODO: Figure out how to append your username to the right.
	
	/* Route:
		[chat.js]   client.userJoined() >
		[client.js] events.socket.emit('user-joined') >
		[events.js] socket is used by client >
		[server.js] socket.on('user-joined') gets username
	*/
}

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

// !SECTION ————————————————————————————————————————————————————————————————//