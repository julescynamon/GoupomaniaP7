import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Trending from "../../Pages/Trending";
import Profil from "../../Pages/Profil";
import PageNotFound from "../../Pages/PageNotFound";

export default function Index() {
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
