import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
			config: {
				Accept: "application/json",
			},
		})
			.then((res) => {
				dispatch({ type: GET_USER, payload: res.data });
			})
			.catch((err) => console.log(err));
	};
};

export const uploadPicture = (data, IdUSER) => {
	return (dispatch) => {
		return axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/upload`,
			data,
			withCredentials: true,
			config: {
				Accept: "application/json",
			},
		})
			.then((res) => {
				if (res.data.errors) {
					dispatch({
						type: GET_USER_ERRORS,
						payload: res.data.errors,
					});
				} else {
					dispatch({
						type: GET_USER_ERRORS,
						payload: "",
					});
					return axios({
						method: "get",
						url: `${process.env.REACT_APP_API_URL}api/user/${IdUSER}`,
						withCredentials: true,
						config: {
							Accept: "application/json",
						},
					});
				}
			})
			.then((res) => {
				dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
			})
			.catch((err) => console.log(err));
	};
};

export const updateBio = (IdUSER, bio) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/user/${IdUSER}`,
			data: { bio },
		})
			.then((res) => {
				dispatch({ type: UPDATE_BIO, payload: bio });
			})
			.catch((err) => console.log(err));
	};
};

export const deleteUser = (idUSER) => {
	return (dispatch) => {
		return axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}api/user/${idUSER}`,
			withCredentials: true,
		})
			.then((res) => {
				dispatch({
					type: DELETE_USER,
					payload: { idUSER },
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
