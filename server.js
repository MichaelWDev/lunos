


// Get readline module.
const readline = require('readline').createInterface({input: process.stdin, output: process.stdout});

// Create an Express app/
const express = require("express");
const app     = express();

// Variables
const server  = require("http").Server(app);
const port    = 3000;
const io      = require('socket.io')(server);
const fs      = require('fs');
const users   = {};
let userList  = [];

// Chat App
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
	
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]); // Emits username to client successfully.
		console.log('user ' + users[socket.id] + ' disconnected');
		userList.splice(userList.indexOf(socket.id), userList.indexOf(socket.id)); // Removes username from the right.
		delete users[socket.id];
  });
});

// Log errors.
process.on('uncaughtException', function (err) {
	console.log('Uncaught exception: ' + err.stack); // Log the error.
	shutdown(); // Shut down the server.
});

// Use the Express-static middleware.
app.use("/", express.static("public"));

// Start the server listening for requests.
let server = app.listen(process.env.PORT || 3000, () => console.log("SERVER OPEN ON PORT " + (process.env.PORT || 3000)));

// Shuts down the server.
function shutdown() {
	if (!server || server.closing) {
		console.log("Shutdown forced.");
		process.exit(42);
	} else {
		console.log('Shutting down...');
		// Close server.
		server.close(() => {
			// Close process with success.
			console.log("Server shut down.");
			process.exit(0);
		});

		// Handle timeouts.
		setTimeout(() => {
			console.log("Shutdown timed out.");
			process.exit(0);
		}, 1000);
	}
}

// Console input handling.
readline.on('line', (input) => {
	switch (input) {
		case "shutdown": case "exit": case "close": case "stop": // Shuts down the server.
			shutdown();
			break;
		case "forcekill": case "kill": case "forcestop": case "forceclose": // Force kills the server.
			process.exit(0);
			break;
		default: // Unrecognized command.
			console.log("Unrecognized command.");
	}
});

// Shutdown signals.
process.on("SIGTERM", shutdown);
process.on("SIGINT",  shutdown);
