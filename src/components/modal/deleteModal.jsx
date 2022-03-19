import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

// Hook
export function useDeleteModal() {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Delete Modal');
	const [description, setDescription] = useState('Confirm to delete item?');
	const [data, setData] = useState();
	const [error, setError] = useState('');
	const [deleteFunction, setDeleteFunction] = useState(() => () => {});

	const init = ({ title, description, deleteFunction }) => {
		setError('');
		setTitle(title);
		setDescription(description);
		setDeleteFunction(() => deleteFunction);
	};

	const del = (data) => {
		setData(data);
		setShow(true);
	};

	return {
		show,
		setShow,
		del,
		title,
		description,
		setDescription,
		deleteFunction,
		data,
		error,
		setError,
		init,
	};
}

/**
 * Reusable Delete Modal
 * @param {boolean} isShow
 * @param {string} title
 * @param {string} description
 * @param {string} error
 * @param {function} deleteFunction
 * @returns Delete Modal
 */
export default function DeleteModal({ show, setShow, title, description, error, deleteFunction }) {
	return (
		<>
			<Modal size="md" show={show} onHide={() => setShow(false)} backdrop={'static'}>
				<Modal.Header closeButton>
					<Modal.Title className="m-0">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <p className="text-danger">{error}</p>}
					<p>{description}</p>
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
						Close
					</button>
					<button type="button" className="btn btn-primary" onClick={deleteFunction}>
						Confirm
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

DeleteModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	deleteFunction: PropTypes.func.isRequired,
};
