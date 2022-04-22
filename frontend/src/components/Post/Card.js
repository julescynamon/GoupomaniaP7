import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

export default function Card({ post }) {
	const [isLoading, setIsLoading] = useState(true);
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);

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
						<div className='card-footer'>
							<div className='comment-icon'>
								<img src='./img/icons/message1.svg' alt='' />
							</div>
						</div>
					</div>
				</>
			)}
		</li>
	);
}
