import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function PrivateRoute({ component: Component, ...rest }) {
	const cookies = new Cookies();
	const appCookie = cookies.get('_appLogin');
	return (
		<Route
			{...rest}
			render={(props) => (appCookie ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
}

PrivateRoute.propTypes = {
	component: PropTypes.object,
	appCookie: PropTypes.string,
};