/*———————————————————————————————————————*/
/* SECTION: Variables	                 */
/*———————————————————————————————————————*/

const express = require("express");
const app     = express();
const server  = require("http").Server(app);
const port    = 3000;
const io      = require('socket.io')(server);
const users   = {};
let userList  = [];

const fs = require('fs');

/*
fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
	if (err) {
		console.log(err);
	} else {
		try {
			const data = JSON.parse(jsonString);
			console.log(data.password);
	
		} catch (err) {
			console.log("Error parsing JSON: ", err)
		}
	}
});

const accountObject = {
	username: username,
	password: password
};

fs.writeFile('./accounts.json', JSON.stringify(accountObject, null, 2), err => {
	if (err) {
		console.log(err)
	} else {
		console.log('File successfully written!');
	}
});

jsonReader('./accounts.json', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		data.username = username;
		data.password = password; 
		fs.writeFile('./accounts.json', JSON.stringify(data, null, 2), err => {
			if (err) {
				console.log(err);
			}
		});
	}
});
*/


/*———————————————————————————————————————*/
/* SECTION: IO's & Sockets               */
/*———————————————————————————————————————*/


// Serve the static website files.
app.use(express.static("public"));

// Starts the server.
server.listen(port, function () {
	console.log("Server is running on "+ port +" port");
});

// Server
io.on('connection', function(socket){
	console.log("user connected");

	socket.on('new-user', username => {
		socket.emit('user-list', users); // Sends a full list of current users to the client when they join. (Minus their own.)
		users[socket.id] = username; // users[socket.id] <<<< this is the username for a user.
		socket.broadcast.emit('user-connected', username);
		console.log(username); // this one does.
	});

	socket.on('send-chat-message', message => {
		socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});

		fs.appendFile('message.txt', users[socket.id] + ": "+ message + "\n", function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});

	// Account Login
	socket.on("login", function(username, password) {
		/*
		TODO: Go through every account.

		TODO: Verify that entered account matches a saved username.

		TODO: Verify the entered password matches the saved password.

		TODO: If name does not exist, display: "Username or password is incorrect."
		
		TODO: If password is entered incorrectly, display: "Username or password is incorrect."
		*/
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					console.log(data);

					if (data[username] != username || data[password] != password ) {
						socket.emit("login-unsuccessful");
						console.log("login-unsuccessful");
					} else {
						socket.emit("login-successful");
						console.log("login-successful");
					}

				} catch (err) {
					console.log("Error parsing JSON: ", err)
				}
			}
		});

		console.log("Login:" + "\n" + "username: " + username + "\n" + "password: " + password);
	});

	// Account Register
	socket.on("register", function(username, password) {
		
		fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
			if (err) {
				console.log(err);
			} else {
				try {
					const data = JSON.parse(jsonString);
					console.log(data);
					data[username] = {username: username, password: password};

					fs.writeFile('./accounts.json', JSON.stringify(data, null, 2), err => {
						if (err) {
							console.log(err)
						} else {
							console.log('File successfully written!');
						}
					});

				} catch (err) {
					console.log("Error parsing JSON: ", err)
				}
			}
		});


	});
	
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]); // Emits username to client successfully.
		console.log('user ' + users[socket.id] + ' disconnected');
		userList.splice(userList.indexOf(socket.id), userList.indexOf(socket.id)); // Removes username from the right.
		delete users[socket.id];
  });
});