<template>
  <view class="content">
    <image
      class="images"
      :src="detail.backgroundimage"
      mode="aspectFit"
    ></image>
    <view class="info-area">
      <view class="info-title">{{ detail.title }} </view>
      <view class="info-price">{{ detail.price }} </view>
      <view class="info-info flex ai_center">
        <u-icon size="15" name="../../static/img/time.png"></u-icon>
        <view style="padding-left: 12rpx">{{ detail.begin_range }}</view>
      </view>
      <view class="info-info flex ai_center">
        <u-icon size="15" name="../../static/img/location.png"></u-icon>
        <view style="padding-left: 12rpx">{{ detail.address }}</view>
      </view>
    </view>
    <view class="menu-area">
      <view
        style="
          color: #0d0d0d;
          font-size: 32upx;
          font-weight: 600;
          margin: 16rpx 0 28rpx 20rpx;
        "
        >详情说明</view
      >
      <view style="margin: 16rpx 30rpx 28rpx 30rpx">
        <u-parse :content="detail.details"></u-parse>
      </view>

      <view v-if="detail.end_status === 1" :class="['btn', 'gray']">
        活动截止
      </view>
      <view
        v-if="detail.end_status === 0 && detail.is_apply === 1"
        :class="['btn', 'gray']"
      >
        已报名
      </view>
      <view
        v-if="detail.end_status === 0 && detail.is_apply === 0"
        :class="['btn', 'green']"
        @click="join"
      >
        加入活动
      </view>
      <!-- <navigator
        :url="detail.end_status ? `/pages/active/active?id=${detail.id}` : ''"
        :class="['btn', detail.end_status ? 'green' : 'gray']"
      >
        {{ detail.end_status ? "加入活动" : "活动截止" }}</navigator
      > -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
      detail: {}
    };
  },
  onLoad(option) {
    if (option.id) this.getActiveDetail(option.id);
  },
  methods: {
    async getActiveDetail(id) {
      const res = await this.$api.getActiveDetail({ id });
      this.detail = res;
    },
    async join() {
      const res = await this.$api.join({ activity_id: this.detail.id });
      if (res.code == 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "报名成功"
        });
        // sleep(1000)
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 800);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f5f6;
  min-height: 100vh;
  .images {
    width: 750rpx;
    height: 400rpx;
  }
  .info-area {
    width: 704rpx;
    padding: 24rpx;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    bottom: 60rpx;
    background-color: #fff;
    border-radius: 26rpx;
    .info-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333333;
    }
    .info-price {
      color: #ff8a00;
      font-size: 32rpx;
      font-weight: 600;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: 1rpx solid #eeeeee;
    }
    .info-info {
      margin-top: 20rpx;
      color: #999999;
      font-size: 28rpx;
    }
  }
  .menu-area {
    background-color: #fff;
    padding: 24rpx 0;
  }
  .btn {
    width: 700rpx;
    height: 82rpx;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 82rpx;
    border-radius: 36upx;
    text-align: center;
    margin: 30upx auto 0;
    background-color: #d9d9d9;
  }
  .gray {
    background-color: #d9d9d9;
  }
  .orange {
    background: #ef615a;
  }
  .green {
    background: #02c3a8;
  }
  
}
</style>
