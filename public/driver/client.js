//———————————————————————————————————————————————————————————————————————//
// SECTION Information
/*———————————————————————————————————————————————————————————————————————//

Author:      Michael Woodyard
Email:       michaelwdev@outlook.com
Description: Handles non-events.

// !SECTION —————————————————————————————————————————————————————————————*/

//———————————————————————————————————————————————————————————————————————//
// SECTION Global Functions
//———————————————————————————————————————————————————————————————————————//

"use strict";

// Returns a random number between min and max.
Math.randomNumber = function(min, max) { // (number, number)
	return Math.floor(Math.random() * ((max + 1) - min) + min);
}

// Binds all methods to their parent class.
globalThis.bindClass = function(toBind) { // (object)
	// Get all defined class methods.
	const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(toBind));

	// Bind all methods.
	methods.filter(method => (method !== 'constructor')).forEach((method) => {if (toBind[method]) {toBind[method] = toBind[method].bind(toBind);}});
}

// !SECTION —————————————————————————————————————————————————————————————*/

//———————————————————————————————————————————————————————————————————————//
// SECTION Classes
//———————————————————————————————————————————————————————————————————————//

class Client {
	constructor() {
		this.userListGrid     = document.getElementById('user-list-grid');
		this.currentChannel;
		this.channelContainer = document.getElementById('channel-container');
		this.channelListGrid  = document.getElementById('channel-list-grid');
	}

	// Adds usernames to user-list.
	appendUsername (data) {
		const usernameElement = document.createElement('h3');
		usernameElement.classList.add('text');
		usernameElement.innerText = data;

		this.userListGrid.insertBefore(usernameElement, this.userListGrid.firstElementChild);
	}

	appendMessage (message) {
		// TODO: Append profile picture to message.
		// const chatMessage = document.createElement('div');
		// chatMessage.classList.add('chat-message');
	
		const messageElement = document.createElement('p');
		let chatContainer = this.currentChannel;
		messageElement.classList.add('text');
	
		if (message == false) {
			messageElement.innerText = `${events.username} has connected.`
		} else {
			messageElement.innerText = `${events.username}: ${message}`;
		}
	
		if (chatContainer) {
			chatContainer.insertBefore(messageElement, chatContainer.firstChild);
		} else {
			chatContainer = this.channelContainer.firstElementChild;
			chatContainer.appendChild(messageElement);
		}
	}

	// Switching Channels
	switchChannel(room) {
		let channelBtns  = this.channelListGrid.getElementsByClassName('channels');
		let channelPages = this.channelContainer.getElementsByClassName('chat-containers');
		let channelText  = this.channelListGrid.innerText;
		channelText      = channelText.split(/\r?\n/);

		for (let i = 0; i < channelText.length; i++) {
			if (room != channelText[i]) {
				// Hides other channels.
				//console.log("Incorrect Rooms: ", channelPages[i])
				channelPages[i].classList.add('hide');
				channelBtns[i].classList.remove('active-btn');
				events.socket.emit('leave-room', channelText[i]);
			} else {
				// Shows correct channel.
				//console.log("Correct Room: ", this.currentChannel)
				channelPages[i].classList.remove('hide');
				channelBtns[i].classList.add('active-btn');
				this.currentChannel = channelPages[i];
				events.socket.emit('join-room', room);
			}
		}
	}
}

// !SECTION —————————————————————————————————————————————————————————————*/

//———————————————————————————————————————————————————————————————————————//
// SECTION Drivers
//———————————————————————————————————————————————————————————————————————//

// Load in all relevant drivers.
//const events = new Events();

// !SECTION —————————————————————————————————————————————————————————————//