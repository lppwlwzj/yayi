<template>
  <view class="content">
    <view class="menu-area">
      <view
        v-for="(item, index) in followList"
        :key="index"
        class="keynote_con"
      >
        <navigator
          :url="`/pages/member/detail?ids=${item.user_id}&type=contact`"
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      followList: [],
      page: 1,
      last_page: ""
    };
  },
  onLoad() {
    this.getFollowList();
  },
  onReachBottom() {
    if (this.page < this.last_page) {
      this.page++;
      this.getFollowList();
    }
  },
  methods: {
    async getFollowList() {
      const res = await this.$api.getFollowList({
        page:this.page
      });
      this.followList = [...this.followList, ...res[0].data];
      this.last_page = res[0].last_page;
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
  overflow: hidden;
  .menu-area {
    overflow: auto;
    width: 700rpx;
    margin: 0upx auto 0;
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
        justify-content: space-between;
        margin-bottom: 26upx;
        border-bottom: 2rpx solid #eeeeee;
        padding: 10rpx 0;
        .images {
          width: 110rpx;
          height: 110rpx;
          margin-left: 20upx;
        }

        .title {
          font-size: 40rpx;
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
    .btn {
      width: 166rpx;
      height: 62rpx;
      font-size: 24rpx;
      color: #ffffff;
      line-height: 62rpx;
      border-radius: 30upx;
      text-align: center;
      margin-top: 10upx;
      margin-left: 75%;
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
