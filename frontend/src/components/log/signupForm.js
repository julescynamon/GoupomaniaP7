import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SigninForm";

export default function SignupForm() {
	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [controlPassword, setControlPassword] = useState("");
	const [formSubmit, setFormSubmit] = useState(false);

	const handleRegister = async (e) => {
		e.preventDefault();
		const terms = document.getElementById("terms");
		const passwordConfError = document.querySelector(
			".password-confirm.error",
		);
		const termsError = document.querySelector(".terms.error");

		passwordConfError.innerHTML = "";
		termsError.innerHTML = "";

		if (password !== controlPassword || !terms.checked) {
			if (password !== controlPassword) {
				passwordConfError.innerHTML =
					"Les mots de passes ne correspondent pas";
			}
			if (!terms.checked) {
				termsError.innerHTML =
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
					setFormSubmit(true);
				})
				.catch((err) => {
					console.log(err.response);
					setUsernameError(err.response.data.errors.username);
					setEmailError(err.response.data.errors.email);
					setPasswordError(err.response.data.errors.password);
				});
		}
	};

	return (
		<>
			{formSubmit ? (
				<>
					<SignInForm />
					<span></span>
					<h4 className='success'>
						Enregistrement réussi, veuillez-vous connecter
					</h4>
				</>
			) : (
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
						value={username}
						placeholder='entrez votre pseudo'
					/>
					<div className='username error'>{usernameError}</div>
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
						value={email}
					/>
					<div className='email error'>{emailError}</div>
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
						value={password}
					/>
					<div className='password error'>{passwordError}</div>
					<br />
					<label htmlFor='password-conf'>
						Confirmer le mot de passe
					</label>
					<br />
					<input
						type='password'
						name='password'
						id='password-conf'
						onChange={(e) => {
							setControlPassword(e.target.value);
						}}
						placeholder='confirmez mot de passe'
						value={controlPassword}
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
			)}
		</>
	);
}
