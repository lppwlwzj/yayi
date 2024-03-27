<template>
  <view class="content">
    <view class="rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>

      <u-icon size="26" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="客户姓名"
          disabledColor="#fff"
          :placeholderStyle="{
            color: '#dd524d63'
          }"
          v-model="form.user"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
          :placeholderStyle="{
            color: '#dd524d63'
          }"
          placeholder="日期"
          disabledColor="#fff"
          v-model="form.user"
          border="none"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          placeholder="面诊医生"
          disabledColor="#fff"
          v-model="form.user"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          :placeholderStyle="{
            color: '#dd524d63'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          placeholder=""
          disabledColor="#fff"
          v-model="form.user"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
          :placeholderStyle="{
            color: '#dd524d63'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <view class="diagnose">
      <ti-xing>
        <view class="rfc" style="padding-top: 18rpx">
          <u-icon size="16" name="../../static/images/ECO-UI-07.png"></u-icon>
          <text style="padding-left: 10rpx">面诊</text>
        </view>
      </ti-xing>
      <view class="diagnose-el">
        <view class="rfc">
          <Upload style="flex: 1">
            <view class="upload-img-el fc">
              <image
                src="../../static//images/upload.png"
                mode="widthFix"
                class="upload-img"
              ></image>
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 30px; height: 30px; margin-bottom: 8px"
              ></image>
              <text style="color: #fff; font-size: 12px; z-index: 9999"
                >客户微笑正脸照</text
              >
            </view>
          </Upload>
          <view class="diagnose-text"> </view>
        </view>
        <view class="rfa image-list">
          <Upload>
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">左45度</text>
            </view>
          </Upload>
          <Upload>
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">右45度</text>
            </view>
          </Upload>
          <Upload>
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">右45度</text>
            </view>
          </Upload>
          <Upload>
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">右45度</text>
            </view>
          </Upload>
          <Upload>
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="widthFix"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">右45度</text>
            </view>
          </Upload>
        </view>
      </view>
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
      form: {}
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
  background-color: #f4f5f6;
}

.content {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #cccccc59;
  padding: 0 30rpx;
  .input {
    width: 45% !important;
    box-shadow: 2px 2px 5px #33333340;
    margin: 12rpx 0;
    border-radius: 40rpx;
  }
  .diagnose {
    margin: 12rpx 0;
    font-size: 14px;
    color: #dd524d63;
    &-el {
      width: 100%;
      border-radius: 40rpx;
      padding: 26rpx;
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
    width: 110rpx;
    height: 110rpx;
    background: #898787c4;
    border-radius: 16rpx;
    margin: 20rpx 0rpx;
  }
}
</style>
