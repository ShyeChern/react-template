import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, validateCookie, ...rest }) {
	const [valid, setValid] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkCookie() {
			let con = await validateCookie();
			setValid(con);
			setIsLoading(false);
		}
		checkCookie();
	}, []);

	return isLoading ? (
		<div className="loader" />
	) : (
		<Route {...rest} render={(props) => (valid ? <Component {...props} /> : <Redirect to="/" />)} />
	);
}

PrivateRoute.propTypes = {
	validateCookie: PropTypes.func,
	component: PropTypes.object,
};
