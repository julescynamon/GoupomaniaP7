import {
	DELETE_COMMENT,
	GET_COMMENT,
	POST_COMMENT,
} from "../Actions/comment.actions";

const initialState = [];

export default function commentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENT:
			return []
				.concat(state, action.payload)
				.filter(
					(v, i, a) =>
						a.findIndex((v2) => v2.idCOM === v.idCOM) === i,
				);
		case POST_COMMENT:
			return [].concat(state, action.payload);
		case DELETE_COMMENT:
			return state.filter(
				(comment) =>
					comment.idPublication !== action.payload.idPublication,
			);
		default:
			return state;
	}
}
