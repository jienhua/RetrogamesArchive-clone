import React from 'react';
// import Provider
import { Provider } from 'react-redux';
// we need the store to be passed to Provider
import configureStore from './store';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive, Login, Signup } from './components';
import { AddGameContainer, GamesContainer } from './containers';

// imported syncHistoryWithStore
import { syncHistoryWithStore, push } from 'react-router-redux';

import ReduxToastr from 'react-redux-toastr';

import userAuthenticated from './utils/authWrapper';

// Call the configureStore function previously exported
const store = configureStore();

// Sync navigation events with the store
const history = syncHistoryWithStore(hashHistory, store, {
	selectLocationState (state) {
		return state.get('routing').toObject();
	}
});

// here we set the rules for the wrapper
const options = {
	authSelector: state => state.get('auth'),
	predicate: auth => auth.get('isAuthenticated'),
	redirectAction: ({ pathname, query }) => {
		if(query.redirect) {
			// if the user is not logged in go to /auth/login
			return push(`auth${pathname}?next=${query.redirect}`);
		}
	},
	wrapperDisplayName: 'UserIsJWTAuthenticated'
};

const requireAuthentication = userAuthenticated(options);


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
					<Route path='add' component={requireAuthentication(AddGameContainer)} />
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