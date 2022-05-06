import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../Actions/post.actions";
import { isEmpty } from "./Utils";

export default function Trends() {
	const allPosts = useSelector((state) => state.allPostsReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const trendList = useSelector((state) => state.trendingReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		// fonction pour classer les 3 derniers posts les plus recents en fonctions de leur date d'ajout
		if (!isEmpty(allPosts[0])) {
			const allPostsArr = Object.keys(allPosts).map((i) => allPosts[i]);
			let sortedArray = allPostsArr.sort((a, b) => {
				return b.timestamp - a.timestamp;
			});
			sortedArray.length = 3;
			dispatch(getTrends(sortedArray));
		}
	}, [allPosts, dispatch]);
	return (
		<div className='trending-container'>
			<h4>News</h4>
			<NavLink exact to='trending'>
				<ul>
					{trendList.length &&
						trendList.map((post) => {
							return (
								<li key={post.idPOST}>
									<div>
										{post.picture && (
											<img
												src={post.picture}
												alt='postPic'
											/>
										)}
										{/* fonction pour mettre la photo de profil du posteur si il n'y a pas de photo dans son post  */}
										{isEmpty(post.picture) && (
											<img
												src={
													usersData[0] &&
													usersData
														.map((user) => {
															if (
																user.idUSER ===
																post.userId
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
										)}
									</div>
									<div className='trend-content'>
										<p>{post.message}</p>
										<span>Lire la suite</span>
									</div>
								</li>
							);
						})}
				</ul>
			</NavLink>
		</div>
	);
}
