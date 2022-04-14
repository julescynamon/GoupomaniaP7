import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBarrLeft() {
	return (
		<div className='left-nav-container'>
			<div className='icons'>
				<div className='icons-bis'>
					<NavLink to='/home' exact activeClassName='active-left-nav'>
						<img src='./img/icons/home.svg' alt='home' />
					</NavLink>
					<br />
					<NavLink
						to='/trending'
						exact
						activeClassName='active-left-nav'
					>
						<img src='./img/icons/rocket.svg' alt='home' />
					</NavLink>
					<br />
					<NavLink
						to='/profil'
						exact
						activeClassName='active-left-nav'
					>
						<img src='./img/icons/user.svg' alt='home' />
					</NavLink>
				</div>
			</div>
		</div>
	);
}
