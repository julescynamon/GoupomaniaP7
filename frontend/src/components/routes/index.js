import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";
import Profil from "../../pages/Profil";
import PageNotFound from "../../pages/PageNotFound";

export default function index() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/trending' component={Trending} />
				<Route path='/profil' component={Profil} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
}
