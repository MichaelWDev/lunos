class Events {
	constructor() {
		// Socket.io
		this.socket = io();
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
		
		server1.classList.add('hide');
		createJoinServerPage.classList.add('hide');
		userHomePage.classList.remove('hide');
		profileUsername.innerText = username;

		// User Home Page
		userHomeTitle.innerText = `Welcome back, ${username}.`;

		// Sockets
		socket.emit('new-user', username); // TODO
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

	// TODO: Adds the text to the chat container.
	socket.on('chat-message', (message) => {
		appendMessage(message);
	});

	// TODO: Displays who leaves and remove their name from the user-list.
	socket.on('user-disconnected', username => {
		// appendMessage(username + ' has disconnected.');
		//document.getElementById('user-list-' + username).remove();
	});

	// TODO: Adds whoever joins to the user-list.
	socket.on('user-list', users => {
		username = users;
		appendUsername(users);
		appendMessage(false);
	});

	/* TODO: When the user joins/creates a server.
		profileUsername.innerText = username;
		appendUsername(username);
		appendMessage(username, false);
	*/
}