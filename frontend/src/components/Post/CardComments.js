import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { getComments } from "../../Actions/comment.actions";

export default function CardComments() {
	const [text, setText] = useState("");
	const [loadComments, setLoadComments] = useState(true);
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);
	const commentData = useSelector((state) => state.commentReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loadComments) {
			dispatch(getComments());
			setLoadComments(false);
		}
	}, [loadComments, dispatch]);

	const handleComment = (e) => {
		e.preventDefault();

		if (text) {
		}
	};

	return (
		<div className='comments-container'>
			{!isEmpty(commentData[0]) &&
				commentData.map((comment) => {
					return (
						<div
							className={
								comment.idCOM === userData.IdUSER
									? "comment-container client"
									: "comment-container"
							}
							key={comment.idCOM}
						>
							<div className='left-part'>
								<img
									src={
										!isEmpty(usersData[0]) &&
										usersData
											.map((user) => {
												if (
													user.idUSER ===
													comment.idCreateur
												) {
													return user.picture;
												} else {
													return null;
												}
											})
											.join("")
									}
									alt=''
								/>
							</div>
							<div className='right-part'>
								<div className='comment-header'>
									<div className='pseudo'>
										<h3>{comment.commentPseudo}</h3>
										<span>
											{timestampParser(comment.timestamp)}
										</span>
									</div>
									<p>{comment.message}</p>
								</div>
							</div>
						</div>
					);
				})}
			{userData.IdUSER && (
				<form
					action=''
					onSubmit={handleComment}
					className='comment-form'
				>
					<input
						type='text'
						name='text'
						onChange={(e) => {
							setText(e.target.value);
						}}
						placeholder='Laissez un commentaire'
					/>
					<br />
					<input type='submit' value='Envoyer' />
				</form>
			)}
		</div>
	);
}
