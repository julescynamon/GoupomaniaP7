import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { createPost, getPosts } from "../../Actions/post.actions";

export default function NewPostForm() {
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [postPicture, setPostPicture] = useState(null);
	const [file, setFile] = useState();
	const userData = useSelector((state) => state.userReducer);
	const error = useSelector((state) => state.errorReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isEmpty(userData)) {
			setIsLoading(false);
		}
	}, [userData, message]);

	const handlePost = async () => {
		if (message || postPicture) {
			const data = new FormData();
			data.append("userId", userData.IdUSER);
			data.append("message", message);
			if (file) {
				data.append("picture", file);
			}
			await dispatch(createPost(data));
			dispatch(getPosts());
			cancelPost();
		} else {
			alert("Veuillez entrer un message !");
		}
	};

	const handlePicture = (e) => {
		setPostPicture(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};

	const cancelPost = () => {
		setMessage("");
		setPostPicture("");
		setFile("");
	};

	return (
		<div className='post-container'>
			{isLoading ? (
				<i className='fas fa-spinner fa-pulse'></i>
			) : (
				<>
					<div className='data'>
						<NavLink exact to='/profil'>
							<div className='user-info'>
								<img src={userData.picture} alt='user-img' />
							</div>
						</NavLink>
						<div className='post-form'>
							<textarea
								name='message'
								id='message'
								placeholder='Quoi de neuf ?'
								onChange={(e) => setMessage(e.target.value)}
								value={message}
							/>
							{message || postPicture ? (
								<li className='card-container'>
									<div className='card-left'>
										<img
											src={userData.picture}
											alt='userPic'
										/>
									</div>
									<div className='card-right'>
										<div className='card-header'>
											<div className='pseudo'>
												<h3>{userData.username}</h3>
											</div>
											<span>
												{timestampParser(Date.now())}
											</span>
										</div>
										<div className='content'>
											<p>{message}</p>
											{postPicture && (
												<img
													src={postPicture}
													alt='postPic'
												/>
											)}
										</div>
									</div>
								</li>
							) : null}
							<div className='footer-form'>
								<div className='icon'>
									<img src='./img/icons/picture.svg' alt='' />
									<input
										type='file'
										id='file-upload'
										name='file'
										accept='.jpg, .jpeg, .png'
										onChange={(e) => handlePicture(e)}
									/>
								</div>
								{!isEmpty(error.format) && (
									<p>{error.format}</p>
								)}
								<div className='btn-send'>
									{message || postPicture ? (
										<button
											className='cancel'
											onClick={cancelPost}
										>
											Annuler message
										</button>
									) : null}

									<button
										className='send'
										onClick={handlePost}
									>
										Envoyer
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
