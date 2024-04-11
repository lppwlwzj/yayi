// api接口管理
const install = (Vue, vm) => {
  Vue.prototype.$api = {
    //图片上传
    uploadImg: (formData) => vm.$u.http.upload("/api/upload", formData),
    login: (data) => vm.$u.http.post("/user/login", data),
    addCustomer: (data) => vm.$u.http.post("/customer/add", data),
    getCustomerDetailById: (data) => vm.$u.http.post("/customer/detail", data),
    editCustomer: (data) => vm.$u.http.post("/customer/edit", data),
    getCustomerList: (data) => vm.$u.http.post("/customer/list", data),
    deleteCustomer: (data) => vm.$u.http.post("/customer/delete", data),
    //获取主页信息
    submitService: (data) => vm.$u.http.post("/service/edit", data),
    //登录
    getServiceDetailById: (data) =>
      vm.$u.http.post("/service/detail",data),
    editPreinstall: (data) => vm.$u.http.post("/preinstall/edit", data),
    getPreinstall: (data) => vm.$u.http.post("/preinstall/detail", data),
    getRegisterCover: () => vm.$u.http.get("/api/index/registerCover"),
    getMembertype: () => vm.$u.http.get("/api/index/membertype"),
    register: (data) => vm.$u.http.post("/api/user/register", data),
    getBanner: () => vm.$u.http.post("/api/index/getBanner"),
  };
};

export default {
  install
};
