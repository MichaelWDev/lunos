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
		
		// ANCHOR: VARIABLES
		this.username;
		this.room;
		// TODO: Fix this: Returns null
		//this.iframe = parent.frames.frames.document.activeElement.getElementsByTagName('iframe');
		//this.iframe = document.getElementById('main-iframe');
		// frames.window.document.activeElement;
		
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
		events.socket.emit('login', email, password);
	}

	// ANCHOR: REGISTER
	// TODO: When a user registers: Log them into the chat application.
	accountSuccessful(username) {
		// showChat();
		// appendUsername(true, username);
		// events.io.emit('addUserToList', username);
	}

	// ANCHOR: SHOW CHAT
	showChat() {
		let loginPage    = document.getElementById('login-page');
		let registerPage = document.getElementById('register-page');
		let chatPage     = document.getElementById('chat-page');

		loginPage.classList.add('hide');
		registerPage.classList.add('hide');

		chatPage.classList.remove('hide');
	}

	// ANCHOR: CHANGE CHANNEL
	changeChannel(chanBtn) {
		// console.log(`ChanBtn: ${JSON.stringify(chanBtn.innerText)}`)
		// let channelTitle = JSON.stringify(chanBtn.innerText);
		// console.log(channelTitle)

		this.room = chanBtn.innerText;

		// CSS
		let channelList = document.getElementsByClassName('chan-btn');
		let channelName = document.getElementsByClassName('channel-title')[0];

		// HTML
		let channelPage = document.getElementsByClassName('chat-containers');
		let pageIndex   = Array.prototype.indexOf.call(channelList, chanBtn);

		for (let i = 0; i < channelList.length; i++) {
			if (chanBtn != channelList[i] && chanBtn.classList.contains('active-channel') == false) {
				// CSS
				channelName.innerHTML = '<h1>' + chanBtn.innerText + '</h1>';
				chanBtn.classList.add('active-channel');
				channelList[i].classList.remove('active-channel');
				
				// Channel
				// console.log("Hiding: ", channelPage[i])
				// console.log("Showing: ", channelPage[pageIndex])

				// Leaves the room, hides the chat container.
				events.socket.emit('leave-room', channelList[i].id);
				channelPage[i].style.display = 'none';

				// Joins the room, shows the chat container.
				events.socket.emit('join-room', chanBtn.innerText);
				channelPage[pageIndex].style.display = 'block';
			}
		}
	}

	// ANCHOR: ADD USER TO LIST
	appendUsername(onlineOrOffline, username) {
		// ONLINE
		let onlineUserList       = document.getElementsByClassName('online-user-list')[0];
		let onlineUserListCount  = document.getElementsByClassName('online-title')[0];

		// OFFLINE
		let offlineUserList      = document.getElementsByClassName('offline-user-list')[0];
		let offlineUserListCount = document.getElementsByClassName('offline-title')[0];

		// CREATE ELEMENTS
		let userDiv              = document.createElement('div');
		let userP                = document.createElement('p');

		// ADD CLASS & ID TO DIV
		userDiv.classList.add('user');

		// ADDS P ELEMENT TO DIV
		userDiv.appendChild(userP);
		
		// SETS P TEXT TO USERNAME
		userP.innerText = username;

		// ADDS USERS TO CORRECT DIV
		if (onlineOrOffline) { // If user is online (true)
			userDiv.setAttribute('id', `online-${username}`);
			let offlineUser = document.getElementById(`offline-${username}`);

			if (offlineUserList.hasChildNodes()) { // If offline list isn't empty.
				offlineUser.remove();
			}

			onlineUserList.appendChild(userDiv);
			onlineUserListCount.innerHTML = `<h1> Online - [${onlineUserList.childElementCount}]</h1>`;

		} else { // Offline user
			userDiv.setAttribute('id', `offline-${username}`);
			let onlineUser = document.getElementById(`online-${username}`);

			if (onlineUser && onlineUserList.hasChildNodes()) { // Removes user from online list.
				onlineUser.remove();
			}

			offlineUserList.appendChild(userDiv);
			// NOTE: This isn't changing into the correct number when someone goes offline. Stays 1.
			// $("#here").load(window.location.href + " #here" );
			offlineUserListCount.innerHTML = `<h1> Offline - [${offlineUserList.childElementCount}]</h1>`;
		}
	}

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
		
	}
	*/

	// ANCHOR: APPEND MESSAGE TO CHAT
	appendMessage(username, message, room) {
		let messageElement = document.createElement('p');
		// TODO: Append profile picture to message.
		// let profilePicture = document.createElement('div');
		let chatContainer  = document.getElementsByClassName('chat-containers');
		// profilePicture.classList.add('message-profile-picture');
		messageElement.style.margin       = 0;
		messageElement.style.marginBottom = `1em`;

		for (let i = 0; i < chatContainer.length; i++) {
			if (chatContainer[i].id == `${room}-${i}`) {
				messageElement.classList.add('message-text');
				messageElement.innerText = `${username}: ${message}`;
				chatContainer[i].insertBefore(messageElement, chatContainer.firstChild);
			}
		}
	}

	// ANCHOR: MESSAGE EVERYONE
	sendMessage(message) {
		events.socket.emit('send-chat-message', message);
	}

	// ANCHOR: SET USER PROFILE
	setUserProfile(username) {
		let profileName       = document.getElementsByClassName('profile-name')[0];
		profileName.innerText = username;
	}
}

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const events = new Events();
const client = new Client();

// !SECTION ————————————————————————————————————————————————————————————————//