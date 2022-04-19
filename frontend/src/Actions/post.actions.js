import axios from "axios";

export const GET_POST = "GET_POST";

export const getPost = () => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/post`,
			withCredentials: true,
		})
			.then((res) => {
				dispatch({
					type: "GET_POST",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
