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
	newEvent.socket.emit('register', emailInput.value, usernameInput.value, passwordInput.value, (res) => {
		// Success
		if (res) {

		} else { // Failure
			
		}
	});
}

//——— !SECTION —————————————————————————————————————————————————————————————//