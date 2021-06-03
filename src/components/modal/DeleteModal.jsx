import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

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
	show: PropTypes.bool,
	setShow: PropTypes.func,
	title: PropTypes.string,
	description: PropTypes.string,
	deleteFunction: PropTypes.func,
};
