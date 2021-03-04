import { merge, formatDate } from './utils';
import './index.less';

export class ApifinyChart{
  constructor(_options) {
    // @param
    const options = {
      id: 'app',
      width: 1920,
      height: 1080,
      xAxis: {
        style: {
          color: '#13191e',
          height: 50,
          width: 1,
          fontColor: '#ffffff',
          fontSize: 14,
        },
      },
      yAxis: {
        style: {
          color: '#13191e',
          width: 70,
          height: 1,
        },
      },
    }
    this.renderData = {};
    this.startTime = null;
    this.xWidth = 0;
    this.renderXwidth = null;
    this.addNum = 0;
    if (_options &&  _options instanceof Object) {
      this.options = merge(options, _options);
    } else {
      this.options = _options;
    }
    this.canvasWidth = this.options.width - this.options.yAxis.style.width;
  }
  init () {
    const { id, width, height } = this.options;
    const wrapper = document.getElementById(id);
    const canvasWapper = document.createElement('div');
    canvasWapper.style.width = `${width}px`;
    canvasWapper.style.height = `${height}px`;
    canvasWapper.className = 'apifinyChart-wrapper';
    wrapper.appendChild(canvasWapper);
    this.initCanvas()
  }
  initCanvas () {
    const { id, width, height, xAxis, yAxis } = this.options;
    const xAxisStyle = xAxis.style;
    const yAxisStyle = yAxis.style;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // canvas.id = 'apifinyChart-canvas'
    const wapperDom = document.querySelector(`#${id} .apifinyChart-wrapper`);
    const firstDom = wapperDom.firstChild;
    if (!firstDom) {
      wapperDom.appendChild(canvas);
    } else {
      wapperDom.insertBefore(canvas, firstDom);
    }
    // wapperDom.appendChild(canvas);
    // document.querySelector(`#${id} .apifinyChart-wrapper`).appendChild(canvas);
    this.ctx = canvas.getContext('2d');
     // 绘制x轴
    this.ctx.fillStyle = xAxisStyle.color;
    this.ctx.fillRect(0, 0, width, xAxisStyle.height);
     // 绘制y轴
     this.ctx.fillStyle = xAxisStyle.color;
     this.ctx.fillRect(width - yAxisStyle.width, 0, yAxisStyle.width, height);
    // this.chartWith = width - xAxis.margin[0] - xAxis.margin[1];
    // this.chartHeigth = height - yAxis.margin[0] - yAxis.margin[1];
    // 绘制x轴
    // ctx.moveTo(xAxis.margin[0], yAxis.margin[0])
    // ctx.lineTo(width - xAxis.margin[1], yAxis.margin[0])
    // 绘制y轴线
    // ctx.lineTo(width - xAxis.margin[1], height - yAxis.margin[1])
    // ctx.stroke();
  }
  renderXAxis (time) {
    const { xAxis } = this.options;
    this.ctx.font = `${xAxis.style.fontSize}px bold Arial`;
    this.ctx.fillStyle = xAxis.style.fontColor;
    this.ctx.textBaseline = 'top';
    const text = formatDate(new Date(time), 'yyyy.MM.dd hh:mm');
    const fontHeight = this.getFontHeight(text, xAxis.style.fontSize);
    const xHeight = xAxis.style.height;
    this.ctx.fillText(text, 10,  xHeight / 2 - fontHeight / 4);
  }
  renderYAxis (min, max) {
    const { yAxis, xAxis, width, height } = this.options;
    this.ctx.font = `${xAxis.style.fontSize}px bold Arial`;
    this.ctx.fillStyle = xAxis.style.fontColor;
    this.ctx.textBaseline = 'center';
    // const text = formatDate(new Date(time), 'yyyy.MM.dd hh:mm');
    const maxInfo = {
      w: this.ctx.measureText(max).width,
      x: width - this.ctx.measureText(max).width - 10,
      y: 20,
    }
    const minInfo = {
      w: this.ctx.measureText(min).width,
      x: width - this.ctx.measureText(min).width - 10,
      y: height -10,
    }
    // this.ctx.clearRect(maxInfo.x, maxInfo.y, maxInfo.w, 50);
    // this.ctx.clearRect(minInfo.x, minInfo.y, minInfo.w, 50);
    this.ctx.fillText(max, maxInfo.x, maxInfo.y);
    this.ctx.fillText(min, minInfo.x, minInfo.y);
  }
  renderRectangle (x, y, w, h, type) {
    const color = type === 'bids' ? '#79383d' : '#3b725f'; // asks red
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }
  getFontHeight (font, size) {
    const el = document.createElement('div')
    el.style.cssText = `font-size:${size}px;opcity:0;position:fixed;left:0;top:0`;
    el.innerText = font;
    document.body.appendChild(el);
    const fontHeight = el.getBoundingClientRect().height;
    document.body.removeChild(el);
    return fontHeight;
  }
  setChart (data) {
    const { xAxis, width, height, yAxis } = this.options;
    const { bids, asks, updatedAt } = data;
    if (!bids.length || !asks.length) return;
    bids.sort((a, b) => {
      return b.price - a.price
    })
    asks.sort((a, b) => {
      return b.price - a.price
    })
    const max = asks[0].price;
    const min = bids[bids.length - 1].price;
    if (!this.startTime) {
      this.renderXAxis(updatedAt);
      this.renderYAxis(min, max);
      this.startTime = updatedAt;
    }
    this.addNum+= xAxis.style.width;
    if (this.addNum >= width) {
      this.addNum = 0;
      // const wapperDom = document.querySelector(`#${id} .apifinyChart-wrapper`);
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
      this.renderYAxis(min, max);
    }
    const ratio = (max - min) / (height - xAxis.style.height);
    const renderWidth = this.options.xAxis.style.width
    this.xWidth += xAxis.style.width;
    asks.forEach(item => {
      this.renderRectangle(this.canvasWidth - this.xWidth, (item.price - min) / ratio + xAxis.style.height, renderWidth, yAxis.style.height, 'asks');
    });
    bids.forEach(item => {
      this.renderRectangle(this.canvasWidth - this.xWidth, (item.price - min) / ratio  + xAxis.style.height, renderWidth, yAxis.style.height, 'bids');
    });
  }
}
const chart = new ApifinyChart({
  // width: window.innerWidth,
  width: 300,
  height: window.innerHeight,
  xAxis: {
  },
  yAxis: {
  }
});
chart.init();
const data = {
  "symbol" : "KRAKENUK.BTCUSDT",
  "updatedAt" : 1614333136122,
  "bids" : [ {
    "price" : 46404.9,
    "qty" : 0.02
  }, {
    "price" : 46404.6,
    "qty" : 0.15
  }, {
    "price" : 46400,
    "qty" : 0.02155172
  }, {
    "price" : 46398,
    "qty" : 0.1
  }, {
    "price" : 46393.1,
    "qty" : 0.10108
  }, {
    "price" : 46391.1,
    "qty" : 0.10775885
  }, {
    "price" : 46389.3,
    "qty" : 0.1615331
  }, {
    "price" : 46380,
    "qty" : 0.11184225
  }, {
    "price" : 46379.9,
    "qty" : 0.16156775
  }, {
    "price" : 46374.1,
    "qty" : 0.1615848
  }, {
    "price" : 46373.3,
    "qty" : 0.02150005
  }, {
    "price" : 46368.8,
    "qty" : 0.2154569
  }, {
    "price" : 46367.8,
    "qty" : 0.02144389
  }, {
    "price" : 46367,
    "qty" : 0.1
  }, {
    "price" : 46362.4,
    "qty" : 0.02608788
  }, {
    "price" : 46362.3,
    "qty" : 0.33669158
  }, {
    "price" : 46358.9,
    "qty" : 0.13043838
  }, {
    "price" : 46358.8,
    "qty" : 0.04114
  }, {
    "price" : 46355.9,
    "qty" : 0.08392
  }, {
    "price" : 46354.5,
    "qty" : 0.93790177
  } ],
  "asks" : [ {
    "price" : 46429,
    "qty" : 0.02
  }, {
    "price" : 46429.6,
    "qty" : 0.10775345
  }, {
    "price" : 46437.1,
    "qty" : 0.11181258
  }, {
    "price" : 46437.2,
    "qty" : 0.0441944
  }, {
    "price" : 46440.8,
    "qty" : 0.161622
  }, {
    "price" : 46442.6,
    "qty" : 0.04763942
  }, {
    "price" : 46445.4,
    "qty" : 0.16834579
  }, {
    "price" : 46455.4,
    "qty" : 0.33669158
  }, {
    "price" : 46456.4,
    "qty" : 0.16156775
  }, {
    "price" : 46464.4,
    "qty" : 0.63361098
  }, {
    "price" : 46464.5,
    "qty" : 0.32737241
  }, {
    "price" : 46464.8,
    "qty" : 0.13046478
  }, {
    "price" : 46469.9,
    "qty" : 0.16152342
  }, {
    "price" : 46472.6,
    "qty" : 0.4073
  }, {
    "price" : 46474.2,
    "qty" : 0.8059128
  }, {
    "price" : 46481.6,
    "qty" : 0.02044274
  }, {
    "price" : 46485.6,
    "qty" : 0.1
  }, {
    "price" : 46488.1,
    "qty" : 0.215496
  }, {
    "price" : 46489.6,
    "qty" : 0.15
  }, {
    "price" : 46494.9,
    "qty" : 0.08174
  } ]
}
setInterval(() => {
  data.updatedAt += 1000;
  chart.setChart(data);
}, 100)