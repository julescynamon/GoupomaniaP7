import React from "react";
import NavBarrLeft from "../Components/NavBarrLeft";
import { useSelector } from "react-redux";
import { isEmpty } from "../Components/Utils";
import Card from "../Components/Post/Card";

export default function Trending() {
	const trendList = useSelector((state) => state.trendingReducer);

	return (
		<div className='trending-page'>
			<NavBarrLeft />
			<div className='main'>
				<ul>
					{!isEmpty(trendList[0]) &&
						trendList.map((post) => (
							<Card post={post} key={post._id} />
						))}
				</ul>
			</div>
		</div>
	);
}
