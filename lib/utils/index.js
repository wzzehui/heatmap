var _indexOfInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/index-of");

var _sliceInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _parseInt3 = require("@babel/runtime-corejs3/core-js-stable/parse-int");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime-corejs3/helpers/typeof", "@babel/runtime-corejs3/core-js-stable/array/is-array", "@babel/runtime-corejs3/core-js-stable/instance/index-of", "@babel/runtime-corejs3/core-js-stable/object/get-prototype-of", "@babel/runtime-corejs3/core-js-stable/instance/slice", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/core-js-stable/parse-int"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime-corejs3/helpers/typeof"), require("@babel/runtime-corejs3/core-js-stable/array/is-array"), require("@babel/runtime-corejs3/core-js-stable/instance/index-of"), require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of"), require("@babel/runtime-corejs3/core-js-stable/instance/slice"), require("@babel/runtime-corejs3/core-js-stable/instance/for-each"), require("@babel/runtime-corejs3/core-js-stable/parse-int"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeof, global.isArray, _indexOfInstanceProperty2(global), global.getPrototypeOf, _sliceInstanceProperty2(global), _forEachInstanceProperty2(global), _parseInt3);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _typeof2, _isArray, _indexOf, _getPrototypeOf, _slice, _forEach, _parseInt2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _Object$defineProperty(_exports, "__esModule", {
    value: true
  });

  _exports.getQueryStringByName = getQueryStringByName;
  _exports.removeQueryByName = removeQueryByName;
  _exports.isPlainObject = isPlainObject;
  _exports.isObject = isObject;
  _exports.merge = merge;
  _exports.randomStr = randomStr;
  _exports.clone = clone;
  _exports.formatDate = formatDate;
  _exports.isArray = void 0;
  _typeof2 = _interopRequireDefault(_typeof2);
  _isArray = _interopRequireDefault(_isArray);
  _indexOf = _interopRequireDefault(_indexOf);
  _getPrototypeOf = _interopRequireDefault(_getPrototypeOf);
  _slice = _interopRequireDefault(_slice);
  _forEach = _interopRequireDefault(_forEach);
  _parseInt2 = _interopRequireDefault(_parseInt2);
  var isArray = _isArray.default;
  _exports.isArray = isArray;

  function getQueryStringByName(url, name) {
    var result = '';

    if (arguments.lenth > 1) {
      result = url.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    } else {
      // eslint-disable-next-line no-restricted-globals
      result = location.href.match(new RegExp('[\?\&]' + url + '=([^\&]+)', 'i'));
    }

    if (result === null || result.length < 1) {
      return '';
    }

    return result[1];
  }

  function removeQueryByName(url, name) {
    var str = '';

    if ((0, _indexOf.default)(url).call(url, '?') !== -1) {
      str = url.substr((0, _indexOf.default)(url).call(url, '?') + 1);
    } else {
      return url;
    }

    var arr = '';
    var returnurl = '';

    if ((0, _indexOf.default)(str).call(str, '&') !== -1) {
      arr = str.split('&');

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].split('=')[0] !== name) {
          returnurl = returnurl + arr[i].split('=')[0] + '=' + arr[i].split('=')[1] + '&';
        }
      }

      return url.substr(0, (0, _indexOf.default)(url).call(url, '?')) + '?' + returnurl.substr(0, returnurl.length - 1);
    } else {
      arr = str.split('=');

      if (arr[0] === name) {
        return url.substr(0, (0, _indexOf.default)(url).call(url, '?'));
      } else {
        return url;
      }
    }
  }

  function isPlainObject(obj) {
    return isObject(obj) && (0, _getPrototypeOf.default)(obj) === Object.prototype;
  }

  function isObject(obj) {
    return obj !== null && (0, _typeof2.default)(obj) === 'object';
  }

  function merge(target) {
    var slice = (0, _slice.default)([]);
    var args = slice.call(arguments, 1);
    (0, _forEach.default)(args).call(args, function (source) {
      _merge(target, source, true);
    });
    return target;
  }

  function _merge(target, source, deep) {
    for (var key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        }

        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        }

        _merge(target[key], source[key], deep);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }

    return target;
  }

  function randomStr(length) {
    length = (0, _parseInt2.default)(length);
    var str = '';

    if (length / 25 >= 1) {
      for (var i = 0; i < Math.floor(length / 25); i++) {
        str += Math.random().toString(36).substr(2, 25);
      }
    }

    str += Math.random().toString(36).substr(2, length % 25);
    return str;
  }

  ;

  function checkType(target) {
    var _context;

    return (0, _slice.default)(_context = Object.prototype.toString.call(target)).call(_context, 8, -1);
  }

  function clone(target) {
    var result;
    var targetType = checkType(target);

    if (targetType === 'Object') {
      result = {};
    } else if (targetType === 'Array') {
      result = [];
    } else {
      return target;
    } //3.遍历目标数据


    for (var i in target) {
      var value = target[i]; //4.判断目标结构里的每一值是否存在对象/数组

      if (checkType(value) === 'Object' || checkType(value) === 'Array') {
        //对象或者数组里嵌套了对象或者数组
        //5.继续遍历获取到的value值
        result[i] = clone(value);
      } else {
        result[i] = value;
      }
    }

    return result;
  }

  function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };

    for (var k in o) {
      if (new RegExp("(".concat(k, ")")).test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
      }
    }

    return fmt;
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
});