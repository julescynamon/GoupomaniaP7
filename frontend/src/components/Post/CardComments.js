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
	const posts = useSelector((state) => state.postReducer);
	const commentData = useSelector((state) => state.commentReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loadComments) {
			dispatch(getComments({ post }));
			setLoadComments(false);
		}
	}, [loadComments, dispatch, post]);

	const handleComment = (e) => {
		e.preventDefault();

		if (text) {
			dispatch(
				postComments(
					posts.idPOST,
					userData.IdUSER,
					commentData.message,
					userData.username,
				),
			)
				.then(() => {
					dispatch(getPosts());
				})
				.then(() => {
					setText("");
				});
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
									<DelComment
										comment={comment}
										idPOST={posts.idPOST}
									/>
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
