<template>
  <view class="register">
    <view class="rfb header">
      <u-icon
        size="30"
        name="../../static/images/ECO-UI-03.png"
        @click="back"
      ></u-icon>

      <u-icon size="40" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>
    <view style="margin-top: 200rpx">
      <u--form
        labelWidth="auto"
        labelPosition="left"
        :model="form"
        ref="uForm"
        :rules="rules"
      >
        <view class="info fc">
          <view class="title"> 后台登录 </view>

          <u-form-item label="账号" prop="usercount">
            <u--input
              placeholder=""
              disabledColor="#fff"
              v-model="form.usercount"
              border="none"
              inputAlign="left"
              suffixIcon="eye"
              suffixIconStyle=" color: #dd524dab !important;"
            ></u--input>
          </u-form-item>
          <u-form-item label="密码" prop="password">
            <u--input
              placeholder=""
              disabledColor="#fff"
              v-model="form.password"
              border="none"
              :password="!visible"
              inputAlign="left"
            >
              <template slot="suffix">
                <u-icon
                  @click="visible = !visible"
                  size="18"
                  color="#dd524dab"
                  :name="visible ? 'eye' : 'eye-off'"
                ></u-icon>
              </template>
            </u--input>
          </u-form-item>
          <view class="btn" @tap="login"> 登录 </view>
        </view>
      </u--form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      visible: false,
      membertypeList: [],
      membertypeShow: false,
      show: false,
      usercount:'',
      password:'',
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
      }
    };
  },
  created() {
    // this.address = address;
    // this.getMembertype();
    // this.form.nickname = uni.getStorageSync("nickname") || "";
    // this.form.code = uni.getStorageSync("qrcode") || "";
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1
      });
    },
    async login() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          this.handleRegister();
        })
        .catch((errors) => {
          console.log("validate ~ valid:errors", errors);
        });
    },
    async handleRegister() {
      const res = await this.$api.register({
        ...this.form,
        open_id: uni.getStorageSync("openid"),
        avatar: uni.getStorageSync("avatar")
      });
      if (res.userinfo) {
        uni.setStorageSync("userInfo", res.userinfo); //设置缓存
        uni.showToast({
          title: "注册成功",
          success() {
            setTimeout(() => {
              uni.switchTab({
                url: "/pages/index/index"
              });
            }, 1500);
          }
        });
      } else {
        uni.showToast({
          title: res.msg,
          icon: "none"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100vh;
  background: $uni-color-bg !important;
  .header {
    width: 96%;
    margin: 0 auto;
    padding: 26rpx 0;
  }
  .title {
    color: black;
    font-size: 24px;
    margin: 0 auto 50rpx;
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
    margin: 60rpx auto 30rpx;
    font-size: 32rpx;
    font-family: Source Han Sans SC, Source Han Sans SC;
    font-weight: 500;
  }
}
.u-form-item {
  margin: 30rpx 0;
  width: 100%;
  padding: 0rpx 20rpx;
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
