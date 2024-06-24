// api接口管理
const install = (Vue, vm) => {
  Vue.prototype.$api = {
    //图片上传
    uploadImg: (formData) => vm.$u.http.upload("/api/upload", formData),
    deleteImg: (data) => vm.$u.http.post("/api/upload/delete", data),

    login: (data) => vm.$u.http.post("/api/user/login", data),
    getUserList: () => vm.$u.http.post("/api/user/list"),
    getQrImg: (data) => vm.$u.http.post("/api/user/getQrImg", data),

    addCustomer: (data) => vm.$u.http.post("/api/customer/add", data),
    getCustomerDetailById: (data) =>
      vm.$u.http.post("/api/customer/detail", data),
    editCustomer: (data) => vm.$u.http.post("/api/customer/edit", data),
    getCustomerList: (data) => vm.$u.http.post("/api/customer/list", data),
    deleteCustomer: (data) => vm.$u.http.post("/api/customer/delete", data),
    //获取主页信息
    submitService: (data) => vm.$u.http.post("/api/service/edit", data),
    //登录
    getServiceDetailById: (data) =>
      vm.$u.http.post("/api/service/detail", data),
    editPreinstall: (data) => vm.$u.http.post("/api/preinstall/edit", data),
    getPreinstall: (data) => vm.$u.http.post("/api/preinstall/detail", data),
    getLogList: (data) => vm.$u.http.post("/api/user/log", data),

    getRegisterCover: () => vm.$u.http.get("/api/index/registerCover"),
    register: (data) => vm.$u.http.post("/api/user/register", data),
    getmiyao: (data) => {
      return vm.$u.http.post("/api/user/getmiyao", data);
    },
    jiemi: (data) => vm.$u.http.post("/api/user/jiemi", data),
    addZhibao: (data) => vm.$u.http.post("/api/zhibao/add", data),
    editZhibao: (data) => vm.$u.http.post("/api/zhibao/edit", data),
    getZhibaoList: (data) => vm.$u.http.post("/api/zhibao/list", data),
    getZhibaoDetailById: (data) => vm.$u.http.post("/api/zhibao/detail", data)
  };
};

export default {
  install
};
