//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles all HTML onclick operations within REGISTER.HTML.

//——— !SECTION —————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// ANCHOR: SHOW REGISTER PASSWORD
function showPassword() {
	let passwordInput = document.getElementById('register-password-input');

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
	} else {
		passwordInput.type = 'password';
	}
}

// ANCHOR: VALIDATE REGISTER
function validatePassword() {
	let idList = ['register-email-input', 'register-username-input', 'register-password-input'];

	for (let i = 0; i < idList.length; i++) {
		let currentElement = document.getElementById(idList[i]);

		if (!currentElement.validity.valid) {
			// Invalid input, breaks.
			return false;
		   }
	}

	// Valid input, continue.
	return true;
}

// ANCHOR: CREATE ACCOUNT
function createAccount() {
	let emailInput    = document.getElementById('register-email-input');
	let usernameInput = document.getElementById('register-username-input');
	let passwordInput = document.getElementById('register-password-input');

	// NOTE: Sends data to server using events.js.
	events.socket.emit('register', emailInput.value, usernameInput.value, passwordInput.value, (res) => {
		// Success
		if (res) {
			console.log("Result received. ", res);
			client.accountSuccessful();
		} else { // Failure
			console.log("Result NOT received.");
		}
	});
}

//——— !SECTION —————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const events = new Events();

//——— !SECTION —————————————————————————————————————————————————————————————//