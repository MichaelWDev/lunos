//——————————————————————————————————————————————————————————————————————————//
// SECTION Information
/*——————————————————————————————————————————————————————————————————————————//

// Handles server events.

// !SECTION ————————————————————————————————————————————————————————————————*/

//——————————————————————————————————————————————————————————————————————————//
// SECTION Classes
//——————————————————————————————————————————————————————————————————————————//

class Events {
	constructor() { // TODO: Figure out which variables are/are not being used in js.
		// TODO: Copy remaining variables from script.js
		bindClass(this);

		// TODO: Organize these variables later.
		this.currentChannel;

		this.server1              = document.getElementById('temp-server-1-id');
		this.topNav               = document.getElementById('top-nav');
		this.titleContainer       = document.getElementById('title');
		this.incorrectText        = document.getElementById('incorrect-text');
		this.profileUsername      = document.getElementById('profile-username');
		this.userHomeTitle        = document.getElementById('user-home-title');
		this.createJoinServerPage = document.getElementById('create-join-server-page');
		this.userHomePage         = document.getElementById('user-home-page');
		this.createTitleH1        = document.getElementById('create-title-h1');
		this.createTitleH2        = document.getElementById('create-title-h2');

		// Socket.io
		this.socket = io();
		
		// Routes every socket event to their correct function.
		this.socket.onAny(this.onEvent);
	}

	// Routes server socket events to proper function.
	onEvent(event, data) {
		if (this[event]) {
			//console.log("Event Data: ", this[event]); Logs server data being received.
			this[event](data);
		}
	}

	// Connection Error
	connectError(err) {
		console.log(`connect error due to ${err}`);
	}

	// Successful Login
	loginSuccessful(username) {
		// Hide Pages
		buttons.logBtn.classList.add('hide');
		buttons.regBtn.classList.add('hide');
		buttons.loginRegisterPage.classList.add('hide');

		this.incorrectText.classList.add('hide');
		this.topNav.classList.add('hide');
		this.titleContainer.classList.add('hide');
		this.server1.classList.add('hide');
		this.createJoinServerPage.classList.add('hide');
		this.userHomePage.classList.remove('hide');
		this.profileUsername.innerText = username;

		// User Home Page
		this.userHomeTitle.innerText = `Welcome back, ${username}.`;

		// Sockets
		this.socket.emit('new-user', username); // TODO
		this.socket.emit('saved-servers-list', username);
	}
	
	loginUnsuccessful() {
		this.IncorrectText.classList.remove('hide');
	}

	// TODO: Account Creation Unsuccessful
	accountSuccessful () {
		buttons.logBtn.classList.add('hide');
		buttons.regBtn.classList.add('hide');
		buttons.loginRegisterPage.classList.add('hide');
		this.IncorrectText.classList.add('hide');
		this.topNav.classList.add('hide');
		this.titleContainer.classList.add('hide');
		this.createTitleH2.classList.add('hide');

		this.createTitleH1.innerText = `Welcome to the universe of Lunos, ${this.username}.`;
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
		//console.log("chatMessage: ", data.username, data.message)
		client.appendMessage(data.username, data.message);
	}

	// TODO: Displays who leaves and remove their name from the user-list.
	userDisconnected (data) {
		// appendMessage(username + ' has disconnected.');
		//document.getElementById('user-list-' + username).remove();
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

// !SECTION ————————————————————————————————————————————————————————————————*/

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION Drivers
//——————————————————————————————————————————————————————————————————————————//

//const client = new Client();
//const buttons = new Buttons();

// !SECTION ————————————————————————————————————————————————————————————————*/