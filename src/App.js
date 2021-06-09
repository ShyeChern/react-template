import React, { useEffect, useReducer, useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { appInitialState, appReducer, appContext } from 'components/hooks/app';
import CombinedContext from 'components/CombinedContext.jsx';
import AdminRoute from 'components/route/AdminRoute';
import PrivateRoute from 'components/route/PrivateRoute';
import { CONSTANT } from 'utils/constant';
import { routes, adminRoutes, sidebarRoutes } from 'routes';

export default function App() {
	const [appState, dispatchApp] = useReducer(appReducer, appInitialState);

	const appContextValue = useMemo(() => {
		return { appState, dispatchApp };
	}, [appState, dispatchApp]);

	const cookies = new Cookies();

	const appCookie = cookies.get(CONSTANT.APP);

	useEffect(() => {
		async function validateCookie() {
			// validate cookie from server side, can update refresh token here
			let result = true;
			if (result) {
				dispatchApp({ type: 'SET_LOGIN', isLogin: true });
			} else {
				cookies.remove(CONSTANT.APP);
				window.location.pathname = '/';
			}
		}
		if (appCookie) {
			validateCookie();
		}
	}, [appState.isLogin]);

	const logout = () => {
		cookies.remove(CONSTANT.APP);
		dispatchApp({ type: 'SET_LOGIN', isLogin: false });
		window.location.pathname = '/';
	};

	const loading = () => {
		dispatchApp({ type: 'SET_LOADING', isLoading: true });
		setTimeout(() => {
			dispatchApp({ type: 'SET_LOADING', isLoading: false });
		}, 3000);
	};

	return (
		// send array of context to custom component to create layers of context
		<CombinedContext contexts={[{ context: appContext, value: appContextValue }]}>
			<Suspense fallback={<div className="loader" />}>
				<Router>
					<Switch>
						{/* Normal Route */}
						{routes.map((value, index) => {
							return value.private ? (
								<PrivateRoute exact path={value.path} component={value.component} key={index} />
							) : (
								<Route exact path={value.path} component={value.component} key={index} />
							);
						})}
						{/* Admin Route with TopNav and Sidebar*/}
						<Route path="/admin">
							<AdminRoute
								adminRoutes={adminRoutes}
								sidebarRoutes={sidebarRoutes}
								appState={appState}
								logout={logout}
								loading={loading}
							/>
						</Route>
						{/* capture invalid route */}
						<Route render={() => <Redirect to={{ pathname: '/404' }} />} />
					</Switch>
				</Router>
			</Suspense>
		</CombinedContext>
	);
}
