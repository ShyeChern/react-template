import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Modal, Form, Row } from 'react-bootstrap';

export default function EditUserModal({ show, setShow, user, editUser, error }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	useEffect(() => {
		setValue('name', user.name, { shouldValidate: true });
		setValue('age', user.age, { shouldValidate: true });
	}, [user]);

	return (
		<Modal size="lg" show={show} onHide={() => setShow(false)} backdrop={'static'}>
			<Form onSubmit={handleSubmit((data) => editUser(data, reset))}>
				<Modal.Header closeButton>
					<Modal.Title className="m-0">Edit User</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ alignItems: 'center' }}>
					{error ? <p className="text-danger">{error}</p> : null}
					<Form.Group as={Row} controlId="name">
						<Form.Label column md={2} xs={12}>
							Name
						</Form.Label>
						<div className="col-md-8 col-sm-12">
							<Form.Control
								type="text"
								placeholder="Name"
								{...register('name', { required: true, maxLength: 12 })}
							/>
							{errors.name && errors.name.type === 'required' && (
								<p className="error-message">Name is required</p>
							)}
							{errors.name && errors.name.type === 'maxLength' && (
								<p className="error-message">Name cannot exceed 12 characters</p>
							)}
						</div>
					</Form.Group>
					<Form.Group as={Row} controlId="age">
						<Form.Label column md={2} xs={12}>
							Age
						</Form.Label>
						<div className="col-md-8 col-sm-12">
							<Form.Control
								type="number"
								placeholder="Age"
								{...register('age', { required: true, min: 1 })}
							/>
							{errors.age && errors.age.type === 'required' && (
								<p className="error-message">Age is required</p>
							)}
							{errors.age && errors.age.type === 'min' && (
								<p className="error-message">Age must be a valid number</p>
							)}
						</div>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
						Close
					</button>
					<input type="submit" value="Confirm" className="btn btn-primary" />
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

EditUserModal.propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
	user: PropTypes.object,
	editUser: PropTypes.func,
	error: PropTypes.string,
};
