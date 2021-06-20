import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

/**
 * Reusable Notification Alert Component with Custom Hooks
 * @param {string} text text to show
 * @param {string} type default to success
 * @param {string} icon default to nc-alien-33 icon
 * @returns Notification Alert
 */

// Hook
export function useNoti() {
	const [noti, setNoti] = useState({});

	const Noti = (text, type = 'success', icon = 'nc-icon nc-alien-33') => {
		setNoti({ text, type, icon });
	};

	return { Noti, noti };
}

// Component
export default function Notification({ noti }) {
	const [show, setShow] = useState(false);
	const { text, type, icon } = noti;
	const init = useRef(true);
	useEffect(() => {
		let timer;
		if (init.current) {
			init.current = false;
		} else {
			setShow(true);
			timer = setTimeout(() => {
				setShow(false);
			}, 3000);
		}

		return () => {
			// to clear to previous timeout
			clearTimeout(timer);
		};
	}, [noti]);

	return (
		<>
			<Alert
				variant={type}
				className="alert-with-icon alert-noti"
				show={show}
				onClose={() => setShow(false)}
				dismissible={true}
			>
				<span data-notify="icon" className={`${icon}`}></span>
				<span>{text}</span>
			</Alert>
		</>
	);
}

Notification.propTypes = {
	noti: PropTypes.object.isRequired,
	text: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string,
};
