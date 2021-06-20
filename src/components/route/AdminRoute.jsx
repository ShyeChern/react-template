import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/route/PrivateRoute';
import Sidebar from 'components/nav/Sidebar';
import TopNav from 'components/nav/TopNav';
import { adminRoutes } from 'routes';
import { appContext } from 'components/hooks/app';
import PropTypes from 'prop-types';

export default function AdminRoute({ validateCookie, logout }) {
	const { appState } = useContext(appContext);
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
