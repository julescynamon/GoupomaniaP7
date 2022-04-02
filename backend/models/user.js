class userModel {
	constructor(userName, email, password, bio, picture) {
		(this.userName = userName),
			(this.email = email),
			(this.password = password),
			(this.bio = bio),
			(this.picture = picture);
	}
}

module.exports = userModel;
