// import qs from 'qs';
import axios from 'axios';
// import { merge } from './index';
const { setApi } = require('./apiPage');
const service = axios.create({
	timeout: 30000 // request timeout
});
// request interceptor
service.interceptors.request.use(
	config => {
		if (config.url.indexOf('http') === -1) {
			config.url = setApi(config.url);
		}
		// if (config.method === 'post') {
		// 	let userInfo = sessionStorage.getItem('CmbcDashboardPlugIn_userInfo');
		// 	if (userInfo) {
		// 		userInfo = JSON.parse(userInfo);
		// 		if (!config.data) {
		// 			config.data = {};
		// 		}
		// 		config.data = {...userInfo, ...config.data};
		// 	}
		// }
		// config.headers['Content-Type'] = 'application/json';
		return config;
	},
	error => Promise.reject({ msg: error.message })
);

// response interceptor
service.interceptors.response.use(
	response => {
		const result = response.data;
		if (result.code === 200) {
			return Promise.resolve(result.data);
		}
		return Promise.reject(result);
	},
	error => {
		return Promise.reject({ msg: error.message });
	}
);

export default service;