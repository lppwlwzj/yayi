<template>
  <view>
    <u-upload
      :accept="accept"
      :fileList="data"
      :disabled="disabled"
      :previewFullImage="true"
      @afterRead="afterRead"
      :name="name"
      :multiple="multiple"
      :maxCount="maxCount"
      :width="width"
      :height="height"
      :previewImage="true"
    >
      <view :class="[customClass, 'upload-bg']">
        <slot v-if="!img_url" />
        <view :class="[customClass, 'fc']" v-else>
          <image :src="previewUrl" mode="aspectFill" class="upload-img"></image>
          <image
            @tap.stop="preview(img_url)"
            :src="require('../../../static//images/preview.png')"
            class="preview"
            mode="aspectFill"
          ></image>
        </view>
      </view>
    </u-upload>
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
        <video :src="img_url" v-if="img_url.indexOf('mp4') > -1"></video>
        <image :src="img_url" v-else mode="widthFix"></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: "my-upload",
  props: {
    disabled: {
      //是否多选
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "80rpx"
    },
    height: {
      type: String,
      default: "80rpx"
    },
    fileList: {
      //显示已上传的文件列表
      type: Array,
      default: () => []
    },
    multiple: {
      //是否多选
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "all"
    },
    maxCount: {
      //最大上传数量
      type: Number,
      default: 1
    },
    name: {
      //名称
      type: String,
      default: "1"
    },
    id: {
      //名称
      type: String,
      default: ""
    },
    img_url: {
      //名称
      type: String,
      default: ""
    },

    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: [],

      popupShow: false
    };
  },
  watch: {
    fileList: {
      deep: true,
      handler(newVal, oldVal) {
        this.data = newVal;
      }
    }
  },
  computed: {
    previewUrl() {
      return this.img_url.indexOf("mp4") > -1
        ? require("../../../static/images/video.png")
        : this.img_url;
    }
  },
  methods: {
    preview() {
      this.popupShow = true;
    },
    popupClose() {
      this.popupShow = false;
    },
    // beforeRead() {
    //   //  if(disabled)
    //   return false;

    // },
    // 删除图片
    handleDelTryImg(event) {
      this.data.splice(event.index, 1);
      this.$emit("delete", this.data);
    },
    // 新增图片
    async afterRead(event) {
      const userInfo = uni.getStorageSync("userInfo"); //设置缓存
      uni.uploadFile({
        url: "http://150.158.39.155:3010/api/upload", 
        filePath: event.file.url, //文件路径
        name: "file",
        header: {
          Authorization: userInfo.token
        },
        formData: {
          id: this.id,
          name: event.name,
          file: event.file
        },
        success: (res) => {
          if (res?.statusCode == 401) {
            uni.clearStorageSync("userInfo");
            uni.redirectTo({
              url: "/pages/login/login"
            });
          } else if (res?.statusCode == 200) {
            const data = JSON.parse(res.data);
            if (!data.code) {
              this.$emit("change", data.re.img_url);
            } else {
              uni.showToast({
                icon: "none",
                title: res.message
              });
            }
          }
        },
        fail: (err) => {
          console.log("🚀 ~ afterRead ~ err:", err);
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>
.default-bg {
  position: relative;

  background: #000;
}
.upload-img-el {
  position: relative;
  width: 180rpx;
  height: 180rpx;
}
.image {
  width: 120rpx;
  height: 120rpx;
  background: #898787a3;
  border-radius: 16rpx;
  // margin: 20rpx 0rpx;
  position: relative;
}
.image-2 {
  width: 160rpx;
  height: 160rpx;

  background: #898787a3;
  border-radius: 16rpx;
  margin: 20rpx 0rpx;
}
.upload-bg {
  width: 100%;
  height: 100%;
  position: relative;
}
.preview {
  width: 14px;
  height: 14px;
  position: absolute;
  left: 10rpx;
  bottom: 10rpx;
}
.image-close {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 8rpx;
  right: 8rpx;
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

</style>
