//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//——————————————————————————————————————————————————————————————————————————//

// Handles all client operations once they connect to the chat sever.

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: GLOBAL FUNCTIONS
//——————————————————————————————————————————————————————————————————————————//

// Binds all methods to their parent class.
globalThis.bindClass = function(toBind) { // (object)
	// Get all defined class methods.
	const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(toBind));

	// Bind all methods.
	methods.filter(method => (method !== 'constructor')).forEach((method) => {if (toBind[method]) {toBind[method] = toBind[method].bind(toBind);}});
}

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: CLASSES
//——————————————————————————————————————————————————————————————————————————//

class Client {
	constructor() {
		bindClass(this);
		/* NOTE: This is where import breaks. No matter where you put it.
		import { setPage } from "./index";
		this.setPage = setPage;
		*/
		
		// ANCHOR: VARIABLES
		// TODO: Fix this: Returns null
		//this.iframe = parent.frames.frames.document.activeElement.getElementsByTagName('iframe');
		//this.iframe = document.getElementById('main-iframe');
		// frames.window.document.activeElement;
		
		//this.userListGrid     = document.getElementById('user-list-grid');
		//this.channelContainer = document.getElementById('channel-container');
		//this.channelListGrid  = document.getElementById('channel-list-grid');
		//this.channelPages     = document.getElementsByClassName('chat-containers');
		//this.currentChannel;
	}
	
	// ANCHOR: LOGIN
	login() {
		// NOTE: Stuck... here... What do I do after this?
		// I can't introduce index.js into the HTML at any point because it breaks everything else.
		console.log("[client] login()")
		// NOTE: Tried using export & import for setPage().
		//setPage('#chat')
	}

	// ANCHOR: USERNAME TO USERLIST
	appendUsername (username) {
		console.log("[client] appendUsername(): ", username);

		/* NOTE: OLD CODE
		let usernameElement = document.createElement('h3');
		let messageElement  = document.createElement('p');
		//let chatContainer = this.currentChannel;
		
		// Sets username to display text.
		usernameElement.classList.add('text');
		usernameElement.innerText = username;
		
		// Sets username as message text.
		messageElement.classList.add('text');
		messageElement.innerText = `${username} has connected.`;

		// Adds announcement to first channel.
		this.currentChannel = this.channelPages[0];
		this.currentChannel.appendChild(messageElement);

		if(this.currentChannel) {
			this.currentChannel.insertBefore(messageElement, this.currentChannel.firstChild);
		} else {
			this.currentChannel = this.channelContainer.firstElementChild;
			this.currentChannel.appendChild(messageElement);
		}

		// Adds user to display on right.
		this.userListGrid.insertBefore(usernameElement, this.userListGrid.firstElementChild);
		*/
	}

	appendMessage (username, message) {
		console.log("appendMessage(username, message): ", username, message)
		// TODO: Append profile picture to message.
		// const chatMessage = document.createElement('div');
		// chatMessage.classList.add('chat-message');
		//console.log("Username: ", username);
		//console.log("message", message)
	
		let messageElement = document.createElement('p');
		let chatContainer = this.currentChannel;
		messageElement.classList.add('text');
		messageElement.innerText = `${username}: ${message}`;
	
		if (chatContainer) {
			chatContainer.insertBefore(messageElement, chatContainer.firstChild);
		} else {
			alert('No channel selected. Please select one!');
		}
	}

	// Switching Channels
	switchChannel(room) {
		let channelBtns  = this.channelListGrid.getElementsByClassName('channels');
		let channelText  = this.channelListGrid.innerText;
		channelText      = channelText.split(/\r?\n/);

		for (let i = 0; i < channelText.length; i++) {
			if (room != channelText[i]) {
				// Hides other channels.
				//console.log("Incorrect Rooms: ", this.channelPages[i])
				this.channelPages[i].classList.add('hide');
				channelBtns[i].classList.remove('active-btn');
				events.socket.emit('leave-room', channelText[i]);
			} else {
				// Shows correct channel.
				//console.log("Correct Room: ", this.currentChannel)
				this.channelPages[i].classList.remove('hide');
				channelBtns[i].classList.add('active-btn');
				this.currentChannel = this.channelPages[i];
				events.socket.emit('join-room', room);
			}
		}
	}
}

// !SECTION ————————————————————————————————————————————————————————————————//