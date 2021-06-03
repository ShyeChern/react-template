import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { Table } from 'react-bootstrap';
import SearchInput from 'components/table/ReactTable/SearchInput';
import Pagination from 'components/table/ReactTable/Pagination';

/**
 * react-table is a headless UI table, need to render table UI by own or using other libraries
 * https://react-table.tanstack.com/docs/overview
 * Other components is separated with the main function to avoid re-render issue
 * eg: avoid re-render on search input keyup
 * @param {array} columns columns of Table
 * @param {array} data data of Table
 * @returns Table
 */

export default function CustomReactTable({ columns, data, hiddenColumns = [] }) {
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
		state: { pageIndex, globalFilter },
	} = useTable(
		{ columns, data, initialState: { hiddenColumns, pageSize: 10 } },
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<>
			<SearchInput globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
			<Table striped bordered hover size="sm" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => {
								return (
									<th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										style={{ ...column.getSortByToggleProps().style, ...column.style }}
										key={index}
									>
										{column.render('Header')}
										<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} style={{ textAlign: 'center', fontStyle: 'italic' }}>
								Empty Data
							</td>
						</tr>
					) : null}
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									return (
										<td {...cell.getCellProps()} key={index}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Pagination
				gotoPage={gotoPage}
				canPreviousPage={canPreviousPage}
				previousPage={previousPage}
				nextPage={nextPage}
				canNextPage={canNextPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
			/>
		</>
	);
}

CustomReactTable.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	hiddenColumns: PropTypes.array,
};

