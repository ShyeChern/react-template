/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { func } from 'components/hooks';
import CustomReactTable, { useReactTable } from 'components/react-table';
import DeleteModal, { useDeleteModal } from 'components/modal/deleteModal';
import SaleModal, { useSaleModal } from 'views/sale/saleModal';

export default function SaleTable() {
	const { funcState } = useContext(func.context);
	const deleteModal = useDeleteModal();
	const saleModal = useSaleModal();
	const reactTable = useReactTable();
	const [data, setData] = useState([
		{
			id: 1,
			userId: 2,
			packageName: 'Yellow',
			quantity: 1,
			saleDate: '2021-01-01T16:00:00.000Z',
			attachment: 'http://localhost:5000/api/v1/view/profile/1619245872532.jpg',
		},
		{
			id: 2,
			userId: 1,
			packageName: 'Red',
			quantity: 1,
			saleDate: '2021-03-04T16:00:00.000Z',
			attachment: null,
		},
	]);

	useEffect(() => {
		deleteModal.init({
			title: 'Delete Sale',
			description: `Confirm to delete sale ${deleteModal.data?.id}?`,
			deleteFunction: () => {
				funcState.notification('Delete sale successfully');
				deleteModal.setShow(false);
			},
		});
	}, [deleteModal.data]);

	useEffect(() => {
		reactTable.init(columns, data, {
			...reactTable.options,
			title: 'Sale Table',
			addBtn: {
				text: 'Add Sale',
				func: () => {
					saleModal.add();
				},
			},
			exportBtn: () => {
				console.log('export');
			},
			filterBtn: () => {
				console.log('filter');
			},
			resetBtn: () => {
				console.log('reset');
			},
			isSticky: true,
		});
	}, [data]);

	useEffect(() => {
		let mounted = true;
		async function getSaleData() {
			setTimeout(() => {
				if (mounted) {
					setData([
						...data,
						{
							id: 2,
							userId: 1,
							packageName: 'Red',
							quantity: 1,
							saleDate: '2021-03-04T16:00:00.000Z',
							attachment: null,
						},
					]);
					reactTable.setTotalRow(data.length + 1);
				}
			}, 2000);
		}

		getSaleData();

		return () => {
			mounted = false;
		};
	}, [reactTable.pageSize, reactTable.searchInput, reactTable.sortBy]);

	// Material table columns props
	const columns = [
		{
			header: 'Sale ID',
			accessor: 'id',
			className: 'sticky-left',
		},
		{
			header: 'User ID',
			accessor: 'userId',
			className: 'sticky-left shadow-right',
		},
		{
			header: 'Package Name',
			accessor: 'packageName',
			width: 250,
		},
		{
			header: 'Quantity',
			accessor: 'quantity',
		},
		{
			header: 'Sale Date',
			accessor: 'saleDate',
			width: 300,
		},
		{
			header: 'Attachment',
			accessor: 'attachment',
			width: 300,
			disableGlobalFilter: true,
			disableSortBy: true,
			Cell: ({ row }) => {
				return row.attachment ? (
					<a href={row.attachment} target="_blank" rel="noreferrer">
						<i className="fa fa-eye fa-lg"></i>
					</a>
				) : (
					<i>No attachment available</i>
				);
			},
		},
		{
			header: 'Actions',
			accessor: 'actions',
			disableGlobalFilter: true,
			disableSortBy: true,
			className: 'sticky-right shadow-left',
			width: 100,
			Cell: ({ row }) => {
				return (
					<>
						<button
							className="btn btn-icon"
							onClick={() => {
								saleModal.edit(row.original);
							}}
						>
							<i className="far fa-edit"></i>
						</button>
						<button
							className="btn btn-icon"
							onClick={() => {
								deleteModal.del(row.original);
							}}
						>
							<i className="far fa-trash-alt"></i>
						</button>
					</>
				);
			},
		},
	];

	return (
		<>
			<SaleModal {...saleModal} />
			<DeleteModal {...deleteModal} />
			<CustomReactTable {...reactTable} />
		</>
	);
}
