<template>
  <view class="register fc">
    <u--form labelWidth="auto" labelPosition="left" :model="form" ref="uForm" :rules="rules">
      <view class="info fc">
        <image
          src="../../static/images/ECO-UI-02.png"
          mode="widthFix"
          class="logo"
        ></image>

        <!-- 昵称 -->
        <u-form-item label="账号" prop="nickname">
          <u--input
            placeholder=""
            disabledColor="#fff"
            v-model="form.usercount"
            border="none"
            inputAlign="left"
            suffixIcon="edit-pen"
            suffixIconStyle=" color: #dd524dab !important;"
          ></u--input>
        </u-form-item>

        <u-form-item label="密码" prop="nickname">
          <u--input
            placeholder=""
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left"
            suffixIcon="eye"
            suffixIconStyle=" color: #dd524dab !important;"
          ></u--input>
        </u-form-item>
        <view class="btn" @tap="login"> 登录 </view>
      </view>
    </u--form>
  </view>
</template>

<script>
// import address from "../../static/picker-region";
export default {
  data() {
    return {
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
      address: []
    };
  },
  created() {
    // this.getMembertype();
    // this.form.nickname = uni.getStorageSync("nickname") || "";
    // this.form.code = uni.getStorageSync("qrcode") || "";
  },
  methods: {
    async getMembertype() {
      const res = await this.$api.getMembertype();
      const membertypeList = Object.entries(res.membertype).map((item) => ({
        label: item[1],
        value: item[0]
      }));
      this.membertypeList = [membertypeList];
    },
    selectMembertype(e) {
      this.form.membertype = e.value[0].label;
      this.membertypeShow = false;
    },
    async login() {
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
      console.log("🚀 ~ handleRegister ~ res:", res)
      if (res.code === 0) {
        uni.setStorageSync("userInfo", res.userinfo); //设置缓存
        uni.showToast({
          title: "登录成功",
          success() {
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/index/index"
              });
            }, 1500);
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
    },
   
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
