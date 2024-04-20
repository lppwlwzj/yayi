<template>
  <view class="content">
    <view class="rfb">
      <u-icon
        size="30"
        name="../../static/images/ECO-UI-03.png"
        @click="back"
      ></u-icon>

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
      </view>
    </view>
    <view class="diagnose">
      <view class="diagnose-el">
        <MultiUpload
          :list="imgList"
          activeKey="service"
          @delete="deleteImg"
          customClass="custom-upload-img"
        />
     
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

    
    <view class="btn afc" @click="submit"> 确认 </view>
    <view class="footer rfa">
      <u-icon size="26" name="../../static/images/ECO-UI-22.png"></u-icon>

      <navigator
        :url="
          !service_id
            ? ''
            : `/sub_pages/afterSalesLogin/afterSalesLogin?service_id=${service_id}&customer_id=${customer_id}&operateType=${operateType}`
        "
      >
        <u-icon size="26" name="../../static/images/ECO-UI-04.png"></u-icon>
      </navigator>
    </view>
  </view>
</template>

<script>
import Upload from "../components/my-upload/my-upload.vue";
import MultiUpload from "../components/multi-upload";

export default {
  data() {
    return {
      operateType: "",
      service_id: "",
      customer_id: "",
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
      ]
    };
  },
  components: {
    Upload,
    MultiUpload
  },
  onLoad: function (option) {
    if (option.id) {
      this.customer_id = option.id;
      this.getCustomerDetailById(option.id);
    }
    if (option?.service_id) {
      this.service_id = option.service_id;
      this.getServiceDetailById(option.service_id);
    }
    if (option?.operateType) {
      this.operateType = option.operateType;
    }
  },
  computed: {
    disabled() {
      return this.operateType === "view";
    }
  },

  methods: {
    back() {
      uni.navigateBack({
        delta: 1
      });
    },
    async submit() {
      const form = {
        tryInfo: "",
        recoverInfo: "",
        imgList: JSON.stringify(this.imgList),
        customer_id: this.customer_id,
        service_id: this.service_id
      };
      const res = await this.$api.submitService({
        ...form
      });
      if (!res.code) {
        this.service_id = res.re.service_id;
        uni.showToast({
          icon: "none",
          title: res.message
        });
      }
    },
    async getServiceDetailById(service_id) {
      const res = await this.$api.getServiceDetailById({
        service_id
      });
      if (!res.code) {
        const { imgList } = res.re;
        this.imgList = JSON.parse(imgList);
      }
    },


    deleteImg(index) {
      this.$set(this.imgList, index, "");
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
  height: 100vh;
}

.u-input--square {
  border-radius: 40rpx;
}
/deep/.uni-input-wrapper {
  padding: 0 16rpx !important;
}
/deep/.u-textarea--disabled {
  background: #fff !important;
}
.footer {
  width: 100%;
  background: #fff;
}

.content {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: $uni-color-bg;
  padding: 50rpx 30rpx 0;
  // padding-bottom: 40rpx;

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
  flex: 1;
  background-color: #fff;
  min-height: 144rpx;
  border-radius: 40rpx;
}
/deep/.u-line {
  border: none !important;
}
/deep/.u-collapse-item__content {
  height: auto !important;
}
</style>
