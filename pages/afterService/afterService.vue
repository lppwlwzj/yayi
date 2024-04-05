<template>
  <view class="content">
    <view class="rfb">
      <u-icon size="30" name="../../static/images/ECO-UI-03.png"></u-icon>

      <u-icon size="40" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>

    <view class="fc" style="margin: 18rpx 0; font-size: 40rpx">
      客户完工档案
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          :disabled="true"
          placeholder="客户姓名"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.customer"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
        ></u--input>
      </view>
      <view class="input">
        <u-button
          @click="show = true"
          class="rfa date-btn"
          :disabled="true"
          :style="{
            color: form.dateTime ? '#000' : '#dd524d63'
          }"
        >
          <view>
            {{ `${form.dateTime || "日期"}` }}
          </view>
        </u-button>
        <!-- <u-datetime-picker
          :show="show"
          mode="date"
          closeOnClickOverlay
          @close="show = false"
          @confirm="confirm"
        ></u-datetime-picker> -->
      </view>
    </view>
    <view class="diagnose">
      <view class="diagnose-el">
        <view class="rfsw image-list">
          <view
            style="margin-right: 8rpx"
            v-for="(item, index) in imgList"
            :key="index"
            class="image"
          >
            <view class="image fc">
              <image :src="item" class="upload-img" mode="scaleToFill"></image>
              <image
                @tap.stop="preview(item)"
                src="../../static/images/preview.png"
                class="preview"
                mode="aspectFill"
              ></image>
              <u-icon
                @click="deleteImg(index)"
                class="image-close"
                size="16"
                color="#fff"
                name="close-circle"
              ></u-icon>
            </view>
          </view>
          <Upload
            :name="`service${imgList.length + 1}`"
            customClass="image"
            @change="
              (value) => {
                handleImage(value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
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
          :disabled="true"
          :value="form[item.key]"
          border="none"
          :customStyle="{
            padding: '18rpx 12rpx'
          }"
        ></u--input>
      </view>
    </view>
    <view class="fc" style="margin: 18rpx 0; font-size: 40rpx"> 售后服务 </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse style="width: 100%">
        <u-collapse-item
          ref="tryCollapse"
          title="试戴次数"
          name="Docs guide"
          :border="false"
        >
          <view v-for="(item, idx) in tryInfo" :key="idx" class="img-list">
            <view class="rfc" style="align-items: flex-start">
              <view class="rfsw" style="width: 55%">
                <view
                  v-for="(img_url, index) in item.tryImg"
                  :key="index + idx"
                >
                  <view class="upload-img-el fc">
                    <image :src="img_url" mode="aspectFill" class="upload-img">
                    </image>
                    <image
                      @tap.stop="preview(img_url)"
                      src="../../static/images/preview.png"
                      class="preview"
                      mode="aspectFill"
                    ></image>
                    <u-icon
                      @click="handleDelTryImg(idx, index)"
                      class="image-close"
                      size="16"
                      color="#fff"
                      name="close-circle"
                    ></u-icon>
                  </view>
                </view>
                <Upload
                  :name="`try${item.tryImg.length + 1}`"
                  customClass="upload-img"
                  @change="
                    (value) => {
                      handleTryImage(value, idx);
                    }
                  "
                >
                  <view class="upload-img-el rfc">
                    <image
                      src="../../static/images/upload.png"
                      mode="aspectFill"
                      class="upload-img"
                    >
                    </image>
                    <image
                      src="../../static/images/add.png"
                      mode="aspectFill"
                      class="upload-add"
                      style="width: 30px; height: 30px"
                    ></image>
                  </view>
                </Upload>
              </view>
              <view class="diagnose-text">
                <u--textarea
                  v-model="item.remark"
                  border="none"
                  placeholder="请输入内容"
                ></u--textarea>
              </view>
            </view>
          </view>
          <view class="btn afc" @tap.stop="handleAddTry"> 添加一条 </view>
        </u-collapse-item>
      </u-collapse>
    </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse style="width: 100%">
        <u-collapse-item title="修复次数" name="Docs guide">
          <view v-for="(item, idx) in recoverInfo" :key="idx" class="img-list">
            <view class="rfc" style="align-items: flex-start">
              <view class="rfsw" style="width: 55%">
                <view
                  v-for="(img_url, index) in item.recoverImg"
                  :key="index + idx"
                >
                  <view class="upload-img-el fc">
                    <image :src="img_url" mode="aspectFill" class="upload-img">
                    </image>
                    <image
                      @tap.stop="preview(img_url)"
                      src="../../static/images/preview.png"
                      class="preview"
                      mode="aspectFill"
                    ></image>
                    <u-icon
                      @click="handleDelRecoverImg(idx, index)"
                      class="image-close"
                      size="16"
                      color="#fff"
                      name="close-circle"
                    ></u-icon>
                  </view>
                </view>
                <Upload
                  :name="`try${item.recoverImg.length + 1}`"
                  customClass="upload-img"
                  @change="
                    (value) => {
                      handleAddRecover(value, idx);
                    }
                  "
                >
                  <view class="upload-img-el rfc">
                    <image
                      src="../../static/images/upload.png"
                      mode="aspectFill"
                      class="upload-img"
                    >
                    </image>
                    <image
                      src="../../static/images/add.png"
                      mode="aspectFill"
                      class="upload-add"
                      style="width: 30px; height: 30px"
                    ></image>
                  </view>
                </Upload>
              </view>
              <view class="diagnose-text">
                <u--textarea
                  v-model="item.remark"
                  border="none"
                  placeholder="请输入内容"
                ></u--textarea>
              </view>
            </view>
          </view>
          <view class="btn afc" @tap.stop="handleRecoverTry"> 添加一条 </view>
        </u-collapse-item>
      </u-collapse>
      <view class="btn afc" @tap.stop="submit"> 确认 </view>
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
          mode="aspectFill"
        ></image>
        <video
          :src="previewImg"
          v-if="previewImg.indexOf('video') > -1"
          style="width: 100%; height: 200rpx"
        ></video>
      </view>
    </u-popup>
    <!-- <view class="btn afc"> 确认 </view> -->
    <view class="footer rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-22.png"></u-icon>
      <u-icon size="26" name="../../static/images/ECO-UI-05.png"></u-icon>
    </view>
  </view>
</template>

<script>
import Upload from "../../components/my-upload/my-upload.vue";

export default {
  data() {
    return {
      previewImg: "",
      popupShow: false,
      form: {},
      imgList: [],
      infoList: [
        {
          key: "porcelain"
        },
        {
          key: "daiyaTime"
        },
        {
          key: "doctor"
        },
        {
          key: "proxy"
        },
        {
          key: "CAD"
        },
        {
          key: "checi"
        }
      ],
      tryInfo: [
        {
          tryImg: [],
          remark: ""
        },
        {
          tryImg: [],
          remark: ""
        }
      ],
      recoverInfo: [
        {
          recoverImg: [],
          remark: ""
        },
        {
          recoverImg: [],
          remark: ""
        }
      ]
    };
  },
  components: {
    Upload
  },
  onLoad: function (option) {
    if (option.id) {
      this.customer_id = option.id;
      // this.operateType = option.type;
      this.getCustomerDetailById(option.id);
    }
  },
  computed: {},

  methods: {
    submit() {
         
    },
    handleTryImage(img_url, idx) {
      this.tryInfo[idx].tryImg.push(img_url);
    },
    handleDelTryImg(idx, index) {
      this.tryInfo[idx].tryImg.splice(index, 1);
    },
    handleAddTry() {
      this.tryInfo.push({
        tryImg: [],
        remark: ""
      });
    },
    handleAddRecover(img_url, idx) {
      this.recoverInfo[idx].recoverImg.push(img_url);
    },
    handleDelTryImg(idx, index) {
      this.recoverInfo[idx].recoverImg.splice(index, 1);
    },
    handleRecoverTry() {
      this.recoverInfo.push({
        recoverImg: [],
        remark: ""
      });
    },

    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.popupShow = false;
    },
    handleImage(value) {
      this.imgList.push(value);
    },
    deleteImg(index) {
      this.imgList.splice(index);
    },
    async getCustomerDetailById(id) {
      const res = await this.$api.getCustomerDetailById({
        id
      });
      if (!res.code) {
        this.form = res.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}
.image-close {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
}
.u-input--square {
  border-radius: 40rpx;
}
.uni-input-wrapper {
  padding: 0 16rpx;
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
  .preview {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
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
    margin: 10rpx;
  }
  .upload-add {
    position: absolute;
    left: 44rpx;
    top: 44rpx;
  }
  .upload-img {
    // position: absolute;
    width: 100%;
    height: 100%;
    // left: 0;
    // right: 0;
    // top: 0;
    // bottom: 0;
  }
  .preview {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
  }

  .image-list {
    width: 100%;
  }

  .image {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    background: #898787a3;
    border-radius: 16rpx;
    // margin: 20rpx 0rpx;
    background: url("../../static/images/upload.png") center no-repeat;
    background-size: 100% 100%;
  }
  // image2{
  //   position: relative;
  //   width: 200rpx;
  //   height: 200rpx;
  //   background: #898787a3;
  //   border-radius: 16rpx;
  //   margin: 20rpx 0rpx;
  // }

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
.img-list {
  margin: 16rpx 0;
  border-bottom: 1px solid #cccccc6b;
  padding-bottom: 16rpx;
}
.diagnose-text {
  margin: 0 12rpx;
  flex: 1;
  background-color: #fff;
  min-height: 320rpx;
  border-radius: 40rpx;
}
/deep/.u-line {
  border: none !important;
}
/deep/.u-collapse-item__content {
  height: auto !important;
}
</style>
