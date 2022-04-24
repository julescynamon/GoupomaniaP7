import axios from "axios";

export const GET_POST = "GET_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = (num) => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/post/`,
			withCredentials: true,
			config: {
				Accept: "application/json",
			},
		})
			.then((res) => {
				const array = res.data.slice(0, num);
				dispatch({
					type: GET_POST,
					payload: array,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const deletePost = (idPOST) => {
	return (dispatch) => {
		return axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}api/post/${idPOST}`,
			withCredentials: true,
		})
			.then((res) => {
				dispatch({
					type: DELETE_POST,
					payload: { idPOST },
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};