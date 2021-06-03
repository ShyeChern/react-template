import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';

/**
 * https://material-table.com/#/docs/get-started
 * @param {array} columns columns props of Material Table
 * @param {array} actions actions props of Material Table
 * @param {array or function} data array for fixed data, function for remote data
 * @param {object} options options props of Material Table
 * @returns Material Table
 */

export default function CustomMaterialTable({ columns, actions, data, options = {} }) {
	const useStyles = makeStyles({
		root: {
			'@media (max-width: 768px)': {
				flexWrap: 'wrap',
			},
		},
	});
	const classes = useStyles();
	return (
		<>
			<MaterialTable
				title="Sales"
				actions={actions}
				columns={columns}
				components={{
					Toolbar: (props) => <MTableToolbar classes={{ root: classes.root }} {...props} />,
				}}
				data={data}
				options={{
					pageSize: 10,
					toolbarButtonAlignment: 'left',
					pageSizeOptions: [],
					draggable: false,
					exportButton: true,
					debounceInterval: 500,
					searchFieldStyle: {},
					...options,
				}}
			/>
		</>
	);
}

CustomMaterialTable.propTypes = {
	columns: PropTypes.array,
	actions: PropTypes.array,
	data: PropTypes.array,
	options: PropTypes.object,
};
