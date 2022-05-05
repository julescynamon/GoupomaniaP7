import React, { useState } from "react";
import axios from "axios";

export default function SigninForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();

		// on utilise axios pour pouvoir relier notre app a notre API et faire des requètes.
		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,
			data: {
				email: email,
				password: password,
			},
			config: {
				Accept: "application/json",
			},
		})
			.then((res) => {
				window.location = "/home";
			})
			.catch((err) => {
				setEmailError(err.response.data.error);
				setPasswordError(err.response.data.error);
			});
	};

	return (
		<form onSubmit={handleLogin} id='sign-up-form'>
			<label htmlFor='email'>Email</label>
			<br />
			<input
				type='text'
				name='email'
				id='email'
				onChange={(e) => setEmail(e.target.value)}
				placeholder='entrez votre email'
				value={email}
			/>
			<div className='email error'>{emailError}</div>
			<br />
			<label htmlFor='password'>Password</label>
			<br />
			<input
				type='password'
				name='password'
				id='password'
				onChange={(e) => setPassword(e.target.value)}
				placeholder='entrez votre mot de passe'
				value={password}
			/>
			<div className='password error'>{passwordError}</div>
			<br />
			<input type='submit' value='se connecter' />
		</form>
	);
}
