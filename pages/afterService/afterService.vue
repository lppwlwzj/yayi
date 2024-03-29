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
              >
              </image>
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
        <u-collapse-item title="试戴次数" name="Docs guide" border="false">
          <view v-for="(item, idx) in tryInfo" :key="idx">
            <view class="rfc">
              <view class="rfaw">
                <Upload v-for="(_, index) in item.tryImg" :key="index + idx">
                  <view class="upload-img-el fc">
                    <image
                      src="../../static//images/upload.png"
                      mode="widthFix"
                      class="upload-img"
                    >
                    </image>
                    <image
                      src="../../static//images/add.png"
                      mode="widthFix"
                      style="width: 30px; height: 30px"
                    ></image>
                  </view>
                </Upload>
              </view>
              <view class="diagnose-text"> </view>
            </view>
          </view>
        </u-collapse-item>
      </u-collapse>
    </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse @change="change" @close="close" @open="open">
        <u-collapse-item title="修复次数" name="Docs guide">
          <view v-for="(item, idx) in recoverInfo" :key="idx">
            <view class="rfc">
              <view class="rfaw">
                <Upload v-for="(_, index) in item.recoverImg" :key="index + idx">
                  <view class="upload-img-el fc">
                    <image
                      src="../../static//images/upload.png"
                      mode="widthFix"
                      class="upload-img"
                    >
                    </image>
                    <image
                      src="../../static//images/add.png"
                      mode="widthFix"
                      style="width: 30px; height: 30px"
                    ></image>
                  </view>
                </Upload>
              </view>
              <view class="diagnose-text"> </view>
            </view>
          </view>
        </u-collapse-item>
      </u-collapse>
    </view>

    <!-- <view class="btn afc"> 确认 </view> -->
    <view class="footer rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-22.png"></u-icon>
      <u-icon size="26" name="../../static/images/ECO-UI-05.png"></u-icon>
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
      tryInfo: [
        {
          tryImg: new Array(4),
          remark: ""
        },
        {
          tryImg: new Array(4),
          remark: ""
        }
      ],
      recoverInfo: [
        {
          recoverImg: new Array(4),
          remark: ""
        },
        {
          recoverImg: new Array(4),
          remark: ""
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
  padding: 50rpx 30rpx 0;
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

  .upload-bg {
    flex: 1;
    margin: 12rpx;
    flex-wrap: nowrap;
  }

  .upload-img-el {
    position: relative;
    width: 140rpx;
    height: 140rpx;
    margin: 16rpx 0;
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

  /deep/uni-view.u-cell__body {
    border-radius: 30rpx;
    background-color: #fff;
  }
}
.diagnose-text {
  margin: 0 12rpx;
  width: 480rpx;
  background-color: #fff;
  height: 320rpx;
  border-radius: 40rpx;
}
</style>
