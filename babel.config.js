// module.exports = {
//   presets: [
//     [
//       "@babel/preset-env", {
//         'modules': 'umd',
//         'useBuiltIns': 'usage',
//         "corejs": "3",
//         // "spec": true,
//         'targets': {
//           'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
//         },
//       }
//     ]
//   ],
//   plugins: []
// }
module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        'modules': 'umd',
        // 'useBuiltIns': 'entry',
        // "corejs": "3",
        // "spec": true,
        // 'targets': {
        //   'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        // },
      }
    ]
  ],
  plugins: [[
    "@babel/plugin-transform-runtime", {
      "corejs": 3,
      // "helpers": true,
      // "version": "^7.12.13",
      // "useESModules": false,
    }
  ]]
}