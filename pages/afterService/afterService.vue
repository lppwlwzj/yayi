<template>
  <view class="content">
    <view class="rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>

      <u-icon size="26" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>

    <view class="fc" style="margin: 18rpx 0; font-size: 40rpx">
      客户完工档案
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="客户姓名"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.user"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="日期"
          disabledColor="#fff"
          v-model="form.user"
          border="none"
        ></u--input>
      </view>
    </view>
    <view class="diagnose">
      <view class="diagnose-el">
        <view class="rfaw image-list">
          <Upload v-for="(item, index) in imgList" :key="index">
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 20px; height: 20px"
              ></image>
            </view>
          </Upload>
        </view>
      </view>
    </view>

    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input" v-for="(item, index) in infoList" :key="index">
        <u--input
          disabledColor="#fff"
          v-model="form.user"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
        ></u--input>
      </view>
    </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse @change="change" @close="close" @open="open">
        <u-collapse-item title="文档指南" name="Docs guide">
          <text class="u-collapse-content"
            >涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text
          >
        </u-collapse-item>
      </u-collapse>
    </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse @change="change" @close="close" @open="open">
        <u-collapse-item title="文档指南" name="Docs guide">
          <text class="u-collapse-content"
            >涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text
          >
        </u-collapse-item>
      </u-collapse>
    </view>

    <view class="btn afc"> 确认 </view>
    <view class="footer rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>
      <u-icon size="26" name="../../static/images/ECO-UI-09.png"></u-icon>
    </view>
  </view>
</template>

<script>
import TiXing from "../../components/tixing";
import Upload from "../../components/my-upload/my-upload.vue";

export default {
  data() {
    return {
      active: "online",
      online_page: 1,
      offline_page: 1,
      online_last_page: 1,
      offline_last_page: 1,
      onlineList: [],
      offlineList: [],
      form: {},
      imgList: new Array(6),
      infoList: new Array(6),
      list: [
        {
          id: 1,
          text: "边缘",
          value: 0,
          open: false,
          url: "../../static/images/1.png"
        },
        {
          id: 2,
          text: "角度方圆",
          value: 0,
          open: false,
          url: "../../static/images/2.png"
        },

        {
          id: 3,
          text: "1号2号落差",
          value: 0,
          open: false,
          url: "../../static/images/3.png"
        },
        {
          id: 4,
          text: "窄细角度",
          value: 0,
          open: false,
          url: "../../static/images/4.png"
        },
        {
          id: 5,
          text: "尖or钝",
          value: 0,
          open: false,
          url: "../../static/images/5.png"
        },
        {
          id: 6,
          text: "2号远中切端上扬幅度",
          value: 0,
          open: false,
          url: "../../static/images/6.png"
        },
        {
          id: 7,
          text: "纹理",
          value: 0,
          open: false,
          url: "../../static/images/7.png"
        },
        {
          id: 8,
          text: "颈部光点",
          value: 0,
          open: false,
          url: "../../static/images/8.png"
        },
        {
          id: 9,
          text: "透亮",
          value: 0,
          open: false,
          url: "../../static/images/9.png"
        },
        {
          id: 10,
          text: "切端渐变层",
          value: 0,
          open: false,
          url: "../../static/images/10.jpg"
        }
      ]
    };
  },
  components: {
    TiXing,
    Upload
  },
  onLoad() {
    // this.getOnlineActiveList();
    // this.getOfflineActiveList();
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
      this.onlineList = [...this.onlineList, ...res.data];
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}
.footer {
  width: 100%;
  background: #fff;
}
.content {
  width: 100%;
  box-sizing: border-box;
  background-color: $uni-color-bg;
  padding: 0 30rpx;
  padding-bottom: 160rpx;
  .input {
    width: 45% !important;
    box-shadow: 2px 2px 5px #33333340;
    margin: 12rpx 0;
    border-radius: 40rpx;
    background-color: #fff;
  }
  .diagnose {
    margin: 20rpx 0;
    font-size: 14px;
    color: #dd524d63;
    &-el {
      width: 100%;
      border-radius: 40rpx;
      padding: 26rpx;
      box-sizing: border-box;
      box-shadow: 2px 2px 5px #33333340;
    }
  }
  .diagnose-text {
    margin: 0 12rpx;
    width: 70%;
    background-color: #fff;
    height: 200rpx;
    border-radius: 40rpx;
  }
  .upload-bg {
    flex: 1;
    margin: 12rpx;
    flex-wrap: nowrap;
  }
  .upload-img-el {
    position: relative;
    width: 180rpx;
    height: 180rpx;
  }

  .upload-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .image-list {
    width: 100%;
  }
  .image {
    width: 200rpx;
    height: 200rpx;
    background: #898787a3;
    border-radius: 16rpx;
    margin: 20rpx 0rpx;
    background: url("../../static/images/upload.png") center no-repeat;
    background-size: 100% 100%;
  }
  .image-2 {
    width: 160rpx;
    height: 160rpx;
    background: #898787a3;
    border-radius: 16rpx;
    margin: 20rpx 0rpx;
  }
  .u-page__slide-item {
    flex: 1;
    margin-top: 30rpx;
    .text {
      text-align: center;
      color: #33333340;
    }
  }
  /deep/.uni-slider-handle-wrapper {
    background-color: #fff !important;
  }
  /deep/.u-radio-group {
    width: 80rpx !important;
    margin-right: 16rpx;
    flex: 0;
  }
  .btn {
    margin-top: 50rpx;
    width: 100%;
    background-color: #dd524d63;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 40rpx;
    color: #fff;
    font-size: 16px;
  }
  uni-view.u-collapse-item {
    border-radius: 30rpx;
    background-color: #fff;
  }
}
</style>
