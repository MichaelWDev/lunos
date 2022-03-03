//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles all HTML onclick operations within LOGIN.HTML.

//——— !SECTION —————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// ANCHOR: LOGIN
function login() {
	let emailInput    = document.getElementById('email-input');
	let passwordInput = document.getElementById('password-input');

	socket.emit('login', emailInput.value, passwordInput.value);
}

// ANCHOR: SHOW LOGIN PASSWORD
function showPassword() {
	let passwordInput = document.getElementById('password-input');

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
	} else {
		passwordInput.type = 'password';
	}
}

//——— !SECTION —————————————————————————————————————————————————————————————//