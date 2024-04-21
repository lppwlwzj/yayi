<template>
  <view class="register">
    <view class="rfb header"  :style="{ paddingTop: statusBarHeight }">
   
      <u-icon
        size="30"
        :name="require('../../static/images/ECO-UI-03.png')"
        @click="back"
      ></u-icon>
      <!-- <u-icon size="40" :name="require('../../static/images/ECO-UI-02.png')"></u-icon> -->
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
              v-model="usercount"
              border="none"
              inputAlign="left"
              suffixIcon="eye"
              suffixIconStyle=" color: #dd524dab !important;"
            ></u--input>
          </u-form-item>
          <u-form-item label="密码" prop="password">
            <!-- <u--input
              placeholder=""
              disabledColor="#fff"
              v-model="password"
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
            </u--input> -->
                    <view class="u-demo-block__content">
        <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
        <!-- #ifndef APP-NVUE -->
        <u-input placeholder=" "   
           :password="!visible"
            disabledColor="#fff"
            v-model="password"
            border="none"
            inputAlign="left">
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
          <u--input  
       placeholder=" "   
         :password="!visible"
          disabledColor="#fff"
            v-model="password"
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
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {},
      visible: false,
      show: false,
      usercount: "admin",
      password: "111520",
      confirmCount: "admin",
      confirmPassword: "111520",
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

  methods: {
    back() {
      uni.navigateBack({
        delta: 1
      });
    },
    login() {
      if (
        this.confirmCount === this.usercount &&
        this.password === this.confirmPassword
      ) {
        uni.navigateTo({
          url: `/sub_pages/admin/admin`
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "账号密码错误！",
          duration: 2000
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
