/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { appContext } from 'components/hooks/app';
import EditUserModal from 'views/User/EditUserModal';
import CustomReactTable from 'components/table/CustomReactTable';
import DeleteModal from 'components/modal/DeleteModal';
import Notification, { useNoti } from 'components/notification/Notification';

export default function UserTable() {
	const { dispatchApp } = useContext(appContext);
	const { Noti, ...rest } = useNoti();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [user, setUser] = useState({});
	const [error, setError] = useState('');

	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState([
		{ id: 1, name: 'Alex', age: 20 },
		{ id: 2, name: 'Bob', age: 22 },
		{ id: 3, name: 'Casey', age: 13 },
		{ id: 4, name: 'David', age: 33 },
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'Actions',
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
									setShowDeleteModal(true);
								}}
							>
								Delete
							</button>
						</div>
					);
				},
			},
			{ Header: 'ID', accessor: 'id', id: 'id' },
			{ Header: 'Name', accessor: 'name' },
			{
				Header: 'Age',
				accessor: 'age',
			},
		],
		[]
	);

	const deleteUser = () => {
		Noti(`Delete user ${user.name} success`);
		setShowDeleteModal(false);
	};

	const editUser = (data, reset) => {
		if (Math.random() < 0.5) {
			console.log(data);
			dispatchApp({ type: 'SET_LOADING', isLoading: true });
			dispatchApp({ type: 'SET_LOADING', isLoading: false });
			reset();
			setError('');
			setShowEditModal(false);
			setUser({});
			Noti(`Edit user ${user.name} success`);
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
					// setData([...data, { id: 5, name: 'New Data', age: 33 }])
				}
			}, 2000);
		}

		getUserData();

		return () => {
			mounted = false;
		};
	}, [data]);

	return (
		<>
			<Notification {...rest} />
			<EditUserModal
				show={showEditModal}
				setShow={setShowEditModal}
				user={user}
				editUser={editUser}
				error={error}
			/>
			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				deleteFunction={deleteUser}
				title={'Delete User'}
				description={`Confirm to delete user ${user.name}?`}
			/>
			<CustomReactTable
				data={useMemo(() => data, [data])}
				columns={columns}
				hiddenColumns={['id']}
			/>
		</>
	);
}
