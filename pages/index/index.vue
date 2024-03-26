<template>
  <view class="content">
    <!-- <u-swiper
      :list="bannerList"
      keyName="cover"
      indicator
      height="200"
      indicatorMode="line"
      circular
    ></u-swiper> -->
    <view class="top fc">
      <image
        src="../../static/images/ECO UI-02.png"
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
          :placeholderStyle="{
            color: '#dd524d63'
          }"
          placeholder="姓名/日期/瓷品"
          disabledColor="#fff"
          v-model="nickname"
          border="surround"
          suffixIcon="search"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
        <u-icon
          name="plus-circle"
          color="#dd524d63"
          size="28"
          top="10rpx"
        ></u-icon>
      </view>
    </view>
    <view class="menu-area">
      <!-- <view style="color: #0d0d0d; font-size: 32upx; font-weight: 600"
        >活动列表</view
      > -->
      <!-- <view>
        <navigator
          :url="`/pages/active/active?id=${item.id}`"
          v-for="(item, index) in activeList"
          :key="index"
          class="keynote_con"
        >
          <view class="keynote_content">
            <image
              class="images"
              :src="item.backgroundimage"
              mode="aspectFill"
            ></image>
            <view class="key_a">
              <view class="key_b"> {{ item.title }} </view>
              <view class="">
                <view class="key_c">
                  <view class="dot orange"></view>
                  <view class="tip">
                    {{ item.begin_range }}
                  </view>
                </view>
                <view class="key_c">
                  <view class="dot green"></view>
                  <view class="tip">{{ item.address }}</view>
                </view>
              </view>
            </view>
          </view>
          <view
            :class="['btn', item.end_status == 0 ? 'green' : 'gray']"
            @click.stop="join(item)"
          >
            {{ item.end_status == 0 ? "加入活动" : "活动截止" }}
          </view>
        </navigator>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: ""
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
      const res = await this.$api.join({ activity_id: item.id });
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
