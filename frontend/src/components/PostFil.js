import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost } from "../Actions/post.actions";

export default function PostFil() {
	const { post, setPost } = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		if (post) {
			dispatch(getPost());
			setPost(false);
		}
	}, [post, setPost, dispatch]);

	return <div>fil</div>;
}
