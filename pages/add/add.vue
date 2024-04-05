<template>
  <view class="content" :style="{ paddingTop: statusBarHeight }">
    <view class="rfb">
      <navigator
        url="/pages/index/index"
        hover-class="navigator-hover"
        open-type="navigate"
      >
        <u-icon size="30" name="../../static/images/ECO-UI-03.png"></u-icon>
      </navigator>

      <u-icon size="30" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="客户姓名"
          disabledColor="#fff"
          :disabled="disabled"
          placeholderStyle="color:#dd524d63"
          v-model="form.customer"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u-button
          @click="show = true"
          class="rfa date-btn"
          :disabled="disabled"
          :style="{
            color: form.dateTime ? '#000' : '#dd524d63'
          }"
        >
          <view>
            {{ `${form.dateTime || "日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </u-button>
        <u-datetime-picker
          :show="show"
          mode="date"
          closeOnClickOverlay
          @close="show = false"
          @confirm="confirm"
        ></u-datetime-picker>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="面诊医生"
          disabledColor="#fff"
          v-model="form.doctor"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          placeholderStyle="color:#dd524d63"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="代理人"
          disabledColor="#fff"
          v-model="form.proxy"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
          :suffixIcon="disabled ? '' : 'edit-pen'"
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
            :img_url="form.frontPhoto"
            name="frontPhoto"
            :disabled="disabled"
            customClass="upload-img-el"
            @change="
              (value) => {
                handleFormChange('frontPhoto', value);
              }
            "
          >
            <view class="upload-img-el fc">
              <image
                src="../../static/images/upload.png"
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
                src="../../static/images/add.png"
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
              :disabled="disabled"
              v-model="form.adviceContent"
              border="none"
              placeholder="请输入内容"
            ></u--textarea>
          </view>
        </view>
        <view class="rfa image-list">
          <!-- 左45度 -->
          <Upload
            :disabled="disabled"
            name="leftFv"
            :img_url="form.leftFv"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('leftFv', value);
              }
            "
          >
            <view class="image fc" v-if="!form.leftFv">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度</text>
            </view>
          </Upload>
          <!-- 右45度 -->
          <Upload
            :disabled="disabled"
            name="rightFv"
            :img_url="form.rightFv"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('rightFv', value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度</text>
            </view>
          </Upload>
          <!-- 正面扩口 -->
          <Upload
            name="front"
            :disabled="disabled"
            :img_url="form.front"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('front', value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">正面扩口</text>
            </view>
          </Upload>
          <!-- 右45度扩口 -->
          <Upload
            name="leftFvEdge"
            :disabled="disabled"
            :img_url="form.leftFvEdge"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('leftFvEdge', value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度扩口</text>
            </view>
          </Upload>
          <Upload
            name="rightFvEdge"
            :img_url="form.rightFvEdge"
            customClass="image"
            :disabled="disabled"
            @change="
              (value) => {
                handleFormChange('rightFvEdge', value);
              }
            "
          >
            <view class="image fc">
              <image
                src="../../static/images/add.png"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度扩口</text>
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
            :disabled="disabled"
            name="intentImg"
            :img_url="form.intentImg"
            customClass="upload-img-el"
            @change="
              (value) => {
                handleFormChange('intentImg', value);
              }
            "
          >
            <view class="upload-img-el fc">
              <image
                src="../../static/images/upload.png"
                mode="aspectFill"
                class="upload-img"
              ></image>
              <image
                src="../../static/images/add.png"
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
              :disabled="disabled"
              v-model="form.designAdvice"
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
                src="../../static/images/preview.png"
                class="preview"
                mode="aspectFill"
              ></image>
            </view>
          </view>
          <Upload
            :name="`design${designList.length + 1}`"
            customClass="image"
            :disabled="disabled"
            @change="
              (value) => {
                handleDesignImage(value);
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
      </view>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="瓷品"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.porcelain"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="贴片颜色"
          disabledColor="#fff"
          v-model="form.tiepianColor"
          border="none"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <!-- 进度条 -->
    <view style="margin: 18rpx 0">
      <view class="item" v-for="(item, index) in dentistList" :key="index">
        <view class="rfc" style="margin: 18rpx 0">
          <u-checkbox-group
            v-model="item.open"
            placement="column"
            @change="
              (value) => {
                hanldeListChange(value, index, 'open');
              }
            "
          >
            <u-checkbox
              :disabled="disabled"
              shape="circle"
              :name="item.id"
              :customStyle="{ marginBottom: '8px' }"
              activeColor="#dd524d63"
            >
            </u-checkbox>
          </u-checkbox-group>
          <image class="icon-image" :src="item.url" />
          <view class="u-page__slide-item">
            <u-slider
              :value="item.value"
              min="0"
              max="100"
              :disabled="disabled"
              activeColor="#dd524d63"
              @change="
                (value) => {
                  hanldeListChange(value, index, 'value');
                }
              "
            ></u-slider>
            <view class="text">{{ item.text }}</view>
          </view>
          <view>{{ item.value }}%</view>
        </view>
      </view>
    </view>
    <view class="rfc">
      <text style="color: #ccc; padding-right: 24rpx"> 预计戴牙日期 </text>
      <view class="input">
        <u-button
          :disabled="disabled"
          @click="daiyaShow = true"
          class="rfa date-btn"
          :style="{
            color: form.daiyaTime ? '#000' : '#dd524d63'
          }"
        >
          <view>
            {{ `${form.daiyaTime || "日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </u-button>
        <u-datetime-picker
          :show="daiyaShow"
          mode="date"
          closeOnClickOverlay
          @close="daiyaShow = false"
          @confirm="handleDaiYaTime"
        ></u-datetime-picker>
      </view>
    </view>
    <!-- 设计图 -->
    <view class="rfa" style="margin: 18rpx 0">
      <Upload
        name="CADImg"
        :img_url="form.CADImg"
        :disabled="disabled"
        customClass="image-2"
        @change="
          (value) => {
            handleFormChange('CADImg', value);
          }
        "
      >
        <view class="image-2 fc">
          <image
            src="../../static/images/add.png"
            mode="aspectFill"
            style="width: 20px; height: 20px; margin-bottom: 4px"
          ></image>
          <text style="color: #fff; font-size: 14px">CAD设计图</text>
        </view>
      </Upload>
      <Upload
        name="checiImg"
        :disabled="disabled"
        :img_url="form.checiImg"
        customClass="image-2"
        class="fc"
        @change="
          (value) => {
            handleFormChange('checiImg', value);
          }
        "
      >
        <view class="image-2 fc">
          <image
            src="../../static/images/add.png"
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
          :disabled="disabled"
          placeholder="CAD设计师"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.CAD"
          border="none"
          :customStyle="{
            padding: '20rpx 12rpx'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          :customStyle="{
            padding: '20rpx 12rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="车瓷设计师"
          disabledColor="#fff"
          v-model="form.checi"
          border="none"
          :suffixIcon="disabled ? '' : 'edit-pen'"
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
    <view
      class="btn afc"
      @tap.stop="handleEdit"
      v-show="customer_id && operateType === 'view'"
    >
      编辑
    </view>
    <view
      class="btn afc"
      @tap.stop="submit"
      v-show="['create', 'edit'].includes(operateType)"
    >
      确认
    </view>

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
      customer_id: "",
      operateType: " create",
      videoSrc:
        "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
      previewImg: "",
      popupShow: false,
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {
        customer: "",
        dateTime: "",
        daiyaTime: "",
        doctor: "",
        proxy: "",
        tiepianColor: "",
        CADImg: "",
        checiImg: "",
        CAD: "",
        checi: "",
        porcelain: "",
        frontPhoto: "",
        adviceContent: "",
        leftFv: "",
        rightFv: "",
        front: "",
        leftFvEdge: "",
        rightFvEdge: "",
        intentImg: "",
        designAdvice: "",
        designList: [],
        bianyuanOpen: false,
        bianyuanValue: "",
        roundOpen: false,
        roundValue: "",
        luochaOpen: false,
        luochaValue: "",
        angleOpen: false,
        angleValue: "",
        jiandunOpen: false,
        jiandunValue: "",
        qieduanOpen: false,
        qieduanValue: "",
        textureOpen: false,
        textureValue: "",
        dotOpen: false,
        dotValue: "",
        touliangOpen: false,
        touliangValue: "",
        linearOpen: false,
        linearValue: "",
        thicknessOpen: false,
        thicknessValue: ""
      },
      show: false,
      daiyaShow: false,
      dentistList: [
        {
          id: 1,
          key: "bianyuan",
          text: "边缘",
          value: 0,
          open: [],
          url: "../../static/images/1.png"
        },
        {
          id: 2,
          key: "round",
          text: "角度方圆",
          value: 0,
          open: [],
          url: "../../static/images/2.png"
        },

        {
          id: 3,
          key: "luocha",
          text: "1号2号落差",
          value: 0,
          open: [],
          url: "../../static/images/3.png"
        },
        {
          id: 4,
          text: "窄细角度",
          value: 0,
          key: "angle",
          open: [],
          url: "../../static/images/4.png"
        },
        {
          id: 5,
          text: "尖or钝",
          value: 0,
          open: [],
          key: "jiandun",
          url: "../../static/images/5.png"
        },
        {
          id: 6,
          text: "2号远中切端上扬幅度",
          value: 0,
          open: [],
          key: "qieduan",
          url: "../../static/images/6.png"
        },
        {
          id: 7,
          text: "纹理",
          value: 0,
          open: [],
          key: "texture",
          url: "../../static/images/7.png"
        },
        {
          id: 8,
          text: "颈部光点",
          value: 0,
          key: "dot",
          open: [],
          url: "../../static/images/8.png"
        },
        {
          id: 9,
          text: "透亮",
          value: 0,
          open: [],
          key: "touliang",
          url: "../../static/images/9.png"
        },
        {
          id: 10,
          key: "linear",
          text: "切端渐变层",
          value: 0,
          open: [],
          url: "../../static/images/10.jpg"
        },
        {
          id: 11,
          key: "thickness",
          text: "厚度",
          value: 0,
          open: [],
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
  onLoad: function (option) {
    if (option.id) {
      this.customer_id = option.id;
      this.operateType = option.type;
      this.getCustomerDetailById(option.id);
    }
  },
  computed: {
    disabled() {
      return this.operateType === "view";
    },
    designList() {
      return this.form.designList;
    }
  },
  methods: {
    handleEdit() {
      this.operateType = "edit";
    },
    async getCustomerDetailById(id) {
      const res = await this.$api.getCustomerDetailById({
        id
      });
      if (!res.code) {
        const data = res.data;
        this.form = data;
        this.form.designList = JSON.parse(data.designList);
        this.dentistList = this.dentistList.map((item) => {
          return {
            ...item,
            value: +data[`${item.key}Value`],
            open: data[`${item.key}Open`] === "true" ? [item.id] : []
          };
        });
      }
    },

    async submit() {
      this.dentistList.forEach((item) => {
        this.form[`${item.key}Open`] = !!item.open.length;
        this.form[`${item.key}Value`] = item.value;
      });
      // console.log("this----", this.form);
      // this.form ={"customer":"李希希","dateTime":"2022-01-01","daiyaTime":"2014-01-01","doctor":"刘医生","proxy":"黄医生","tiepianColor":"贴片颜色","CADImg":"http://127.0.0.1:3006/img/images/adminCADImg.e459c4d57b88c124d33445910f1e6e63.jpg","checiImg":"http://127.0.0.1:3006/img/images/admincheciImg.71ca6bc3be751df21605b9c022c31721.jpg","CAD":"cad","checi":"车次","porcelain":"瓷品","frontPhoto":"http://127.0.0.1:3006/img/images/adminfrontPhoto.df16b963a92221b83428b4031786b817.jpg","adviceContent":"面诊建设","leftFv":"http://127.0.0.1:3006/img/images/adminleftFv.363832e41e6524bdddc0da61ae1d888a.jpg","rightFv":"http://127.0.0.1:3006/img/images/adminrightFv.ce4eba42cf8e2e3568786262dc5f4303.jpg","front":"http://127.0.0.1:3006/img/images/adminfront.9358d8fae1223b235b1fa5bd00a662d6.jpg","leftFvEdge":"http://127.0.0.1:3006/img/images/adminleftFvEdge.af48b39f1876df847c12a235dd0e36e5.jpg","rightFvEdge":"http://127.0.0.1:3006/img/images/adminrightFvEdge.83f44f0251b23c18678a4c0596ef8938.jpg","intentImg":"http://127.0.0.1:3006/img/images/adminintentImg.6fe7bbe594c42bdf8ec6c1e4ec86c814.jpg","designAdvice":"设计师建议","designList":["http://127.0.0.1:3006/img/images/admindesign1.4aba3ab9a7362172f088470aa9ee109c.jpg","http://127.0.0.1:3006/img/images/admindesign2.a3e8634ef34f17eefa2a9f41d37a0836.jpg","http://127.0.0.1:3006/img/images/admindesign3.7d7f4c70ba96ec8759776939bc62caba.jpg"],"bianyuanOpen":true,"bianyuanValue":69,"roundOpen":false,"roundValue":0,"luochaOpen":true,"luochaValue":27,"angleOpen":false,"angleValue":0,"jiandunOpen":false,"jiandunValue":0,"qieduanOpen":false,"qieduanValue":0,"textureOpen":false,"textureValue":0,"dotOpen":false,"dotValue":0,"touliangOpen":false,"touliangValue":0,"linearOpen":false,"linearValue":0,"thicknessOpen":false,"thicknessValue":0}
      const res = await this.$api.addCustomer({
        ...this.form
      });
      console.log("this---------", res);
    },
    hanldeListChange(value, index, key) {
      const item = this.dentistList[index];
      item[key] = value;

      this.$set(this.dentistList, index, {
        ...item
      });
    },
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.popupShow = false;
    },
    getDesignListImg(index) {
      return this.form.designList[index];
    },
    // close(item) {
    //   this.show = false;
    // },

    handleFormChange(key, value) {
      this.$set(this.form, [key], value);
    },
    handleDesignImage(value) {
      this.form.designList.push(value);
    },
    confirm(timeV) {
      this.show = false;
      const time = moment(timeV.value).format("YYYY-MM-DD");
      this.form.dateTime = time;
    },
    handleDaiYaTime(timeV) {
      this.daiyaShow = false;
      const time = moment(timeV.value).format("YYYY-MM-DD");
      this.form.daiyaTime = time;
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
  .u-input--square {
    border-radius: 40rpx;
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
