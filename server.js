/*———————————————————————————————————————*/
/* SECTION: Variables	                 */
/*———————————————————————————————————————*/

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const port    = 3000;
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
	console.log('user connected');

	socket.on('new-user', username => {
		socket.emit('user-list', users); // Sends a full list of current users to the client when they join. (Minus their own.)
		socket.broadcast.emit('user-connected', username);
		console.log(username);
	});

	socket.on('send-chat-message', (username, message) => {
		socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});

		fs.appendFile('message.txt', username + ': '+ message + '\n', function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});

	// NOTE: Account Login
	socket.on('login', async (email, password) => {
		const hashedPassword = await bcrypt.hash(password, 10);

		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					let username = data[email].username;
					let accountPassword = data[email].password;

					bcrypt.compare(accountPassword, hashedPassword, function(err, result) {
						if (err) {
							console.log("Error: " + error);
						}

						if (result == true && data[email].email == email) {
							socket.emit('login-successful', username);
							console.log(result);
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

	socket.on('send-chat-message', (message) => {
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					let email = data;
					let username = data[email].username;

					socket.broadcast.emit('chat-message', {message: message, name: username});

					fs.appendFile('message.txt', username + ": "+ message + "\n", err => {
						if (err) throw err;
						console.log('Text added to message file.');
					});
				} catch (err) {
					console.log("[SEND-CHAT] Error parsing JSON", err);
				}
			}
		});
	});
});
