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
 * @returns Pagination
 */

export default function CustomPagination({
	gotoPage,
	canPreviousPage,
	previousPage,
	nextPage,
	canNextPage,
	pageCount,
	pageIndex,
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
		<div className="row">
			<div className="col-sm-12 col-md-6 text-center">
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageCount}{' '}
					</strong>
				</span>
				<span> | Go to page: </span>
				<input
					className="w-10"
					min={1}
					type="number"
					value={pageIndex + 1}
					onChange={(e) => gotoPage(e.target.value - 1)}
				/>
			</div>
			<div className="d-flex justify-content-center m-auto">
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
};
