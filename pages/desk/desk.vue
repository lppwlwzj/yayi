<template>
  <view class="container">
    <view url="/pages/index/index" class="user_header">
      <view class="flex ai_center user_header_box">
        <view class="flex1">
          <view class="flex jc_start ai_center">
            <view class="user_name">{{ userinfo.realname }}</view>
            <view class="user-vip">
              {{ userinfo.company }} | {{ userinfo.job }}</view
            >
          </view>
          <view class="user_name" style="margin-top: 30rpx"
            >邀请码：{{ userinfo.code }}</view
          >
        </view>
        <view class="user_header_img">
          <image class="img" :src="userinfo.avatar"></image>
        </view>
      </view>
    </view>
    <view class="nav flex">
      <navigator url="/pages/withdraw/withdraw" class="nav_list flex1">
        <view class="nav_data"
          ><text>{{ info.money ? info.money : 0 }}</text></view
        >
        <view class="nav_title">可提现金额</view>
      </navigator>
      <view class="nav_list flex1">
        <view class="nav_data"
          ><text>{{ info.freeze_money ? info.freeze_money : 0 }}</text></view
        >
        <view class="nav_title">提现中金额</view>
      </view>
      <view class="nav_list flex1">
        <view class="nav_data"
          ><text>{{ info.withdraw ? info.withdraw : 0 }} </text></view
        >
        <view class="nav_title">累计已赚</view>
      </view>
      <view class="nav_list flex1">
        <view class="nav_data"
          ><text>{{
            info.commission_money ? info.commission_money : 0
          }}</text></view
        >
        <view class="nav_title">累计提现</view>
      </view>
    </view>

    <view class="mode-nav">
      <view class="nav2 nav-list">
        <view class="nav2-list flex ai_center">
          <view class="nav2-title flex1"
            >邀请好友立赚<text class="bonus">{{ info.invite_money || 0 }}</text
            >元</view
          >
          <navigator class="btn invite" :url="`/pages/invite/invite`">
            邀请好友
          </navigator>
        </view>
        <view class="nav2-list flex ai_center" v-if="userinfo.is_vip!=1">
          <view class="nav2-title flex1">尚未开通服饰汇CLUB会员</view>
          <navigator url="/pages/bychase/bychase" class="btn join"
            >立即加入</navigator
          >
        </view>
      </view>
      <view class="mode-nav-item">
        <view class="nav2 nav-list">
          <navigator
            url="/pages/contact/contact"
            class="nav2-list flex ai_center"
          >
            <view class="nav2-title flex1">我的联系人</view>
            <u-icon name="arrow-right" size="20"></u-icon>
          </navigator>
          <navigator
            class="nav2-list flex ai_center"
            url="/pages/myActivies/myActivies"
          >
            <view class="nav2-title flex1 nav2-notice">我的活动 </view>
            <u-icon name="arrow-right" size="20"></u-icon>
          </navigator>
          <navigator
            class="nav2-list flex ai_center"
            :url="`/pages/member/detail?ids=${userinfo.user_id}&type=person`"
          >
            <view class="nav2-title flex1 nav2-notice">我的名片 </view>
            <u-icon name="arrow-right" size="20"></u-icon>
          </navigator>
          <navigator
            class="nav2-list flex ai_center"
            :url="`/pages/record/record`"
          >
            <view class="nav2-title flex1 nav2-notice">账户记录 </view>
            <u-icon name="arrow-right" size="20"></u-icon>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
      info: {}
    };
  },
  onShow() {
	if(uni.getStorageSync('openid')){
		this.login(uni.getStorageSync('openid'))
	}
  },
  methods: {
    async getWithdrawAbout() {
      const res = await this.$api.getWithdrawAbout();
      this.info = res;
    },
	async login(open_id) {
		const res = await this.$api.login({
			open_id
		});
		uni.setStorageSync('userInfo', res.userinfo)
		this.userinfo = res.userinfo
		this.getWithdrawAbout();
	}
	
  }
};
</script>

<style scoped lang="scss">
.container {
  background: #f8f8f8;
  height: 100vh;
}

.user_header {
  position: relative;
  background-color: #ffffff;
  padding: 24rpx 0;
}

.bg {
  width: 100%;
  height: 232rpx;
  background: #4bc0ec;
}

.user_header_box {
  padding: 0 30rpx;
}

.user_header_img {
  width: 140rpx;
  height: 140rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
  margin-right: 35rpx;
  box-shadow: 0px 6px 20px 0px rgba(77, 77, 77, 0.08);
}

.user_header_img .img {
  width: 140rpx;
  height: 140rpx;
  border: 0;
  clip-path: circle(50% at center);
  display: inline-block;
  padding: 0;
  margin: 0;
}

.user_name {
  font-size: 38rpx;
  font-weight: 700;
}

.nav {
  background: #fff;
  padding-bottom: 20rpx;
}

.nav_list {
  text-align: center;
  padding: 40rpx 0 20rpx;
  position: relative;
  width: 25%;
}

.nav_title {
  font-size: 24rpx;
  line-height: 24rpx;
  padding-top: 18rpx;
  color: #999999;
}

.icon_nav {
  width: 54rpx;
  height: 54rpx;
  display: block;
  margin: 0 auto;
}

.nav_data {
  font-size: 36rpx;
  font-weight: 700;
  line-height: 1;
}

.unit {
  font-size: 24rpx;
  font-weight: 500;
}

.orderAdmin {
  padding: 0 30rpx;
  background: #fff;
}

.orderTitle {
  padding-top: 40rpx;
  font-size: 32rpx;
  font-weight: 700;
  line-height: 32rpx;
}

.orderMore {
  font-size: 24rpx;
  color: #b2afaf;
}

.icon_gd {
  width: 20rpx;
  height: 20rpx;
  margin-left: 10rpx;
}

// .gd {
// 	width: 25rpx;
// 	height: 25rpx;
// 	border: 2px solid #fff;
// 	border-radius: 5rpx;
// 	border-top: none;
// 	border-left: none;
// 	transform: rotate(-45deg)
// }

.pa_btn {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  background: none;
}

.pa_btn::after {
  border: none;
}

.bottomPhone {
  background: none;
  color: #000;
  text-align: left;
  font-size: 32rpx;
  font-weight: 700;
  text-align: left;
  border: none;
}

.bottomPhone::after {
  border: none !important;
}

.n_img {
  width: 690rpx;
  height: 160rpx;
  display: block;
  margin: 0 auto 20rpx;
  border-radius: 30rpx;
  box-shadow: 0 4rpx 20rpx 0 rgba(77, 77, 77, 0.08);
}

.user-vip {
  margin-left: 20rpx;
  position: relative;
  color: #999999;
  font-size: 24rpx;
}

.none {
  display: none;
}

.icon-vip {
  width: 185rpx;
  height: 52rpx;
  margin-right: 40rpx;
}

.vip-time {
  font-size: 24rpx;
  color: #999999;
  line-height: 1;
}

.vip-date {
  position: absolute;
  top: calc(100% + 12rpx);
  left: 0;
  font-size: 24rpx;
  line-height: 1;
}

.icon-doubt {
  width: 32rpx;
  height: 32rpx;
  margin-left: 10rpx;
}

.mode-nav {
  padding: 20rpx 30rpx;
}

.mode-nav-item {
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.mode-nav-item .nav_title {
  color: #333333;
  padding-top: 15rpx;
}

.nav2 {
  background-color: #ffffff;
  padding: 30rpx 0;
}

.nav-list {
  padding: 0rpx 0;
  margin-bottom: 24rpx;
}

.nav2-list {
  width: 654rpx;
  height: 124rpx;
  opacity: 1;
  border-bottom: 1px solid #eeeeee;
  margin: 0 auto;
  position: relative;
}

.nav2-list:last-child {
  border-bottom: none;
}

.nav2-title {
  font-size: 28rpx;
}

.nav2-notice {
  position: relative;
}

.nav2-notice-tag {
  position: absolute;
  top: -4rpx;
  left: 56rpx;
  height: 30rpx;
  width: 30rpx;
  text-align: center;
  line-height: 30rpx;
  font-size: 22rpx;
  border-radius: 50%;
  background-color: red;
  color: #ffffff;
}

.icon-nav2 {
  width: 44rpx;
  height: 44rpx;
  margin-right: 24rpx;
}

.btn {
  width: 166rpx;
  height: 66rpx;
  font-size: 12px;
  text-align: center;
  line-height: 66rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
}
.invite {
  border: 2rpx solid #02c3a8;
  color: #02c3a8;
}
.join {
  background-color: #02c3a8;
  color: #fff;
}
.bonus {
  color: #02c3a8;
}
</style>
