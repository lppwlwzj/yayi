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
      <view :class="['upload-bg']">
        <slot v-if="!img_url" />
        <view :class="[customClass, 'fc']" v-else>
          <image
            :src="img_url"
            mode="aspectFill"
            v-if="img_url.indexOf('image') > -1"
            class="upload-img"
          ></image>
          <video
            :src="img_url"
            v-if="img_url.indexOf('mp4') > -1"
            class="upload-img"
          ></video>

          <image
            @tap.stop="preview(img_url)"
            src="../../static//images/preview.png"
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
        <image
          :src="img_url"
          v-if="img_url.indexOf('image') > -1"
          mode="widthFix"
        ></image>
        <video
          :src="img_url"
          v-if="img_url.indexOf('video') > -1"
          style="width: 100%; height: 200rpx"
        ></video>
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
      default: "image,video"
    },
    maxCount: {
      //最大上传数量
      type: Number,
      default: 10
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
    // deletePic(event) {
    //   this.data.splice(event.index, 1);
    //   this.$emit("deleteCall", this.data);
    // },
    // 新增图片
    async afterRead(event) {
      const userInfo = uni.getStorageSync("userInfo"); //设置缓存

      uni.uploadFile({
        url: "http://127.0.0.1:3006/api/upload", //文件服务器地址
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

      //uniapp使用uni.request传递formData格式时报错：“errMsg: "request:fail parameter data. Expected Object, String, Array, ArrayBuffer, got FormData
      //是因为uni.request 不支持formData类型的数据
      // let formData = new FormData();
      // formData.append("file", event.file);
      // formData.append("id", userInfo.usercount);
      // formData.append("name", event.name);
      //  this.$api
      //   .uploadImg(formData)
      //   .then((res) => {
      //     if(res.code) {
      //       uni.showToast({
      //         title: res.message,
      //         icon: 'none'
      //       });
      //       return;
      //     }
      //     // result = res.data;
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //   });

      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      // let lists = [].concat(event.file);
      // let fileListLen = this.data.length;
      // lists.map((item) => {
      //   this.data.push({
      //     ...item,
      //     status: "uploading",
      //     message: "上传中"
      //   });
      // });
      // for (let i = 0; i < lists.length; i++) {
      //   let result = "";
      //   await this.$api
      //     .uploadImg(lists[i].url)
      //     .then((res) => {
      //       result = res.data;
      //     })
      //     .catch((res) => {
      //       console.log(res);
      //     });
      //   this.$emit("successCall", result);
      //   let item = this.data[fileListLen];
      //   this.data.splice(
      //     fileListLen,
      //     1,
      //     Object.assign(item, {
      //       status: "success",
      //       message: "",
      //       url: result
      //     })
      //   );
      //   fileListLen++;
      // }
    }
    // // 新增图片
    // async afterRead(event) {
    //   // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
    //   let lists = [].concat(event.file);
    //   let fileListLen = this.data.length;
    //   lists.map((item) => {
    //     this.data.push({
    //       ...item,
    //       status: "uploading",
    //       message: "上传中"
    //     });
    //   });
    //   for (let i = 0; i < lists.length; i++) {
    //     let result = "";
    //     await this.$api
    //       .uploadImg(lists[i].url)
    //       .then((res) => {
    //         result = res.data;
    //       })
    //       .catch((res) => {
    //         console.log(res);
    //       });
    //     this.$emit("successCall", result);
    //     let item = this.data[fileListLen];
    //     this.data.splice(
    //       fileListLen,
    //       1,
    //       Object.assign(item, {
    //         status: "success",
    //         message: "",
    //         url: result
    //       })
    //     );
    //     fileListLen++;
    //   }
    // }
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
.image-2 {
  width: 160rpx;
  height: 160rpx;
  // width: 100%;
  // height: 100%;
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
  right: 10rpx;
  bottom: 10rpx;
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
