import axios from 'axios';

console.log('baseURL:', process.env.REACT_APP_APP_BASE_URL_API);

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_APP_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthHeader = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};
