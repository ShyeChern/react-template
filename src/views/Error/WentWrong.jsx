import React from 'react';
import PropTypes from 'prop-types';
/**
 * Error boundary for react app
 * @param {Error} Error error variable
 * @returns Went Wrong UI component
 */
export default function WentWrong({ error, resetErrorBoundary }) {
	return (
		<div className="d-flex justify-content-center">
			<div className="px-4 py-5">
				<h2>Oops! Something went wrong</h2>
				<p>Please try again later. If the problem persists, please contact our support</p>
				<p>
					<small>{error.message}</small>
				</p>
				<button className="btn btn-primary py-2 px-3" onClick={resetErrorBoundary}>
					Okay
				</button>
			</div>
		</div>
	);
}

WentWrong.propTypes = {
	error: PropTypes.object,
	resetErrorBoundary: PropTypes.func,
};
