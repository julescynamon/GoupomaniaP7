import { GET_USER } from "../Actions/user.actions";
import { UPLOAD_PICTURE } from "../Actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return action.payload;
		case UPLOAD_PICTURE:
			return {
				...state,
				picture: action.payload,
			};
		default:
			return state;
	}
}
