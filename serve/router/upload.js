const uploadAvatar = require("../common/upload");
// 用户的逻辑控制器
class UploadController {
  // 头像图片上传 
  async upload(req, res) {
    try {
      const uploadRes = await uploadAvatar(req, res);
      console.log("🚀 ~ UploadController ~ upload ~ uploadRes:", uploadRes)
      res.send({
        code: 0,
        message: "上传成功！",
        re: {
          img_url: uploadRes
        }
      });
    } catch (error) {
      console.log("🚀 ~ UploadController ~ upload ~ error:", error)
      return res.cc(error.error)
    }
  }
}

module.exports = new UploadController();
