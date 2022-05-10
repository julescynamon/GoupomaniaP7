import React, { useState } from "react";
import NavBarrLeft from "../NavBarrLeft";
import { useSelector, useDispatch } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../Actions/user.actions";

export default function UpdateProfil() {
	const userData = useSelector((state) => state.userReducer);
	const error = useSelector((state) => state.errorReducer);
	const dispatch = useDispatch();
	const [bio, setBio] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const handleUpdate = () => {
		dispatch(updateBio(userData.IdUSER, bio));
		setUpdateForm(false);
	};

	return (
		<div className='profil-container'>
			<NavBarrLeft />
			<h1>Profil de {userData.username}</h1>
			<div className='update-container'>
				<div className='left-part'>
					<h3>Photo de profil</h3>
					{userData.picture ? (
						<img src={userData.picture} alt='' />
					) : (
						<img src='./uploads/profil/random-user.png' alt='' />
					)}

					<UploadImg />
					<p>{error.maxSize}</p>
					<p>{error.format}</p>
				</div>
				<div className='right-part'>
					<div className='bio-update'>
						<h3>Bio</h3>
						{updateForm === false && (
							<>
								<p onClick={() => setUpdateForm(!updateForm)}>
									{userData.bio}
								</p>
								<button
									onClick={() => setUpdateForm(!updateForm)}
								>
									Modifier bio
								</button>
							</>
						)}
						{updateForm && (
							<>
								<textarea
									type='text'
									defaultValue={userData.bio}
									onChange={(e) => setBio(e.target.value)}
								></textarea>
								<button onClick={handleUpdate}>
									Valider modifications
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
