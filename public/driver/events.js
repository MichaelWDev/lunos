//——————————————————————————————————————————————————————————————————————————//
// SECTION: INFORMATION
/*——————————————————————————————————————————————————————————————————————————//

// Handles every server event.

// !SECTION ————————————————————————————————————————————————————————————————*/

//——————————————————————————————————————————————————————————————————————————//
// SECTION: CLASSES
//——————————————————————————————————————————————————————————————————————————//

class Events {
	constructor() {
		bindClass(this);

		// ANCHOR: VARIABLES
		this.incorrectText = document.getElementById('login-incorrect-text');
	
		// ANCHOR: SOCKET.IO
		this.socket = io();
		
		// ANCHOR: SOCKET ROUTING
		this.socket.onAny(this.onEvent);
	}

	// ANCHOR: SOCKET ROUTING
	onEvent(event, data) {
		if (this[event]) {
			// console.log("Event Data: ", this[event]); // Logs server data being received.
			this[event](data);
		}
	}

	// ANCHOR: CONNECTION ERROR
	connectError(err) {
		console.log(`connect error due to ${err}`);
	}

	// ANCHOR: LOGIN
	loginSuccessful(username) {
		this.socket.emit('accountSuccessful');

		// Sockets
		this.socket.emit('new-user', username); // TODO
		this.socket.emit('saved-servers-list', username);
	}
	
	loginUnsuccessful() {
		this.IncorrectText.classList.remove('hide');
	}

	// ANCHOR: CREATE SERVER
	createServer (data) {
		// createServerList(serverName);
	}

	// ANCHOR: CREATE SERVER CODE
	serverCode (data) {}

	// ANCHOR: USERS IN SERVER
	savedServers (data) {
		createServerList(data);
	}

	// TODO: Adds the text to the chat container.
	chatMessage (data) {
		//console.log("chatMessage: ", data.username, data.message)
		client.appendMessage(data.username, data.message);
	}

	// TODO: Displays who leaves and remove their name from the user-list.
	userDisconnected (data) {
		// appendMessage(username + ' has disconnected.');
		// document.getElementById('user-list-' + username).remove();
	}

	// TODO: Adds whoever joins to the user-list.
	userList (username) {
		//console.log("Events Username: ", username);
		client.appendUsername(username);
	}

	/* TODO: When the user joins/creates a server.
		profileUsername.innerText = username;
		appendUsername(username);
		appendMessage(username, false);
	*/
}

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const client = new Client();

//——— !SECTION —————————————————————————————————————————————————————————————//