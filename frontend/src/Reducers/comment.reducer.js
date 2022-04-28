import {
	DELETE_COMMENT,
	GET_COMMENT,
	POST_COMMENT,
} from "../Actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENT:
			return action.payload;
		case POST_COMMENT:
			return state.map((comment) => {
				if (comment.idPublication === action.payload.idPublication) {
					return {
						...comment,
						text: action.payload.text,
					};
				} else return comment;
			});
		case DELETE_COMMENT:
			return state.map((comment) => {
				if (comment.idPublication === action.payload.idPublication) {
					return state;
				} else return comment;
			});
		default:
			return state;
	}
}
