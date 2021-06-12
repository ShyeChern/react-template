import React, { useEffect, useReducer, useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { appInitialState, appReducer, appContext } from 'components/hooks/app';
import CombinedContext from 'components/CombinedContext.jsx';
import AdminRoute from 'components/route/AdminRoute';
import PrivateRoute from 'components/route/PrivateRoute';
import { constant } from 'utils/constant';
import { routes } from 'routes';

const cookies = new Cookies();

export default function App() {
	const [appState, dispatchApp] = useReducer(appReducer, appInitialState);

	const appContextValue = useMemo(() => {
		return { appState, dispatchApp };
	}, [appState, dispatchApp]);

	useEffect(() => {
		validateCookie();
	}, [appState.isLogin]);

	const validateCookie = async () => {
		const appCookie = cookies.get(constant.APP);
		if (appCookie) {
			// validate cookie from server side
			let result = true;
			if (result) {
				dispatchApp({ type: constant.SET_LOGIN, isLogin: true });
			} else {
				cookies.remove(constant.APP);
				window.location.pathname = '/';
			}
			return result;
		} else {
			return false;
		}
	};

	const logout = () => {
		cookies.remove(constant.APP);
		dispatchApp({ type: constant.SET_LOGIN, isLogin: false });
		window.location.pathname = '/';
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
						{/* Admin Route with TopNav and Sidebar*/}
						<Route path="/admin">
							<AdminRoute logout={logout} validateCookie={validateCookie} />
						</Route>
						{/* capture invalid route */}
						<Route render={() => <Redirect to={{ pathname: '/404' }} />} />
					</Switch>
				</Router>
			</Suspense>
		</CombinedContext>
	);
}
