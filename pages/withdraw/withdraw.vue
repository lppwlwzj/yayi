<template>
  <view class="register">
    <view class="content">
      <u--form labelWidth="auto" labelPosition="left" :model="form" ref="uForm">
        <view class="info">
          <view class="info-title">提现信息</view>

          <u-form-item label="银行账号" prop="bank_card" borderBottom>
            <u--input
              placeholder="请输入"
              disabledColor="#fff"
              v-model="form.bank_card"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>

          <u-form-item label="开户行名称" prop="bank_alias" borderBottom>
            <u--input
              placeholder="请输入"
              v-model="form.bank_alias"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <u-form-item label="银行名称" prop="bank_name" borderBottom>
            <u--input
              placeholder="请输入"
              style="width: 100%"
              disabledColor="#fff"
              v-model="form.bank_name"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>

          <u-form-item label="真实名称" prop="bank_account" borderBottom>
            <u--input
              placeholder="请输入"
              v-model="form.bank_account"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <u-form-item label="联系电话" prop="mobile" borderBottom>
            <u--input
              placeholder="请输入"
              v-model="form.mobile"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
        </view>

        <view class="info">
          <view class="info-title">提现金额</view>
          <view class="flex input">
            <view style="margin-right: 24rpx;">¥</view>
            <u--input
              placeholder="请输入"
              v-model="form.money"
              border="none"
            ></u--input>
          </view>
          <view class="info-label" style="margin-top: 36rpx"
            >可提现金额 {{ withdrawSetting.user_money }} 元</view
          >
          <view class="info-label"
            >全部提现 提示:最低提现金额{{
              withdrawSetting.withdraw_min
            }}元</view
          >
        </view>
      </u--form>
    </view>
    <view class="footer">
      <view class="btn" @tap="register"> 提现 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      withdrawSetting: {},
      form: {
        money: "",
        bank_name: "",
        bank_alias: "",
        bank_card: "",
        bank_account: "",
        mobile: ""
      }
    };
  },
  onLoad() {
    this.getWithdrawSetting();
  },
  methods: {
    async getWithdrawSetting() {
      const res = await this.$api.getWithdrawSetting();
      this.withdrawSetting = res;
    },
    async register() {
      console.log(this.form);
      const res = await this.$api.getWithdrawApply(this.form);
      if (res.code === 1) {
        uni.navigateTo({
          url: "/pages/withdraw/success"
        });
      } else {
        uni.showToast({
          icon: "none",
          title: res.msg || "提现失败"
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
  overflow: hidden;
  .content {
    height: 100%;
    overflow: auto;
    width: 750rpx;
    padding: 12rpx 0 50rpx;
    background-color: #f4f5f6;
  }
  .image {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .title {
    width: 314rpx;
    height: 52rpx;
    font-size: 36rpx;
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: bold;
    color: #fde2a6;
    line-height: 42rpx;
    letter-spacing: 1px;
    padding: 30rpx 0 0 30rpx;
  }
  .info {
    width: 684rpx;

    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    border: 1rpx solid rgba(238, 238, 238, 0);
    background-color: #ffffff;
    margin: 30rpx auto 0;
    padding: 30rpx;
    box-sizing: border-box;
    border-radius: 30rpx;
    position: relative;
    // z-index: 9;
    &-title {
      width: 654rpx;
      height: 92rpx;
      font-size: 32rpx;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 600;
      color: #333333;
      line-height: 92rpx;
    }
    .info-label {
      font-size: 24rpx;
      color: #999999;
      margin-top: 10rpx;
    }
  }
  .footer {
    height: 160rpx;
    box-sizing: border-box;
  }
  .btn {
    text-align: center;
    line-height: 88rpx;
    width: 690rpx;
    height: 88rpx;
    border-radius: 20px;
    color: #ffffff;
    background: #02c3a8;
    font-size: 16px;
    margin-top: 20rpx;
    font-size: 32rpx;
    font-family: Source Han Sans SC, Source Han Sans SC;
    font-weight: 500;
    color: #ffffff;
  }
}
.input{
  border: 2rpx solid #EEEEEE;
  padding:30rpx 20rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
}
.u-form-item {
  padding: 12rpx;
}
.u-radio-group--row {
  justify-content: flex-end;
}
/deep/.input-value-border {
  border: none !important;
  .placeholder {
    justify-content: flex-end;
    span {
      color: rgb(192, 196, 204);
      font-size: 14px;
    }
  }
}
</style>
