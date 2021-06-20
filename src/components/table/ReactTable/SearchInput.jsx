import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncDebounce } from 'react-table';

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
			<label className="m-0">Search&nbsp;</label>
			<div className="d-flex">
				<input
					type="text"
					placeholder="Search here"
					value={value}
					onChange={(e) => changeValue(e.target.value)}
				/>
				<button className="btn btn-sm btn-primary" onClick={() => changeValue('')}>
					Reset
				</button>
			</div>
		</div>
	);
}

SearchInput.propTypes = {
	globalFilter: PropTypes.string,
	setGlobalFilter: PropTypes.func.isRequired,
};
