const COS = require("cos-nodejs-sdk-v5");
var config = require("../cos_config");
var cos = new COS({
  // 必选参数
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
  Bucket: "yayi-1325314533",
  Region: "ap-shanghai",
  // 可选参数
  // FileParallelLimit: 3, // 控制文件上传并发数
  // ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
  // ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
  // Proxy: '',
  Protocol: "https:",
  Timeout: 10000
});

const uploadFile = (file, filename) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        SecretId: config.SecretId,
        SecretKey: config.SecretKey,
        Key: filename /* 文件名，也是文件在桶里唯一的标识 */,
        StorageClass: "STANDARD",
        Body: file, // 上传文件对象
        onProgress: function (progressData) {
          // console.log(JSON.stringify(progressData));
        }
      },
      function (err, data) {
        //回调函数
        if (!err) {
          //成功返回data对象
          if (data.statusCode === 200 && data.Location) {
            console.log("cos putObject data----", data);
            // 拿到了腾讯云返回的地址
            // 通过input自定义事件将地址传出去
            resolve("http://" + data.Location);
          } else {
            reject("报错了");
            // this.$message.error(err.Message); // 上传失败提示消息
          }
        } else {
          //失败返回error信息
          reject(err);
        }
      }
    );
  });
};
