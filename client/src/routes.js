import React from 'react';
// import Provider
import { Provider } from 'react-redux';
// we need the store to be passed to Provider
import configureStore from './store';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components';
import { AddGameContainer, GamesContainer } from './containers';

// Call the configureStore function previously exported
const store = configureStore();

// Provider wraps our root component
const routes = (
	<Provider store={store}>
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
	</Provider>
);

export default routes;