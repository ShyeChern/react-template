import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { Modal, InputGroup, Form, Col } from 'react-bootstrap';
import Select from 'react-select';

const options = [
	{ value: 'Blue', label: 'Blue' },
	{ value: 'Red', label: 'Red' },
	{ value: 'Yellow', label: 'Yellow' },
];

export default function SaleModal({ title, show, setShow, submit, error, sale = {} }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
		setValue,
	} = useForm({ defaultValues: { packageName: '' } }); // set controller default value for reset function

	useEffect(() => {
		if (Object.keys(sale).length !== 0) {
			setValue(
				'packageName',
				options.find((value) => value.value === sale.packageName),
				{ shouldValidate: true }
			);
			setValue('quantity', sale.quantity, { shouldValidate: true });
			setValue('saleDate', format(new Date(sale.saleDate), 'yyyy-MM-dd'), { shouldValidate: true });
		}
	}, [sale]);

	return (
		<Modal size="lg" show={show} onHide={() => setShow(false)} backdrop={'static'}>
			<Form onSubmit={handleSubmit((data) => submit(data, reset))}>
				<Modal.Header closeButton>
					<Modal.Title className="m-0">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <p className="text-danger">{error}</p>}
					<div className="row">
						<Form.Group as={Col} md={6} controlId="packageName">
							<Form.Label>Package Name</Form.Label>
							<div className="d-flex">
								<InputGroup.Prepend>
									<InputGroup.Text>
										<i className="fa fa-box"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Controller
									name="packageName"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Select
											{...field}
											isSearchable={true}
											className="w-100"
											placeholder="Package name"
											options={options}
										/>
									)}
								/>
							</div>
							{errors.packageName && errors.packageName.type === 'required' && (
								<p className="error-message">Package name is required</p>
							)}
						</Form.Group>
						<Form.Group as={Col} md={6} controlId="quantity">
							<Form.Label>Quantity</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<i className="fa fa-sort-numeric-up"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="number"
									placeholder="Quantity"
									{...register('quantity', { required: true, min: 1 })}
								/>
							</InputGroup>
							{errors.quantity && errors.quantity.type === 'required' && (
								<p className="error-message">Quantity is required</p>
							)}
							{errors.quantity && errors.quantity.type === 'min' && (
								<p className="error-message">Quantity must be a valid number</p>
							)}
						</Form.Group>
						<Form.Group as={Col} md={6} controlId="saleDate">
							<Form.Label>Quantity</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<i className="fa fa-calendar"></i>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="date"
									placeholder="Sale Date"
									{...register('saleDate', { required: true })}
								/>
							</InputGroup>
							{errors.saleDate && errors.saleDate.type === 'required' && (
								<p className="error-message">Sale date is required</p>
							)}
						</Form.Group>
						<Form.Group as={Col} md={6} controlId="attachment">
							<Form.Label>Attachment</Form.Label>
							<InputGroup>
								<Form.Control
									type="file"
									accept=".pdf"
									placeholder="Attachment"
									{...register('attachment', { required: true })}
								/>
							</InputGroup>
							{errors.attachment && errors.attachment.type === 'required' && (
								<p className="error-message">Attachment is required</p>
							)}
						</Form.Group>
					</div>
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

SaleModal.propTypes = {
	title: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	sale: PropTypes.object,
};
