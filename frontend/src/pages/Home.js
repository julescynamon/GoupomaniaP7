import React, { useContext } from "react";
import NavBarrLeft from "../Components/NavBarrLeft";
import PostFil from "../Components/PostFil";
import NewPostForm from "../Components/Post/NewPostForm";
import Trends from "../Components/Trends";
import { getUsers } from "../Actions/users.actions";
import { useDispatch } from "react-redux";
import { UidContext } from "../Components/AppContext";

export default function Home() {
	const dispatch = useDispatch();
	const uid = useContext(UidContext);

	if (uid) {
		dispatch(getUsers());
	}
	return (
		<div className='home'>
			<NavBarrLeft />
			<div className='main'>
				<div className='home-header'>
					<NewPostForm />
				</div>
				<PostFil />
			</div>
			<div className='right-side'>
				<div className='right-side-container'>
					<div className='wrapper'>
						<Trends />
					</div>
				</div>
			</div>
		</div>
	);
}
