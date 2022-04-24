import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

export default function PostFil() {
	const [loadPost, setLoadPost] = useState(true);
	const [count, setCount] = useState(5);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);
	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts(count));
			setLoadPost(false);
			setCount(count + 5);
		}

		const loadMore = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop + 1 >
				document.scrollingElement.scrollHeight
			) {
				setLoadPost(true);
			}
		};

		window.addEventListener("scroll", loadMore);
		return () => {
			window.removeEventListener("scroll", loadMore);
		};
	}, [loadPost, dispatch, count]);

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
