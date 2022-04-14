import React, { useState, useEffect } from "react";
import Routes from "./Components/Routes/Index";
import { UidContext } from "./Components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./Actions/user.actions";

export default function App() {
	const [uid, setUid] = useState(null);
	const dispatch = useDispatch();
	// On controlle le token de l'utilisateur grace a useEffect a chaque fois que l'on va lancer un component de APP
	useEffect(() => {
		const fetchToken = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					setUid(res.data.id);
					console.log(res.data.id);
				})
				.catch((err) => console.log("No token"));
		};
		fetchToken();

		if (uid) {
			dispatch(getUser(uid));
		}
	}, [uid, dispatch]);

	return (
		// on utilise UidContext pour garder en memoire le token de notre utilisateur pour eviter de demander a chaque fois a l'api si l'utilisateur est autorise
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
}
