class Buttons {
	constructor() {
		// Buttons
		this.logBtn                 = document.getElementById('log-btn');
		this.regBtn                 = document.getElementById('reg-btn');
		this.homeBtn                = document.getElementById('home-btn');
		this.aboutBtn               = document.getElementById('about-btn');
		this.contactBtn             = document.getElementById('contact-btn');
		this.joinServerBtn          = document.getElementById('join-server-btn');
		this.createServerBtn        = document.getElementById('create-server-btn');
		this.joinBtn                = document.getElementById('join-btn');
		this.createBtn              = document.getElementById('create-btn');

		// Admin Panel
		this.adminPanel             = document.getElementById('admin-panel');
		this.adminDashboard         = document.getElementById('admin-dashboard');
		this.adminStatistics        = document.getElementById('admin-statistics');
		this.adminBanUnbanUser      = document.getElementById('admin-ban-unban-user');
		this.adminLog               = document.getElementById('admin-log');

		// Pages
		this.homePage               = document.getElementById('home-page');
		this.aboutPage              = document.getElementById('about-page');
		this.supportPage            = document.getElementById('support-page');
		this.loginRegisterPage      = document.getElementById('login-register-page');
		this.registerPage           = document.getElementById('register-page');
		this.btnBox                 = document.getElementById('btn-box');

		// Inputs
		this.chatBarInput           = document.getElementById('chat-bar-input');
		this.emailInput             = document.getElementById('email-input');
		this.usernameInput          = document.getElementById('username-input');
		this.passwordInput          = document.getElementById('password-input');
		this.joinServerInput        = document.getElementById('join-server-input');
		this.createServerInput      = document.getElementById('create-server-input');

		// Containers
		this.userContainer          = document.getElementById('user-container');
		this.channelContainer       = document.getElementById('channel-container');

		// NOTE: Testing Purposes
		this.server1                = document.getElementById('temp-server-1-id');
	}

	// Handles every button.
	button (btn) { // TODO: Re-arrange the buttons so they are organized top to bottom.
		switch(btn) {
			case 1: // Login
				newEvent.socket.emit('login', this.emailInput.value, this.passwordInput.value);
			break;

			case 2: // Register
				// Active Class
				this.logBtn.classList.remove('active-btn');
				this.regBtn.classList.add('active-btn');
				this.homeBtn.classList.remove('active-btn');
				this.aboutBtn.classList.remove('active-btn');
				this.contactBtn.classList.remove('active-btn');

				// Hide Pages
				this.homePage.classList.add('hide');
				this.aboutPage.classList.add('hide');
				this.supportPage.classList.add('hide');
				this.btnBox.classList.add('hide');
				this.loginRegisterPage.classList.remove('hide');
				this.registerPage.classList.remove('hide');
				this.usernameInput.classList.remove('hide');
			break;

			case 3: // Register Account
				validatePassword('register-account');
			break;

			case 4: // Back
				this.btnBox.classList.remove('hide');
				this.registerPage.classList.add('hide');
				this.usernameInput.classList.add('hide');
			break;

			case 5: // Show Password
				if (this.passwordInput.type === 'password') {
					this.passwordInput.type = 'text';
				} else {
					this.passwordInput.type = 'password';
				}
			break;

			case 6: // TODO: Hide Channels
				if (this.channelContainer.classList == 'hide') {
					this.channelContainer.classList.remove('hide');
				} else {
					this.channelContainer.classList.add('hide');
				}
			break;

			case 7: // TODO: Hide Users
				if (this.userContainer.classList == 'hide') {
					this.userContainer.classList.remove('hide');
				} else {
					this.userContainer.classList.add('hide');
				}
			break;

			case 8: // TODO: Copy Username

			break;

			case 9: // TODO: Change Profile Image

			break;

			case 10: // TODO: Profile Settings

			break;

			case 11: // TODO: Send Message
				if (this.chatBarInput.value != '') {
					// TODO: Also have submitting via enter key. (e.keycode = 13)
					newEvent.socket.emit('send-chat-message', this.chatBarInput.value);
					appendMessage(this.chatBarInput.value);
					this.chatBarInput.value = null;
				}
			break;

			case 12: // log-btn
				// Active Class
				this.logBtn.classList.add('active-btn');
				this.regBtn.classList.remove('active-btn');
				this.homeBtn.classList.remove('active-btn');
				this.aboutBtn.classList.remove('active-btn');
				this.contactBtn.classList.remove('active-btn');

				// Hide Pages
				this.homePage.classList.add('hide');
				this.aboutPage.classList.add('hide');
				this.supportPage.classList.add('hide');
				this.loginRegisterPage.classList.remove('hide');
				this.btnBox.classList.remove('hide');
				this.registerPage.classList.add('hide');
				this.usernameInput.classList.add('hide');
			break;

			case 13: // Nav: Home
				// Active Class
				this.logBtn.classList.remove('active-btn');
				this.regBtn.classList.remove('active-btn');
				this.homeBtn.classList.add('active-btn');
				this.aboutBtn.classList.remove('active-btn');
				this.contactBtn.classList.remove('active-btn');

				// Hide Pages
				this.homePage.classList.remove('hide');
				this.aboutPage.classList.add('hide');
				this.supportPage.classList.add('hide');
				this.loginRegisterPage.classList.add('hide');
			break;

			case 14: // Nav: About
				// Active Class
				this.logBtn.classList.remove('active-btn');
				this.regBtn.classList.remove('active-btn');
				this.homeBtn.classList.remove('active-btn');
				this.aboutBtn.classList.add('active-btn');
				this.contactBtn.classList.remove('active-btn');

				// Hide Pages
				this.homePage.classList.add('hide');
				this.aboutPage.classList.remove('hide');
				this.supportPage.classList.add('hide');
				this.loginRegisterPage.classList.add('hide');
			break;

			case 15: // Nav: Contact
				// Active Class
				this.logBtn.classList.remove('active-btn');
				this.regBtn.classList.remove('active-btn');
				this.homeBtn.classList.remove('active-btn');
				this.aboutBtn.classList.remove('active-btn');
				this.contactBtn.classList.add('active-btn');

				// Hide Pages
				this.homePage.classList.add('hide');
				this.aboutPage.classList.add('hide');
				this.supportPage.classList.remove('hide');
				this.loginRegisterPage.classList.add('hide');
			break;

			case 16: // Join Server
				// Active Class
				this.joinServerBtn.classList.add('active-btn');
				this.createServerBtn.classList.remove('active-btn');

				// Hide
				this.joinServerInput.classList.remove('hide');
				this.createServerInput.classList.add('hide');
				this.joinBtn.classList.remove('hide');
				this.createBtn.classList.add('hide');		
			break;
		
			case 17: // Create Server
				// Active Class
				this.joinServerBtn.classList.remove('active-btn');
				this.createServerBtn.classList.add('active-btn');

				// Hide
				this.joinServerInput.classList.add('hide');
				this.createServerInput.classList.remove('hide');
				this.joinBtn.classList.add('hide');
				this.createBtn.classList.remove('hide');
			break;

			case 18: // Join
				newEvent.socket.emit('join-server', joinServerInput.value);
			break;

			case 19: // Create
				newEvent.socket.emit('create-server', createServerInput.value);
			break;

			case 20: // TODO: Server Icon
				// let serverIcon = document.getElementsByClassName('servers-icon');
			break;

			case 21: // Friends List
				if (this.friendsList.classList == 'hide') {
					this.friendsList.classList.remove('hide');
					this.messageFriends.classList.add('hide');
				} else {
					this.friendsList.classList.add('hide');
					this.messageFriends.classList.add('hide');
				}
			break;

			case 22: // TODO: Friend Information

			break;

			case 23: // TODO: Messages
				if (this.messageFriends.classList == 'hide') {
					this.messageFriends.classList.remove('hide');
					this.friendsList.classList.add('hide');
				} else {
					this.messageFriends.classList.add('hide');
				}
			break;

			case 24: // TODO: Open Friend Messages

			break;

			case 25: // Admin Panel

			break;

			case 26: // Admin Dashboard
				this.adminDashboard.classList.remove('hide');
				this.adminStatistics.classList.add('hide');
				this.adminBanUnbanUser.classList.add('hide');
				this.adminLog.classList.add('hide');
			break;

			case 27: // Admin Statistics
				this.adminDashboard.classList.add('hide');
				this.adminStatistics.classList.remove('hide');
				this.adminBanUnbanUser.classList.add('hide');
				this.adminLog.classList.add('hide');
			break;

			case 28: // Admin Ban/Unban
				this.adminDashboard.classList.add('hide');
				this.adminStatistics.classList.add('hide');
				this.adminBanUnbanUser.classList.remove('hide');
				this.adminLog.classList.add('hide');
			break;

			case 29: // Admin Log
				this.adminDashboard.classList.add('hide');
				this.adminStatistics.classList.add('hide');
				this.adminBanUnbanUser.classList.add('hide');
				this.adminLog.classList.remove('hide');
			break;

			case 30: // Admin Exit
				this.adminPanel.classList.add('hide');
			break;

			case 800:
				console.log("TESTING CLASSES")
			break;

			case 999: // NOTE: Enter Lunos
				let serverIcon = document.getElementById('temp-server-id');
				let lunosBtn   = document.getElementById('enter-lunos-btn');

				lunosBtn.classList.add('hide');
				// this.friendsDirect.classList.add('hide');
				serverIcon.classList.add('active-server');
				this.server1.classList.remove('hide');
			break;
		}
	}

	// TODO: Password Validation
	/* TODO: Fix:
		• Have a single function: validate()
		• Have arguments like: validate(optionID, toValidate) or something.
		The first argument is the element or ID e.g. symbolSpan,
		and the second is the thing you put in the if statement.
		If toValidate is true, then get the optionID and turn it green.
		Otherwise, red.
		• Then you can do: validate(symbolSpan, blahblah.match(symbols));

	*/
	validatePassword (registerAccount) {
		const upperCase     = /[A-Z]/g;
		const lowerCase     = /[a-z]/g;
		const symbols       = /\W|_/g;
		const numbers       = /[0-9]/g;
		const emailRegex    = /^\S+@\S+\.\S+$/;
		let emailMatch      = 0;
		let passwordMatch   = 0;

		const securitySpan  = document.getElementById('security-span');
		const characterSpan = document.getElementById('character-span');
		const uppercaseSpan = document.getElementById('uppercase-span');
		const lowercaseSpan = document.getElementById('lowercase-span');
		const symbolSpan    = document.getElementById('symbol-span');
		const numberSpan    = document.getElementById('number-span');

		// NOTE: Validates Character Count
		if (this.passwordInput.value.length >= 8) {
			characterSpan.classList.remove('red');
			characterSpan.classList.add('green');
			
			passwordMatch = passwordMatch + 1;
		} else {
			characterSpan.classList.add('red');
			characterSpan.classList.remove('green');

			passwordMatch = passwordMatch - 1;
		}

		// NOTE: Validates Capital Letters
		if (this.passwordInput.value.match(upperCase)) {
			uppercaseSpan.classList.remove('red');
			uppercaseSpan.classList.add('green');
			
			passwordMatch = passwordMatch + 1;
		} else {
			uppercaseSpan.classList.add('red');
			uppercaseSpan.classList.remove('green');

			passwordMatch = passwordMatch - 1;
		}

		// NOTE: Validates Lowercase Letters
		if (this.passwordInput.value.match(lowerCase)) {
			lowercaseSpan.classList.remove('red');
			lowercaseSpan.classList.add('green');
			
			passwordMatch = passwordMatch + 1;
		} else {
			lowercaseSpan.classList.add('red');
			lowercaseSpan.classList.remove('green');

			passwordMatch = passwordMatch - 1;
		}

		// NOTE: Validates Symbols
		if (this.passwordInput.value.match(symbols)) {
			symbolSpan.classList.remove('red');
			symbolSpan.classList.add('green');
			
			passwordMatch = passwordMatch + 1;
		} else {
			symbolSpan.classList.add('red');
			symbolSpan.classList.remove('green');

			passwordMatch = passwordMatch - 1;
		}

		// NOTE: Validates Numbers
		if (this.passwordInput.value.match(numbers)) {
			numberSpan.classList.remove('red');
			numberSpan.classList.add('green');
			
			passwordMatch = passwordMatch + 1;
		} else {
			numberSpan.classList.add('red');
			numberSpan.classList.remove('green');

			passwordMatch = passwordMatch - 1;
		}

		// NOTE: Validates Email
		if (this.emailInput.value.match(emailRegex)) {
			emailMatch = emailMatch + 1;
		} else {
			emailMatch = emailMatch - 1;
		}

		// TODO: Username validation: Make sure accounts don't have the same username.

		// NOTE: Validation Confirmation
		if (passwordMatch == 5) {
			securitySpan.classList.remove('red');
			securitySpan.classList.add('green');
		} else {
			securitySpan.classList.add('red');
			securitySpan.classList.remove('green');
		}

		// NOTE: Create Account!
		if (passwordMatch == 5 && emailMatch == 1 && registerAccount) {
			newEvent.socket.emit('register', emailInput.value, usernameInput.value, passwordInput.value);
		}
	}
}

let newButton = new Buttons();