//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// Handles every HTML onclick in LOGIN.HTML.

//——— !SECTION ————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION: FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// ANCHOR: LOGIN
function login() {
	let emailInput    = document.getElementById('email-input');
	let passwordInput = document.getElementById('password-input');

	events.socket.emit('login', emailInput.value, passwordInput.value);
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

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const events = new Events();

//——— !SECTION —————————————————————————————————————————————————————————————//