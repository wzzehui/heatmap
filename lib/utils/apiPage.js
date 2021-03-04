(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.apiPage = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // 本地
  var apiPage = {
    proxy: true,
    apiList: {
      api: 'http://197.3.196.96:8092'
    }
  }; // 线上
  // const apiPage = {
  //   proxy: false,
  //   apiList: {
  //     api: 'http://197.32.1.208:8080'
  //   }
  // }

  function setApi(url) {
    if (!apiPage.proxy) {
      var reg = /(?<=\/).*?(?=\/)/;
      var apiKey = url.match(reg)[0];

      if (apiPage.apiList[apiKey]) {
        url = url.replace("/".concat(apiKey), apiPage.apiList[apiKey]);
      }
    }

    return url;
  }

  module.exports = {
    apiPage: apiPage,
    setApi: setApi
  };
});