<template>
  <view class="content">
    <view class="search">
      <u--input
        :value="keyword"
        @change="handleChange"
        class="search-input"
        placeholder="点击输入你想要的内容"
        suffixIcon="search"
        suffixIconStyle="font-size: 26px;color: #02C3A8"
      ></u--input>

      <view class="list flex jc_start">
        <view
          @click="select(item)"
          class="list-item"
          v-for="(item, index) in memberTypeList"
          :key="index"
          >{{ item.label }}
        </view>
      </view>
    </view>

    <u-swiper
      :list="bannerList"
      keyName="cover"
      indicator
      height="200"
      indicatorMode="line"
      circular
    ></u-swiper>

    <view class="menu-area">
      <view style="color: #0d0d0d; font-size: 32upx; font-weight: 600"
        >会员列表</view
      >

      <navigator
        :url="`/pages/member/detail?ids=${item.user_id}&type=member`"
        v-for="(item, index) in memberList"
        :key="index"
        class="keynote_con"
      >
        <view class="keynote_content">
          <view>
            <view class="title"> {{ item.nickname }} </view>
            <view class="job"> {{ item.company }} | {{ item.job }}</view>
          </view>
          <image class="images" :src="item.avatar" mode="aspectFill"></image>
        </view>
        <view class="remark">
          {{ item.remark }}
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
      memberList: [],
      memberTypeList: [],
      page: 1,
      keyword: "",
      membertype: "",
      last_page: ""
    };
  },
  onLoad() {
    this.getBanner();
    this.search();
    this.getMemberTypeList();
  },
  onReachBottom() {
    if (this.page < this.last_page) {
      this.page++;
      this.search();
    }
  },
  methods: {
    select(item) {
      this.page = 1;
      this.membertype = item.value;
      this.memberList = [];
      this.search();
    },
    handleChange(e) {
      this.keyword = e;
      this.page = 1;
      this.memberList = [];
      this.search();
    },
    async search() {
      const params = {
        keyword: this.keyword,
        membertype: this.membertype,
        page: this.page
      };
      const res = await this.$api.getMemberList(params);
      this.last_page = res[0].last_page;
      this.memberList = [...this.memberList, ...res[0].data];
    },
    async getBanner() {
      const res = await this.$api.getBanner();
      this.bannerList = res.banner;
    },
    async getMemberTypeList() {
      const res = await this.$api.getMemberTypeList();
      this.memberTypeList = Object.entries(res.membertype).map((item) => ({
        label: item[1],
        value: item[0]
      }));
    }
    // async getMemberList() {
    //   const res = await this.$api.getMemberList();
    //   this.memberList = res;
    // }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  background: #f8f8f8;
  // display: flex;
  // flex-direction: column;
  .search {
    background-color: #fff;
    padding: 10rpx 0 20rpx;
    .search-input {
      width: 660rpx;
      margin: 20rpx auto;
      border-radius: 30rpx;
    }
    .list-item {
      padding: 10rpx 26rpx;
      background-color: #e9e9e9;
      color: #999999;
      text-align: center;
      border-radius: 28rpx;
      margin: 16rpx 0 16rpx 16rpx;
      font-size: 24rpx;
    }
  }
  .menu-area {
    // flex:1;
    width: 700rpx;
    margin: 50upx auto 50upx;
    padding: 20rpx 0;
    .keynote_con {
      width: 100%;
      padding: 26upx 24upx 24upx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 30rpx auto;

      border-radius: 24rpx;

      .keynote_content {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        margin-bottom: 26upx;
        padding: 10rpx 0;
        border-bottom: 2rpx solid #eeeeee;
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
          margin: 28rpx 0;
        }
      }
      .remark {
        font-size: 24rpx;
        color: #999999;
        line-height: 38rpx;
      }
    }

    .gray {
      background-color: #d9d9d9;
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
