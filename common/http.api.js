// api接口管理
const install = (Vue, vm) => {
  Vue.prototype.$api = {
    //图片上传
    uploadImg: (filePath) =>
      vm.$u.http.upload("/api/upload", {
        filePath,
        name: "file",
        custom: { auth: false }
      }),
    getOpenId: (params) => vm.$u.http.get("/api/user/callback", { params }),
    login: (data) => vm.$u.http.post("/api/user/login", data),
    //获取主页信息
    getIndexData: (params) =>
      vm.$u.http.get("/api/base/getIndexData", { params }),
    //登录
    getActiveDetail: (params) =>
      vm.$u.http.get("/api/activity/info", { params }),
    getRegisterCover: () => vm.$u.http.get("/api/index/registerCover"),
    getMembertype: () => vm.$u.http.get("/api/index/membertype"),
    register: (data) => vm.$u.http.post("/api/user/register", data),
    getBanner: () => vm.$u.http.post("/api/index/getBanner"),
    getActiveList: (params) =>
      vm.$u.http.get("/api/activity/index", { params }),
    getMemberList: (params) => vm.$u.http.get("/api/member/index", { params }),
    getMemberTypeList: (params) =>
      vm.$u.http.get("/api/index/membertype", { params }),
    getMemberInfo: (params) => vm.$u.http.get("/api/member/info", { params }),
    getFollowList: (params) =>
      vm.$u.http.get("/api/member/followList", { params }),
    getMyActivityList: (params) =>
      vm.$u.http.get("/api/activity/myActivity", { params }),
    getMyActivityList: (params) =>
      vm.$u.http.get("/api/activity/myActivity", { params }),
    getMemberSetting: (params) =>
      vm.$u.http.get("/api/member/setting", { params }),
    getUserInfo: (params) => vm.$u.http.get("/api/user/index", { params }),
    getWithdrawSetting: (params) =>
      vm.$u.http.get("/api/withdraw/setting", { params }),
    getWithdrawApply: (data) => vm.$u.http.post("/api/withdraw/apply", data),
    getWithdrawList: (params) =>
      vm.$u.http.get("/api/withdraw/list", { params }),
    getWithdrawAbout: (params) =>
      vm.$u.http.get("/api/withdraw/about", { params }),
    getMoneyLog: (params) => vm.$u.http.get("/api/user/moneyLog", { params }),
    getShareCover: (params) =>
      vm.$u.http.get("/api/index/shareCover", { params }),
    getUserQrCode: (params) => vm.$u.http.get("/api/user/qrcode", { params }),
    join: (data) => vm.$u.http.post("/api/activity/apply", data),
    recharge: (params) => vm.$u.http.get("/api/member/recharge", {params}),
    follow: (data) => vm.$u.http.post("/api/member/follow", data),
    getContract:(params) => vm.$u.http.get("/api/member/contract", {params}),
  };
};

export default {
  install
};
