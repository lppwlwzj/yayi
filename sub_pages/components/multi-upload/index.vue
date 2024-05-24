<template>
  <view>
    <view class="rfsw">
      <view v-for="(item, index) in list" :key="index">
        <view
          :class="[`image, ${customClass} , fc`]"
          v-if="item"
          style="margin-right: 12rpx; margin-top: 8rpx; margin-bottom: 8rpx"
        >
          <image
            :src="getImg(item)"
            mode="aspectFill"
            class="upload-img"
            :show-menu-by-longpress="true"
          ></image>
          <image
            @tap.stop="preview(item)"
            :src="require('../../../static//images/preview.png')"
            class="preview"
            mode="aspectFill"
          ></image>
          <image
            v-if="!disabled"
            @click="handleDeleteImg(index)"
            :src="require('../../../static//images/close.png')"
            mode="aspectFill"
            class="image-close"
          ></image>
        </view>
      </view>
      <Upload
        v-if="!disabled"
        :name="`${activeKey}${list.length + 1}`"
        customClass="image"
        :id="`${userInfo.usercount}`"
        @change="
          (value) => {
            handleChangeImage(value);
          }
        "
      >
        <view :class="[`image, ${customClass} , fc`]">
          <image
            :src="require('../../../static//images/preview.png')"
            mode="aspectFill"
            style="width: 16px; height: 16px; margin-top: 8px; z-index: 9999"
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
      closeIconPos="top-left"
      bgColor="#000000"
    >
      <view class="fc  img_wrapper">
        <video :src="previewImg" v-if="previewImg.indexOf('mp4') > -1"></video>
        <!-- <image :src="previewImg" v-else mode="widthFix"></image> -->
        <TouchScaleImg :img_url="previewImg" v-else/>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Upload from "../my-upload/my-upload.vue";
import TouchScaleImg from "../touchScaleImg/index.vue";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    activeKey: {
      type: String,
      default: ""
    },
    customClass: {
      type: String,
      default: "image"
    }
  },
  components: {
    Upload,
    TouchScaleImg
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
    getImg(url) {
      return url?.indexOf("mp4") > -1
        ? require("../../../static/images/video.png")
        : url;
    },
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.popupShow = false;
    },

    handleChangeImage(value) {
      this.$emit("add", value);
    },
    handleDeleteImg(index) {
      this.$emit("delete", index);
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
  position: relative;
}

.image-close {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 8rpx;
  right: 8rpx;
}

.custom-upload-img {
  width: 150rpx;
  height: 150rpx;
  position: relative;
  background: #898787a3;
  border-radius: 16rpx;
  // margin: 20rpx 0rpx;
  position: relative;
}
.preview {
  width:  28px;
  height: 28px;
  position: absolute;
  left: 10rpx;
  bottom: 10rpx;
}
.img_wrapper {
  // width: 100vw;
  // margin-top: 6vh;

    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.img-block {
  width: 100vw;
  height: 320px;
}
/deep/ .u-popup__content__close--top-left {
  top: 75px !important;
  left: 28px !important;
}
</style>
