import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { getComments, postComments } from "../../Actions/comment.actions";
import { getPosts } from "../../Actions/post.actions";
import DelComment from "./DelComment";

export default function CardComments({ post }) {
	const [text, setText] = useState("");
	const [loadComments, setLoadComments] = useState(true);
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);
	const idPOST = post.idPOST;
	const commentData = useSelector((state) =>
		state.commentReducer.filter(
			(comment) => comment.idPublication === idPOST,
		),
	);
	const dispatch = useDispatch();

	const idUSER = userData.IdUSER;
	const username = userData.username;

	useEffect(() => {
		if (loadComments) {
			dispatch(getComments(idPOST));
			setLoadComments(true);
		}
	}, [loadComments, dispatch, idPOST]);

	const handleComment = (e) => {
		e.preventDefault();

		if (text) {
			dispatch(postComments(idPOST, idUSER, username, text))
				.then(() => dispatch(getPosts()))
				.then(() => setText(""))
				.then(() => dispatch(getComments(idPOST)));
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
									</div>
									<span>
										{timestampParser(comment.timestamp)}
									</span>
								</div>
								<p>{comment.message}</p>
								<DelComment comment={comment} idPOST={idPOST} />
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
						value={text}
						placeholder='Laisser un commentaire'
					/>
					<br />
					<input type='submit' value='Envoyer' />
				</form>
			)}
		</div>
	);
}
