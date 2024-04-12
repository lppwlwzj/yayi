// 1. 引入配置好的multerConfig
const fs = require("fs");
const path = require("path");

const multerConfig = require("./multerConfig");
const handlePath = (dir) => {
  return path.join(__dirname, "./", dir);
};

// 2. 定义静态变量
const fileName = "file"; // 上传的 fileName 名称
const updateBaseUrl = "http://127.0.0.1:3006"; // 上传到服务器地址
const imgPath = "/img/images/"; // 上传到服务器的虚拟目录
const hanldeImgDelAndRename = (id, filename, dirPath) => {
  // TODO 查找该路径下的所有图片文件
  fs.readdir(dirPath, (err, files) => {
    for (let i in files) {
      // 当前图片的名称
      const currentImgName = path.basename(files[i]);
      if (currentImgName !== filename) {
        // 图片的名称数组：[时间戳, id, 后缀]
        const imgNameArr = currentImgName.split(".");

        // // TODO 先查询该id命名的文件是否存在，有则删除
        if (imgNameArr[1] === id) {
          const currentImgPath = dirPath + "/" + currentImgName;
          fs.unlink(currentImgPath, (err) => {});
        }

        // // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: id.时间戳.jpg
        if (currentImgName === filename) {
          const old_path = dirPath + "/" + currentImgName;
          const new_path = dirPath + "/" + filename;

          // 重命名该文件
          fs.rename(old_path, new_path, (err) => {});
        }
      }
    }
  });
};
// 上传接口的 请求参数req  响应参数res
function upload(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.single(fileName)(req, res, function (err) {
      if (err) {
        reject(err);
      } else {
        hanldeImgDelAndRename(
          `${req.body.id}${req.body.name}`,
          req.file.filename,
          handlePath("../public/images")
        );

        // `req.file.filename`  请求文件名称后缀
        // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
        resolve({
          img_url: `${updateBaseUrl}${imgPath}${req.file.filename}`
        });
      }
    });
  });
}

module.exports = upload;
