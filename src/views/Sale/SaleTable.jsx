/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { app, func } from 'components/hooks';
import CustomReactTable, { useReactTable } from 'components/react-table';
import DeleteModal, { useDeleteModal } from 'components/modal/deleteModal';
import SaleModal from 'views/sale/saleModal';
import { POST } from 'utils/api';
import { convertFormData } from 'utils/function';
import { constant } from 'utils/constant';

export default function SaleTable() {
	const { dispatchApp } = useContext(app.context);
	const { funcState } = useContext(func.context);
	const deleteModal = useDeleteModal();
	const reactTable = useReactTable();
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedSale, setSelectedSale] = useState({});
	const [error, setError] = useState('');
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
			description: `Confirm to delete sale ${selectedSale.id}?`,
			deleteFunction: () => {
				funcState.notification('Delete sale successfully');
				deleteModal.setShow(false);
			},
		});
	}, [selectedSale]);

	const addSale = async (data, reset) => {
		if (Math.random() < 0.5) {
			dispatchApp({ type: constant.SET_LOADING, isLoading: true });

			let saleData = {
				userId: Math.floor(Math.random() * 10),
				packageName: data.packageName.value,
				quantity: data.quantity,
				saleDate: data.saleDate,
				attachment: data.attachment[0],
			};

			console.log(saleData);

			const formData = convertFormData(saleData);

			await POST('v1/sales', formData, { 'Content-Type': 'multipart/form-data' })
				.then((res) => {
					console.log(res);
				})
				.catch((err) => setError(err.message));

			// move to api call if backend available
			dispatchApp({ type: constant.SET_LOADING, isLoading: false });
			reset();
			setError('');
			setShowAddModal(false);
			funcState.notification('Add sale successfully');
		} else {
			setError('Randomize true false');
			return false;
		}
	};

	const editSale = (data, reset) => {
		console.log(data);
		reset();
		setError('');
		setShowEditModal(false);
		funcState.notification('Edit sale successfully');
	};

	useEffect(() => {
		reactTable.init(columns, data, {
			...reactTable.options,
			title: 'Sale Table',
			addBtn: {
				text: 'Add Sale',
				func: () => {
					setShowAddModal(true);
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
								setSelectedSale(row.original);
								setShowEditModal(true);
							}}
						>
							<i className="far fa-edit"></i>
						</button>
						<button
							className="btn btn-icon"
							onClick={() => {
								setSelectedSale(row.original);
								deleteModal.setShow(true);
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
			<SaleModal
				title={'Add Sale'}
				show={showAddModal}
				setShow={setShowAddModal}
				submit={addSale}
				error={error}
			/>
			<SaleModal
				title={'Edit Sale'}
				show={showEditModal}
				setShow={setShowEditModal}
				submit={editSale}
				sale={selectedSale}
				error={error}
			/>
			<DeleteModal {...deleteModal} />
			<CustomReactTable {...reactTable} />
		</>
	);
}
