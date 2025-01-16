const COS = require("cos-nodejs-sdk-v5");
const fs = require("fs");
var config = require("../cos_config");
var cos = new COS({
  // 必选参数
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
  // Bucket: "yayi-1325314533",
  // Region: "ap-shanghai",
  // // 可选参数
  // // FileParallelLimit: 3, // 控制文件上传并发数
  // // ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
  // // ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
  // // Proxy: '',
  // Protocol: "https:",
  // Timeout: 10000
});

function uploadFileToCOS(buffer, fileKey,fileMimeType) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: fileKey,                    // COS 中的文件名
      Body: buffer, // 文件流 fs.createReadStream(filePath)：<Buffer 00 00 00 14 66 74 79 70 71 74 20 20 00 00 00 00 71 74 20 20 00 00 00 08 77 69 64 65 00 56 e8 17 6d 64 61 74 00 00 00 00 00 00 00 00 00 00 00 0
      ContentType: fileMimeType, // 设置正确的 MIME 类型 
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);  // 返回文件在 COS 中的访问路径
      }
    });
  });
}

module.exports = uploadFileToCOS;