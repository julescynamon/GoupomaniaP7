import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";

import Delete from "./Delete";

export default function Card({ post }) {
	const [isLoading, setIsLoading] = useState(true);
	const [showComments, setShowComments] = useState(false);

	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);
	const idPOST = post.idPOST;
	const commentData = useSelector((state) =>
		state.commentReducer.filter(
			(comment) => comment.idPublication === idPOST,
		),
	);

	const nbComment = commentData.length || post.totalComments;

	useEffect(() => {
		!isEmpty(usersData[0]) && setIsLoading(false);
	}, [usersData]);

	return (
		<li className='card-container' key={post.idPOST}>
			{isLoading ? (
				<i className='fas fa-spinner fa-spin'></i>
			) : (
				<>
					<div className='card-left'>
						<img
							src={
								!isEmpty(usersData[0]) &&
								usersData
									.map((user) => {
										if (user.idUSER === post.userId ) {
											if(user.picture !== null){
												return user.picture
											} else {
												return "./uploads/profil/random-user.png";
											} 
										} else {
											return null;
										}
									})
									.join("")
							}
							alt=''
						/>
					</div>
					<div className='card-right'>
						<div className='card-header'>
							<div className='pseudo'>
								<h3>
									{!isEmpty(usersData[0]) &&
										usersData
											.map((user) => {
												if (
													user.idUSER === post.userId
												) {
													return user.username;
												} else {
													return null;
												}
											})
											.join("")}
								</h3>
							</div>
							<span>{dateParser(post.timestamp)}</span>
						</div>
						<p>{post.message}</p>
						{post.picture && (
							<img
								src={post.picture}
								alt=''
								className='card-pic'
							/>
						)}
						{userData.IdUSER === post.userId && (
							<div className='button-container'>
								<Delete id={idPOST} />
							</div>
						)}
						<div className='card-footer'>
							<div className='comment-icon'>
								<img
									onClick={() => {
										setShowComments(!showComments);
									}}
									src='./img/icons/message1.svg'
									alt=''
								/>
								<span>{nbComment}</span>
							</div>
							<div>
								<img src='./img/icons/heart.svg' alt='' />
							</div>
							<img src='./img/icons/share.svg' alt='share' />
						</div>
						{showComments && <CardComments post={post} />}
					</div>
				</>
			)}
		</li>
	);
}
