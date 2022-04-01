class postCreate {
	constructor(userId, titre, message, picture, likers) {
		(this.userId = userId),
			(this.titre = titre),
			(this.message = message),
			(this.picture = picture),
			(this.likers = likers);
	}
}

module.exports = postCreate;
