class User {
	constructor(email, name) { // Fires when you want to create a new user object
		this.email = email;
		this.name  = name;
		this.score = 0;
	}
	login(){
		console.log(this.email, 'just logged in.');
		return this;
	}
	logout(){
		console.log(this.email, 'just logged out.');
		return this;
	}
	updateScore(){
		this.score++;
		console.log(this.email, 'score is now ', this.score);
		return this;
	}
}

class Admin extends User {
	deleteUser(user){
		users = users.filter(u => {
			return u.email != user.email;
		});
	}
}

var userOne = new User('michaelwdev@outlook.com', 'Michael');
var userTwo = new User('jamesrbdev@outlook.com', 'James');
var admin = new Admin('mike@test.com', 'mike');

var users = [userOne, userTwo, admin];

admin.deleteUser(userOne);

console.log(users);

// userOne.login().updateScore().updateScore().logout();