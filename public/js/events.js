class Events {
	constructor() {
		// Variables


		// Socket.io
		this.socket = io();
		this.socket.onAny(this.onEvent);
	}

	// Event routing function.
	onEvent(event, data) {if (this[event]) {this[event](data);}}

	// Connection Error
	connectError(data) {
		console.log(`connect error due to ${err.message}`);
	}

	loginSuccessful(data) {
		// Hide Pages
		logBtn.classList.add('hide');
		regBtn.classList.add('hide');
		loginRegisterPage.classList.add('hide');
		incorrectText.classList.add('hide');
		topNav.classList.add('hide');
		titleContainer.classList.add('hide');
		loginRegisterPage.classList.add('hide');
		
		server1.classList.add('hide');
		createJoinServerPage.classList.add('hide');
		userHomePage.classList.remove('hide');
		profileUsername.innerText = username;

		// User Home Page
		userHomeTitle.innerText = `Welcome back, ${username}.`;

		// Sockets
		socket.emit('new-user', username); // TODO
		socket.emit('saved-servers-list', username);
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

		createTitleH1.innerText = `Welcome to the universe of Lunos, ${username}.`;
	}

	// TODO: Server Creation
	serverCreationSuccessful (data) {
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