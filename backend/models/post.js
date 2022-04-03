class postCreate {
	constructor(titre, message, picture, likers) {
		(this.titre = titre),
			(this.message = message),
			(this.picture = picture),
			(this.likers = likers);
	}
}

module.exports = postCreate;
