/*———————————————————————————————————————*/
/* SECTION: Global Variables	         */
/*———————————————————————————————————————*/

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const port    = 80;
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
	console.log('Server is running on '+ port +' port');
});

// Server
io.on('connection', function(socket) {
	let username;
	console.log('user connected');

	// TODO
	// NOTE: User Connection
	socket.on('new-user', username => {
		socket.emit('user-list', users); // Sends a full list of current users to the client when they join. (Minus their own.)
		socket.broadcast.emit('user-connected', username);
	});

	// NOTE: Account Login
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

	// NOTE: Account Register
	socket.on('register', async (email, username, password) => {
		const hashedPassword = await bcrypt.hash(password, 10);

		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					data[email] = {email: email, username: username, password: hashedPassword};

					fs.writeFile('./accounts.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('Account successfully added.');
						}
					});
				} catch (err) {
					console.log('[REGISTER] Error parsing JSON: ', err);
				}
			}
		});
	});

	// Sends the message back to front with username and adds it to the log.
	socket.on('send-chat-message', (message) => {
		socket.broadcast.emit('chat-message', username, message);

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