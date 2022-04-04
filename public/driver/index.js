//—————————————————————————————————————————————————————————————————————————//
//—— SECTION INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles every HTML onclick operation in INDEX.HTML.

//——— !SECTION ————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// ANCHOR: HOME BUTTON (LUNOS)
function home() {
	client.setPage('#home');
}

// ANCHOR: PAGE URL
window.onload = function() {
	setTimeout(client.setPage(window.location.hash), 1000);

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