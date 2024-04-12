const path = require("path");
const fs = require("fs");

const uploadAvatar = require("../common/upload");

// 用户的逻辑控制器
class UploadController {
  // 头像图片上传
  async upload(req, res) {
    try {
      const uploadRes = await uploadAvatar(req, res);
      res.send({
        code: 0,
        message: "上传成功！",
        re: uploadRes
      });
    } catch (error) {
      return res.cc(error[0]?.Error);
    }
  }
  deleteImg(req, res) {
    const dirPath = path.join(__dirname, "./", "../public/images");
    const { img_url } = req.body;
    const reg = new RegExp(/(\/img\/images\/\S*)/g);
    const id = img_url.match(reg)?.[0]?.split(".")[1];
    try {
      fs.readdir(dirPath, (err, files) => {
        for (let i in files) {
          // 当前图片的名称
          const currentImgName = path.basename(files[i]);

          const imgNameArr = currentImgName.split(".");
          //   先查询该id命名的文件是否存在，有则删除
          if (imgNameArr?.[1] === id) {
            const currentImgPath = dirPath + "/" + currentImgName;
            fs.unlink(currentImgPath, (err) => {});
          }
        }
        res.send({
          code: 0,
          message: "操作成功！",
          re: null
        });
      });
    } catch (error) {
      return res.cc(error[0]?.Error);
    }
  }
}

module.exports = new UploadController();
