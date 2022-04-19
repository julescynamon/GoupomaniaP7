import React from "react";
import NavBarrLeft from "../Components/NavBarrLeft";
import PostFil from "../Components/PostFil";

export default function Home() {
	return (
		<div className='home'>
			<NavBarrLeft />
			<div className='main'>
				<PostFil />
			</div>
		</div>
	);
}
