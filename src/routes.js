import { lazy } from 'react';
// Lazy loading UI component
const Dashboard = lazy(() => import('views/Dashboard/Dashboard.jsx'));
const User = lazy(() => import('views/User/User.jsx'));
const Sale = lazy(() => import('views/Sale/Sale.jsx'));
const Login = lazy(() => import('views/Login/Login.jsx'));
const ExpandOne = lazy(() => import('views/ExpandOne/ExpandOne.jsx'));
const ExpandTwo = lazy(() => import('views/ExpandTwo/ExpandTwo.jsx'));
const NotFound = lazy(() => import('views/Error/NotFound.jsx'));

/**
 * Normal Route
 */
export const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		private: false,
	},
	{
		path: '/404',
		name: 'Not Found',
		component: NotFound,
		private: false,
	},
];

/**
 * Admin Route - with sidebar, topnav
 */
export const adminRoutes = [
	{
		path: '/admin',
		name: 'Dashboard',
		component: Dashboard,
		private: true,
	},
	{
		path: '/admin/user',
		name: 'User',
		component: User,
		private: true,
	},
	{
		path: '/admin/sale',
		name: 'Sale',
		component: Sale,
		private: true,
	},
	{
		path: '/admin/expand-one',
		name: 'Expandable 1',
		component: ExpandOne,
		private: true,
	},
	{
		path: '/admin/expand-two',
		name: 'Expandable 2',
		component: ExpandTwo,
		private: true,
	},
];

/**
 * Sidebar Route - to show in admin route sidebar with icon and expand menu
 */
export const sidebarRoutes = [
	{
		path: '/admin',
		name: 'Dashboard',
		icon: 'nc-icon nc-chart-pie-35',
		component: Dashboard,
		private: true,
		expandable: false,
	},
	{
		path: '/admin/user',
		name: 'User',
		icon: 'nc-icon nc-circle-09',
		component: User,
		private: true,
		expandable: false,
	},
	{
		path: '/admin/sale',
		name: 'Sale',
		icon: 'nc-icon nc-paper-2',
		component: Sale,
		private: true,
		expandable: false,
	},
	{
		name: 'Expandable',
		icon: 'nc-icon nc-battery-81',
		private: true,
		expandable: true,
		child: [
			{
				path: '/admin/expand-one',
				name: 'Expandable 1',
				icon: 'nc-icon nc-android',
				component: ExpandOne,
				private: true,
			},
			{
				path: '/admin/expand-two',
				name: 'Expandable 2',
				icon: 'nc-icon nc-apple',
				component: ExpandTwo,
				private: true,
			},
		],
	},
];
