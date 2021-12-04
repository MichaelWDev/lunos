class Events {
	constructor() { // TODO: Figure out which variables are/are not being used in js.
		// TODO: Copy remaining variables from script.js

		bindClass(this);

		this.server1 = document.getElementById('temp-server-1-id');
		this.username;
		this.currentChannel;

		this.topNav = document.getElementById('top-nav');
		this.titleContainer = document.getElementById('title');

		// Socket.io
		this.socket = io();
		// Routes every socket event to their correct function.
		this.socket.onAny(this.onEvent);
	}

	// Event routing function.
	// TODO: Fix this. It's unable to route to the correct function for some reason.
	onEvent(event, data) {
		console.log("Event: ", event);
		console.log("Data: ", data)
		if (this[event]) {
			console.log("Event Data: ", this[event]);
			this[event](data);
		}
	}

	// Connection Error
	connectError(data) {
		console.log(`connect error due to ${data}`);
	}

	loginSuccessful(data) {
		// Hide Pages
		buttons.logBtn.classList.add('hide');
		buttons.regBtn.classList.add('hide');
		buttons.loginRegisterPage.classList.add('hide');
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
	accountSuccessful () {
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

	// Appends messages to the chat.
	appendMessage (data) {
		// TODO: Append profile picture to message.
		// const chatMessage = document.createElement('div');
		// chatMessage.classList.add('chat-message');

		const messageElement = document.createElement('p');
		let chatContainer = currentChannel;
		messageElement.classList.add('text');

		if (data == false) {
			messageElement.innerText = `${username} has connected.`
		} else {
			messageElement.innerText = `${username}: ${data}`;
		}

		if (chatContainer) {
			chatContainer.insertBefore(messageElement, chatContainer.firstChild);
		} else {
			chatContainer = channelContainer.firstElementChild;
			chatContainer.appendChild(messageElement);
		}
	}

	// TODO: Server Creation
	createServer (data) {
		// createServerList(serverName);
	}

	// TODO: Generate Server Code
	serverCode (data) {

	}

	// TODO: Users Saved Server List
	savedServers (data) {
		createServerList(data);
	}

	// TODO: Adds the text to the chat container.
	chatMessage (data) {
		appendMessage(data);
	}

	// TODO: Displays who leaves and remove their name from the user-list.
	userDisconnected (data) {
		// appendMessage(username + ' has disconnected.');
		//document.getElementById('user-list-' + username).remove();
	}

	// TODO: Adds whoever joins to the user-list.
	userList (data) {
		username = data;
		appendUsername(data);
		appendMessage(false); // Sends 
	}

	/* TODO: When the user joins/creates a server.
		profileUsername.innerText = username;
		appendUsername(username);
		appendMessage(username, false);
	*/
}