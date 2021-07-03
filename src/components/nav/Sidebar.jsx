import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Nav, Collapse } from 'react-bootstrap';
import { sidebarRoutes } from 'routes';
import image from 'assets/img/sidebar.jpg';

export default function Sidebar() {
	const [collapseMenu, setCollapseMenu] = useState('');
	const location = useLocation();
	const activeRoute = (path) => {
		return location.pathname === path ? 'active' : '';
	};

	const activeMenu = (index) => {
		return sidebarRoutes[index].child.some((value) => value.path === location.pathname)
			? 'active-menu nav-link'
			: 'nav-link';
	};

	const toggleMenu = (e, menu) => {
		e.preventDefault();
		setCollapseMenu(menu === collapseMenu ? '' : menu);
	};

	return (
		<div className="sidebar" data-image={image} data-color="black">
			<div className="sidebar-background" style={{ backgroundImage: `url(${image})` }} />
			<div className="sidebar-wrapper">
				<div className="logo d-flex align-items-center justify-content-start">
					<span className="simple-text logo-mini mx-1">
						<div className="logo-img">
							<img src={require('assets/img/logo.png').default} alt="logo" />
						</div>
					</span>
					<span className="simple-text">Shye Chern</span>
				</div>
				<Nav>
					{sidebarRoutes.map((value, index) => {
						if (value.expandable) {
							return (
								<li key={index}>
									<a
										href="#"
										className={activeMenu(index)}
										onClick={(e) => toggleMenu(e, value.name)}
									>
										<i className={value.icon} />
										<p>{value.name}</p>
										<i
											className={`fa float-right m-0 ${
												collapseMenu === value.name ? 'fa-caret-up' : 'fa-caret-down'
											} `}
										></i>
									</a>

									<Collapse in={collapseMenu === value.name}>
										<ul>
											{value.child.map((child, key) => {
												return (
													<li className={activeRoute(child.path)} key={key}>
														<NavLink to={child.path} className="nav-link" activeClassName="active">
															<i className={child.icon} />
															<p>{child.name}</p>
														</NavLink>
													</li>
												);
											})}
										</ul>
									</Collapse>
								</li>
							);
						} else {
							return (
								<li className={activeRoute(value.path)} key={index}>
									<NavLink to={value.path} className="nav-link" activeClassName="active">
										<i className={value.icon} />
										<p>{value.name}</p>
									</NavLink>
								</li>
							);
						}
					})}
				</Nav>
			</div>
		</div>
	);
}
