<template>
  <view class="register fc">
    <u--form labelWidth="auto" labelPosition="left" :model="form" ref="uForm">
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
            v-model="form.user"
            border="none"
            inputAlign="right"
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
        <view class="btn" @tap="register"> 登录 </view>
      </view>
    </u--form>
  </view>
</template>

<script>
import address from "../../static/picker-region";
export default {
  data() {
    return {
      form: {
        /**
         * 详细地址
         */
        address: "",
        /**
         * 城市
         */
        city: "",
        /**
         * 公司
         */
        company: "",
        /**
         * 我的需求
         */
        demand: "",
        /**
         * 区
         */
        distinct: "",
        /**
         * 邮箱
         */
        email: "",
        /**
         * 性别 0 女 1男
         */
        gender: 1,
        /**
         * 职位
         */
        job: "",
        /**
         * 身份类型 通过身份列表获取
         */
        membertype: "",
        /**
         * 手机号
         */
        mobile: "",
        /**
         * 昵称
         */
        nickname: "",
        /**
         * 省份
         */
        province: "",
        /**
         * 真实姓名
         */
        realname: "",
        /**
         * 个人简介
         */
        remark: "",
        /**
         * 可分享资源
         */
        source: "",
        /**
         * 微信号
         */
        wx_no: "",

        code: ""
      },
      membertypeList: [],
      membertypeShow: false,
      show: false,
      rules: {
        nickname: [
          {
            required: true,
            message: "请填写昵称",
            trigger: ["change", "blur"]
          }
        ],
        // gender:[{
        // 	min:1,
        // 	required: true,
        // 	message: '请选择性别',
        // 	trigger: ['change']
        // }],
        company: [
          {
            required: true,
            message: "请填写公司",
            trigger: ["change", "blur"]
          }
        ],
        job: [
          {
            required: true,
            message: "请填写职位",
            trigger: ["change", "blur"]
          }
        ],
        membertype: [
          {
            required: true,
            message: "请选择身份类型",
            trigger: ["change", "blur"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "请填写联系方法",
            trigger: ["change", "blur"]
          }
        ],
        realname: [
          {
            required: true,
            message: "请填写真实姓名",
            trigger: ["change", "blur"]
          }
        ],
        wx_no: [
          {
            required: true,
            message: "请填写微信号",
            trigger: ["change", "blur"]
          }
        ],
        email: [
          {
            required: true,
            message: "请填写联系邮箱",
            trigger: ["change", "blur"]
          }
        ],
        distinct: [
          {
            required: true,
            message: "请选择所在地",
            trigger: ["change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: ["change", "blur"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请填写个人简历",
            trigger: ["change", "blur"]
          }
        ]
      },
      address: []
    };
  },
  created() {
    this.address = address;
    this.getMembertype();
    this.form.nickname = uni.getStorageSync("nickname") || "";
    this.form.code = uni.getStorageSync("qrcode") || "";
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
    async register() {
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
    },
    onchange(e) {
      const arr = e.detail.value;
      this.form.province = arr[0].text;
      this.form.city = arr[0].text;
      this.form.distinct = arr[0].text;
      this.$refs.uForm.validateField("distinct");
    },
    inputclick(e) {
      console.log("inputclick");
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
