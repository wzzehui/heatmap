#### explain
目录
src 插件源代码
lib 打包npm时源代码存放目录 后续发布npm包时需进入这个目录操作

#### 发布npm流程如下
1.执行 npm compile 命令
2. 切换到 lib目录下
3.删除lib目录下的所有文件 packge.json除外
4.修改packge.json里的 version版本号
5.npm login
6.npm 登录成功后，运行npm publish命令将npm包发布到npm上。
7.其他..目前我用的自己的npm账号 账号问题联系我 wx17600103602  插件名称 cmbcdashboardplugin
#### 关于此工程
npm start 本地调试预览
npm build 用webpack打包插件 不压缩
npm build-min 用webpack打包插件 压缩

此工程只提供了以上功能 默认webpack打包时会将依赖插件一并打包 
更多配置请移步wepack.config.js自行配置