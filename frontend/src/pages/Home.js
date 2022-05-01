import React from "react";
import NavBarrLeft from "../Components/NavBarrLeft";
import PostFil from "../Components/PostFil";
import NewPostForm from "../Components/Post/NewPostForm";

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
		</div>
	);
}
