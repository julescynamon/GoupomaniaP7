import React from 'react';
import Log from "../components/log/auth";

export default function Profil() {
    return (
		<div className='profil-page'>
			<div className='log-container'>
				<Log />
				<div className='img-container'>
					<img
						src='./img/icon-left-font.svg'
						alt='Groupomania icone'
					/>
				</div>
			</div>
		</div>
	);
}
