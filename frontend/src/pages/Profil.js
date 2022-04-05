import React from 'react';
import Log from "../Components/Log/Auth";

export default function Profil() {
    return (
		<div className='profil-page'>
			<div className='log-container'>
				<Log signIn={false} signUp={true} />
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
