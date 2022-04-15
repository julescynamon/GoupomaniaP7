import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

export default function NavBarr() {
	const uid = useContext(UidContext);
	const userData = useSelector((state) => state.userReducer);

	return (
		<nav>
			<div className='nav-container'>
				<div className='logo'>
					<NavLink exact to={uid ? "/home" : "/"}>
						<div className='logo'>
							<img src='./img/icon.png' alt='Groupomania icone' />
							<h3>Groupomania</h3>
						</div>
					</NavLink>
				</div>
				{uid ? (
					<ul>
						<li></li>
						<li className='welcome'>
							<NavLink exact to='/profil'>
								<h5>Bienvenue {userData.username}</h5>
							</NavLink>
						</li>
						<Logout />
					</ul>
				) : (
					<ul>
						<li></li>
						<li className='welcome'>
							<h5>Bienvenue, connectez vous ! 😀 </h5>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}
