var _sortInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/sort");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime-corejs3/core-js-stable/instance/sort", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/helpers/classCallCheck", "@babel/runtime-corejs3/helpers/createClass", "./utils", "./index.less"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime-corejs3/core-js-stable/instance/sort"), require("@babel/runtime-corejs3/core-js-stable/instance/for-each"), require("@babel/runtime-corejs3/helpers/classCallCheck"), require("@babel/runtime-corejs3/helpers/createClass"), require("./utils"), require("./index.less"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, _sortInstanceProperty2(global), _forEachInstanceProperty2(global), global.classCallCheck, global.createClass, global.utils, global.index);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _sort, _forEach, _classCallCheck2, _createClass2, _utils, _index) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

  _Object$defineProperty(_exports, "__esModule", {
    value: true
  });

  _exports.ApifinyChart = void 0;
  _sort = _interopRequireDefault(_sort);
  _forEach = _interopRequireDefault(_forEach);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);

  var ApifinyChart = /*#__PURE__*/function () {
    function ApifinyChart(_options) {
      (0, _classCallCheck2.default)(this, ApifinyChart);
      // @param
      var options = {
        id: 'app',
        width: 1920,
        height: 1080,
        xAxis: {
          style: {
            color: '#13191e',
            height: 50,
            width: 1,
            fontColor: '#ffffff',
            fontSize: 16
          }
        },
        yAxis: {
          style: {
            color: '#13191e',
            width: 30
          }
        }
      };
      this.renderData = {};
      this.startTime = null;
      this.xWidth = 0;
      this.renderXwidth = null;
      this.addNum = 0;

      if (_options && _options instanceof Object) {
        this.options = (0, _utils.merge)(options, _options);
      } else {
        this.options = _options;
      }

      this.canvasWidth = this.options.width;
    }

    (0, _createClass2.default)(ApifinyChart, [{
      key: "init",
      value: function init() {
        var _this$options = this.options,
            id = _this$options.id,
            width = _this$options.width,
            height = _this$options.height;
        var wrapper = document.getElementById(id);
        var canvasWapper = document.createElement('div');
        canvasWapper.style.width = "".concat(width, "px");
        canvasWapper.style.height = "".concat(height, "px");
        canvasWapper.className = 'apifinyChart-wrapper';
        wrapper.appendChild(canvasWapper);
        this.initCanvas();
      }
    }, {
      key: "initCanvas",
      value: function initCanvas() {
        var _this$options2 = this.options,
            id = _this$options2.id,
            width = _this$options2.width,
            height = _this$options2.height,
            xAxis = _this$options2.xAxis,
            yAxis = _this$options2.yAxis;
        var xAxisStyle = xAxis.style;
        var yAxisStyle = yAxis.style;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height; // canvas.id = 'apifinyChart-canvas'

        var wapperDom = document.querySelector("#".concat(id, " .apifinyChart-wrapper"));
        var firstDom = wapperDom.firstChild;

        if (!firstDom) {
          wapperDom.appendChild(canvas);
        } else {
          wapperDom.insertBefore(canvas, firstDom);
        } // wapperDom.appendChild(canvas);
        // document.querySelector(`#${id} .apifinyChart-wrapper`).appendChild(canvas);


        this.ctx = canvas.getContext('2d'); // 绘制x轴

        this.ctx.fillStyle = xAxisStyle.color;
        this.ctx.fillRect(0, 0, width, xAxisStyle.height); // this.chartWith = width - xAxis.margin[0] - xAxis.margin[1];
        // this.chartHeigth = height - yAxis.margin[0] - yAxis.margin[1];
        // 绘制x轴
        // ctx.moveTo(xAxis.margin[0], yAxis.margin[0])
        // ctx.lineTo(width - xAxis.margin[1], yAxis.margin[0])
        // 绘制y轴线
        // ctx.lineTo(width - xAxis.margin[1], height - yAxis.margin[1])
        // ctx.stroke();
      }
    }, {
      key: "renderXAxis",
      value: function renderXAxis(time) {
        var xAxis = this.options.xAxis;
        this.ctx.font = "".concat(xAxis.style.fontSize, "px bold Arial");
        this.ctx.fillStyle = xAxis.style.fontColor;
        this.ctx.textBaseline = 'center';
        var text = (0, _utils.formatDate)(new Date(time), 'yyyy.MM.dd hh:mm');
        this.ctx.fillText(text, 10, 32);
      }
    }, {
      key: "renderRectangle",
      value: function renderRectangle(x, y, w, h, type) {
        var color = type === 'bids' ? '#79383d' : '#3b725f'; // asks red

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
      }
    }, {
      key: "setChart",
      value: function setChart(data) {
        var _this = this;

        var _this$options3 = this.options,
            xAxis = _this$options3.xAxis,
            width = _this$options3.width,
            height = _this$options3.height,
            id = _this$options3.id;
        var bids = data.bids,
            asks = data.asks,
            updatedAt = data.updatedAt;
        if (!bids.length || !asks.length) return;
        (0, _sort.default)(bids).call(bids, function (a, b) {
          return b.price - a.price;
        });
        (0, _sort.default)(asks).call(asks, function (a, b) {
          return b.price - a.price;
        }); // this.renderData[updatedAt] = data;
        // console.log(this.renderData);

        if (!this.startTime) {
          this.renderXAxis(updatedAt);
          this.startTime = updatedAt;
        }

        this.addNum += 1;

        if (this.addNum >= width) {
          this.addNum = 0; // const wapperDom = document.querySelector(`#${id} .apifinyChart-wrapper`);
          // const canvasDom = wapperDom.querySelector(`#apifinyChart-canvas`);
          // canvasDom.width = canvasDom.width + width;
          // this.canvasWidth = canvasDom.width;
          // canvasDom.style.marginLeft = `${1920}px`;
          // const imUrl = canvasDom.toDataURL("image/jpeg");
          // const img = new Image();
          // img.src = imUrl;
          // wapperDom.appendChild(img);
          // wapperDom.removeChild(canvasDom);

          this.xWidth = 0;
          this.initCanvas();
          this.renderXAxis(updatedAt);
        } // const dataLen = [...asks, ...bids].length;


        var max = asks[0].price;
        var min = bids[bids.length - 1].price;
        var ratio = (max - min) / (height - xAxis.style.height);
        var renderWidth = this.options.xAxis.style.width;
        this.xWidth += renderWidth;
        (0, _forEach.default)(asks).call(asks, function (item) {
          _this.renderRectangle(_this.canvasWidth - _this.xWidth, (item.price - min) / ratio + xAxis.style.height, renderWidth, 1, 'asks');
        });
        (0, _forEach.default)(bids).call(bids, function (item) {
          _this.renderRectangle(_this.canvasWidth - _this.xWidth, (item.price - min) / ratio + xAxis.style.height, renderWidth, 1, 'bids');
        });
      }
    }]);
    return ApifinyChart;
  }(); // const chart = new ApifinyChart({
  //   width: window.innerWidth,
  //   // width: 19200,
  //   height: window.innerHeight,
  //   xAxis: {
  //   },
  //   yAxis: {
  //   }
  // });
  // chart.init();
  // const data = {
  //   "symbol" : "KRAKENUK.BTCUSDT",
  //   "updatedAt" : 1614333136122,
  //   "bids" : [ {
  //     "price" : 46404.9,
  //     "qty" : 0.02
  //   }, {
  //     "price" : 46404.6,
  //     "qty" : 0.15
  //   }, {
  //     "price" : 46400,
  //     "qty" : 0.02155172
  //   }, {
  //     "price" : 46398,
  //     "qty" : 0.1
  //   }, {
  //     "price" : 46393.1,
  //     "qty" : 0.10108
  //   }, {
  //     "price" : 46391.1,
  //     "qty" : 0.10775885
  //   }, {
  //     "price" : 46389.3,
  //     "qty" : 0.1615331
  //   }, {
  //     "price" : 46380,
  //     "qty" : 0.11184225
  //   }, {
  //     "price" : 46379.9,
  //     "qty" : 0.16156775
  //   }, {
  //     "price" : 46374.1,
  //     "qty" : 0.1615848
  //   }, {
  //     "price" : 46373.3,
  //     "qty" : 0.02150005
  //   }, {
  //     "price" : 46368.8,
  //     "qty" : 0.2154569
  //   }, {
  //     "price" : 46367.8,
  //     "qty" : 0.02144389
  //   }, {
  //     "price" : 46367,
  //     "qty" : 0.1
  //   }, {
  //     "price" : 46362.4,
  //     "qty" : 0.02608788
  //   }, {
  //     "price" : 46362.3,
  //     "qty" : 0.33669158
  //   }, {
  //     "price" : 46358.9,
  //     "qty" : 0.13043838
  //   }, {
  //     "price" : 46358.8,
  //     "qty" : 0.04114
  //   }, {
  //     "price" : 46355.9,
  //     "qty" : 0.08392
  //   }, {
  //     "price" : 46354.5,
  //     "qty" : 0.93790177
  //   } ],
  //   "asks" : [ {
  //     "price" : 46429,
  //     "qty" : 0.02
  //   }, {
  //     "price" : 46429.6,
  //     "qty" : 0.10775345
  //   }, {
  //     "price" : 46437.1,
  //     "qty" : 0.11181258
  //   }, {
  //     "price" : 46437.2,
  //     "qty" : 0.0441944
  //   }, {
  //     "price" : 46440.8,
  //     "qty" : 0.161622
  //   }, {
  //     "price" : 46442.6,
  //     "qty" : 0.04763942
  //   }, {
  //     "price" : 46445.4,
  //     "qty" : 0.16834579
  //   }, {
  //     "price" : 46455.4,
  //     "qty" : 0.33669158
  //   }, {
  //     "price" : 46456.4,
  //     "qty" : 0.16156775
  //   }, {
  //     "price" : 46464.4,
  //     "qty" : 0.63361098
  //   }, {
  //     "price" : 46464.5,
  //     "qty" : 0.32737241
  //   }, {
  //     "price" : 46464.8,
  //     "qty" : 0.13046478
  //   }, {
  //     "price" : 46469.9,
  //     "qty" : 0.16152342
  //   }, {
  //     "price" : 46472.6,
  //     "qty" : 0.4073
  //   }, {
  //     "price" : 46474.2,
  //     "qty" : 0.8059128
  //   }, {
  //     "price" : 46481.6,
  //     "qty" : 0.02044274
  //   }, {
  //     "price" : 46485.6,
  //     "qty" : 0.1
  //   }, {
  //     "price" : 46488.1,
  //     "qty" : 0.215496
  //   }, {
  //     "price" : 46489.6,
  //     "qty" : 0.15
  //   }, {
  //     "price" : 46494.9,
  //     "qty" : 0.08174
  //   } ]
  // }
  // setInterval(() => {
  //   data.updatedAt += 1000;
  //   chart.setChart(data);
  // }, 1)


  _exports.ApifinyChart = ApifinyChart;
});