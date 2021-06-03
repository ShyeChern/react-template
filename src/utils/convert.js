export const convertFormData = (data) => {
	const fd = new FormData();
	for (const prop in data) {
		fd.append(prop, data[prop]);
	}
	return fd;
};
