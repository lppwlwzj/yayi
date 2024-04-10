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
      return res.cc(error[0]?.Error)
    }
  }
}

module.exports = new UploadController();
