<template>
  <view class="content">
    <view class="keynote_con" v-if="visible">
      <view class="keynote_content">
        <view>
          <view class="title"> {{ detail.nickname }} </view>
          <view class="job"> {{ detail.company }} | {{ detail.job }}</view>
        </view>
        <image class="images" :src="detail.avatar" mode="aspectFill"></image>
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 28@2x.png"></image>
        <view class="info-label">姓名:</view>
        <view :class="['info-label', highLight ? '' : 'orange']">{{
          highLight ? detail.realname : "成为会员后可见"
        }}</view>
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 27@2x.png"></image>
        <view class="info-label">微信:</view>
        <view :class="['info-label', highLight ? '' : 'orange']">{{
          highLight ? detail.wx_no : "成为会员后可见"
        }}</view>
        <view
          v-if="highLight"
          class="copy orange"
          @click="paste(detail.wx_no)"
          >复制</view
        >
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 26@2x.png"></image>
        <view class="info-label">坐标:</view>
        <view class="info-label">{{ detail.address }}</view>
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 25@2x.png"></image>
        <view class="info-label">简介:</view>
        <view class="info-label">{{ detail.remark }}</view>
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 24@2x.png"></image>
        <view class="info-label">{{ detail.source }}</view>
      </view>
      <view class="info flex ai_center">
        <image src="../../static/img/Group 23@2x.png"></image>
        <view class="info-label">{{ detail.demand }}</view>
      </view>
    </view>
    <view class="footer" v-if="visible && options.type !== 'person'">
      <view :class="['btn', 'green']" @click="register(options.type)">
        {{ detail.has_auth ? "添加联系人" : "成为会员，立即查看" }}</view
      >
    </view>
    <!-- TODO：新增 -->
    <!-- <view class="footer" v-if="visible && options.type === 'person'">
      <view :class="['btn', 'green']"> 修改我的名片</view>
    </view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      type: ""
    };
  },
  onLoad(options) {
    this.type = options.type;
    if (options.ids && options.type !== "person") this.getDetail(options.ids);
    if (options.type === "contact") {
      uni.setNavigationBarTitle({
        title: "联系人详情"
      });
    }
    if (options.type === "person") {
      uni.setNavigationBarTitle({
        title: "个人信息"
      });
      this.detail = uni.getStorageSync("userinfo");
    }
  },
  computed: {
    visible() {
      return this.detail.hasOwnProperty("wx_no");
    },
    highLight() {
      if (this.type === "person") return this.detail.is_vip;
      else {
        return this.detail.has_auth;
      }
    }
  },
  methods: {
    async getDetail(ids) {
      const res = await this.$api.getMemberInfo({ ids });
      if (res?.code === 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
      } else {
        this.detail = res.info || {};
      }
    },
    async follow(ids) {
      const res = await this.$api.follow({ ids: this.detail.id });
      if (res?.code === 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "添加成功"
        });
      }
    },
    register(type) {
      if (type === "member") {
        if (this.detail.has_auth) {
          this.follow();
        }
        if (!this.detail.has_auth) {
          uni.navigateTo({
            url: "/pages/register/register"
          });
        }
      }
    },
    paste(wx_no) {
      uni.setClipboardData({
        data: wx_no
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f5f6;
  height: 100vh;
  overflow: hidden;
  .keynote_con {
    width: 700rpx;
    padding: 26upx 28upx 24upx;
    box-sizing: border-box;
    background-color: #fff;
    margin: 30rpx auto;
    border-radius: 24rpx;
    .keynote_content {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      margin-bottom: 26upx;
      border-bottom: 1px solid #eeeeee;
      // height: 220rpx;
      .images {
        width: 110rpx;
        height: 110rpx;
        margin-left: 20upx;
      }

      .title {
        font-size: 36rpx;
        font-weight: 600;
        color: #333333;
      }
      .job {
        color: #666666;
        margin: 20rpx 0 40rpx;
      }
    }
  }
  .info {
    padding: 32rpx 0 42rpx;
    border-bottom: 1px solid #eeeeee;

    image {
      width: 42rpx;
      height: 42rpx;
      margin-right: 8rpx;
    }
    .info-label {
      font-size: 32rpx;
      font-family: Source Han Sans CN, Source Han Sans CN;
      color: #333333;
      margin: 0 8rpx;
    }
    .orange {
      color: #ff8a00;
    }
    .copy {
      margin-left: auto;
      font-size: 32rpx;
      color: #ff8a00;
    }
  }

  .footer {
    width: 100%;
    min-height: 66px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.06);
  }
  .btn {
    width: 700rpx;
    height: 82rpx;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 82rpx;
    border-radius: 36upx;
    text-align: center;
    margin-top: 30upx;
    background-color: #d9d9d9;
  }
  .green {
    background: #02c3a8;
  }
}
</style>
