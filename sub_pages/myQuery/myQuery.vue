<template>
  <view class="content" :style="{ paddingTop: statusBarHeight }">
    <view class="top">
      <image
        :src="require('./static/logo.png')"
        mode="scaleToFill"
        class="logo"
      ></image>
    </view>

    <image
      :src="require('./static/title.png')"
      key=""
      mode="scaleToFill"
      class="title"
    ></image>

    <view class="search">
      <u--input
        :customStyle="{
          width: '680rpx !important',
          border: 'solid 1px #396990b3 !important',
          margin: '12rpx auto !important',
          padding: '16rpx 0 !important'
        }"
        placeholderStyle="color:#396990b3"
        placeholder="请输入姓名/订单编号查询"
        disabledColor="#fff"
        v-model="search"
        border="surround"
        suffixIcon="search"
        suffixIconStyle=" color: #396990b3 !important;"
        @confirm="handleSearch"
      ></u--input>

      <!-- <navigator :url="`/sub_pages/add/add`" class="keynote_con">
        <u-icon
          name="plus-circle"
          color="#dd524d63"
          size="28"
          top="10rpx"
        ></u-icon>
      </navigator> -->
    </view>

    <view class="list-area">
      <block v-if="list.length">
        <view class="list-item rfc" v-for="(item, index) in list" :key="index">
          <view class="list-item-left rfc">
            <view class="lef-info">
              {{ item.customer }} / {{ item.dateTime }} / {{ item.porcelain }}
            </view>
          </view>
          <navigator
            :url="`/sub_pages/myQueryAdd/myQueryAdd?id=${item.id}&type=edit`"
          >
            <view class="list-item-right"> 点击查看 </view>
          </navigator>
        </view>
      </block>
    </view>
    <view class="list-item fc" v-show="!list.length">
      <image
        :src="require('./static/empty.png')"
        mode="aspectFill"
        style="width: 90%; height: 196px; margin-bottom: 4px"
      ></image>
      <!-- <text>暂无数据</text> -->
    </view>

    <view class="footer rfa">
      <navigator :url="`/sub_pages/myQueryAdd/myQueryAdd`">
        <u-icon size="30" :name="require('./static/add.png')"></u-icon>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      show: false,
      info: "",
      search: "",
      list: [],
      userInfo: uni.getStorageSync("userInfo"),
    };
  },

  onLoad() {
    // this.getInfo();
  },
  options: { styleIsolation: "shared" }, //这样deep的样式在微信小程序上才可以显示
  methods: {
    async handleSearch() {
      const res = await this.$api.getCustomerList({
        search: this.search
      });
      if (!res.code) {
        this.list = res.re;
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
  background: #fff !important;
  min-height: 100vh;

  .top {
    height: 400rpx;
    width: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    margin: 80rpx 5%;
    height: 140rpx;
    width: 90%;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 680rpx !important;
    margin: 0 auto 60rpx;
  }
  .list-area {
    width: 680rpx;
    margin: 20rpx auto;
    padding-bottom: 160rpx;

    .list-item {
      width: 100%;
      margin: 30rpx 0;
      font-size: 14px;
      border: solid 1px #396990b3 !important;
      .list-item-left {
        width: 540rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
      }

      .lef-info {
        width: 500rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10rpx;
        margin-left: 20rpx;
      }

      .list-item-right {
        width: 180rpx;
        height: 80rpx;
        line-height: 80rpx;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        text-align: center;
        color: #ccc;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
    }
  }

  .footer {
    width: 100%;
    background: #fff;
  }
}
</style>
