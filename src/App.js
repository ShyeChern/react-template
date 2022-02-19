import React, { useEffect, useReducer, useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { app, func } from 'components/hooks';
import CombinedContext from 'components/combinedContext';
import AdminRoute from 'components/route/adminRoute';
import PrivateRoute from 'components/route/privateRoute';
import Notification, { useNoti } from 'components/notification';
import { constant } from 'utils/constant';
import { routes } from 'routes';

const cookies = new Cookies();

export default function App() {
	const [appState, dispatchApp] = useReducer(app.reducer, app.initialState);
	const [funcState, dispatchFunc] = useReducer(func.reducer, func.initialState);
	const { show, ...rest } = useNoti();

	const appContextValue = useMemo(() => {
		return { appState, dispatchApp };
	}, [appState, dispatchApp]);

	const funcContextValue = useMemo(() => {
		return { funcState, dispatchApp };
	}, [funcState, dispatchApp]);

	// init function
	useEffect(() => {
		dispatchFunc({ type: constant.SET_NOTIFICATION, notification: show });
	}, []);

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
		<CombinedContext
			contexts={[
				{ context: app.context, value: appContextValue },
				{ context: func.context, value: funcContextValue },
			]}
		>
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
							<Notification {...rest} />
						</Route>
						{/* capture invalid route */}
						<Route render={() => <Redirect to={{ pathname: '/404' }} />} />
					</Switch>
				</Router>
			</Suspense>
		</CombinedContext>
	);
}
