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
        itemStyle="padding-left: 15px; padding-right: 15px;width:300rpx; height:88rpx;"
        @click="change"
      ></u-tabs>
    </u-sticky>

    <view class="menu-area">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="list-item flex ai_center"
      >
        <view class="left">
          <view
            style="
              color: #000000;
              fontsize: 36rpx;
              font-weight: 600;
              margin-bottom: 16rpx;
            "
          >
            {{ item.memo }}</view
          >
          <view
            v-show="active === 'out'"
            :class="`status status_${item.apply_status}`"
          >
            {{ item.apply_status_text }}</view
          >
          <view style="color: #999999; font-size: 26rpx">
            {{ item.createtime_text || item.apply_time }}</view
          >
        </view>
        <view
          class="right"
          v-if="
            active === 'in' ||
            (active === 'out' && [20].includes(item.apply_status))
          "
          >+{{ item.money }}</view
        >
        <view class="right money" v-else>{{ item.money }}</view>
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
          label: "收入",
          value: "in"
        },
        {
          label: "提现",
          value: "out"
        }
      ],
      active: "in",
      in_last_page: 1,
      out_last_page: 1,
      in_page: 1,
      out_page: 1,
      inList: [],
      outList: []
    };
  },
  onLoad() {
    this.getWithdrawList();
    this.getMoneyLog();
  },
  computed: {
    list() {
      return this[`${this.active}List`] || [];
    }
  },
  onReachBottom() {
    if (this.active === "in") {
      if (this.in_page < this.in_last_page) {
        this.in_page++;
        this.getWithdrawList();
      }
    } else {
      if (this.out_page < this.out_last_page) {
        this.out_page++;
        this.getMoneyLog();
      }
    }
  },
  methods: {
    change(item) {
      this.active = item.value;
    },
    async getWithdrawList() {
      const res = await this.$api.getWithdrawList({
        page: this.in_page
      });
      if (res?.code === 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
        return;
      }
      this.inList = [...this.inList, ...res.data];
      this.in_last_page = res.last_page;
    },
    async getMoneyLog() {
      const res = await this.$api.getMoneyLog({
        page: this.out_page
      });
      if (res?.code === 0) {
        uni.showToast({
          icon: "none",
          title: res.msg
        });
        return;
      }
      this.outList = [...this.outList, ...res.data];
      this.out_last_page = res.last_page;
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

  .menu-area {
    width: 700rpx;
    margin: 20rpx auto 0;
    border-radius: 20rpx;
    // height: 100%;
    // overflow: auto;
    background-color: #fff;
    .list-item {
      // margin: 20rpx 0;
      padding: 30rpx 20rpx;
      border-bottom: 2rpx solid #eeeeee;
      .right {
        margin-left: auto;
        color: #02c3a8;
        font-size: 36rpx;
        font-weight: 600;
      }
      .money {
        color: #666666;
      }
    }

    .status {
      margin-bottom: 16rpx;
      font-size: 26rpx;
    }
    .status_10 {
      color: #999999;
    }
    .status_20 {
      margin-bottom: 16rpx;
      color: #ff8a00;
    }
    .status_30 {
      margin-bottom: 16rpx;
      color: red;
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
