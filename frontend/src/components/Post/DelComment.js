import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { deleteComment } from "../../Actions/comment.actions";

export default function DelComment(comment, idPOST) {
	const [isAuthor, setIsAuthor] = useState(false);
	const uid = useContext(UidContext);
	const dispatch = useDispatch();

	const handleDelete = () => dispatch(deleteComment(idPOST, comment.idCOM));

	useEffect(() => {
		const checkAuthor = () => {
			if (uid === comment.idCreateur) {
				setIsAuthor(true);
			}
		};
		checkAuthor();
	}, [uid, comment.idCreateur]);

	return (
		<div className='btn'>
			{isAuthor === false && (
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
