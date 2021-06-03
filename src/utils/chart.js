export const chartOptions = (title, pluginOptions = {}, options = {}) => {
	return {
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: title,
				font: {
					size: 20,
				},
			},
			tooltip: {
				mode: 'nearest',
			},
			legend: {
				position: 'bottom',
			},
			...pluginOptions,
		},
		...options,
	};
};
