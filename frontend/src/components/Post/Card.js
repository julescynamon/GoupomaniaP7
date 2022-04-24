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
	const commentData = useSelector((state) => state.commentReducer);

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
										if (user.idUSER === post.userId) {
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
								<Delete id={post.idPOST} />
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
								<span>
									{!isEmpty(commentData[0]) &&
										commentData.map((comment) => {
											return comment.length;
										})}
								</span>
							</div>
							<h6>Like icons</h6>
							<img src='./img/icons/share.svg' alt='share' />
						</div>
						{showComments && <CardComments post={post} />}
					</div>
				</>
			)}
		</li>
	);
}
