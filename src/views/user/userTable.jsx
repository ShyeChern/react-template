/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { func } from 'components/hooks';
import UserModal, { useUserModal } from 'views/user/userModal';
import CustomReactTable, { useReactTable } from 'components/react-table';
import DeleteModal, { useDeleteModal } from 'components/modal/deleteModal';

export default function UserTable() {
	const { funcState } = useContext(func.context);
	const deleteModal = useDeleteModal();
	const userModal = useUserModal();
	const reactTable = useReactTable();

	useEffect(() => {
		deleteModal.init({
			title: 'Delete User',
			description: `Confirm to delete user ${deleteModal.data?.name}?`,
			deleteFunction: () => {
				funcState.notification(`Delete user ${deleteModal.data.name} success`);
				deleteModal.setShow(false);
			},
		});
	}, [deleteModal.data]);

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
								userModal.edit(row.original);
							}}
						>
							Edit
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								deleteModal.del(row.original);
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
			<UserModal {...userModal} />
			<DeleteModal {...deleteModal} />
			<CustomReactTable {...reactTable} />
		</>
	);
}
