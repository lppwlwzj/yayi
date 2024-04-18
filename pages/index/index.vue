<template>
  <view class="content">
    <view class="top fc" :style="{ paddingTop: statusBarHeight }">
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
          placeholder="姓名/日期/瓷品"
          disabledColor="#fff"
          v-model="search"
          border="surround"
          suffixIcon="search"
          suffixIconStyle=" color: #dd524dab !important;"
          @confirm="handleSearch"
        ></u--input>
        <!-- <navigator :url="`/sub_pages/add/add?id=7&type=view`" class="keynote_con"> -->
        <navigator :url="`/sub_pages/add/add`" class="keynote_con">
          <u-icon
            name="plus-circle"
            color="#dd524d63"
            size="28"
            top="10rpx"
          ></u-icon>
        </navigator>
      </view>
    </view>

    <!-- <video
      object-fit="cover"
      id="myVideo"
      src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
      @error="videoErrorCallback"
      enable-danmu
      danmu-btn
      controls
    ></video> -->
    <view class="list-area">
      <block v-if="list.length">
        <view class="list-item rfc" v-for="(item, index) in list" :key="index">
          <view class="list-item-left rfc">
            <view class="lef-info">
              {{ item.customer }} / {{ item.dateTime }} / {{ item.porcelain }} /
              {{ item.doctor }} / {{ item.CAD }} / {{ item.checi }}
            </view>
            <navigator
              :url="`/sub_pages/afterSalesLogin/afterSalesLogin?id=${item.id}&service_id=${item.service_id}&operateType=view`"
              class="keynote_con"
            >
              <u-icon
                size="18"
                v-if="item.tryVisible"
                name="../../static/images/i2.png"
              ></u-icon>
            </navigator>
            <navigator
              :url="`/sub_pages/afterSalesLogin/afterSalesLogin?id=${item.id}&service_id=${item.service_id}&operateType=view`"
              class="keynote_con"
            >
              <u-icon
                size="18"
                style="margin-left: 12rpx"
                v-if="item.recoverVisible"
                name="../../static/images/i1.png"
              ></u-icon>
            </navigator>
          </view>
          <navigator :url="`/sub_pages/add/add?id=${item.id}&type=edit`">
            <view class="list-item-right"> {{ item.proxy }} </view>
          </navigator>
        </view>
      </block>
    </view>
    <view class="list-item fc" v-show="!list.length">
      <image
        :src="require('../../static//images/empty.png')"
        mode="aspectFill"
        style="width: 96px; height: 96px; margin-bottom: 4px"
      ></image>
      ,<text>暂无数据</text>
    </view>
    <view class="footer rfa">
      <navigator :url="`/sub_pages/backLogin/backLogin`">
        <u-icon
          size="26"
          :name="require('../../static/images/ECO-UI-07.png')"
        ></u-icon>
      </navigator>
      <navigator :url="`/sub_pages/preUpload/preUpload`">
        <u-icon
          size="26"
          :name="require('../../static/images/ECO-UI-08.png')"
        ></u-icon>
      </navigator>

      <u-icon
        size="26"
        :name="require('../../static/images/ECO-UI-18.png')"
        @click="open"
      ></u-icon>
      <u-icon
        size="26"
        :name="require('../../static/images/ECO-UI-09.png')"
        @click="logout"
      ></u-icon>
    </view>

    <uni-calendar
      ref="calendar"
      class="uni-calendar--hook"
      :clear-date="true"
      :insert="false"
      :lunar="false"
      :startDate="startDate"
      :endDate="endDate"
      :range="false"
      @confirm="handleDateConfirm"
      @close="handleClose"
    />
    <u-modal
      confirmColor="#dd524d63"
      :show="show"
      :showCancelButton="true"
      @confirm="confirm"
      @cancel="cancel"
      ref="uModal"
      content="确认退出？"
    ></u-modal>
  </view>
</template>

<script>
/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);

  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
import moment from "moment";
export default {
  data() {
    return {
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      show: false,
      info: "",
      search: "",
      list: [],
      defaultDate: moment().format("YYYY-MM-DD"),
      startDate: "",
      endDate: "",
      selected: [],
      userInfo: uni.getStorageSync("userInfo"),
      root: ""
    };
  },
  onReady() {
    this.startDate = getDate(new Date(), -60).fullDate;
    this.endDate = getDate(new Date(), 30).fullDate;
  },
  onLoad() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const res = await this.$api.getPreinstall();
      if (!res.code) {
        if (!res.re) return;
        this.root = res.re?.root || "";
      }
    },
    open() {
      this.$refs.calendar.open();
    },
    confirm() {
      uni.clearStorageSync("userInfo");
      uni.redirectTo({
        url: "/pages/login/login"
      });
    },

    logout() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    handleDateConfirm(time) {
      this.search = time.fulldate;
      // this.$refs.calendar.open();
      this.handleSearch();
    },
    handleClose() {},
    async handleSearch() {
      const res = await this.$api.getCustomerList({
        search: this.search
      });
      if (!res.code) {
        let _list = res.re;
        if (this.userInfo?.usercount !== this.root)
          _list = res.re.filter((item) => !item.isPrivacy);
        this.list = _list.map((item) => {
          const {
            recoverInfo,
            tryInfo,
            id,
            proxy,
            customer_id,
            customer,
            dateTime,
            porcelain,
            doctor,
            CAD,
            checi,
            service_id
          } = item;
          let _recoverInfo = [],
            _tryInfo = [];
          if (recoverInfo) {
            _recoverInfo = JSON.parse(recoverInfo);
          }
          if (tryInfo) {
            _tryInfo = JSON.parse(tryInfo);
          }

          return {
            id,
            customer_id,
            customer,
            dateTime,
            proxy,
            porcelain,
            doctor,
            CAD,
            checi,
            service_id,
            recoverVisible: !!_recoverInfo?.length,
            tryVisible: !!_tryInfo?.length
          };
        });
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
    background-color: #ffff;
    height: 400rpx;
    border-bottom-left-radius: 60rpx;
    border-bottom-right-radius: 60rpx;

    .logo {
      width: 180rpx;
      height: 180rpx;
      margin: 0 auto 20rpx;
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

    .list-item {
      width: 100%;
      margin: 30rpx 0;
      font-size: 14px;

      .list-item-left {
        width: 540rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-top-left-radius: 50rpx;
        border-bottom-left-radius: 50rpx;
      }

      .lef-info {
        width: 500rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10rpx;
      }

      .list-item-right {
        width: 140rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-top-right-radius: 50rpx;
        border-bottom-right-radius: 50rpx;
        text-align: center;
        background: $uni-color-theme;
      }
    }
  }

  .footer {
    width: 100%;
    background: #fff;
  }
}
</style>
<style lang="scss">
/deep/.uni-calendar-item--isDay,
/deep/.uni-calendar-item--checked {
  background: #eb2b24e3;
}
</style>
