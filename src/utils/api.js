import axios from 'axios';
import { constant } from 'utils/constant';
import Cookies from 'universal-cookie';
import { convertFormData } from 'utils/function';

const apiBaseURL = process.env.REACT_APP_BASE_URL;
let cookie;
if (process.env.NODE_ENV === 'production') {
	cookie = new Cookies().get(constant.APP);
} else {
	cookie =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxOTI1MjU0M30.uqqRy06zb2DYimhsqpf8UsJneoyRhhSmPZzthvU2P2I';
}

export const useAxios = () => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + cookie,
	};

	const instance = axios.create({
		baseURL: apiBaseURL,
		headers,
		transformRequest: [
			(data, headers) => {
				if (headers['Content-Type'] === 'multipart/form-data') {
					data = convertFormData(data);
				}
				return data;
			},
		],
	});

	instance.interceptors.request.use((req) => {
		// function run before request
		// do something like check token etc
		return req;
	});

	instance.interceptors.response.use(
		(res) => {
			// Any response within the range of 2xx trigger this function
			// Do something with response data
			return res.data;
		},
		(err) => {
			// Any response falls outside the range of 2xx trigger this function
			// Do something with response error
			// err.response.status
			return Promise.reject(err.response.data);
		}
	);

	return instance;
};
