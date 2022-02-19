import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTable, useBlockLayout, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { Table } from 'react-bootstrap';
import SearchInput from 'components/react-table/searchInput';
import Pagination from 'components/react-table/pagination';
import classNames from 'classnames';

// Hook
export function useReactTable() {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [pageSize, setPageSizeHooks] = useState(10);
	const [totalRow, setTotalRow] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [sortBy, setSortBy] = useState();
	const [options, setOptions] = useState({
		title: '',
		hiddenColumns: [], // array of string
		exportBtn: false, // provide function to export
		addBtn: false, // provide text and function to show modal {text: btnName, func:()=>{}}
		filterBtn: false, // provide function to show filter
		resetBtn: false, // provide function to show reset
		isSticky: false, // contain sticky column?
	});

	const init = (columns, data, options) => {
		setColumns(columns);
		setData(data);
		setOptions((prev) => {
			return { ...prev, ...options };
		});
	};
	return {
		data,
		columns,
		pageSize,
		setPageSizeHooks,
		totalRow,
		setTotalRow,
		searchInput,
		setSearchInput,
		sortBy,
		setSortBy,
		options,
		init,
	};
}

/**
 * react-table is a headless UI table, need to render table UI by own or using other libraries
 * https://react-table.tanstack.com/docs/overview
 * Other components is separated with the main function to avoid re-render issue
 * eg: avoid re-render on search input keyup
 * @param {array} columns columns of Table
 * @param {array or function} data data of Table
 * @param {object} options options to modify table props
 * @param {func} setPageSizeHooks function to set table hooks pageSize
 * @param {func} setSearchInput function to set table hooks searchInput
 * @param {func} setSortBy function to set table hooks sortBy
 * @returns Table
 */

const DEFAULT_WIDTH = 150;
export default function CustomReactTable({
	columns,
	data,
	options,
	setPageSizeHooks,
	setSearchInput,
	setSortBy,
	...rest
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		setGlobalFilter,
		page, // page for pagination, row for no pagination
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, globalFilter = '', pageSize, sortBy },
	} = useTable(
		{
			columns: useMemo(() => columns, [columns]),
			data: useMemo(() => data, [data]),
			defaultColumn: useMemo(() => ({ width: DEFAULT_WIDTH }), []),
			initialState: { hiddenColumns: options.hiddenColumns || [], pageSize: 10, export: false },
			manualSortBy: true,
			manualGlobalFilter: true,
		},
		options.isSticky && useBlockLayout,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const [isScroll, setIsScroll] = useState(false);
	const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });
	const ref = useRef(null);

	useEffect(() => {
		setSortBy(sortBy[0]);
	}, [sortBy]);

	useEffect(() => {
		setSearchInput(globalFilter);
	}, [globalFilter]);

	const leftColumnWidth = useMemo(() => {
		let temp = 0;
		return [0, ...columns.map((value) => (temp += value.width ?? DEFAULT_WIDTH))];
	}, [columns]);

	const rightColumnWidth = useMemo(() => {
		let temp = 0;
		return [
			...columns
				.slice() // do not mutate
				.reverse()
				.map((value) => (temp += value.width ?? DEFAULT_WIDTH))
				.reverse()
				.slice(1), // remove first element to match index
			0,
		];
	}, [columns]);

	const sticklyLeftColumnWidth = useMemo(() => {
		return columns
			.filter((value) => value.className && value.className.includes('sticky-left'))
			.reduce((prev, value) => prev + (value.width ?? DEFAULT_WIDTH), 0);
	}, [columns]);

	const sticklyRightColumnWidth = useMemo(() => {
		return columns
			.filter((value) => value.className && value.className.includes('sticky-right'))
			.reduce((prev, value) => prev + (value.width ?? DEFAULT_WIDTH), 0);
	}, [columns]);

	return (
		<>
			<div className="d-flex flex-wrap justify-content-between align-items-center">
				<h5>{options.title}</h5>
				<div className="d-flex flex-wrap justify-content-between">
					<SearchInput globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} {...rest} />
					{options.addBtn && (
						<button className="btn btn-primary mx-2" type="button" onClick={options.addBtn.func}>
							{options.addBtn.text}
						</button>
					)}
					{options.filterBtn && (
						<button className="btn btn-primary mx-2 " type="button" onClick={options.filterBtn}>
							Filter List
						</button>
					)}
					{options.resetBtn && (
						<button className="btn btn-primary mx-2" type="button" onClick={options.resetBtn}>
							Reset All
						</button>
					)}
					{options.exportBtn && (
						<button className="btn btn-primary mx-2" type="button" onClick={options.exportBtn}>
							Export Icon
						</button>
					)}
				</div>
			</div>
			<div
				ref={ref}
				className={classNames('react-table-wrapper', {
					[`scroll-left-${sticklyLeftColumnWidth}`]: sticklyLeftColumnWidth > 0,
					[`scroll-right-${sticklyRightColumnWidth}`]: sticklyRightColumnWidth > 0,
				})}
				onMouseDown={(e) => {
					// check if it allow to scroll
					if (ref.current.scrollWidth > ref.current.clientWidth) {
						setIsScroll(true);
						setPos({ left: ref.current.scrollLeft, x: e.clientX });
						ref.current.style.userSelect = 'none'; // disable highlight
					}
				}}
				onMouseUp={() => {
					setIsScroll(false);
					ref.current.style.removeProperty('user-select');
				}}
				onMouseMove={(e) => {
					if (isScroll) {
						const dx = e.clientX - pos.x;
						ref.current.scrollLeft = pos.left - dx;
					}
				}}
			>
				<Table className="react-table" bordered hover {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => {
									return (
										<th
											{...column.getHeaderProps([
												column.getSortByToggleProps(),
												{
													className: column.className,
													style: {
														...column.style,
														// will only affect sticky classname
														left:
															options.isSticky &&
															column.className?.includes('sticky-left') &&
															leftColumnWidth[index],
														right:
															options.isSticky &&
															column.className?.includes('sticky-right') &&
															rightColumnWidth[index],
													},
												},
											])}
											key={index}
										>
											<div className="d-flex justify-content-between align-items-center">
												<span>{column.render('header')}</span>

												{/* Occupy space for icon*/}
												{column.canSort && !column.isSorted && (
													<i className="fas fa-sort fa-lg text-muted"></i>
												)}
												{column.isSorted && column.isSortedDesc && (
													<i className="fas fa-sort-down fa-lg"></i>
												)}
												{column.isSorted && !column.isSortedDesc && (
													<i className="fas fa-sort-up fa-lg"></i>
												)}
											</div>
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{data.length === 0 && (
							<tr>
								<td colSpan={columns.length} style={{ textAlign: 'center', fontStyle: 'italic' }}>
									Empty Data
								</td>
							</tr>
						)}
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={index}>
									{row.cells.map((cell, index) => {
										return (
											<td
												{...cell.getCellProps([
													{
														className: cell.column.className,
														style: {
															// will only affect sticky classname
															...cell.column.style,
															left:
																options.isSticky &&
																cell.column.className?.includes('sticky-left') &&
																leftColumnWidth[index],
															right:
																options.isSticky &&
																cell.column.className?.includes('sticky-right') &&
																rightColumnWidth[index],
															display: options.isSticky && 'flex',
														},
													},
												])}
												key={index}
											>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<Pagination
				gotoPage={gotoPage}
				canPreviousPage={canPreviousPage}
				previousPage={previousPage}
				nextPage={nextPage}
				canNextPage={canNextPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				setPageSize={(value) => {
					setPageSize(value);
					setPageSizeHooks(value);
				}}
				pageSize={pageSize}
				{...rest}
			/>
		</>
	);
}

CustomReactTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.any.isRequired,
	options: PropTypes.object.isRequired,
	setPageSizeHooks: PropTypes.func.isRequired,
	setSearchInput: PropTypes.func.isRequired,
	setSortBy: PropTypes.func.isRequired,
};
