//———————————————————————————————————————————————————————————————————————//
// SECTION: INFORMATION
//———————————————————————————————————————————————————————————————————————//

// Author:      Michael Woodyard
// Email:       michaelwdev@outlook.com
// Description: Handles server code.

//—— !SECTION ———————————————————————————————————————————————————————————//

//———————————————————————————————————————————————————————————————————————//
// SECTION: VARIABLES
//———————————————————————————————————————————————————————————————————————//

const express     = require('express');
const app         = express();
const server      = require('http').Server(app);
const port        = 3000;
const io          = require('socket.io')(server);
const compression = require("compression");

// ANCHOR: PASSWORD ENCRYPTION
const bcrypt = require('bcrypt');
const fs     = require('fs');

//—— !SECTION ———————————————————————————————————————————————————————————//

//———————————————————————————————————————————————————————————————————————//
// SECTION: SERVER
//———————————————————————————————————————————————————————————————————————//

// Compress client-server communications.
app.use(compression());

// Serve the static website files.
app.use(express.static('public'));

// LOGIN
app.get("/login",   (req, res) => {
	res.sendFile(__dirname + "/public/html/login.html");
});

// REGISTER
app.get("/register",   (req, res) => {
	res.sendFile(__dirname + "/public/html/register.html");
});

// chat
app.get("/chat",   (req, res) => {
	res.sendFile(__dirname + "/public/html/chat.html");
});

// Starts the server.
server.listen(port, function () {
	console.log('Server is running on port ' + port);
});

// ANCHOR: SERVER
io.on('connection', function(socket) {
	var username;
	var channel;
	console.log('user connected');

	// ANCHOR: UNIQUE ID
	function uniqueID() {
		let uniqueNumbers = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
		return uniqueNumbers = uniqueNumbers.toString();
	}

	/* ANCHOR: USER DATA
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
	}*/

	/* ANCHOR: USER LIST
	socket.on('new-user', async (username) => {
		console.log('[server.js] socket.on new-user()')
		//socket.broadcast.emit('userList', username);
		//socket.to(channel).emit('chat-message', message);
	});*/

	// ANCHOR: LOGIN
	socket.on('login', async (email, password) => {
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data          = JSON.parse(jsonString);
					username            = data[email].username;
					let accountPassword = data[email].password;

					bcrypt.compare(password, accountPassword, function(err, result) {
						if (err) {
							console.log("Error: " + error);
						}

						if (result && data[email]) {
							console.log('username: ', username)
							socket.emit('loginSuccessful', username);
							socket.broadcast.emit('addUserToList', username); // THIS WORKS!
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

	// ANCHOR: USER JOINED
	// TODO: What if I emitted addUserToList in login? ^^^^ (!!!WORKS!!!)
	socket.on('user-joined', async () => {
		console.log('[server.js] user-joined, sends ', username, ' to addUserToList')
		socket.broadcast.emit('addUserToList', username); // THIS DOESN'T WORK
	});

	// ANCHOR: REGISTER ACCOUNT
	socket.on('register', async (email, username, password, callback) => {
		const hashedPassword = await bcrypt.hash(password, 10);

		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data  = JSON.parse(jsonString);
					let uuid    = uniqueID().substring(0, 12);
					data[email] = {
						email: email,
						username: username,
						password: hashedPassword,
						savedServers: null,
						serversBannedFrom: null,
						uuid: uuid
					};

					fs.writeFile('./accounts.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Account successfully added.');
							callback(true);
							
							// TODO: callback(false) use this for failed validation (check if account already exists)
						}
					});
				} catch (err) {
					console.log('[REGISTER] Error parsing JSON: ', err);
				}
			}
		});
	});

	/* ANCHOR: USER JOINS SERVER
	socket.on('join-server', (serverCode) => {
		// let savedServers = null;
		let serversBannedFrom = data[email].serversBannedFrom;
		checkUserData(serversBannedFrom);

		/* TODO (LATER): When a user joins, check:
			Later: server-list for correct invite code.
			server-list permissions if server is/is not private.
			server-list bannedUsers if they were banned.
		
	});*/

	/* ANCHOR: CREATE SERVER
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
	});*/

	/* ANCHOR: UNIQUE INVITE ID
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
	});*/

	/* ANCHOR: USER'S SERVERS
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

	// ANCHOR: LEAVE CHANNEL
	socket.on('leave-room', (room) => {
		socket.leave(room);
		console.log(`User left ${room}.`)
	});

	// ANCHOR: SWITCH CHANNEL
	socket.on('join-room', (room) => {
		socket.join(room);
		channel = room; // Used in 'send-chat-message'.
		console.log(`User joined ${room}.`)
	});

	// ANCHOR: SEND MESSAGE / LOG MESSAGE
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

	// ANCHOR: USER DISCONNECTS
	socket.on('disconnect', () => {
		console.log('user disconnected');
		socket.broadcast.emit('user-disconnected', username);
	});
});

//—— !SECTION ———————————————————————————————————————————————————————————//