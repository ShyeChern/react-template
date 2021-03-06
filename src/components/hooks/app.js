import { createContext } from 'react';
import { constant } from 'utils/constant';

export const initialState = {
	isLoading: false,
	isLogin: false,
};

export const reducer = (prevState, action) => {
	switch (action.type) {
		case constant.SET_LOADING:
			return { ...prevState, isLoading: action.isLoading };
		case constant.SET_LOGIN:
			return { ...prevState, isLogin: action.isLogin };
		default:
			throw new Error('Invalid app action');
	}
};

export const context = createContext();

export default {
	initialState,
	reducer,
	context,
};
