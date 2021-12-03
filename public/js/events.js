class Events {
	constructor() { // TODO: Figure out which variables are/are not being used in js.
					// TODO: Copy remaining variables from script.js
		// Variables
		this.server1 = document.getElementById('temp-server-1-id');
		this.username;
		this.currentChannel;

		this.topNav = document.getElementById('top-nav');
		this.titleContainer = document.getElementById('title');

		// Socket.io
		this.socket = io();
		this.socket.onAny(this.onEvent);
	}

	// These are all former socket.on's from script.js.

	// Event routing function.
	onEvent(event, data) { // TODO: Fix this. It's unable to route to the correct function for some reason.
		console.log("onEvent: ", event)
		console.log("onEvent Data: ", data)
		if (this[event]) {this[event](data);}}

	// Connection Error
	connectError(data) {
		console.log(`connect error due to ${err.message}`);
	}

	loginSuccessful(data) {
		// Hide Pages
		newButton.logBtn.classList.add('hide');
		newButton.regBtn.classList.add('hide');
		newButton.loginRegisterPage.classList.add('hide');
		incorrectText.classList.add('hide');
		this.topNav.classList.add('hide');
		this.titleContainer.classList.add('hide');
		
		this.server1.classList.add('hide');
		createJoinServerPage.classList.add('hide');
		userHomePage.classList.remove('hide');
		profileUsername.innerText = data;

		// User Home Page
		userHomeTitle.innerText = `Welcome back, ${data}.`;

		// Sockets
		socket.emit('new-user', data); // TODO
		socket.emit('saved-servers-list', data);
	}
	
	loginUnsuccessful() {
		incorrectText.classList.remove('hide');
	}

	// TODO: Account Creation Unsuccessful
	accountSuccessful (data) {
		logBtn.classList.add('hide');
		regBtn.classList.add('hide');
		loginRegisterPage.classList.add('hide');
		incorrectText.classList.add('hide');
		topNav.classList.add('hide');
		titleContainer.classList.add('hide');
		loginRegisterPage.classList.add('hide');
		chatApp.classList.add('hide');
		createTitleH2.classList.add('hide');

		createTitleH1.innerText = `Welcome to the universe of Lunos, ${this.username}.`;
	}

	// TODO: Server Creation
	createServer (data) {
		// createServerList(serverName);
	}

	// TODO: Generate Server Code
	serverCode (data) {

	}

	// TODO: Users Saved Server List
	savedServers (serverListArray) {
		createServerList(serverListArray);
	}

	// TODO: Adds the text to the chat container.
	chatMessage (message) {
		appendMessage(message);
	}

	// TODO: Displays who leaves and remove their name from the user-list.
	userDisconnected (data) {
		// appendMessage(username + ' has disconnected.');
		//document.getElementById('user-list-' + username).remove();
	}

	// TODO: Adds whoever joins to the user-list.
	userList (users) {
		username = users;
		appendUsername(users);
		appendMessage(false);
	}

	/* TODO: When the user joins/creates a server.
		profileUsername.innerText = username;
		appendUsername(username);
		appendMessage(username, false);
	*/
}

let newEvent = new Events();