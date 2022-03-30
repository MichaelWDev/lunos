//—————————————————————————————————————————————————————————————————————————//
//—— SECTION INFORMATION
//—————————————————————————————————————————————————————————————————————————//

// This script handles all HTML onclick operations within INDEX.HTML.

//——— !SECTION ————————————————————————————————————————————————————————————//

//—————————————————————————————————————————————————————————————————————————//
//—— SECTION FUNCTIONS
//—————————————————————————————————————————————————————————————————————————//

// ANCHOR: CHANGE PAGES
function setPage(newHash = "#home") { // Default iframe
	let docContent = document.getElementById("main-iframe");
	docContent.src = `./html/${newHash.substring(1)}.html`;

	let getLinks = document.getElementById("top-nav").getElementsByTagName("a");
	let pageLink = document.getElementById("top-nav").querySelectorAll(`a[href="${newHash}"]`);

	for (let i = 0; i < getLinks.length; ++i) {
		getLinks[i].classList.add("btn-active");
	}

	if (pageLink[0]) {pageLink[0].classList.remove("btn-active");}
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