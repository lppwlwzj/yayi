<template>
  <view class="content">
    <u-sticky bgColor="#fff" style="top: 0">
      <u-tabs
        :list="tabs"
        lineWidth="60"
        lineColor="#02C3A8"
        :activeStyle="{
          color: '#02C3A8',
          fontWeight: 'bold',
          transform: 'scale(1.05)'
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)'
        }"
        keyName="label"
        itemStyle="padding-left: 15px; padding-right: 15px;width:300rpx; height: 44px;"
        @click="change"
      ></u-tabs>
    </u-sticky>

    <view class="menu-area">
      <view
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
        <!-- <navigator
          :url="item.end_status ? `/pages/active/active?id=${item.id}` : ''"
          :class="['btn', item.end_status ? 'green' : 'gray']"
        >
          {{ item.end_status ? "已报名" : "活动截止" }}
        </navigator> -->
        <view :class="['btn', item.end_status ? '' : '']">
          {{ item.end_status ? "已报名" : "活动截止" }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          label: "线上活动",
          value: "online"
        },
        {
          label: "线下活动",
          value: "offline"
        }
      ],
      active: "online",
      online_page: 1,
      offline_page: 1,
      online_last_page: 1,
      offline_last_page: 1,
      onlineList: [],
      offlineList: []
    };
  },
  onLoad() {
    this.getOnlineActiveList();
    this.getOfflineActiveList();
  },
  computed: {
    activeList() {
      return this[`${this.active}List`] || [];
    }
  },
  onReachBottom() {
    if (this.active === "online") {
      if (this.online_page < this.online_last_page) {
        this.online_page++;
        this.getOnlineActiveList();
      }
    } else {
      if (this.offline_page < this.offline_last_page) {
        this.offline_page++;
        this.getOfflineActiveList();
      }
    }
  },
  methods: {
    change(item) {
      this.active = item.value;
    },
    async getOfflineActiveList() {
      const res = await this.$api.getMyActivityList({
        page: this.offline_page,
        activity_type: 2
      });
      this.offline_last_page = res.last_page;
      this.offlineList = [...this.offlineList, ...res.data];
    },
    async getOnlineActiveList() {
      const res = await this.$api.getMyActivityList({
        page: this.online_page,
        activity_type: 1
      });
      this.online_last_page = res.last_page;
      this.onlineList = [
        ...this.onlineList,
        ...res.data
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
page{
  background-color:#f4f5f6 ;
}
.content {
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f5f6;

  .menu-area {
    // margin-top: 50upx;
    width: 700rpx;
    margin: 0 auto;
    padding-bottom: 40upx;
    .keynote_con {
      width: 100%;
      padding: 26upx 24upx 24upx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 30rpx auto;

      border-radius: 24rpx;

      .keynote_content {
        display: flex;
        align-items: center;
        margin-bottom: 26upx;
        height: 220rpx;

        .images {
          width: 320rpx;
          height: 220rpx;
          margin-right: 20upx;
        }

        .key_a {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;

          .tip {
            flex: 1;
            font-size: 24upx;
            font-weight: 400;
            color: #999999;
            margin-bottom: 8upx;
          }

          image {
            width: 28upx;
            height: 28upx;
          }

          .key_b {
            margin-bottom: 20upx;
            color: #0d0d0d;
            font-size: 32rpx;
            font-weight: 600;
          }

          .key_c {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
          }

          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 6upx;
          }
        }
      }
    }

    // .btn {
    //   width: 166rpx;
    //   height: 62rpx;
    //   font-size: 24rpx;
    //   color: #ffffff;
    //   line-height: 62rpx;
    //   border-radius: 30upx;
    //   text-align: center;
    //   margin-top: 10upx;
    //   margin-left: 75%;
    // }
    .btn {
      font-size: 32rpx;
      color: #ff8a00;
      margin-top: 10upx;
      margin-left: 78%;
      font-weight: 600;
    }

    .gray {
      //   background-color: #d9d9d9;
    }

    .orange {
      background: #ef615a;
    }

    .green {
      background: #02c3a8;
    }
  }
}
</style>
