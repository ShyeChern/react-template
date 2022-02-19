import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/route/privateRoute';
import Sidebar from 'components/nav/sidebar';
import TopNav from 'components/nav/topNav';
import { adminRoutes } from 'routes';
import { app } from 'components/hooks';
import PropTypes from 'prop-types';

export default function AdminRoute({ validateCookie, logout }) {
	const { appState } = useContext(app.context);
	return (
		<div className="wrapper">
			<Sidebar />
			<div className="main-panel">
				<TopNav logout={logout} />
				<div className="content">
					{appState.isLoading && <div className="loader" />}
					<Switch>
						{adminRoutes.map((value, index) => {
							return value.private ? (
								<PrivateRoute
									exact
									path={value.path}
									component={value.component}
									key={index}
									validateCookie={validateCookie}
								/>
							) : (
								<Route exact path={value.path} component={value.component} key={index} />
							);
						})}
						{/* capture invalid route */}
						<Route render={() => <Redirect to={{ pathname: '/404' }} />} />
					</Switch>
				</div>
			</div>
		</div>
	);
}

AdminRoute.propTypes = {
	validateCookie: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};
