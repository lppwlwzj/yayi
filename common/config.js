const CONFIG = {
  // 开发环境配置
  //127.0.0.1
  // 10.172.42.116
  //const host = '192.168.4.117'
  development: {
    BASE_URL: "http://192.168.4.117:3006",
	UPLOAD_URL: "https://receiving.shandongweipai.com/api/college/upload",
  },
  // 生产环境配置
  production: {
    BASE_URL: "http://127.0.0.1:3006",
	UPLOAD_URL: "https://receiving.shandongweipai.com/api/college/upload",
  }
};

export default CONFIG[process.env.NODE_ENV];