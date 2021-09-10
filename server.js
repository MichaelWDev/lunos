/*———————————————————————————————————————*/
/* SECTION: Variables	                 */
/*———————————————————————————————————————*/

const express = require("express");
const app     = express();
const server  = require("http").Server(app);
const port    = 3000;
const io      = require('socket.io')(server);
const fs      = require('fs');
const users   = {};
let userList  = [];
let accounts  = fs.readFileSync('accounts.json');


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


		console.log("Login:" + "\n" + "username: " + username + "\n" + "password: " + password);
	});

	// Account Register
	socket.on("register", function(username, password) {


		console.log("Register:" + "\n" + "username: " + username + "\n" + "password: " + password);
	});
	
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]); // Emits username to client successfully.
		console.log('user ' + users[socket.id] + ' disconnected');
		userList.splice(userList.indexOf(socket.id), userList.indexOf(socket.id)); // Removes username from the right.
		delete users[socket.id];
  });
});