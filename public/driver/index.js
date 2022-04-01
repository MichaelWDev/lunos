//—————————————————————————————————————————————————————————————————————————//
//—— SECTION INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles every HTML onclick operation in INDEX.HTML.

//——— !SECTION ————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// NOTE: Should I move these to client.js, since they technically operate stuff on the client-side of things.
// ANCHOR: CHANGE PAGES
function setPage(newHash = '#home') { // Default iframe
	let docContent = document.getElementById('main-iframe');
	console.log("IFRAME: ", docContent)
	docContent.src = `./html/${newHash.substring(1)}.html`;
	console.log("IFRAME SRC: ", docContent.src);

	let getLinks = document.getElementById("top-nav").getElementsByTagName("a");
	let pageLink = document.getElementById("top-nav").querySelectorAll(`a[href="${newHash}"]`);

	for (let i = 0; i < getLinks.length; ++i) {
		getLinks[i].classList.add("btn-active");
	}

	if (pageLink[0]) {
		pageLink[0].classList.remove("btn-active");
	}
}

// ANCHOR: PAGE URL
window.onload = function() {
	setPage(window.location.hash);

	if ("onhashchange" in window) { // On hash change event supported.
		window.onhashchange = function () {
			setPage(window.location.hash);
		}
	}
	else { // event not supported:
		let storedHash = window.location.hash;
		window.setInterval(function () {
			if (window.location.hash != storedHash) {
				storedHash = window.location.hash;
				setPage(storedHash);
			}
		}, 100);
	}
}

//——— !SECTION ————————————————————————————————————————————————————————————//

// NOTE: Export doesn't work either.
// export {setPage};
// const events = new Events();
// const client = new Client();

/* TODO: Fix this. Doesn't work for some reason.
// NOTE: I wouldn't be stuck in [client] login() if this just worked, but it doesn't.
events.socket.on('accountSuccessful', () => {
	console.log("SETTING PAGE TO CHAT")
	//setPage('#chat')
});
*/