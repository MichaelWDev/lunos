/*———————————————————————————————————————*/
/* SECTION: Global Variables	         */
/*———————————————————————————————————————*/

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const port    = 1500;
const io      = require('socket.io')(server);

// NOTE: Password Encryption
const bcrypt = require('bcrypt');

const fs = require('fs');

/*———————————————————————————————————————*/
/* SECTION: IO's & Sockets               */
/*———————————————————————————————————————*/

// Serve the static website files.
app.use(express.static('public'));

// Starts the server.
server.listen(port, function () {
	console.log('Server is running on port ' + port);
});

// Server
io.on('connection', function(socket) {
	let username;
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
					username = data[email].username;
					

				} catch (err) {
					console.log('Error parsing JSON: ', err);
				}
			}
		});
	}

	// TODO: User Connection
	socket.on('new-user', username => {
		socket.emit('user-list', users); // Sends a full list of current users to the client when they join. (Minus their own.)
		socket.broadcast.emit('user-connected', username);
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
							socket.emit('login-successful', username);
						} else {
							socket.emit('login-unsuccessful');
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
							socket.emit('account-succesful');
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
							socket.emit('server-creation-succesful', serverName);
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
		socket.emit('server-code', serverCode);

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
							// socket.emit('invite-succesful');
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
							socket.emit('saved-servers', testArray);
						}
					});
				} catch (err) {
					console.log('[SAVED SERVERS] Error parsing JSON: ', err);
				}
			}
		});
	});
	*/

	// TODO: Sends message to front with username and adds it to log.
	socket.on('send-chat-message', (message) => {
		socket.broadcast.emit('chat-message', message); // Sends to everyone BUT yourself, for lag purposes.

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