import React from "react";
import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

export default function Auth( props ) {
	const [signUpModal, setSignUpModal] = useState(props.signUp);
	const [signInModal, setSignInModal] = useState(props.signIn);

	const handleModal = (e) => {
		if (e.target.id === "register") {
			setSignInModal(false);
			setSignUpModal(true);
		} else if (e.target.id === "login") {
			setSignInModal(true);
			setSignUpModal(false);
		}
	};

	return (
		<div>
			<div className='connection-form'>
				<div className='form-container'>
					<ul>
						<li
							onClick={handleModal}
							id='register'
							className={signUpModal ? "active-btn" : null}
						>
							S'inscrire
						</li>
						<li
							onClick={handleModal}
							id='login'
							className={signInModal ? "active-btn" : null}
						>
							Se connecter
						</li>
					</ul>
					{signUpModal && <SignupForm />}
					{signInModal && <SigninForm />}
				</div>
			</div>
		</div>
	);
}
