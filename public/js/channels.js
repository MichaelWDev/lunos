class Channels {
	constructor() {

	}

	// Switching Channels
	switchChannel(room) {
		let channelText  = channelListGrid.innerText;
		let channelPages = channelContainer.getElementsByClassName('chat-containers');
		channelText      = channelText.split(/\r?\n/);

		for (let i = 0; i < channelText.length; i++) {
			if (room != channelText[i]) {
				// Hides other channels.
				console.log("False")
				channelPages[i].classList.add('hide');
				channelPages[i].classList.remove('active-btn');
				socket.emit('leave-room', channelText[i]);
			} else {
				console.log("True")
				channelPages[i].classList.remove('hide');
				channelPages[i].classList.remove('active-btn');
				currentChannel = channelPages[i];
				socket.emit('join-room', room);
			}
		}
	}
}