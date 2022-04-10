import React, { useContext } from "react";
import Log from "../Components/Log/Auth";
import { UidContext } from "../Components/AppContext";

export default function Profil() {
	const uid = useContext(UidContext);

	return (
		<div className='profil-page'>
			{uid ? (
				<h1>UPDATE PROFIL</h1>
			) : (
				<div className='log-container'>
					<Log signIn={false} signUp={true} />
					<div className='img-container'>
						<img
							src='./img/icon-left-font.svg'
							alt='Groupomania icone'
						/>
					</div>
				</div>
			)}
		</div>
	);
}
