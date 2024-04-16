<template>
  <view class="content">
    <view class="top fc">
      <navigator :url="`/pages/index/index`">
        <image
          src="../../static/images/ECO-UI-03.png"
          mode="widthFix"
          class="back"
        ></image>
      </navigator>
      <image
        @click="logout"
        src="../../static/images/ECO-UI-02.png"
        mode="widthFix"
        class="logo"
      ></image>
    </view>
    <view class="list-area">
      <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
        <uni-collapse :show-arrow="true">
          <uni-collapse-item title="用户人数">
            <view class="rfsw">
              <view class="user" v-for="(item, idx) in userList" :key="idx">
                {{ item.text }}
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
      <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
        <uni-collapse :show-arrow="true">
          <uni-collapse-item title="访问操作记录">
            <view class="log rfc" v-for="(item, idx) in logList" :key="idx">
              <text style="color: #000">{{ item.logtime }}</text>
              <text style="color: #000; padding: 0 12rpx 0 20rpx">{{
                item.logname
              }}</text>
              <text style="color: #ccc">{{ item.logcontent }}</text>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>

      <view class="footer rfa">
        <uni-data-select
          placement="top"
          class="user-select"
          placeholder="用户"
          :localdata="userList"
          :clear="false"
          @change="handleChange"
        ></uni-data-select>
        <!-- <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon> -->
        <u-icon
          @click="logout"
          size="26"
          name="../../static/images/ECO-UI-09.png"
        ></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      userList: [],
      logList: []
    };
  },
  onLoad() {
    this.getUserList();
    this.getLogList();
  },
  methods: {
    handleChange(e) {
      console.log("e:", e);
      this.getLogList(e);
    },
    async getUserList() {
      const res = await this.$api.getUserList();
      this.userList = res.re.list || [];
    },
    async getLogList(usercount) {
      const res = await this.$api.getLogList({ usercount });
      this.logList = res.re.list?.map((item) => ({
        ...item,
        logtime: moment(item.logtime).format("YYYY-MM-DD HH:mm:ss")
      }));
    },
    logout() {
      uni.clearStorageSync("userInfo");
      uni.redirectTo({
        url: "/pages/login/login"
      });
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
    height: 240rpx;
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
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
  }
}
.log {
  margin: 20rpx 0;
  font-size: 28rpx;
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
  margin: 20rpx 10rpx;
  font-size: 26rpx;
}

/deep/.uni-collapse-item__title-text {
  color: #dd524dab !important;
  font-size: 34rpx;
}
/deep/.uni-collapse-item__wrap {
  background: $uni-color-bg;
}
/deep/.uni-collapse-item__title-arr {
  color: $uni-color-bg;
}
/deep/.uni-collapse {
  margin: 24rpx 0rpx;
}
/deep/.uni-select {
  border: none;
}
/deep/.uni-select__input-placeholder {
  font-size: 28rpx;
  color: #dd524dab !important;
}
/deep/.uni-select__input-text {
  font-size: 32rpx;
  color: #dd524dab !important;
}
/deep/.uniui-top:before {
  content: "";
}

/deep/.uniui-bottom:before {
  content: "";
}
</style>
