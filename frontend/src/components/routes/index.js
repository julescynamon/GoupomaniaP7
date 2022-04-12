import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Trending from "../../Pages/Trending";
import Login from "../../Pages/Login";
import Profil from "../../Pages/Profil";
import PageNotFound from "../../Pages/PageNotFound";
import NavBarr from "../NavBarr";

export default function Index() {
	return (
		<Router>
			<NavBarr />
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/home' component={Home} />
				<Route path='/trending' component={Trending} />
				<Route path='/profil' component={Profil} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
}
