import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/route/PrivateRoute';
import Sidebar from 'components/nav/Sidebar';
import TopNav from 'components/nav/TopNav';
import PropTypes from 'prop-types';

export default function AdminRoute({ adminRoutes, sidebarRoutes, appState, logout, loading }) {
	return (
		<div className="wrapper">
			<Sidebar routes={sidebarRoutes} />
			<div className="main-panel">
				<TopNav routes={adminRoutes} logout={logout} loading={loading} />
				<div className="content">
					{appState.isLoading ? <div className="loader" /> : null}
					<Switch>
						{adminRoutes.map((value, index) => {
							return value.private ? (
								<PrivateRoute exact path={value.path} component={value.component} key={index} />
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
	adminRoutes: PropTypes.array,
	sidebarRoutes: PropTypes.array,
	appState: PropTypes.object,
	logout: PropTypes.func,
	loading: PropTypes.func,
};
