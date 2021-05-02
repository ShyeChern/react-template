import axios from 'axios';
import Cookies from 'universal-cookie';
const apiBaseURL = process.env.REACT_APP_BASE_URL;
// const cookie = new Cookies().get('sales-app');
const cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxOTI1MjU0M30.uqqRy06zb2DYimhsqpf8UsJneoyRhhSmPZzthvU2P2I'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + cookie,
};
// to do handling statuscode and return json
export const GET = (url, params = {}) => {
  return axios(`${apiBaseURL}${url}`, {
    method: 'GET',
    headers,
    params
  });
}

export const POST = (url, data) => {
  return axios(`${apiBaseURL}${url}`, {
    method: 'POST',
    headers,
    data
  });
}