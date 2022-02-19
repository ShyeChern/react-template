const rand = () => Math.round(Math.random() * 13000 - 3000);

export const lineData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Label 1',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			backgroundColor: '#ff6384',
			borderColor: '#ff6384',
		},
		{
			label: 'Label 2',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			backgroundColor: '#36a2eb',
			borderColor: '#36a2eb',
		},
	],
};

export const pieData = {
	labels: ['Label 1', 'Label 2', 'Label 3'],
	datasets: [
		{
			data: [Math.abs(rand()), Math.abs(rand()), Math.abs(rand())],
			backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
			borderWidth: 1,
		},
	],
};

export const barData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Label 1',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			backgroundColor: '#ff6384',
			stack: 'stackId',
		},
		{
			label: 'Label 2',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			backgroundColor: '#36a2eb',
			stack: 'stackId',
		},
		{
			label: 'Label 3',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			backgroundColor: '#4bc0c0',
			stack: 'stackId',
		},
	],
};

export const mixedData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			type: 'line',
			label: 'Line Label 1',
			backgroundColor: '#36a2eb',
			borderColor: '#36a2eb',
			borderWidth: 2,
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
		},
		{
			type: 'bar',
			label: 'Bar Label 2',
			backgroundColor: '#ff6384',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
		},
		{
			type: 'bar',
			label: 'Bar Label 3',
			backgroundColor: '#4bc0c0',
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
		},
	],
};
