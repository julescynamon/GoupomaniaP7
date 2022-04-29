import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { deleteComment } from "../../Actions/comment.actions";
import { getPosts } from "../../Actions/post.actions";

export default function DelComment({ comment, idPOST }) {
	const uid = useContext(UidContext);
	const dispatch = useDispatch();
	const idCOM = comment.idCOM;

	console.log("comment", comment);
	console.log(uid);

	const handleDelete = () =>
		dispatch(deleteComment(idPOST, idCOM)).then(() => dispatch(getPosts()));

	return (
		<div className='btn'>
			{uid === comment.idCreateur && (
				<span
					onClick={() => {
						if (
							window.confirm(
								"Voulez-vous supprimer ce commentaire ?",
							)
						) {
							handleDelete();
						}
					}}
				>
					<img src='./img/icons/trash.svg' alt='delete' />
				</span>
			)}
		</div>
	);
}
