// We import Redux and Redux-saga dependencies
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';

import createSagaMiddleware from 'redux-saga';
// this comes from our created files
import rootSaga from './sagas';
import reducer from './reducers';

// imported the routerMiddleware
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

// The function in charge of creating and returning the store of the app
const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	// it requires the app history as parameter
	const routeMiddleware = routerMiddleware(hashHistory);

	// The store is created with a reducer parameter and the saga middleware
	const store = createStore(
		reducer,
		applyMiddleware(sagaMiddleware, routeMiddleware)
	);
	// rootSaga starts all the sagas in parallel
	sagaMiddleware.run(rootSaga);

	return store; // Return the state
}

export default configureStore;