import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components';
import { AddGameContainer, GamesContainer } from './containers';

// Use hashHistory for easier development
const routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Home}>
			<IndexRoute component={Welcome} />a
			<Route path='/about' component={About} />
			<Route path='/contact' component={Contact} />
		</Route>
		<Route path='/games' component={Archive}>
			<IndexRoute component={GamesContainer} />
			<Route path='add' component={AddGameContainer} />
		</Route>
	</Router>
);

export default routes;