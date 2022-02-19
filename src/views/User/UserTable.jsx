/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { app, func } from 'components/hooks';
import EditUserModal from 'views/user/editUserModal';
import CustomReactTable, { useReactTable } from 'components/react-table';
import DeleteModal, { useDeleteModal } from 'components/modal/deleteModal';
import { constant } from 'utils/constant';

export default function UserTable() {
	const { dispatchApp } = useContext(app.context);
	const { funcState } = useContext(func.context);
	const deleteModal = useDeleteModal();
	const reactTable = useReactTable();
	const [showEditModal, setShowEditModal] = useState(false);
	const [user, setUser] = useState({});
	const [error, setError] = useState('');

	useEffect(() => {
		deleteModal.init({
			title: 'Delete User',
			description: `Confirm to delete user ${user.name}?`,
			deleteFunction: () => {
				funcState.notification(`Delete user ${user.name} success`);
				deleteModal.setShow(false);
			},
		});
	}, [user]);

	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState([
		{ id: 1, name: 'Alex', age: 20 },
		{ id: 2, name: 'Bob', age: 22 },
		{ id: 3, name: 'Casey', age: 13 },
		{ id: 4, name: 'David', age: 33 },
	]);

	const columns = [
		{
			header: 'Actions',
			accessor: 'actions',
			disableGlobalFilter: true,
			disableSortBy: true,
			style: { width: 1 },
			Cell: ({ row }) => {
				return (
					<div className="d-flex">
						<button
							className="btn btn-warning"
							onClick={() => {
								setError('');
								setUser(row.original);
								setShowEditModal(true);
							}}
						>
							Edit
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								setUser(row.original);
								deleteModal.setShow(true);
							}}
						>
							Delete
						</button>
					</div>
				);
			},
		},
		{ header: 'ID', accessor: 'id' },
		{ header: 'Name', accessor: 'name' },
		{
			header: 'Age',
			accessor: 'age',
		},
	];

	const editUser = (data, reset) => {
		if (Math.random() < 0.5) {
			console.log(data);
			dispatchApp({ type: constant.SET_LOADING, isLoading: true });
			dispatchApp({ type: constant.SET_LOADING, isLoading: false });
			reset();
			setError('');
			setShowEditModal(false);
			setUser({});
			funcState.notification(`Edit user ${user.name} success`);
		} else {
			setError('Randomize true false');
			return false;
		}
	};

	/**
	 * Check if component is still mounted to prevent memory leak
	 * Normally use in when there is async await function
	 */
	useEffect(() => {
		let mounted = true;
		async function getUserData() {
			setTimeout(() => {
				if (mounted) {
					setData([...data, { id: 5, name: 'New Data', age: 33 }]);
					reactTable.setTotalRow(data.length + 1);
				}
			}, 2000);
		}

		getUserData();

		return () => {
			mounted = false;
		};
	}, [reactTable.pageSize, reactTable.searchInput, reactTable.sortBy]);

	useEffect(() => {
		reactTable.init(columns, data, {
			...reactTable.options,
			title: 'User Table',
			exportBtn: () => {
				console.log('export');
			},
			filterBtn: () => {
				console.log('filter');
			},
			resetBtn: () => {
				console.log('reset');
			},
		});
	}, [data]);

	return (
		<>
			<EditUserModal
				show={showEditModal}
				setShow={setShowEditModal}
				user={user}
				editUser={editUser}
				error={error}
			/>
			<DeleteModal {...deleteModal} />
			<CustomReactTable {...reactTable} />
		</>
	);
}
