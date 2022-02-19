import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { app } from 'components/hooks';
import { adminRoutes } from 'routes';
import { constant } from 'utils/constant';

export default function TopNav({ logout }) {
	const { pathname } = useLocation();
	const { appState, dispatchApp } = useContext(app.context);

	/**
	 * Toggle the sidebar and create a div in body
	 * Click on body to toggle again the sidebar
	 */
	const mobileSidebarToggle = (e) => {
		e.preventDefault();
		document.documentElement.classList.toggle('nav-open');
		let node = document.createElement('div');
		node.id = 'bodyClick';
		node.onclick = function () {
			this.parentElement.removeChild(this);
			document.documentElement.classList.toggle('nav-open');
		};
		document.body.appendChild(node);
	};

	const getBrandText = () => {
		const index = adminRoutes.findIndex((value) => pathname === value.path);
		return index !== -1 ? adminRoutes[index].name : 'Shye Chern';
	};

	const loading = () => {
		dispatchApp({ type: constant.SET_LOADING, isLoading: true });
		setTimeout(() => {
			dispatchApp({ type: constant.SET_LOADING, isLoading: false });
		}, 3000);
	};

	/**
	 * href in dropdown can use to see if it is active, if active shows active color
	 */

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
						<Button
							variant="dark"
							className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
							onClick={mobileSidebarToggle}
						>
							<i className="fas fa-ellipsis-v"></i>
						</Button>
						<Navbar.Brand href={pathname} className="mr-2">
							{getBrandText()}
						</Navbar.Brand>
					</div>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{/* Left Side of Nav Bar */}
						<Nav className="nav mr-auto" navbar>
							<Nav.Item>
								<Nav.Link className="m-0" onClick={() => loading()}>
									<span>
										<i></i>Loading 3s
									</span>
								</Nav.Link>
							</Nav.Item>
							<Dropdown as={Nav.Item}>
								<Dropdown.Toggle
									as={Nav.Link}
									aria-expanded={false}
									aria-haspopup={true}
									data-toggle="dropdown"
									className="m-0"
								>
									<span>Dropdown</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="#...">Action</Dropdown.Item>
									<Dropdown.Item onClick={(e) => e.preventDefault()}>Another action</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
						{/* Right Side of Nav Bar */}
						<Nav className="ml-auto" navbar>
							<Nav.Item>
								<Nav.Link className="m-0" href="#pablo" onClick={(e) => e.preventDefault()}>
									<span>
										<i></i>Some Item
									</span>
								</Nav.Link>
							</Nav.Item>
							<Dropdown as={Nav.Item}>
								<Dropdown.Toggle
									as={Nav.Link}
									aria-expanded={false}
									aria-haspopup={true}
									data-toggle="dropdown"
									className="m-0"
								>
									<span>Dropdown</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="#...">Action</Dropdown.Item>
									<Dropdown.Item onClick={(e) => e.preventDefault()}>Another action</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							{appState.isLogin && (
								<Nav.Item>
									<Nav.Link className="m-0" onClick={() => logout()}>
										<span>Log out</span>
									</Nav.Link>
								</Nav.Item>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

TopNav.propTypes = {
	logout: PropTypes.func.isRequired,
};
