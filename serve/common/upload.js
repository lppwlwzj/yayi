// 1. 引入配置好的multerConfig
const fs = require("fs");

const multerConfig = require("./multerConfig");
const resolve = (dir) => {
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
      // 图片的名称数组：[时间戳, id, 后缀]
      const imgNameArr = currentImgName.split(".");

      // TODO 先查询该id命名的文件是否存在，有则删除
      if (imgNameArr[1] === id) {
        const currentImgPath = dirPath + "/" + currentImgName;
        fs.unlink(currentImgPath, (err) => {});
      }

      // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳.id.jpg
      if (currentImgName === filename) {
        const old_path = dirPath + "/" + currentImgName;
        const new_path =
          dirPath + "/" + imgNameArr[0] + "." + id + path.extname(files[i]);
        // 重命名该文件
        fs.rename(old_path, new_path, (err) => {});
      }
    }
  });
};
// 上传接口的 请求参数req  响应参数res
function upload(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.single(fileName)(req, res, function (err) {
        // console.log("🚀 ~ err:", err)
        // console.log("🚀 ~ req:", req)
        if (err) {
            console.log("🚀 ~ err:", err)
            reject(err)
        } else {
          console.log('updateBaseUrl + imgPath + req.file.filename',updateBaseUrl + imgPath + req.file.filename)
            // `req.file.filename`  请求文件名称后缀 
            // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
            resolve(updateBaseUrl + imgPath + req.file.filename)
        }
    });
})
  // return new Promise((resolve, reject) => {
  //   multerConfig.single(fileName)(req, res, function (err) {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       // hanldeImgDelAndRename(
  //       //   req.body.id,
  //       //   req.file.filename,
  //       //   resolve("../public/images")
  //       // );

  //       // `req.file.filename`  请求文件名称后缀
  //       // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
  //       const img = req.file.filename.split(".");
  //       resolve({
  //         img_url:
  //           updateBaseUrl + imgPath + img[0] + "." + req.body.id + "." + img[1]
  //       });
  //     }
  //   });
  // });
}

module.exports = upload;
