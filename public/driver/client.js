//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//——————————————————————————————————————————————————————————————————————————//

// Handles everything on the client's side.

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
		// Events Class
		this.newEvents = new Events();
		
		// ANCHOR: VARIABLES
		// TODO: Fix this: Returns null
		//this.iframe = parent.frames.frames.document.activeElement.getElementsByTagName('iframe');
		//this.iframe = document.getElementById('main-iframe');
		// frames.window.document.activeElement;
		
		this.onlineUserList  = document.getElementsByClassName('online-user-list')[0];
		// this.offlineUserList = document.getElementsByClassName('offline-user-list');
		
		// NOTE: Old variables.
		//this.channelContainer = document.getElementById('channel-container');
		//this.channelListGrid  = document.getElementById('channel-list-grid');
		//this.channelPages     = document.getElementsByClassName('chat-containers');
		//this.currentChannel;
	}

	// ANCHOR: SET PAGE
	setPage(newHash = '#home') { // Default iframe
		let docContent = document.getElementById('main-iframe');
		docContent.src = `./html/${newHash.substring(1)}.html`;

		let getLinks = document.getElementById("top-nav").getElementsByTagName("a");
		let pageLink = document.getElementById("top-nav").querySelectorAll(`a[href="${newHash}"]`);

		for (let i = 0; i < getLinks.length; ++i) {
			getLinks[i].classList.add("btn-active");
		}

		if (pageLink[0]) {
			pageLink[0].classList.remove("btn-active");
		}
	}

	// ANCHOR: LOGIN
	login(email, password) {
		this.newEvents.socket.emit('login', email, password);
	}

	// ANCHOR: USER JOINED
	userJoined() {
		console.log('[client.js] userJoined()')
		// Adds it to user's screen.
		// appendUsername();

		// Sends it to everyone else connected.
		this.newEvents.socket.emit('user-joined');
	}

	// ANCHOR: CHANGE CHANNEL
	changeChannel(chanBtn) {
		let channelList = document.getElementsByClassName('chan-btn');
		let channelName = document.getElementsByClassName('channel-title')[0];
		
		for (let i = 0; i < channelList.length; i++) {
			if (chanBtn != channelList[i] && chanBtn.classList.contains('active-channel') == false) {
				channelName.innerHTML = '<h1>' + chanBtn.innerText + '</h1>';
				chanBtn.classList.add('active-channel');
				channelList[i].classList.remove('active-channel');
			}
		}
	}

	// ANCHOR: ADD USER TO LIST
	appendUsername (username) {
		// Creates elements.
		let userDiv = document.createElement('div');
		let userP   = document.createElement('p');

		// Adds class to div.
		userDiv.classList.add('user');

		// Adds p element to div.
		userDiv.appendChild(userP);
		
		// Sets p text to username.
		userP.innerText = username;

		// Adds user to the online-user-list div w/ class.
		this.onlineUserList.appendChild(userDiv);
		
		// Counts amount of users online AFTER they've been added.
		let onlineUserCount       = document.getElementsByClassName('online-title')[0];
		let userCount             = this.onlineUserList.childElementCount;
		onlineUserCount.innerHTML = '<h1> Online - [' + userCount + ']</h1>';



		/* TODO: Announcing a user has joined in a text channel.
		// Adds announcement to first channel.
		this.currentChannel = this.channelPages[0];
		this.currentChannel.appendChild(messageElement);

		if(this.currentChannel) {
			this.currentChannel.insertBefore(messageElement, this.currentChannel.firstChild);
		} else {
			this.currentChannel = this.channelContainer.firstElementChild;
			this.currentChannel.appendChild(messageElement);
		}
		*/
	}

	// ANCHOR: APPEND MESSAGE TO CHAT
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

	// ANCHOR: SWITCHING CHANNEL
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

