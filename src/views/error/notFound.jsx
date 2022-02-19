import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Not Found UI Component
 */
export default function NotFound() {
	return (
		<div className="d-flex justify-content-center">
			<div className="px-4 py-5">
				<h1>404</h1>
				<h2>Oops! This Page Could Not Be Found</h2>
				<p>
					Sorry but the page you are looking for does not exist, have been removed, name changed or
					is temporarily unavailable
				</p>
				<Link to="/">
					<button className="btn btn-primary py-2 px-3">Okay</button>
				</Link>
			</div>
		</div>
	);
}
