//———————————————————————————————————————————————————————————————————————//
// SECTION Information
/*———————————————————————————————————————————————————————————————————————//

Author:      Michael Woodyard
Email:       michaelwdev@outlook.com
Description: Handles client code.

// !SECTION —————————————————————————————————————————————————————————————*/

//———————————————————————————————————————————————————————————————————————//
// SECTION Global Functions
//———————————————————————————————————————————————————————————————————————//

"use strict";

// Returns a random number between min and max.
Math.randomNumber = function(min, max) { // (number, number)
	return Math.floor(Math.random() * ((max + 1) - min) + min);
}

// Binds all methods to their parent class.
globalThis.bindClass = function(toBind) { // (object)
	// Get all defined class methods.
	const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(toBind));

	// Bind all methods.
	methods.filter(method => (method !== 'constructor')).forEach((method) => {if (toBind[method]) {toBind[method] = toBind[method].bind(toBind);}});
}

// !SECTION —————————————————————————————————————————————————————————————//

//———————————————————————————————————————————————————————————————————————//
// SECTION Drivers
//———————————————————————————————————————————————————————————————————————//

// Load in all relevant drivers.
const events = new Events();

// !SECTION —————————————————————————————————————————————————————————————//