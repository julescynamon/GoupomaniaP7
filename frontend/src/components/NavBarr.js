import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

export default function NavBarr() {
	return (
		<nav>
			<div className='nav-container'>
				<div className='logo'>
					<NavLink exact to='/home'>
						<div className='logo'>
							<img src='./img/icon.png' alt='Groupomania icone' />
							<h3>Groupomania</h3>
						</div>
					</NavLink>
				</div>
				<ul>
					<li></li>
					<li className='welcome'>
						<NavLink exact to='/profil'>
							<h5>Bienvenue, "Valeur dynamique"</h5>
						</NavLink>
					</li>
					<Logout />
				</ul>
			</div>
		</nav>
	);
}
