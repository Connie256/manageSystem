/**
 * @description
 * 快速导出压缩包 需要安装依赖 npm install archiver -D
 * 这个库的文档地址 https://github.com/archiverjs/node-archiver
 * 可以在 package.json 中配置 script 命令 npm run build 之后直接 进行 导出 zip 压缩包
 * @example  将需要导出的目录添加到target数组中 命令行执行 node export-zip.js 即可
 * @version 20220820
 */
const fs = require('fs');
const archiver = require('archiver');

const homedir = __dirname;//这里是当前目录路径
var date = new Date();
//年
var year = date.getFullYear();
//月
var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
//日
var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

var timeString = year + "" + month + "" + day;
//配置要打包的路径列表,需要打包某些目录，添加到数组里面即可 相对路径
const target = ['manageSystem'];
const output = fs.createWriteStream(homedir + `/${target[0]}${timeString}.zip`);
const archive = archiver('zip', {
    zlib: {level: 9} // 设置压缩级别
});

archive.on('error', function (err) {
    throw err;
});

output.on('close', function () {

    console.log(`
     --------- ---------压缩完毕--------- ---------
     生成文件大小${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
     请在当前项目路径下寻找 ${target[0]}${timeString}.zip 文件,系统路径为 ${homedir}\${target[0]}${timeString}.zip
     ---------如需配置生成路径或文件名,请配置output---------
     `);
});

archive.pipe(output);
for (i of target) {
    archive.directory(i, i)
}
archive.finalize();
