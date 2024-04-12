<template>
  <view>
    <view class="rfb header">
      <!-- <navigator :url="`/pages/add/add?id=${customer_id}`"> </navigator> -->
      <u-icon
        style="margin: 0 20rpx"
        size="30"
        name="../../static/images/ECO-UI-03.png"
        @click="back"
      ></u-icon>

      <u-icon
        style="margin: 0 20rpx"
        size="40"
        name="../../static/images/ECO-UI-02.png"
      ></u-icon>
    </view>

    <view class="register fc">
      <u--form labelWidth="auto" labelPosition="left" :model="form" ref="uForm">
        <view class="info fc">
          <view class="title"> 售后登录 </view>

          <u-form-item label="密码" prop="password">
            <u--input
              :password="!visible"
              placeholder=""
              disabledColor="#fff"
              v-model="password"
              border="none"
              inputAlign="left"
              suffixIcon="eye"
              suffixIconStyle=" color: #dd524dab !important;"
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
      password: "",
      visible: false,
      confirmPassword: "111520",
      form: {},
      customer_id: "",
      service_id: "",
      operateType: ""
    };
  },
  onLoad: function (option) {
    if (option.customer_id) {
      this.customer_id = option.customer_id;
    }
    if (option.service_id) {
      this.service_id = option.service_id;
    }
    if (option.operateType) {
      this.operateType = option.operateType;
    }
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1 //返回上一页
      });
    },
    login() {
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          icon: "none",
          title: "密码错误！",
          duration: 2000
        });
      } else {
        let redirectQuery = "";
        if (this.service_id) redirectQuery = `&service_id=${this.service_id}`;
        uni.navigateTo({
          url: `/pages/afterService/afterService?customer_id=${this.customer_id}&operateType=${this.operateType}${redirectQuery}`
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 90rpx;
}
.register {
  width: 100%;
  height: calc(100vh - 90rpx);
  background: $uni-color-bg !important;

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
    margin: 80rpx auto 30rpx;
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
