<template>
  <!-- 有空了再优化上传图片 -->
  <view class="content" :style="{ paddingTop: statusBarHeight }">
    <view class="rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>

      <u-icon size="26" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="客户姓名"
          u
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.customer"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u-button
          @click="show = true"
          class="rfa date-btn"
          :style="{
            color: form.dateTime ? '#000' : '#dd524d63'
          }"
        >
          <view>
            {{ `${form.dateTime || "日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </u-button>
        <!-- <u--input
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="日期"
          disabledColor="#fff"
          disabled
          v-model="form.dateTime"
          border="none"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
          @click="show = true"
        ></u--input> -->
        <u-datetime-picker
          :show="show"
          mode="date"
          closeOnClickOverlay
          @close="close"
          @confirm="confirm"
        ></u-datetime-picker>
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
          placeholderStyle="color:#dd524d63"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          placeholder="代理人"
          disabledColor="#fff"
          v-model="form.proxy"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
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
          <Upload
            :img_url="form.diagnoseInfo.frontPhoto"
            name="frontPhoto"
            customClass="upload-img-el"
            @change="
              (value) => {
                handleImage('frontPhoto', value);
              }
            "
          >
            <view class="upload-img-el fc" v-if="!form.diagnoseInfo.frontPhoto">
              <image
                src="../../static//images/upload.png"
                mode="aspectFill"
                class="upload-img"
              ></image>
              <!-- TODO：待解决 -->
              <!-- <video object-fit="cover"id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
              @error="videoErrorCallback" enable-danmu danmu-btn controls></video> -->
              <!-- <video
                id="myVideo"
                :src="videoSrc"
                poster="视频封面图的URL"
                direction="90"
                object-fit="contain"
                binderror="videoErrorCallback"
              ></video> -->
              <!-- http://127.0.0.1:3006/img/images/adminfrontPhoto.9826ecf281e12929f07949f957ef40dc.mp4 -->
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 30px; height: 30px; margin-bottom: 8px"
              ></image>
              <text style="color: #fff; font-size: 12px; z-index: 9999"
                >客户正面微笑照</text
              >
            </view>
          </Upload>
          <view class="diagnose-text">
            <u--textarea
              v-model="form.diagnoseInfo.adviceContent"
              border="none"
              placeholder="请输入内容"
            ></u--textarea>
          </view>
        </view>
        <view class="rfa image-list">
          <!-- 左45度 -->
          <Upload
            name="leftFv"
            :img_url="form.diagnoseInfo.leftFv"
            customClass="image"
            @change="
              (value) => {
                handleImage('leftFv', value);
              }
            "
          >
            <view class="image fc" v-if="!form.diagnoseInfo.leftFv">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度</text>
            </view>
         
          </Upload>
          <!-- 右45度 -->
          <Upload
            name="rightFv"
            :img_url="form.diagnoseInfo.rightFv"
            customClass="image"
            @change="
              (value) => {
                handleImage('rightFv', value);
              }
            "
          >
            <view class="image fc" v-if="!form.diagnoseInfo.rightFv">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度</text>
            </view>
          
          </Upload>
          <!-- 正面扩口 -->
          <Upload
            name="front"
            :img_url="form.diagnoseInfo.front"
            customClass="image"
            @change="
              (value) => {
                handleImage('front', value);
              }
            "
          >
            <view class="image fc" v-if="!form.diagnoseInfo.front">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">正面扩口</text>
            </view>
          
          </Upload>
          <!-- 右45度扩口 -->
          <Upload
            name="leftFvEdge"
            :img_url="form.diagnoseInfo.leftFvEdge"
            customClass="image"
            @change="
              (value) => {
                handleImage('leftFvEdge', value);
              }
            "
          >
            <view class="image fc" v-if="!form.diagnoseInfo.leftFvEdge">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度扩口</text>
            </view>
          
          </Upload>
          <Upload
            name="rightFvEdge"
            :img_url="form.diagnoseInfo.rightFvEdge"
            customClass="image"
            @change="
              (value) => {
                handleImage('rightFvEdge', value);
              }
            "
          >
            <view class="image fc" v-if="!form.diagnoseInfo.rightFvEdge">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度扩口</text>
            </view>
           
          </Upload>
        </view>
      </view>
    </view>
    <view class="diagnose">
      <ti-xing
        width="100px"
        :style="{
          width: '180rpx',
          marginLeft: '410rpx'
        }"
      >
        <view class="rfc" style="padding-top: 18rpx">
          <u-icon size="16" name="../../static/images/ECO-UI-08.png"></u-icon>
          <text style="padding-left: 10rpx">设计师建议</text>
        </view>
      </ti-xing>
      <view class="diagnose-el">
        <view class="rfc">
          <Upload
            style="flex: 1"
            name="intentImg"
            :img_url="form.diagnoseInfo.intentImg"
            customClass="upload-img-el"
            @change="
              (value) => {
                handleDesignAdviceImage('intentImg', value);
              }
            "
          >
            <view class="upload-img-el fc" v-if="!form.designAdvice.intentImg">
              <image
                src="../../static//images/upload.png"
                mode="aspectFill"
                class="upload-img"
              ></image>
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 30px; height: 30px; margin-bottom: 8px"
              ></image>
              <text style="color: #fff; font-size: 12px; z-index: 9999"
                >客户意向照</text
              >
            </view>
         
          </Upload>
          <view class="diagnose-text">
            <u--textarea
              v-model="form.designAdvice.content"
              border="none"
              placeholder="请输入内容"
            ></u--textarea>
          </view>
        </view>
        <view class="rfsw image-list">
          <view
            style="margin-right: 8rpx"
            v-for="(item, index) in designList"
            :key="index"
          >
            <view class="image fc">
              <image :src="item" mode="aspectFill" class="upload-img"></image>
              <image
                @tap.stop="preview(item)"
                src="../../static//images/preview.png"
                class="preview"
                mode="aspectFill"
              ></image>
            </view>
          </view>
          <Upload
            :name="`design${designList.length + 1}`"
            customClass="image"
            @change="
              (value) => {
                handleDesignImage(value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static//images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 12px">点击上传</text>
            </view>
          </Upload>
        </view>
      </view>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="瓷品"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.porcelain"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="贴片颜色"
          disabledColor="#fff"
          v-model="form.tiepianColor"
          border="none"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <!-- 进度条 -->
    <view style="margin: 18rpx 0">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="rfc" style="margin: 18rpx 0">
          <u-radio-group>
            <u-radio
              @change="radioChange"
              :customStyle="{ marginBottom: '8px' }"
              activeColor="#dd524d63"
            >
            </u-radio>
          </u-radio-group>
          <!-- <u--image
            :showLoading="true"
            :src="required(item.url)"
            width="120rpx"
            height="120rpx"
          ></u--image> -->
          <image class="icon-image" :src="item.url" />
          <view class="u-page__slide-item">
            <u-slider
              :value="item.value"
              min="0"
              max="100"
              activeColor="#dd524d63"
            ></u-slider>
            <view class="text">{{ item.text }}</view>
          </view>
          <view>{{ item.value }}%</view>
        </view>
      </view>
    </view>
    <!-- 设计图 -->
    <view class="rfa" style="margin: 18rpx 0">
      <Upload
        name="CADImg"
        @change="
          (value) => {
            handleFormChange('CADImg', value);
          }
        "
      >
        <view class="image-2 fc" v-if="!form.CADImg">
          <image
            src="../../static//images/add.png"
            mode="aspectFill"
            style="width: 20px; height: 20px; margin-bottom: 4px"
          ></image>
          <text style="color: #fff; font-size: 14px">CAD设计图</text>
        </view>
      </Upload>
      <Upload
        name="checiImg"
        class="fc"
        @change="
          (value) => {
            handleFormChange('checi', value);
          }
        "
      >
        <view class="image-2 fc">
          <image
            src="../../static//images/add.png"
            mode="aspectFill"
            style="width: 20px; height: 20px; margin-bottom: 4px"
          ></image>
          <text style="color: #fff; font-size: 14px">车瓷设计图</text>
        </view>
      </Upload>
    </view>
    <!-- 设计师 -->
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="CAD设计师"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.CAD"
          border="none"
          :customStyle="{
            padding: '20rpx 12rpx'
          }"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :customStyle="{
            padding: '20rpx 12rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="车瓷设计师"
          disabledColor="#fff"
          v-model="form.checi"
          border="none"
          suffixIcon="edit-pen"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
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
        <image :src="previewImg"  v-if="previewImg.indexOf('image') > -1"   mode="widthFix"></image>
        <video :src="previewImg"  v-if="previewImg.indexOf('video') > -1" style="width: 100%;height: 200rpx;"></video>
      </view>
    </u-popup>
    <view class="btn afc"> 确认 </view>
    <view class="footer rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-07.png"></u-icon>
      <navigator :url="`/pages/afterSalesLogin/afterSalesLogin`">
        <u-icon
          size="26"
          name="../../static/images/ECO-UI-04.png"
          style=""
        ></u-icon>
      </navigator>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import TiXing from "../../components/tixing";
import Upload from "../../components/my-upload/my-upload.vue";

export default {
  data() {
    return {
      videoSrc:
        "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
      previewImg: "",
      popupShow: false,
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {
        customer: "",
        dateTime: "",
        doctor: "",
        proxy: "",
        diagnoseInfo: {
          frontPhoto: "",
          adviceContent: "",
          leftFv: "",
          rightFv: "",
          front: "",
          leftFvEdge: "",
          rightFvEdge: ""
        },
        designAdvice: {
          intentImg: "",
          content: "",
          designList: []
        },
        porcelain: "",
        tiepianColor: "",
        toothList: [],
        CADImg: "",
        checiImg: "",
        CAD: "",
        checi: ""
      },
      show: false,
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
        },
        {
          id: 11,
          text: "厚度",
          value: 0,
          open: false,
          url: "../../static/images/11.jpg"
        }
      ]
    };
  },
  components: {
    TiXing,
    Upload
  },
  // onReady: function(res) {
  //       // #ifndef MP-ALIPAY
  //       this.videoContext = uni.createVideoContext('myVideo')
  //       // #endif
  //   },
  computed: {
    designList() {
      return this.form.designAdvice.designList;
    }
  },
  methods: {
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.popupShow = false;
    },
    getDesignListImg(index) {
      return this.form.designAdvice.designList[index];
    },
    close(item) {
      this.show = false;
    },
    handleImage(key, value) {
      this.$set(this.form.diagnoseInfo, [key], value);
    },
    handleFormChange(key, value) {
      this.$set(this.form, [key], value);
    },
    handleDesignAdviceImage(key, value) {
      this.$set(this.form.designAdvice, [key], value);
    },
    handleDesignImage(value) {
      this.form.designAdvice.designList.push(value);
    },
    confirm(value) {
      this.show = false;
      const time = moment(value).format("YYYY-MM-DD");
      this.form.dateTime = time;
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
    // height: 200rpx;
    // border-radius: 36rpx;
  }
  //TODO:没生效
  /deep/.u-textarea {
    border-radius: 36rpx !important;
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
    width: 120rpx;
    height: 120rpx;
    background: #898787a3;
    border-radius: 16rpx;
    margin: 20rpx 0rpx;
    position: relative;
  }
  .preview {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
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
}
.icon-image {
  width: 120rpx;
  height: 120rpx;
}
.date-btn {
  padding: 18rpx;
  color: #dd524d63;
  justify-content: space-between;
  border-radius: 40rpx;
  font-size: 30rpx;
}
</style>
