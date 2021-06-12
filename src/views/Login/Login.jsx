import React, { useState, useContext, useEffect } from 'react';
import { appContext } from 'components/hooks/app';
import { InputGroup, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { constant } from 'utils/constant';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default function Login() {
	const { appState, dispatchApp } = useContext(appContext);
	const [error, setError] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = (data) => {
		if (Math.random() < 0.5) {
			// send data to server side
			console.log(data);
			setTimeout(() => {
				dispatchApp({ type: constant.SET_LOADING, isLoading: true });
				// max age in second
				cookies.set(constant.APP, 'somedata', { maxAge: 7200 });
				window.location.pathname = 'admin';
			}, 500);
		} else {
			setError('50% chance login');
			return false;
		}
	};

	useEffect(() => {
		const appCookie = cookies.get(constant.APP);
		if (appCookie) {
			dispatchApp({ type: constant.SET_LOADING, isLoading: true });
			window.location.pathname = 'admin';
		}
	}, []);

	return (
		<div className="login-background">
			{appState.isLoading ? <div className="loader" /> : null}
			<div className="container">
				<div className="d-flex justify-content-center">
					<Form className="login-form card col-md-4" onSubmit={handleSubmit(login)}>
						<h1 className="text-center">Login</h1>
						<p className="text-danger">{error}</p>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<i className="fa fa-user"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="text"
									placeholder="Name"
									{...register('name', { required: true, maxLength: 12 })}
								></Form.Control>
							</InputGroup>
							{errors.name && errors.name.type === 'required' && (
								<p className="error-message">Name is required</p>
							)}
							{errors.name && errors.name.type === 'maxLength' && (
								<p className="error-message">Name cannot exceed 12 characters</p>
							)}
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<i className="fa fa-key"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="password"
									placeholder="Password"
									{...register('password', { required: true })}
								></Form.Control>
							</InputGroup>
							{errors.password && errors.password.type === 'required' && (
								<p className="error-message">Password is required</p>
							)}
						</Form.Group>
						<input type="submit" value="Login" className="btn btn-primary" />
					</Form>
				</div>
			</div>
		</div>
	);
}
