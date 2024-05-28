// api接口管理
const install = (Vue, vm) => {
  Vue.prototype.$api = {
    //图片上传
    uploadImg: (formData) => vm.$u.http.upload("/api/upload", formData),
    deleteImg: (data) => vm.$u.http.post("/api/upload/delete", data),

    login: (data) => vm.$u.http.post("/api/user/login", data),
    getUserList: () => vm.$u.http.post("/api/user/list"),
    addCustomer: (data) => vm.$u.http.post("/api/customer/add", data),
    getCustomerDetailById: (data) => vm.$u.http.post("/api/customer/detail", data),
    editCustomer: (data) => vm.$u.http.post("/api/customer/edit", data),
    getCustomerList: (data) => vm.$u.http.post("/api/customer/list", data),
    deleteCustomer: (data) => vm.$u.http.post("/api/customer/delete", data),
    //获取主页信息
    submitService: (data) => vm.$u.http.post("/api/service/edit", data),
    //登录
    getServiceDetailById: (data) => vm.$u.http.post("/api/service/detail", data),
    editPreinstall: (data) => vm.$u.http.post("/api/preinstall/edit", data),
    getPreinstall: (data) => vm.$u.http.post("/api/preinstall/detail", data),
    getLogList: (data) => vm.$u.http.post("/api/user/log", data),


    getRegisterCover: () => vm.$u.http.get("/api/index/registerCover"),
    register: (data) => vm.$u.http.post("/api/user/register", data),
    getmiyao: (data) => {
      return vm.$u.http.post("/api/user/getmiyao", data)
    }
  };
};

export default {
  install
};
