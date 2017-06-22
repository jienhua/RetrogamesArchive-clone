// We import the combineReducers function
import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
// Import our reducers function from here
import games from './games';
import filestack from './filestack';

// import the auth reducer
import auth from './auth';

// imported the routing reducer
import routing from './routing';

import { reducer as toastr } from 'react-redux-toastr';

// combineReducers merges them all
export default combineReducers({
	games,
	form,
	filestack, // include the filestack reducer to be combined into a single one
	routing,
	auth,
	toastr,
});