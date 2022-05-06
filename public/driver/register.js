//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles all HTML onclick operations within REGISTER.HTML.

//——— !SECTION —————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

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
			client.accountSuccessful(usernameInput.value);
		} else { // Failure
			console.log("Result NOT received.");
		}
	});
}

// ANCHOR: BACK
function registerBack() {
	let loginPage = document.getElementById('login-page');
	let registerPage = document.getElementById('register-page');

	registerPage.classList.add('hide');
	loginPage.classList.remove('hide');
}

//——— !SECTION —————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//


//——— !SECTION —————————————————————————————————————————————————————————————//