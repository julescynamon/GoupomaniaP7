import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

export default function PostFil() {
	const [loadPost, setLoadPost] = useState(true);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);
	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts());
			setLoadPost(false);
		}
	}, [loadPost, dispatch]);

	return (
		<div>
			<div className='thread-container'>
				<ul>
					{!isEmpty(posts[0]) &&
						posts.map((post) => {
							return <Card post={post} key={post.idPOST} />;
						})}
				</ul>
			</div>
		</div>
	);
}
