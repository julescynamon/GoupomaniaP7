// Fonction pour pouvoir afficher une date comprehensible lors de l'affichage des posts et pouvoir trier ces posts du plus recent au plus ancien
export const dateParser = (num) => {
	let options = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	let timestamp = Date.parse(num);

	let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

	return date.toString();
};

// Fonction pour pouvoir afficher une date comprehensible lors de l'ajout d'un post
export const timestampParser = (num) => {
	let options = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	let date = new Date(num).toLocaleDateString("fr-FR", options);

	return date.toString();
};

// Foncton pour savoir si lorsque j'appel un store il est vide ou pas
export const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};
