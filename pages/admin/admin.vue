<template>
  <view class="content">
    <view class="top fc">
      <image
        src="../../static/images/ECO-UI-03.png"
        mode="widthFix"
        class="back"
      ></image>
      <image
        src="../../static/images/ECO-UI-02.png"
        mode="widthFix"
        class="logo"
      ></image>
      <view class="search">
        <u--input
          :customStyle="{
            width: '540rpx',
            marginTop: '12rpx',
            border: 'solid 1px #dd524d63 !important',
            borderRadius: '40rpx',
            marginRight: '12rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="姓名/日期"
          disabledColor="#fff"
          v-model="nickname"
          border="surround"
          suffixIcon="search"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
        <navigator :url="`/pages/add/add`" class="keynote_con">
          <u-icon
            name="plus-circle"
            color="#dd524d63"
            size="28"
            top="10rpx"
          ></u-icon>
        </navigator>
      </view>
    </view>
    <view class="list-area">
      <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item title="用户人数" name="Docs guide" border="false">
            <view class="rfsw">
              <view class="user" v-for="(item, idx) in userList" :key="idx">
                理
              </view>
            </view>
          </u-collapse-item>
        </u-collapse>
      </view>
      <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
        <u-collapse @change="change" @close="close" @open="open">
          <u-collapse-item title="访问操作记录" name="Docs guide">
            <view v-for="(item, idx) in recoverInfo" :key="idx"> </view>
          </u-collapse-item>
        </u-collapse>
      </view>

      <view class="footer rfa">
        <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>
        <u-icon size="26" name="../../static/images/ECO-UI-09.png"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          name: "林一"
        },
        {
          name: "林一"
        },
        {
          name: "林一"
        },
        {
          name: "林一"
        },
        {
          name: "林一"
        },
        {
          name: "林一"
        }
      ]
    };
  },
  onLoad() {
    // this.getBanner();
    // this.getActiveList();
  },
  methods: {
    async getBanner() {
      const res = await this.$api.getBanner();
      this.bannerList = res.banner;
    },
    async getActiveList() {
      const res = await this.$api.getActiveList();
      this.activeList = res;
    },
    async join(item) {
      if (item.end_status == 1) {
        return;
      }
      const res = await this.$api.join({
        activity_id: item.id
      });
      if (res?.code == 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "报名成功"
        });
        this.getActiveList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  // height: 100vh;
  box-sizing: border-box;
  background: $uni-color-bg !important;
  min-height: 100vh;

  .top {
    position: relative;
    background-color: #ffff;
    height: 400rpx;
    border-bottom-left-radius: 60rpx;
    border-bottom-right-radius: 60rpx;

    .logo {
      width: 160rpx;
      height: 160rpx;
      margin: 0 auto 20rpx;
    }
    .back {
      width: 100rpx;
      height: 100rpx;
      position: absolute;
      left: 0;
      top: 30rpx;
    }
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
  }

  .list-area {
    width: 680rpx;
    margin: 20rpx auto;
    padding-bottom: 160rpx;
  }

  .footer {
    width: 100%;
    background: #fff;
  }
}
/deep/uni-view.u-cell__body {
  border-radius: 30rpx;
  background-color: #fff;
}
.user {
  width: 90rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  color: #fff;
  background: $uni-color-theme;
  margin: 12rpx 10rpx;
  font-size: 26rpx;
}
</style>
