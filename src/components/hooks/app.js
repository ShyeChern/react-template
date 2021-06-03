import { createContext } from 'react';

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
		case 'SET_LOADING':
			return { ...prevState, isLoading: action.isLoading };
		case 'SET_LOGIN':
			return { ...prevState, isLogin: action.isLogin };
		default:
			throw new Error('Invalid app action');
	}
};

export const appContext = createContext();
