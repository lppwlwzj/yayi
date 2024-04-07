<template>
  <view class="content">
    <view class="top fc">
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
        <!-- <navigator :url="`/pages/add/add?id=7&type=view`" class="keynote_con"> -->
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
      <view class="list-item rfc" v-for="(item, index) in list" :key="index">
        <view class="list-item-left rfc">
          <view class="lef-info">
            {{ item.customer }} / {{ item.dateTime }} / {{ item.porcelain }} /
            {{ item.doctor }} / {{ item.CAD }} / {{ item.checi }}
          </view>
          <navigator
            :url="`/pages/afterSalesLogin/afterSalesLogin?id=${item.id}&service_id=${item.service_id}`"
            class="keynote_con"
          >
            <u-icon
              size="18"
              v-if="item.tryVisible"
              name="../../static/images/i2.png"
            ></u-icon>
          </navigator>
          <navigator
            :url="`/pages/afterSalesLogin/afterSalesLogin?id=${item.id}&service_id=${item.service_id}`"
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
        <navigator :url="`/pages/add/add?id=${item.id}&type=edit`">
          <view class="list-item-right"> {{ item.proxy }} </view>
        </navigator>
      </view>
      <view class="footer rfa">
        <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>
        <u-icon
          size="26"
          name="../../static/images/ECO-UI-18.png"
          @click="
            () => {
              open = true;
            }
          "
        ></u-icon>
        <u-icon
          size="26"
          name="../../static/images/ECO-UI-09.png"
          @click="logout"
        ></u-icon>
      </view>
      <!-- //    minDate="1970-01-01" -->
      <!-- :defaultDate="['2024-04-07']" -->
      <u-calendar
        color="#f56c6c"
        :show="open"
        minDate="2024-04-06"
        mode="single"
        @close="
          () => {
            open = false;
          }
        "
        @confirm="handleConfirm"
      ></u-calendar>
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
  </view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      show: false,
      open: false,
      info: "",
      search: "",
      list: [],
      defaultDate: moment().format("YYYY-MM-DD")
    };
  },

  methods: {
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
    handleConfirm(time) {
      this.search = time[0];
      this.open = false;
      this.handleSearch();
    },
    async handleSearch() {
      const res = await this.$api.getCustomerList({
        search: this.search
      });
      if (!res.code)
        this.list = res.re.map((item) => {
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
          const _recoverInfo = JSON.parse(recoverInfo);
          const _tryInfo = JSON.parse(tryInfo);
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

  // .menu-area {
  //   margin-top: 50upx;

  //   .keynote_con {
  //     width: 100%;
  //     padding: 26upx 24upx 24upx;
  //     box-sizing: border-box;
  //     background-color: #fff;
  //     margin: 30rpx auto;

  //     border-radius: 24rpx;

  //     .keynote_content {
  //       display: flex;
  //       align-items: center;
  //       margin-bottom: 26upx;
  //       height: 220rpx;

  //       .images {
  //         min-width: 320rpx;
  //         width: 320rpx;
  //         height: 220rpx;
  //         margin-right: 20upx;
  //       }

  //       .key_a {
  //         display: flex;
  //         flex-direction: column;
  //         height: 100%;
  //         justify-content: space-between;

  //         .tip {
  //           font-size: 24upx;
  //           font-weight: 400;
  //           color: #999999;
  //           margin-bottom: 8upx;
  //           flex: 1;
  //         }

  //         image {
  //           width: 28upx;
  //           height: 28upx;
  //         }

  //         .key_b {
  //           margin-bottom: 20upx;
  //           color: #0d0d0d;
  //           font-size: 32rpx;
  //           font-weight: 600;
  //           -webkit-box-orient: vertical;
  //           -moz-box-orient: vertical;
  //           -ms-box-orient: vertical;
  //           -o-box-orient: vertical;
  //           box-orient: vertical;
  //           -webkit-line-clamp: 2;
  //           -moz-line-clamp: 2;
  //           -ms-line-clamp: 2;
  //           -o-line-clamp: 2;
  //           line-height: normal;
  //           white-space: normal;
  //           overflow: hidden;
  //         }

  //         .key_c {
  //           display: flex;
  //           justify-content: flex-start;
  //           align-items: baseline;
  //         }

  //         .dot {
  //           width: 6px;
  //           height: 6px;
  //           border-radius: 50%;
  //           margin-right: 6upx;
  //         }
  //       }
  //     }
  //   }

  //   .btn {
  //     width: 166rpx;
  //     height: 62rpx;
  //     font-size: 24rpx;
  //     color: #ffffff;
  //     line-height: 62rpx;
  //     border-radius: 30upx;
  //     text-align: center;
  //     margin-top: 10upx;
  //     margin-left: 75%;
  //   }

  //   .gray {
  //     background-color: #d9d9d9;
  //   }

  //   .orange {
  //     background: #ef615a;
  //   }

  //   .green {
  //     background: #02c3a8;
  //   }
  // }
}
</style>
