import React from "react";
import NavBarrLeft from "../NavBarrLeft";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

export default function UpdateProfil() {
	const userData = useSelector((state) => state.userReducer);
	return (
		<div className='profil-container'>
			<NavBarrLeft />
			<h1>Profil de {userData.username}</h1>
			<div className='update-container'>
				<div className='left-part'>
					<h3>Photo de profil</h3>
					<img src={userData.picture} alt='' />
					<UploadImg />
				</div>
			</div>
		</div>
	);
}
