import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";

export const getComments = (idPOST) => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/post/${idPOST}/allcomments`,
			withCredentials: true,
			config: {
				Accept: "application/json",
			},
		})
			.then((res) => {
				dispatch({
					type: GET_COMMENT,
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const postComments = (idPOST, idUSER, message) => {
	return (dispatch) => {
		return axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/post/${idPOST}`,
			withCredentials: true,
			config: {
				Accept: "application/json",
			},
			data: {
				idCreateur: idUSER,
				message: message,
			},
		})
			.then((res) => {
				dispatch({
					type: POST_COMMENT,
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
