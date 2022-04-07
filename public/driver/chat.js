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

// ANCHOR: USER JOINED
window.onload = function() {
	console.log("[chat.js] window.onload");
	
	// Gets the username saved in the username variable in [server.js].
	let username = client.getUsername();
	// TODO: Figure out how to append your username to the right.
	
	/* Route:
		[chat.js]   client.userJoined() >
		[client.js] events.socket.emit('user-joined') >
		[events.js] socket is used by client >
		[server.js] socket.on('user-joined') gets username
	*/
}

// ANCHOR: SEND CHAT
function sendChat(message) {

}

// ANCHOR: CHANGE CHANNELS
function changeChannel(chanBtn) {
	client.changeChannel(chanBtn);
}

// !SECTION ————————————————————————————————————————————————————————————————//