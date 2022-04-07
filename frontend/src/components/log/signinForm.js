import React, { useState } from "react";
import axios from "axios";

export default function SigninForm() {
	const [email, setEmail] = useState({email: ""});
	const [password, setPassword] = useState({password: ""});

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,
			data: {
				email: email,
				password: password,
			},
			config: {
				Accept: "application/json"
			},
		})
			.then((res) => {
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = "/";
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
			/>
			<div className='password error'></div>
			<br />
			<input type='submit' value='se connecter' />
		</form>
	);
}
