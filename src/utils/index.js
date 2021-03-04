export const isArray = Array.isArray;
export function getQueryStringByName (url, name) {
  var result = ''
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
export function removeQueryByName (url, name) {
  var str = '';
  if (url.indexOf('?') !== -1) {
    str = url.substr(url.indexOf('?') + 1);
  } else {
    return url;
  }
  var arr = '';
  var returnurl = '';
  if (str.indexOf('&') !== -1) {
    arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].split('=')[0] !== name) {
        returnurl = returnurl + arr[i].split('=')[0] + '=' + arr[i].split('=')[1] + '&';
      }
    }
    return url.substr(0, url.indexOf('?')) + '?' + returnurl.substr(0, returnurl.length - 1);
  } else {
    arr = str.split('=');
    if (arr[0] === name) {
      return url.substr(0, url.indexOf('?'));
    } else {
      return url;
    }
  }
}
export function isPlainObject (obj) {
	return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}
export function isObject (obj) {
	return obj !== null && typeof obj === 'object';
}
export function merge (target) {
	var { slice } = [];
	var args = slice.call(arguments, 1);

	args.forEach(source => {
		_merge(target, source, true);
	});

	return target;
}

function _merge (target, source, deep) {
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
export function randomStr (length) {
	length = parseInt(length);
	var str = '';
	if (length / 25 >= 1) {
		for (var i = 0; i < Math.floor(length / 25); i++) {
			str += Math.random().toString(36).substr(2, 25);
		}
	}
	str += Math.random().toString(36).substr(2, length % 25);
	return str;
};
function checkType(target) {
 
  return Object.prototype.toString.call(target).slice(8, -1);
}
export function clone (target) {
  let result;
  let targetType = checkType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  }else {
    return target;
  }
//3.遍历目标数据
  for (let i in target) {
    let value = target[i];

    //4.判断目标结构里的每一值是否存在对象/数组
    if(checkType(value) === 'Object' || checkType(value) === 'Array'){
      //对象或者数组里嵌套了对象或者数组
      //5.继续遍历获取到的value值
      result[i] = clone(value);
    }else {
      result[i] = value;
    }
  }
  return result;
}
export function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
}