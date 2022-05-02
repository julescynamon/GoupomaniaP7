import React from "react";
import NavBarrLeft from "../Components/NavBarrLeft";
import PostFil from "../Components/PostFil";
import NewPostForm from "../Components/Post/NewPostForm";
import Trends from "../Components/Trends";

export default function Home() {
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
