import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncDebounce } from 'react-table';
import { Form } from 'react-bootstrap';

/**
 * Search Input
 * @param {string} globalFilter current global filter of table
 * @param {function} setGlobalFilter function to update global filter of table
 * @returns Search Input
 */

export default function SearchInput({ globalFilter, setGlobalFilter }) {
	const [value, setValue] = useState(globalFilter || '');
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value);
	}, 1000);

	const changeValue = (value) => {
		setValue(value);
		onChange(value);
	};

	return (
		<div className="d-flex align-items-center flex-wrap">
			<Form.Control
				type="search"
				placeholder="Search..."
				value={value}
				onChange={(e) => changeValue(e.target.value)}
			/>
		</div>
	);
}

SearchInput.propTypes = {
	globalFilter: PropTypes.string,
	setGlobalFilter: PropTypes.func.isRequired,
};
