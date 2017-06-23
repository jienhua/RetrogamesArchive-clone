// We always define constants
import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,

	SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,

	LOGOUT_USER
} from '../constants/auth';

// intercepted by a redux-saga
function loginUser (redirection) {
	return {
		type: LOGIN_USER,
		redirection
	};
}

// In case of successful response from the server
function loginUserSuccess (token) { // it carries the token!
	return {
		type: LOGIN_USER_SUCCESS,
		token
	};
}

// In case of failure
function loginUserFailure () {
	return {
		type: LOGIN_USER_FAILURE
	};
}

// the action-creator
function logoutUser () {
	return {
		type: LOGOUT_USER
	};
}

function signupUser () {
	return {
		type: SIGNUP_USER
	};
}

function signupUserSuccess (token) {
	return {
		type: SIGNUP_USER_SUCCESS,
		token
	};
}

function signupUserFailure () {
	return {
		type: SIGNUP_USER_FAILURE
	};
}

export {
	loginUser,
	loginUserSuccess,
	loginUserFailure,

	signupUser,
	signupUserSuccess,
	signupUserFailure,

	logoutUser
};