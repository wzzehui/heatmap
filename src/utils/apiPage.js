// 本地
const apiPage = {
  proxy: true,
  apiList: {
    api: 'http://197.3.196.96:8092',
  }
}
// 线上
// const apiPage = {
//   proxy: false,
//   apiList: {
//     api: 'http://197.32.1.208:8080'
//   }
// }
function setApi (url) {
  if (!apiPage.proxy) {
    let reg = /(?<=\/).*?(?=\/)/
    let apiKey = url.match(reg)[0];
    if (apiPage.apiList[apiKey]) {
      url = url.replace(`/${apiKey}`, apiPage.apiList[apiKey]);
    }
  }
  return url
}
module.exports = {
  apiPage: apiPage,
  setApi: setApi
}