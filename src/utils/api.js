import axios from 'axios';
import { constant } from 'utils/constant';
import Cookies from 'universal-cookie';
const apiBaseURL = process.env.REACT_APP_BASE_URL;
let cookie;
if (process.env.NODE_ENV === 'production') {
	cookie = new Cookies().get(constant.APP);
} else {
	cookie =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxOTI1MjU0M30.uqqRy06zb2DYimhsqpf8UsJneoyRhhSmPZzthvU2P2I';
}
let headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: 'Bearer ' + cookie,
};

export const GET = (url, params = {}) => {
	return axios(`${apiBaseURL}${url}`, {
		method: 'GET',
		headers,
		params,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data.message);
		});
};

// Extra header such as 'Content-Type': 'multipart/form-data'
export const POST = (url, data, extraHeader = {}) => {
	headers = { ...headers, ...extraHeader };
	return axios(`${apiBaseURL}${url}`, {
		method: 'POST',
		headers,
		data,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data.message);
		});
};

// Extra header such as 'Content-Type': 'multipart/form-data'
export const PUT = (url, data, extraHeader = {}) => {
	headers = { ...headers, ...extraHeader };
	return axios(`${apiBaseURL}${url}`, {
		method: 'PUT',
		headers,
		data,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data.message);
		});
};

export const DELETE = (url, data = {}) => {
	return axios(`${apiBaseURL}${url}`, {
		method: 'DELETE',
		headers,
		data,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data.message);
		});
};
