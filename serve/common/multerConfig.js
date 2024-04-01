// 1. 引入依赖
const multer = require("multer");
const md5 = require("md5");
let fs = require('fs');
// 2. 引入工具
const path = require("path"); //
const resolve = (dir) => {
  return path.join(__dirname, "./", dir);
};
// 1. 打开或创建一个名字叫folder文件夹
// let createFolder = function (folder) {
//   try {
//     fs.accessSync(folder); // 打开文件夹
//   } catch (e) {
//     fs.mkdirSync(folder); // 创建文件夹
//   }
// };
let uploadFolder = "../public/images"; // 设定存储文件夹为当前目录下的 /upload 文件夹
// createFolder(uploadFolder);
// 3. multer的配置对象
let storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function (req, file, cb) {
    console.log("🚀 ~ file:", file);

    // 3.1.1 允许图片上传
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, resolve(uploadFolder));
    } else {
      // 3.1.2 限制其他文件上传类型
      cb({ error: "Mime type not supported" });
    }
  },
  //  3.2 存储名称
  filename: function (req, file, cb) {
    let fileFormat = file.originalname.split(".");
    cb(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
  }
});

// 4. 添加配置
const multerConfig = multer({
  storage: storage,
  limits: { fileSize: 2097152 } // 2M
});

// 5. 导出配置好的multerConfig
module.exports = multerConfig;
