import React, { useState } from "react";
import axios from "axios";

export default function SigninForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
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
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = "/home";
				}
			})
			.catch((err) => {
				console.log(err);
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
			<div className='email error'></div>
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
			<div className='password error'></div>
			<br />
			<input type='submit' value='se connecter' />
		</form>
	);
}
