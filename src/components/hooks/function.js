import { createContext } from 'react';
import { constant } from 'utils/constant';

export const initialState = {
	notification: () => {},
};

export const reducer = (prevState, action) => {
	switch (action.type) {
		case constant.SET_NOTIFICATION:
			return { ...prevState, notification: action.notification };
		default:
			throw new Error('Invalid function action');
	}
};

export const context = createContext();

export default {
	initialState,
	reducer,
	context,
};
