import configUrl from "./config";
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    config = {
      /* config 为默认全局配置*/
      baseURL: configUrl.BASE_URL,
      dataType: "json",
      // custom: {
      // 	catch: true,//返回报错信息
      // },
      //#ifdef H5
      // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
      withCredentials: false
      //#endif
      // 设置自定义头部content-type
      // header: {
      //   "content-type": ""
      // }
    };
    return config;
  });

  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};
      // 根据custom参数中配置的是否需要token，添加对应的请求头
      // if (config?.custom?.auth) {
      // 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      // 	config.header.token = vm.$store.state.userInfo.token
      // }
	  const userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.token)
        config.header['Authorization'] = userInfo.token;
      return config;
    },
    (config) => {
      // 可使用async await 做异步操作
      return Promise.reject(config);
    }
  );

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      console.log("🚀 ~ response:", response)
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      //没有正确响应时候的操作
      if (response.statusCode !== 200) {
        if (response.statusCode === 404) {
          //可以去跳转404页面
          uni.$u.toast("服务端请求失败404");
        } else if (response.statusCode === 500) {
          //可以根据状态码自定义操作
        }
        return Promise.reject(response);
      }

      const { data, config } = response;
      // 自定义参数
      // const custom = config?.custom
      return data;
      //后台返回请求成功的状态码，我这里状态值0，代表成功
      // if (data.code !== 1) {
      //   // 如果需要catch返回，则进行reject
      //   return data;
      // }
      // return data.data === undefined ? {} : data.data;
    },
    (response) => {
      // 对响应错误做点什么 （statusCode !== 200）
      return Promise.reject(response);
    }
  );
};
