//—————————————————————————————————————————————————————————————————————————//
//—— SECTION INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles all HTML onclick operations within JAVASCRIPT.HTML.

//——— SECTION —————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// SECTION: LOGIN
function login() {
	let emailInput    = document.getElementById('email-input');
	let passwordInput = document.getElementById('password-input');

	socket.emit('login', emailInput.value, passwordInput.value);
}

// SECTION: SHOW PASSWORD
function showPassword() {
	let passwordInput = document.getElementById('password-input');

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
	} else {
		passwordInput.type = 'password';
	}
}

//——— SECTION —————————————————————————————————————————————————————————————//