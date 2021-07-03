import { createContext } from 'react';
import { constant } from 'utils/constant';

/**
 * Create global context
 * useReducer initial state and useReducer dispatch function
 */
export const appInitialState = {
	isLoading: false,
	isLogin: false,
};

export const appReducer = (prevState, action) => {
	switch (action.type) {
		case constant.SET_LOADING:
			return { ...prevState, isLoading: action.isLoading };
		case constant.SET_LOGIN:
			return { ...prevState, isLogin: action.isLogin };
		default:
			throw new Error('Invalid app action');
	}
};

export const appContext = createContext();
// test
