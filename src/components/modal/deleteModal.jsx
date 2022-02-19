import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

// Hook
export function useDeleteModal() {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Delete Modal');
	const [description, setDescription] = useState('Confirm to delete item?');
	const [deleteFunction, setDeleteFunction] = useState(() => {});

	const init = ({ title, description, deleteFunction }) => {
		setTitle(title);
		setDescription(description);
		setDeleteFunction(() => deleteFunction);
	};
	return {
		show,
		setShow,
		title,
		description,
		setDescription,
		deleteFunction,
		init,
	};
}

/**
 * Reusable Delete Modal
 * @param {boolean} isShow
 * @param {string} title
 * @param {string} description
 * @param {function} deleteFunction
 * @returns Delete Modal
 */
export default function DeleteModal({ show, setShow, title, description, deleteFunction }) {
	return (
		<>
			<Modal size="md" show={show} onHide={() => setShow(false)} backdrop={'static'}>
				<Modal.Header closeButton>
					<Modal.Title className="m-0">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
	deleteFunction: PropTypes.func.isRequired,
};
