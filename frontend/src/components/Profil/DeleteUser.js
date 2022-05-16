import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../Actions/user.actions";
import cookie from "js-cookie";

export default function Delete(props) {
	const dispatch = useDispatch();
	const deleteFonc = () => dispatch(deleteUser(props.id));
	const removeCookie = (key) => {
		cookie.remove(key, { expires: 1 });
	};

	return (
		<div
			onClick={() => {
				if (
					window.confirm(
						"Voulez-vous vraiment supprimer votre profil ?",
					)
				) {
					deleteFonc();
					removeCookie("jwt");
					window.location = "/";
				}
			}}
		>
			Supprimer mon Compte
		</div>
	);
}
