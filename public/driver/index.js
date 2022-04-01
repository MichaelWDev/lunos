//—————————————————————————————————————————————————————————————————————————//
//—— SECTION INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles every HTML onclick operation in INDEX.HTML.

//——— !SECTION ————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

function home() {
	client.setPage('#home');
}

// ANCHOR: PAGE URL
window.onload = function() {
	client.setPage(window.location.hash);

	if ("onhashchange" in window) { // On hash change event supported.
		window.onhashchange = function () {
			client.setPage(window.location.hash);
		}
	}
	else { // event not supported:
		let storedHash = window.location.hash;
		window.setInterval(function () {
			if (window.location.hash != storedHash) {
				storedHash = window.location.hash;
				client.setPage(storedHash);
			}
		}, 100);
	}
}

//——— !SECTION ————————————————————————————————————————————————————————————//

// let client = new Client();