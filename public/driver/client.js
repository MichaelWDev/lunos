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
				events.socket.emit('leave-room', channelList[i]);
				channelPage[i].style.display = 'none';

				// Joins the room, shows the chat container.
				events.socket.emit('join-room', channelPage[pageIndex]);
				channelPage[pageIndex].style.display = 'block';
			}
		}
	}

	// ANCHOR: ADD USER TO LIST
	appendUsername(onlineOrOffline, username) {
		console.log('[client.js] appendUsername: ', onlineOrOffline, ' AND ', username)
		// Online
		let onlineUserList   = document.getElementsByClassName('online-user-list')[0];
		let onlineUserCount  = document.getElementsByClassName('online-title')[0];
		
		// Offline
		let offlineUserList  = document.getElementsByClassName('offline-user-list')[0];
		let offlineUserCount = document.getElementsByClassName('offline-title')[0];

		// Creates elements.
		let userDiv          = document.createElement('div');
		let userP            = document.createElement('p');

		// Adds class & id to div.
		userDiv.classList.add('user');
		userDiv.setAttribute('id', `username-${username}`);

		// document.querySelector("[id='1box']");
		// let offlineUser = offlineUserList.querySelector(`username-${username}`);

		// Adds p element to div.
		userDiv.appendChild(userP);
		
		// Sets p text to username.
		userP.innerText = username;

		//const onlineUser = document.getElementById(`online-${username}`);
		//onlineUser.remove(); // Removes the div with the 'div-02' id

		// Adds user to the online-user-list div w/ class.
		if (onlineOrOffline) { // true
			onlineUserList.appendChild(userDiv);
			let onlineUser  = document.getElementsByClassName('user').innerHTML;
			console.log(`ONLINE: ${onlineUser}`);

			onlineUserCount.innerHTML = `<h1> Online - [${onlineUserList.childElementCount}]</h1>`;
			
			// if (offlineUser != undefined) {
			// 	offlineUser.remove();
			// }
		} else {
			document.getElementById(`username-${username}`)[0].remove();
			offlineUserList.appendChild(userDiv);
			offlineUserCount.innerHTML = `<h1> Offline - [${onlineUserList.childElementCount}]</h1>`;
		
			// if (onlineUser != undefined) {
			// 	onlineUser.remove();
			// }
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
	
		// NOTE: Change chatContainer to the proper container.
		let messageElement = document.createElement('p');
		let chatContainer = this.currentChannel;
		// messageElement.classList.add('text');
		messageElement.innerText = `${username}: ${message}`;
	
		if (chatContainer) {
			chatContainer.insertBefore(messageElement, chatContainer.firstChild);
		} else {
			// TODO: Fix this, it'll keep showing even when a channel is clicked.
			alert('No channel selected. Please select one!');
		}
	}

	// ANCHOR: MESSAGE EVERYONE
	sendMessage(username, message) {
		events.socket.emit('sendMessage', username, message);
	}

	// ANCHOR: UPDATE / FETCH USER LIST
	// TODO
	updateUserList(onlineList, offlineList) {
		// console.log(onlineList, offlineList)
		// NOTE: Repeated code! Scroll up. Figure out modularity.
		// Online
		let onlineUserList   = document.getElementsByClassName('online-user-list')[0];
		let onlineUserCount  = document.getElementsByClassName('online-title')[0];
		
		// Offline
		let offlineUserList  = document.getElementsByClassName('offline-user-list')[0];
		let offlineUserCount = document.getElementsByClassName('offline-title')[0];

		for (let i = 0; i < onlineList.length; i++) {
			let onlineUserDiv = document.createElement('div');
			let onlineUserP   = document.createElement('p');
			onlineUserDiv.classList.add('user');
			
			onlineUserDiv.appendChild(onlineUserP);
			onlineUserP.innerText = onlineList[i];
			onlineUserList.appendChild(onlineUserDiv);
			onlineUserCount.innerHTML = `<h1> Online - [${onlineList.length}]</h1>`;
		}

		if (offlineList != undefined) {
			for (let x = 0; x < offlineList.length; x++) {
				let offlineUserDiv = document.createElement('div');
				let offlineUserP   = document.createElement('p');
				offlineUserDiv.classList.add('user');

				offlineUserDiv.appendChild(offlineUserP);
				offlineUserP.innerText = offlineList[i];
				offlineUserList.appendChild(offlineUserDiv);
				offlineUserCount.innerHTML = `<h1> Offline - [${offlineList.length}]</h1>`;
			}
		}

		// let userDiv          = document.createElement('div');
		// let userP            = document.createElement('p');

		// Adds class to div.
		// userDiv.classList.add('user');

		// Adds p element to div.
		// userDiv.appendChild(userP);
		
		// Sets p text to username.
		// userP.innerText = username;

		// if (onlineOrOffline) { // true
		// 	onlineUserList.appendChild(userDiv);
		// 	onlineUserCount.innerHTML = `<h1> Online - [${onlineList.length}]</h1>`;
		// } else {
		// 	offlineUserList.appendChild(userDiv);
		// 	offlineUserCount.innerHTML = `<h1> Offline - [${offlineList.length}]</h1>`;
		// }
	}
}

// !SECTION ————————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const events = new Events();
const client = new Client();

// !SECTION ————————————————————————————————————————————————————————————————//