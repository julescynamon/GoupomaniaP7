import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../Actions/post.actions";

export default function Delete(props) {
	const dispatch = useDispatch();

	const deleteQuote = () => dispatch(deletePost(props.id));

	return (
		<div
			onClick={() => {
				if (
					window.confirm("Voulez-vous vraiment supprimer ce post ?")
				) {
					deleteQuote();
				}
			}}
		>
			<img src='./img/icons/trash.svg' alt='poubelle' />
		</div>
	);
}
