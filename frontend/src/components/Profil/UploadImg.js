import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../Actions/user.actions";

export default function UploadImg() {
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);

	const handlePicture = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("name", userData.username);
		data.append("idUSER", userData.idUSER);
		data.append("file", file);

		dispatch(uploadPicture(data, userData.idUSER));
	};

	return (
		<form action='' onSubmit={handlePicture} className='upload-pic'>
			<label htmlFor='file'>Changer l'image de profil</label>
			<input
				type='file'
				id='file'
				name='file'
				accept='.jpg, .jpeg, .png'
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<br />
			<input type='submit' value='envoyer' />
		</form>
	);
}
