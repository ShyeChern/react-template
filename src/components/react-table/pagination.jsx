import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

/**
 * Pagination
 * @param {function} gotoPage function to go desired page
 * @param {boolean} canPreviousPage value to check can go previous page
 * @param {function} previousPage function to go previous page
 * @param {function} nextPage function to go next page
 * @param {boolean} canNextPage value to check can go next page
 * @param {int} pageCount total page count
 * @param {int} pageIndex current page index (start from 0)
 * @param {function} setPageSize set table page size
 * @param {int} pageSize table page size
 * @param {int} totalRow total row in database (start from 0)
 * @returns Pagination
 */

const PAGE_SIZE = [10, 25, 50];

export default function CustomPagination({
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageIndex,
	setPageSize,
	pageSize,
	totalRow,
}) {
	const range = 3; // display up to 2 page, remaining show ellipsis
	let paginationItem = [];
	let currentItem = 0; // to check current item number to avoid left and right ellipsis stack (happens if pageIndex at middle to end)
	let leftDot = false; // to check if left ellipsis already exist
	let rightDot = false; // to check if right ellipsis already exist

	for (let i = 0; i < pageCount; i++) {
		paginationItem.push(
			<Pagination.Item
				active={i === pageIndex}
				key={i}
				onClick={() => {
					gotoPage(i);
				}}
			>
				{i + 1}
			</Pagination.Item>
		);
	}
	return (
		<div className="d-flex flex-wrap justify-content-between text-muted">
			<div className="d-flex align-items-center">
				<p>
					Showing {pageIndex * pageCount + 1} - {pageIndex * pageCount + parseInt(pageSize)} of{' '}
					{totalRow} items{' '}
				</p>
				<span className="mx-2">|</span>
				<p>Show</p>
				<select
					className="mx-2 text-muted"
					onChange={({ target }) => setPageSize(parseInt(target.value))}
				>
					{PAGE_SIZE.map((value, index) => (
						<option value={value} key={index}>
							{value}
						</option>
					))}
				</select>
				<p>data entries</p>
			</div>
			<Pagination>
				<Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
				<Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
				{paginationItem.map((value, index) => {
					if (
						index === 0 ||
						index === pageCount - 1 ||
						(index + range > pageIndex && index - range < pageIndex)
					) {
						// display first, last and range of current index
						currentItem++;
						return value;
					} else if (!leftDot && pageIndex > range) {
						// display left ellipsis after exceed the range
						leftDot = true;
						return (
							<Pagination.Ellipsis
								onClick={() => {
									gotoPage(pageIndex - range);
								}}
							/>
						);
					} else if (!rightDot && pageIndex < pageCount - range - 1 && currentItem > 1) {
						// display right ellipsis after the page number and current index not in the range from last page
						rightDot = true;
						return (
							<Pagination.Ellipsis
								onClick={() => {
									gotoPage(pageIndex + range);
								}}
							/>
						);
					}
				})}
				<Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
				<Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
			</Pagination>
		</div>
	);
}

CustomPagination.propTypes = {
	gotoPage: PropTypes.func.isRequired,
	canPreviousPage: PropTypes.bool.isRequired,
	previousPage: PropTypes.func.isRequired,
	nextPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool.isRequired,
	pageCount: PropTypes.number.isRequired,
	pageIndex: PropTypes.number.isRequired,
	setPageSize: PropTypes.func.isRequired,
	pageSize: PropTypes.number.isRequired,
	totalRow: PropTypes.number.isRequired,
};
