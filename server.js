//———————————————————————————————————————————————————————————————————————//
// SECTION Information
/*———————————————————————————————————————————————————————————————————————//

Author:      Michael Woodyard
Email:       michaelwdev@outlook.com
Description: Handles server code.

// !SECTION —————————————————————————————————————————————————————————————*/

//———————————————————————————————————————————————————————————————————————//
// SECTION: Global Variables
//———————————————————————————————————————————————————————————————————————//

const express     = require('express');
const app         = express();
const server      = require('http').Server(app);
const port        = 3000;
const io          = require('socket.io')(server);
const compression = require("compression");

// NOTE: Password Encryption
const bcrypt = require('bcrypt');
const fs     = require('fs');

//———————————————————————————————————————————————————————————————————————//
// SECTION Global Functions
//———————————————————————————————————————————————————————————————————————//

/* NOTE: Leave commented out for now.
// Binds all methods to their parent class.
globalThis.bindClass = function(toBind) { // (object)
	// Get all defined class methods.
	const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(toBind));

	// Bind all methods.
	methods.filter(method => (method !== "constructor")).forEach((method) => {if (toBind[method] && typeof(toBind[method]) === "function") {toBind[method] = toBind[method].bind(toBind);}});
}

//globalThis.Events = require("./public/driver/events"); // TODO: Fix this, it's breaking your servercode.
*/

//———————————————————————————————————————————————————————————————————————//
// SECTION: Server
//———————————————————————————————————————————————————————————————————————//

// Compress client-server communications.
app.use(compression());

// Serve the static website files.
app.use(express.static('public'));

// Starts the server.
server.listen(port, function () {
	console.log('Server is running on port ' + port);
});

// Server
io.on('connection', function(socket) {
	let username;
	let channel;
	console.log('user connected');

	function uniqueID() {
		let uniqueNumbers = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
		return uniqueNumbers = uniqueNumbers.toString();
	}

	// TODO: Check if the user is banned from the server they are connecting to.
	function checkUserData(serversBannedFrom) {
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					//username = data[email].username;
				} catch (err) {
					console.log('Error parsing JSON: ', err);
				}
			}
		});
	}

	// TODO: User Connection
	socket.on('new-user', username => {
		socket.emit('userList', username);
		// NOTE: socket.to(channel).emit('chat-message', message);
	});

	// TODO: Account Login
	socket.on('login', async (email, password) => {
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					username = data[email].username;
					let accountPassword = data[email].password;

					bcrypt.compare(password, accountPassword, function(err, result) {
						if (err) {
							console.log("Error: " + error);
						}

						if (result && data[email]) {
							socket.emit('loginSuccessful', username);
						} else {
							socket.emit('loginUnsuccessful');
						}
					});
				} catch (err) {
					console.log('Error parsing JSON: ', err);
				}
			}
		});
	});

	// TODO: Account Register
	socket.on('register', async (email, username, password) => {
		const hashedPassword = await bcrypt.hash(password, 10);

		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					data[email] = {
						email: email,
						username: username,
						password: hashedPassword,
						savedServers: null,
						serversBannedFrom: null
					};

					fs.writeFile('./accounts.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Account successfully added.');
							socket.emit('accountSuccesful');
						}
					});
				} catch (err) {
					console.log('[REGISTER] Error parsing JSON: ', err);
				}
			}
		});
	});

	// TODO: Joins user to server.
	socket.on('join-server', (serverCode) => {
		// let savedServers = null;
		let serversBannedFrom = data[email].serversBannedFrom;
		checkUserData(serversBannedFrom);

		/* TODO (LATER): When a user joins, check:
			Later: server-list for correct invite code.
			server-list permissions if server is/is not private.
			server-list bannedUsers if they were banned.
		*/
	});

	// TODO: Creates server for user.
	socket.on('create-server', (serverName) => {
		// NOTE: Servers can have the same name. Community servers can not.
		let serverID = uniqueID().substring(0, 11);
		console.log(serverID);

		fs.readFile('./server-list.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try { // TODO: Fix all this shit.
					const data = JSON.parse(jsonString);
					data[serverName] = {
						serverID: serverID,
						community: false,
						permissions: false,
						password: false,
						inviteCodes: "",
						members: username,
						bannedUsers: "",
					};

					fs.writeFile('./server-list.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Server successfully created.');
							socket.emit('createServer', serverName);
						}
					});
				} catch (err) {
					console.log('[CREATE SERVER] Error parsing JSON: ', err);
				}
			}
		});
	});

	// TODO: Creates unique invite code for user.
	socket.on('create-server-invite', () => {
		let serverCode = uniqueID().substring(0, 6);
		console.log(serverCode);
		socket.emit('serverCode', serverCode);

		fs.readFile('./server-list.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try { // TODO: Fix all this shit.
					const data = JSON.parse(jsonString);
					data[email] = {email: email, username: username, password: hashedPassword};

					fs.writeFile('./server-list.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Server invite successfully created.');
							// socket.emit('createInvite');
						}
					});
				} catch (err) {
					console.log('[UUID] Error parsing JSON: ', err);
				}
			}
		});
	});

	// TODO: Saved Servers
	/*
	socket.on('saved-servers-list', (username) => {
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					// let savedServers = data[username].savedServers;
					let serverList = [];

					for (let i = 0; i < savedServers.length; i++)
					fs.writeFile('./server-list.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Server invite successfully created.');
							socket.emit('savedServers', testArray);
						}
					});
				} catch (err) {
					console.log('[SAVED SERVERS] Error parsing JSON: ', err);
				}
			}
		});
	});
	*/

	// TODO: Switches Channel
	socket.on('join-room', (room) => {
		socket.join(room);
		channel = room; // Used in 'send-chat-message'.
		//console.log(`User joined ${room}.`)
	});

	// TODO: Leaves Channel
	socket.on('leave-room', (room) => {
		socket.leave(room);
		//console.log(`User left ${room}.`)
	});

	// TODO: Sends message to front with username and adds it to log.
	socket.on('send-chat-message', (message) => {
		socket.to(channel).emit('chatMessage', {username: username, message:message}); // Sends to everyone BUT yourself, for lag purposes.
		//console.log("Server message: ", {username: username, message: message}); // this prints correctly

		fs.appendFile('messages.log', username + ": "+ message + "\n", err => {
			if (err) {
				console.log(err)
			} else {
				console.log('Text added to log.');
			}
		});
	});

	// User disconnects
	socket.on('disconnect', () => {
		console.log('user disconnected');
		socket.broadcast.emit('user-disconnected', username);
	});
});

// !SECTION —————————————————————————————————————————————————————————————*/