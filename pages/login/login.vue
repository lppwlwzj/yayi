<template>
  <view class="register fc">
    <u--form
      labelWidth="auto"
      labelPosition="left"
      :model="form"
      ref="uForm"
      :rules="rules"
    >
      <view class="info fc">
        <image
          src="../../static/images/ECO-UI-02.png"
          mode="widthFix"
          class="logo"
        ></image>

        <!-- 昵称 -->
        <u-form-item label="账号" prop="usercount">
          <u--input
            :disabled="true"
            placeholder=" "
            disabledColor="#fff"
            v-model="form.usercount"
            border="none"
            inputAlign="left"
            suffixIcon="edit-pen"
            suffixIconStyle=" color: #dd524dab !important;"
          ></u--input>
        </u-form-item>
        <u-form-item label="密码" prop="password">
          <view class="u-demo-block__content">
                   
            <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
                <!-- #ifndef APP-NVUE -->
        <u-input placeholder=" "   
           :password="!visible"
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left">
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
          <u--input  
            placeholder=" "   
           :password="!visible"
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left">
          <!-- #endif -->
             <u-icon
                slot="suffix"
                @click="visible = !visible"
                size="18"
                color="#dd524dab"
                :name="visible ? 'eye' : 'eye-off'"
              ></u-icon>
      <!-- #ifndef APP-NVUE -->
      </u-input>
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      </u--input>
      <!-- #endif -->   
          </view>
        </u-form-item>
        <button
          class="btn"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
          v-show="show"
        >
          授权手机号
        </button>
        <view class="btn" @tap="login"> 登录 </view>
      </view>
    </u--form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        usercount: "",

        password: ""
      },
      membertypeList: [],
      membertypeShow: false,
      show: false,
      rules: {
        usercount: [
          {
            required: true,
            message: "请填写账号",
            trigger: ["change", "blur"]
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["change", "blur"]
          }
        ]
      },
      address: [],
      appid: "wxde671469f6dd9711",
      phone_code: "",
      phone_encryptedData: "",
      phone_iv: "",
      login_code: "",
      openid: "",
      login_code: "",
      session_key: "",
      show: true
    };
  },
  onLoad: function () {
    const user = uni.getStorageSync("user");
    if (user) {
      this.show = false;
      this.form = { ...user };
    } else {
      this.getWxUserCode();
    }
  },
  methods: {
    getWxUserCode() {
      uni.login({
        provider: "weixin",
        success: (res) => {
          uni.showToast({
            title: "授权登录成功",
            icon: "none"
          });
          this.login_code = res.code; // 获得的code
        },
        fail: (res) => {
          uni.showToast({
            title: res.errMsg,
            icon: "none"
          });
        }
      });
    },
    async jiemi(params) {
      const res = await this.$api.jiemi(params);
      console.log("🚀 ~ jiemi ~ res:", res)
      if (res.code === 0) {
        // uni.showToast({
        //   title: "解密成功！",
        //   icon: "none"
        // });
        this.form.usercount = res.re.phoneNumber; // 手机号
        uni.hideLoading();
        this.show = false;
      } else {
        uni.hideLoading({
          title: "授权失败，请重新操作"
        });
      }
    },
    async get_miyao() {
      // 获取密钥 ===
      const res = await this.$api.getmiyao({
        login_code: this.login_code
      });
      if (res.code === 0) {
        // uni.showToast({
        //   title: "获取密钥成功！",
        //   icon: "none"
        // });
        return res.re;
      }
    },
    getPhoneNumber(res) {
      uni.showLoading({
        title: "加载中"
      });

      const that = this;
      if (!that.login_code) {
        that.getWxUserCode();
        uni.hideLoading();
        return false;
      }
      that.get_miyao().then((data) => {
        // this.openid =data.openid; //openid 用户唯一标识
        // this.session_key = data.session_key; //session_key  会话密钥
        // 获取手机号
        // that.phone_code = res.detail.code; // 获得的手机code
        // that.phone_encryptedData = res.detail.encryptedData; //用于解密
        // that.phone_iv = res.detail.iv; // 用于解密
        const params = {
          openid: data.openid,
          appid: that.appid,
          session_key: data.session_key,
          phone_code: res.detail.code,
          phone_encryptedData: res.detail.encryptedData,
          phone_iv: res.detail.iv
        };
        that.jiemi(params);
      });
    },

    async login() {
      if (!this.form.usercount || !this.form.password) {
        uni.showToast({
          title: "请输入账号密码"
        });
        return;
      }
      this.$refs.uForm
        .validate()
        .then(() => {
          this.handleRegister();
        })
        .catch((errors) => {
          console.log("validate ~ valid:errors", errors);
        });
    },
    async handleRegister() {
      const res = await this.$api.login({
        ...this.form
      });
      if (res.code === 0) {
        const userInfo = {
          token: res.re.token,
          ...res.re.userinfo
        };
        uni.setStorageSync("userInfo", userInfo); //设置缓存
        //记住账号密码
        uni.setStorageSync("user", res.re.userinfo); //设置缓存
        uni.showToast({
          title: "登录成功",
          success() {
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/index/index"
              });
            }, 100);
          }
        });
      } else {
        uni.showToast({
          title: res.message,
          icon: "none"
        });
      }
    },
    onchange(e) {
      const arr = e.detail.value;
      this.form.province = arr[0].text;
      this.form.city = arr[0].text;
      this.form.distinct = arr[0].text;
      this.$refs.uForm.validateField("distinct");
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100vh;
  // background-color: #37352c;
  background: $uni-color-bg !important;

  .logo {
    width: 220rpx;
    height: 220rpx;
    margin: 0 auto 20rpx;
  }

  .info {
    -moz-box-shadow: 2px 2px 5px #33333340;
    -webkit-box-shadow: 2px 2px 5px #33333340;
    box-shadow: 2px 2px 5px #33333340;

    width: 684rpx;

    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    border: 1rpx solid rgba(238, 238, 238, 0);
    background-color: #ffffff;
    margin: 0rpx auto 0;
    padding: 80rpx 30rpx;
    box-sizing: border-box;
    border-radius: 30rpx;
  }

  .btn {
    text-align: center;
    line-height: 88rpx;
    width: 100%;
    height: 88rpx;
    border-radius: 20px;
    color: #ffffff;
    background: #dd524d63;
    font-size: 16px;
    margin: 30rpx auto;
    font-size: 32rpx;
    font-family: Source Han Sans SC, Source Han Sans SC;
    font-weight: 500;
  }
}
.u-form-item {
  margin: 20rpx 0;
  width: 100%;
  padding: 0rpx 18rpx;
  box-sizing: border-box;
  border: solid 1px $uni-color-theme;
  border-radius: 46rpx;
  span {
    color: #dd524dab !important;
  }
}

/deep/.u-form-item__body__left__content__label {
  color: $uni-color-theme;
}
</style>
