//——————————————————————————————————————————————————————————————————————————//
// SECTION: INFORMATION
/*——————————————————————————————————————————————————————————————————————————//

// Handles every server event.

// NOTE: YOU CAN ONLY EMIT ONE VARIABLE TO EVENTS.JS, EMITTING TWO REQUIRES THEM TO BE IN AN OBJECT: {VAR1, VAR2}

// !SECTION ————————————————————————————————————————————————————————————————*/

//——————————————————————————————————————————————————————————————————————————//
// SECTION: CLASSES
//——————————————————————————————————————————————————————————————————————————//

class Events {
	constructor() {
		bindClass(this);
	
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

	// ANCHOR: LOGIN SUCCESSFUL
	loginSuccessful(username) {
		client.username = username;
		client.showChat();
		client.setUserProfile(username);
		client.appendUsername(true, username);
	}
	
	// ANCHOR: LOGIN UNSUCCESSFUL
	loginUnsuccessful() { // TODO
		let incorrectText = document.getElementById('login-incorrect-text');

		incorrectText.classList.remove('hide');
		console.log('Login Unsuccessful');
	}

	// SECTION: CHAT APPLICATION

	// ANCHOR: ADD USER TO LIST
	addUserToList(username) {
		if (client.username) {
			client.appendUsername(true, username);
		}
	}

	// ANCHOR: POPULATE LIST
	populateList({userList, username}) {
		for (const key in userList) {
			if (key != username) {
				client.appendUsername(userList[key], key);
			}
		}
	}

	// ANCHOR: USER DISCONNECTED (broadcast)
	userDisconnected(username) {
		console.log(`${username} DISCONNECTED.`)
		client.appendUsername(false, username);
	}

	// ANCHOR: MESSAGE RECEIVED
	messageReceived(username, message) {
		client.appendMessage(username, message);
	}

	// ANCHOR: CREATE SERVER
	createServer(data) {
		// createServerList(serverName);
	}

	// ANCHOR: CREATE SERVER CODE
	serverCode(data) {}

	// ANCHOR: USERS IN SERVER
	savedServers(data) {
		createServerList(data);
	}

	// TODO: Adds the text to the chat container.
	chatMessage(data) {
		// console.log(`[BROADCASTED] chatMessage: ${data.username}\n${data.message}\n${data.room}`)
		client.appendMessage(data.username, data.message, data.room);
	}

	// ANCHOR: ONLINE OR OFFLINE USER LIST (BROADCAST)
	onlineOrOffline(onlineList, offlineList) {
		client.updateUserList(onlineList, offlineList);
	}

	// TODO: Adds everyone who joins to the user-list.
	userList(username) {
		console.log("[events] userList(): ", username);
		//client.appendUsername(username);
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

//——— !SECTION —————————————————————————————————————————————————————————————//