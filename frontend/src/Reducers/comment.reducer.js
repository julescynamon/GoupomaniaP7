import { GET_COMMENT, POST_COMMENT } from "../Actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENT:
			return action.payload;
		case POST_COMMENT:
			return state.map((comment) => {
				if (comment.idPOST === action.payload.idPOST) {
					return {
						...comment,
						comment: comment.map((comment) => {
							if (comment.idCOM === action.payload.idCOM) {
								return {
									...comment,
									message: action.payload.message,
								};
							} else {
								return comment;
							}
						}),
					};
				} else return comment;
			});
		default:
			return state;
	}
}
