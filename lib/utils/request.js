var _indexOfInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/index-of");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime-corejs3/core-js-stable/instance/index-of", "@babel/runtime-corejs3/core-js-stable/promise", "axios"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime-corejs3/core-js-stable/instance/index-of"), require("@babel/runtime-corejs3/core-js-stable/promise"), require("axios"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, _indexOfInstanceProperty2(global), global.promise, global.axios);
    global.request = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _indexOf, _promise, _axios) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _Object$defineProperty(_exports, "__esModule", {
    value: true
  });

  _exports.default = void 0;
  _indexOf = _interopRequireDefault(_indexOf);
  _promise = _interopRequireDefault(_promise);
  _axios = _interopRequireDefault(_axios);

  // import qs from 'qs';
  // import { merge } from './index';
  var _require = require('./apiPage'),
      setApi = _require.setApi;

  var service = _axios.default.create({
    timeout: 30000 // request timeout

  }); // request interceptor


  service.interceptors.request.use(function (config) {
    var _context;

    if ((0, _indexOf.default)(_context = config.url).call(_context, 'http') === -1) {
      config.url = setApi(config.url);
    } // if (config.method === 'post') {
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
  }, function (error) {
    return _promise.default.reject({
      msg: error.message
    });
  }); // response interceptor

  service.interceptors.response.use(function (response) {
    var result = response.data;

    if (result.code === 200) {
      return _promise.default.resolve(result.data);
    }

    return _promise.default.reject(result);
  }, function (error) {
    return _promise.default.reject({
      msg: error.message
    });
  });
  var _default = service;
  _exports.default = _default;
});