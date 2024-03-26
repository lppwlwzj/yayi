<template>
  <view class="login">
    <view class="image">
      <image :src="bg" mode="widthFix" style="width: 100%"></image>
    </view>
    <navigator url="/pages/register/register" class="footer"
      >立即注册</navigator
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      bg: ""
    };
  },
  created() {
    this.getRegisterCover();
  },
  methods: {
    async getRegisterCover() {
      const res = await this.$api.getRegisterCover();
      this.bg = res.image;
    },
    /**
     * 微信授权登录
     */
    getUserInfo() {
      uni.getProvider({
        service: "oauth",
        success: (res) => {
          console.log(res.provider);
          if (~res.provider.indexOf("weixin")) {
            uni.login({
              provider: "weixin",
              success: (loginRes) => {
                console.log("获取登录信息", loginRes);
                this.queryUserInfo(loginRes.code);
              },
              complete: (error) => {
                console.log(error);
              }
            });
          }
        }
      });
    }

    /**
     * 发送请求，仅供参考
     *
     */
    // queryUserInfo(data) {
    //   uni.request({
    //     url: "", //接口
    //     method: "POST",
    //     data: {
    //       code: data
    //     },
    //     success: (res) => {
    //       console.log("=====request=====>", res);
    //       if (res.data.code !== 200) {
    //         uni.showToast({
    //           title: res.data.msg,
    //           icon: "none"
    //         });
    //         return;
    //       }

    //       // 发送请求成功， 根据实际需求处理
    //       uni.showToast({
    //         title: "登录成功"
    //       });
    //     },
    //     fail: (error) => {
    //       console.log("请求接口失败", error);
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;

  .image {
    width: 100%;
  }
  .footer {
    text-align: center;
    line-height: 44px;
    width: 344px;
    height: 44px;
    border-radius: 20rpx;
    color: #ffffff;
    background: #02c3a8;
    font-size: 16px;
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translate(-50%);
	box-sizing: border-box;
  }
}
</style>
