import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
	const [username, setUsername] = useState({ username: "" });
	const [email, setEmail] = useState({ email: "" });
	const [password, setPassword] = useState({ password: "" });
	const [controlPassword, setControlPassword] = useState({
		controlPassword: "",
	});

	const handleRegister = async (e) => {
		e.preventDefault();
		const terms = document.getElementById(".terms");
		const usernameError = document.querySelector(".pseudo.error");
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
		const passwordConfError = document.querySelector(
			".password-confirm.error",
		);
		const termsError = document.querySelector(".terms.error");

		passwordConfError.current.innerText = "";
		termsError.current.innerText = "";

		if (password !== controlPassword || !terms.checked) {
			if (password !== controlPassword) {
				passwordConfError.current.innerText =
					"Les mots de passes ne correspondent pas";
			}
			if (!terms.checked) {
				termsError.current.innerText =
					"Veuillez cochez les conditions générales";
			}
		} else {
			await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/user/signup`,
				withCredentials: true,
				data: {
					username: username,
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
						usernameError.current.innerText =
							res.data.errors.username;
						emailError.current.innerText = res.data.errors.email;
						passwordError.current.innerText =
							res.data.errors.password;
					} else {
						window.location = "/";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<form action='' onSubmit={handleRegister} id='sign-up-fom'>
			<label htmlFor='username'>Pseudo</label>
			<br />
			<input
				type='text'
				name='username'
				id='username'
				onChange={(e) => {
					setUsername(e.target.value);
				}}
				placeholder='entrez votre pseudo'
			/>
			<div className='username error'></div>
			<br />
			<label htmlFor='email'>Email</label>
			<br />
			<input
				type='email'
				name='email'
				id='email'
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				placeholder='entrez votre email'
			/>
			<div className='email error'></div>
			<br />
			<label htmlFor='password'>Mot de passe</label>
			<br />
			<input
				type='password'
				name='password'
				id='password'
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder='entrez votre mot de passe'
			/>
			<div className='password error'></div>
			<br />
			<label htmlFor='password-conf'>Confirmer le mot de passe</label>
			<br />
			<input
				type='password'
				name='password'
				id='password-conf'
				onChange={(e) => {
					setControlPassword(e.target.value);
				}}
				placeholder='confirmez mot de passe'
				va
			/>
			<div className='password-confirm error'></div>
			<br />
			<input type='checkbox' id='terms' />
			<label htmlFor='terms'>
				J'accepte les{" "}
				<a href='/' target='_blank' rel='noopener noreferrer'>
					conditions générales
				</a>
			</label>
			<div className='terms error'></div>
			<br />
			<input type='submit' value='Valider inscription' />
		</form>
	);
}
