import React, { useEffect, useState } from "react";
import Routes from "./Components/Routes/Index";
import { UidContext } from "./Components/AppContext";
import axios from "axios";

export default function App() {
	const [uid, setUid] = useState(null);
	// On controlle le token de l'utilisateur grace a useEffect a chaque fois que l'on va lancer un component de APP
	useEffect(() => {
		const userToken = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					console.log(res);
					setUid(res.data);
				})
				.catch((err) => {
					console.log("pas de token valide");
				});
		};
		userToken();
	}, [uid]);

	return (
		// on utilise UidContext pour garder en memoire le token de notre utilisateur pour eviter de demander a chaque fois a l'api si l'utilisateur est autorise
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
}
