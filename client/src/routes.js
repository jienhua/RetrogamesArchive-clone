import React from 'react';
// import Provider
import { Provider } from 'react-redux';
// we need the store to be passed to Provider
import configureStore from './store';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive, Login, Signup } from './components';
import { AddGameContainer, GamesContainer } from './containers';

// imported syncHistoryWithStore
import { syncHistoryWithStore } from 'react-router-redux';

import ReduxToastr from 'react-redux-toastr';

// Call the configureStore function previously exported
const store = configureStore();

// Sync navigation events with the store
const history = syncHistoryWithStore(hashHistory, store, {
	selectLocationState (state) {
		return state.get('routing').toObject();
	}
});

// Provider wraps our root component
const routes = (
	<Provider store={store}>
		<div className='wrapper'>
			<Router history={history}>
				<Route path='/' component={Home}>
					<IndexRoute component={Welcome} />a
					<Route path='/about' component={About} />
					<Route path='/contact' component={Contact} />
				</Route>
				<Route path='/games' component={Archive}>
					<IndexRoute component={GamesContainer} />
					<Route path='add' component={AddGameContainer} />
				</Route>
				<Route path='/auth' component={Archive}>
					<Route path='signup' component={Signup}/>
					<Route path='login' component={Login} />
				</Route>
			</Router>
			<ReduxToastr
				timeOut={2000}
				newestOnTop={false}
				preventDuplicates={true}
				position='top-right'
				transitionIn='fadeIn'
				transitionOut='fadeOut'
			/>
		</div>
	</Provider>
);

export default routes;