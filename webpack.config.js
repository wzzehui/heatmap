
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { apiPage } = require('./src/utils/apiPage');
// const NODE_ENV = process.env.NODE_ENV; // 获取环境变量
const page = {
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        // 匹配以.css结尾的文件
        test: /\.css$/,
        // exclude: /node_modules/,
        // 先后使用 css-loader 和 style-loader
        // 注意执行顺序是从右向左
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: "css-loader"}
        ]
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, 
          { loader: "css-loader" },
          { 
            loader: "less-loader",
            options: {
              modifyVars: {
                'border-radius-base': '3px',
                'border-radius-sm': '2px',
                'shadow-color': 'rgba(0, 0, 0, 0.05)',
                'shadow-1-down': '4px 4px 40px @shadow-color',
                'border-color-split':' #f4f4f4',
                'border-color-base': '#e5e5e5',
                'menu-dark-bg': '#3e3e3e',
                'text-color': '#666',
                'primary-color': '#4bbcb7'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|jpg|json)$/i,
        exclude: [/\.(js|mjs|jsx|ts|tsx|less|css)$/, /\.html$/],
        use: {
          loader: "file-loader",
          options: {
            name: '[path][name][chunkhash:8].[ext]',
            // publicPath: 'assets',
          },
        },
      },
    ]
  }
}
// start本地运行配置
if (process.env.TYPE === 'start') {
  page.entry = './src/index.js',
  page.output = {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
  }
  page.plugins = [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[chunkhash:8].css",
　　   chunkFilename: "css/[chunkhash:8].css"
    }) 
  ]
  page.devServer = {
		contentBase: path.join(__dirname, '/src/'), //设置服务器访问的基本目录
		host:'localhost', //服务器的ip地址
		port: 8089,  //端口
		open: false  //自动打开页面
  }
  // 配置代理
  if (apiPage.proxy) {
    const proxy = {};
    const apiKeys = [];
    for(let k in apiPage.apiList) {
      apiKeys.push(k);
    }
    apiKeys.forEach((item) => {
      let pathRewrite = {};
      pathRewrite[`^/${item}`] = '';
      proxy[`/${item}`] = {
        target: apiPage.apiList[item],
        pathRewrite: pathRewrite,
        changeOrigin: true,
      }
    });
    page.devServer.proxy = proxy;
  }
} else {
  // 打包 配置
  page.entry = './src/index.js',
  page.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'CmbcDashboardPlugIn',
    libraryExport: "default",
    chunkFilename: 'js/[name].[chunkhash:8].js',
    libraryTarget: 'umd',
  }
  page.plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[chunkhash:8].css",
      chunkFilename: "css/[chunkhash:8].css"
    }),
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // }),
  ]
}
module.exports = page;