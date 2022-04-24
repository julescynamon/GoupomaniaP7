import { DELETE_POST, GET_POST } from "../Actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POST:
			return action.payload;
		case DELETE_POST:
			return state.filter(
				(post) => post.idPOST !== action.payload.idPOST,
			);
		default:
			return state;
	}
}
