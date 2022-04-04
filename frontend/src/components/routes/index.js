import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";
import Profil from "../../pages/Profil";
import PageNotFound from "./PageNotFound";

export default function index() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/trending' element={<Trending />} />
			<Route path='/profil' element={<Profil />} />
			<Route component={<PageNotFound />} />
		</Routes>
	);
}
