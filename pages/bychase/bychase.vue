<template>
  <view class="login">
    <view class="image">
      <image :src="bg" mode="widthFix" style="width: 100%"></image>
    </view>
    <view class="footer">
      <view class="flex agree">
        <checkbox style="zoom: 0.8" @click="checked = !checked"></checkbox>
        <view class="tip">
          <text>我已阅读并同意</text>
          <text @click="jump('service')" style="color: #02c3a8; font-weight: 600"
            >《服务协议》</text
          >
          及
          <text @click="jump('privacy')" style="color: #02c3a8; font-weight: 600"
            >《隐私协议》</text
          >
        </view>
      </view>
      <view class="btn" @click="join">报名会员¥{{ price }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bg: "",
      price: "",
      checked: false
    };
  },
  created() {
    this.getMemberSetting();
  },
  methods: {
    async getMemberSetting() {
      const res = await this.$api.getMemberSetting();
      this.bg = res.backgroundimage;
      this.price = res.member_price;
    },
    async join() {
      if (!this.checked) return;
      console.log(123);
      const res = await this.$api.recharge();
      console.log(res);
      //TODO:唤起微信支付？
      var onBridgeReady = () => {
        // eslint-disable-next-line
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: res.appId, //公众号ID，此处必传
            timeStamp: res.timestamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign
          },
          function (res) {
            uni.hideLoading();
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              uni.showToast({
                title: "支付成功",
                icon: "none"
              });
              let userInfo = uni.getStorageSync("userInfo");
              userInfo.is_vip = 1;
              uni.setStorageSync("userInfo", userInfo);
              uni.switchTab({
                url: "/pages/index/index"
              });
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
              uni.showToast({
                title: "支付失败",
                icon: "none"
              });
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
              uni.showToast({
                title: "支付取消",
                icon: "none"
              });
            }
          }
        );
      };
      //调用微信支付接口
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
    jump(type) {
				uni.navigateTo({
					url: `/pages/privacy/privacy?type=${type}`,
				});
			},
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
    padding: 30rpx;
    box-sizing: border-box;

    background: #ffffff;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    .btn {
      width: 700rpx;
      text-align: center;
      border-radius: 38rpx;
      background-color: #edc68f;
      margin: 28rpx auto;
      height: 80rpx;
      line-height: 80rpx;
      font-weight: 600;
    }
  }
}
</style>
