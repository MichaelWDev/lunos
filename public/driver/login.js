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

	newClient.login(emailInput.value, passwordInput.value);
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

// ANCHOR: BACK
function back() {
	newClient.setPage('#home');
}

//——— !SECTION —————————————————————————————————————————————————————————————//

//——————————————————————————————————————————————————————————————————————————//
//—— SECTION: DRIVERS
//——————————————————————————————————————————————————————————————————————————//

const newClient = new Client();

//——— !SECTION —————————————————————————————————————————————————————————————//