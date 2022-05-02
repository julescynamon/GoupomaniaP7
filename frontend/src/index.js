import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducers/index";
import { getUsers } from "./Actions/users.actions";
// outils de developpement pour controller mes actions avec redux
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { getPosts } from "./Actions/post.actions";

//on cree notre store
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk, logger)),
);

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);
