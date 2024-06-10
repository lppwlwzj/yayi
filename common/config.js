const host = '127.0.0.1'
//const host = '10.172.42.116'
// const host = "192.168.4.117";
// const host ="gdcasa.cn"

const CONFIG = {
  // 开发环境配置

  development: {
    BASE_URL: `http://${host}:3010`,
    // BASE_URL: `https://gdcasa.cn:3010`,

    UPLOAD_URL: "https://receiving.shandongweipai.com/api/college/upload"
  },
  // 生产环境配置
  production: {
    BASE_URL: "http://gdcasa.cn:3010",
    UPLOAD_URL: "https://receiving.shandongweipai.com/api/college/upload"
  }
};

export default CONFIG[process.env.NODE_ENV];
