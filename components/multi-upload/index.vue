<template>
  <view>
    <view class="rfsw">
      <view
        style="margin-right: 8rpx"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="image fc" v-show="item">
          <image :src="item" mode="aspectFill" class="upload-img"></image>
          <image
            @tap.stop="preview(item)"
            src="../../static/images/preview.png"
            class="preview"
            mode="aspectFill"
          ></image>
          <u-icon
            @click="handleDeleteImg(index)"
            class="image-close"
            size="16"
            color="#fff"
            name="close-circle"
          ></u-icon>
        </view>
      </view>
      <Upload
        :name="`${activeKey}${list.length + 1}`"
        customClass="image"
        :id="`${userInfo.usercount}`"
        @change="
          (value) => {
            handleChangeImage(value);
          }
        "
      >
        <view class="image fc">
          <image
            src="../../static/images/add.png"
            mode="aspectFill"
            style="width: 16px; height: 16px; margin-bottom: 4px"
          ></image>
          <text style="color: #fff; font-size: 12px">点击上传</text>
        </view>
      </Upload>
    </view>
    <u-popup
      :show="popupShow"
      closeable
      mode="center"
      @close="popupClose"
      :overlayStyle="{
        background: '#000000d6'
      }"
    >
      <view class="fc">
        <image
          :src="previewImg"
          v-if="previewImg.indexOf('image') > -1"
          mode="widthFix"
        ></image>
        <video
          :src="previewImg"
          v-if="previewImg.indexOf('video') > -1"
          style="width: 100%; height: 200rpx"
        ></video>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Upload from "../my-upload/my-upload.vue";
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeKey: {
      type: String,
      default: ""
    }
  },
  components: {
    Upload
  },
  data() {
    return {
      userInfo: {},
      previewImg: "",
      popupShow: false
    };
  },
  created() {
    this.userInfo = uni.getStorageSync("userInfo");
  },

  methods: {
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.popupShow = false;
    },

    handleChangeImage(value) {
      this.list.push(value);
    },
    handleDeleteImg(index) {
      this.$api.deleteImg({
        img_url: this.list[index]
      });
      this.list[index] = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.image-close {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
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
.image {
  width: 130rpx;
  height: 130rpx;
  background: #898787a3;
  border-radius: 16rpx;
  margin: 20rpx 8rpx;
  position: relative;
}
.preview {
  width: 14px;
  height: 14px;
  position: absolute;
  left: 10rpx;
  bottom: 10rpx;
}
</style>
