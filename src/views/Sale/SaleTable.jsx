import React, { useState, useContext } from 'react';
import { appContext } from 'components/hooks/app';
import CustomMaterialTable from 'components/table/CustomMaterialTable';
import DeleteModal from 'components/modal/DeleteModal';
import Notification, { useNoti } from 'components/notification/Notification';
import SaleModal from 'views/Sale/SaleModal';
import { GET, POST } from 'utils/api';
import { convertFormData } from 'utils/function';
import { constant } from 'utils/constant';

export default function SaleTable() {
	const { dispatchApp } = useContext(appContext);
	const { Noti, ...rest } = useNoti();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedSale, setSelectedSale] = useState({});
	const [error, setError] = useState('');

	// Material table data props
	const data = [
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
	];

	// Material table data props (remote)
	// eslint-disable-next-line no-unused-vars
	const getSaleData = async (query) => {
		let params = {
			page: query.page + 1,
		};
		if (query.search) {
			params.packageName = query.search;
		}
		return GET('v1/sales', params)
			.then((res) => {
				return {
					data: res.data.row,
					page: query.page,
					totalCount: parseInt(res.data.totalRow),
				};
			})
			.catch((err) => alert(err.message));
	};

	// delete sale function
	const deleteSale = () => {
		Noti('Delete sale successfully');
		setShowDeleteModal(false);
	};

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
			Noti('Add sale successfully');
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
		Noti('Edit sale successfully');
	};

	// Material table actions props
	const actions = [
		{
			icon: 'edit',
			tooltip: 'Actions',
			iconProps: {
				fontSize: 'small',
				color: 'action',
			},
			onClick: (event, rowData) => {
				setSelectedSale(rowData);
				setShowEditModal(true);
			},
		},
		{
			icon: 'delete',
			tooltip: 'Actions',
			iconProps: {
				fontSize: 'small',
				color: 'action',
			},
			onClick: (event, rowData) => {
				setSelectedSale(rowData);
				setShowDeleteModal(true);
			},
		},
		{
			icon: 'add',
			tooltip: 'Add Sale',
			isFreeAction: true,
			onClick: () => {
				setShowAddModal(true);
			},
		},
	];

	// Material table columns props
	const columns = [
		{
			title: 'Sale ID',
			searchable: false,
			field: 'id',
			hidden: true,
		},
		{
			title: 'User ID',
			field: 'userId',
		},
		{
			title: 'Package Name',
			field: 'packageName',
		},
		{
			title: 'Quantity',
			field: 'quantity',
		},
		{
			title: 'Sale Date',
			field: 'saleDate',
		},
		{
			title: 'Attachment',
			field: 'attachment',
			render: (row) => {
				return row.attachment ? (
					<a href={row.attachment} target="_blank" rel="noreferrer">
						<i className="fa fa-eye fa-lg"></i>
					</a>
				) : (
					<i>No attachment available</i>
				);
			},
		},
	];

	return (
		<>
			<Notification {...rest} />
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
			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				deleteFunction={deleteSale}
				title={'Delete Sale'}
				description={`Confirm to delete sale ${selectedSale.id}?`}
			/>
			<CustomMaterialTable data={data} title={'Sale'} columns={columns} actions={actions} />
		</>
	);
}
