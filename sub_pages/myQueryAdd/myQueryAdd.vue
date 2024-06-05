<template>
  <view class="content" :style="{ paddingTop: statusBarHeight }">
    <view class="rfb">
      <navigator
        url="/pages/index/index"
        hover-class="navigator-hover"
        open-type="navigate"
      >
        <u-icon
          size="30"
          :name="require('../../static/images/ECO-UI-03.png')"
        ></u-icon>
      </navigator>

      <u-icon
        size="30"
        :name="require('../../static/images/ECO-UI-02.png')"
      ></u-icon>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="患者姓名"
          disabledColor="#fff"
          :disabled="disabled"
          placeholderStyle="color:#dd524d63"
          v-model="form.customer"
          border="none"
          :customStyle="{
            padding: '18rpx',
            color: '#dd524d63'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <view
          @click="calendarOpen('dateTime')"
          class="rfa date-btn"
          :disabled="disabled"
        >
          <view>
            {{ `${form.dateTime || "日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </view>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="订单编号"
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
        <view
          @click="calendarOpen('dateTime')"
          class="rfa date-btn"
          :disabled="disabled"
        >
          <view>
            {{ `${form.dateTime || "质保日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </view>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="医院、诊所"
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
          placeholder="产品场地"
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
    </view>

    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="产品名称"
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
          placeholder="色号"
          disabledColor="#fff"
          v-model="form.tiepianColor"
          border="none"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="上牙位"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="下牙位"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="生产许可证"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <!-- 放图片 -->
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="生产许可证"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="生产许可证"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>

    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="注册证"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="营业执照"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>

    <!-- <view class="rfa" style="margin: 18rpx 0; font-size: 18px;font-weight: 600;"> 生产问题 </view> -->
    <view class="rfa" style="margin: 18rpx 0; height: 160rpx"> </view>
    <uni-calendar
      ref="myCalendar"
      class="uni-calendar--hook"
      :clear-date="true"
      :insert="false"
      :lunar="false"
      :startDate="startDate"
      :endDate="endDate"
      :range="false"
      @confirm="handleDaiYaTime"
      @close="canceltime"
    />

    <!-- <view
      class="btn afc"
      @tap.stop="handleEdit"
      v-show="customer_id && operateType === 'view'"
    >
      编辑
    </view> -->
    <view
      class="btn afc"
      @tap.stop="submit"
      v-show="['create', 'edit'].includes(operateType)"
    >
      确认
    </view>
    <!-- <view
      class="btn afc"
      @tap.stop="handleDelete"
      v-show="['edit'].includes(operateType)"
    >
      删除
    </view> -->
    <!-- 
    <view class="footer rfa">
      <u-icon
        size="26"
        :name="require('../../static/images/ECO-UI-07.png')"
      ></u-icon>
      <navigator
        :url="
          operateType === 'create'
            ? ''
            : `/sub_pages/customerFiles/customerFiles?id=${id}&operateType=${operateType}&service_id=${service_id}`
        "
      >
        <u-icon
          size="26"
          :name="require('../../static/images/ECO-UI-04.png')"
          style=""
        ></u-icon>
      </navigator>
    </view> -->
    <u-modal
      confirmColor="#dd524d63"
      :show="modalShow"
      :showConfirmButton="false"
      :showCancelButton="false"
      :closeOnClickOverlay="true"
      @close="modalShow = false"
      ref="uModal"
    >
      <view class="fc"> </view>
    </u-modal>

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
      <view class="fc img_wrapper">
        <video :src="previewImg" v-if="previewImg.indexOf('mp4') > -1"></video>
        <TouchScaleImg :img_url="previewImg" v-else />
      </view>
    </u-popup>
  </view>
</template>

<script>
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);

  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}

export default {
  data() {
    return {
      selectIndex: -1,
      modalShow: false,
      service_id: "",
      startDate: "",
      endDate: "",
      time: Number(new Date()),
      userInfo: {},
      id: "", //数据库自动生成的
      customer_id: "", //自己生成的随机字符串，用来create时确定上传图片的唯一标识
      operateType: "create",

      previewImg: "",
      popupShow: false,
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {},
      show: false,

      timeKey: "",
      activeIndex: "", //滑动条选择图片的时候的key
      preUploadInfo: {}
    };
  },
  components: {
    TiXing,
    Upload,
    MultiUpload,
    TouchScaleImg
  },

  onReady() {
    this.startDate = getDate(new Date(), -60).fullDate;
    this.endDate = getDate(new Date(), 30).fullDate;
  },
  onLoad: function (option) {
    if (option.id) {
      this.id = option.id;
      this.operateType = option.type;
      this.getCustomerDetailById(option.id);
    }
    if (this.operateType === "create")
      this.customer_id = Math.random().toString(36).substring(2, 6);
    this.userInfo = uni.getStorageSync("userInfo");
  },
  options: { styleIsolation: "shared" },
  computed: {
    disabled() {
      return this.operateType === "view";
    },
    designList() {
      return this.form.designList;
    },

    privacyVisible() {
      return ["13588805863", "18516187777", "13666633692"].includes(
        this.userInfo.usercount
      );
    }
  },

  methods: {
    getImg(url) {
      return url?.indexOf("mp4") > -1
        ? require("../../static/images/video.png")
        : url;
    },
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.previewImg = "";
      this.popupShow = false;
    },
    handleAddDesignImg(img_url) {
      this.form.designList.push(img_url);
    },

    calendarOpen(key) {
      this.timeKey = key;
      this.$refs.myCalendar.open();
    },
    handleDaiYaTime(time) {
      this.form[this.timeKey] = time.fulldate;
    },

    handleChoseImg(key) {
      this.activeIndex = key;
      this.modalShow = true;
    },
    handleChooseConfirm(img) {
      if (this.activeIndex === "intentList") {
        this.form.intentImg = img;
      } else {
        // const index = this.dentistList.findIndex(
        //   (item) => item.key === this.activeIndex
        // );
        // if (index > -1) {
        //   this.hanldeListChange(img, index, "img");
        // }
      }
      this.modalShow = false;
    },
    // handleEdit() {
    //   this.operateType = "edit";
    // },
    async getCustomerDetailById(id) {
      const res = await this.$api.getCustomerDetailById({
        id
      });
      if (!res.code) {
        const data = res.data;
        this.form = data;
        this.customer_id = data.customer_id;
        this.service_id = data.service_id;

        this.form.isPrivacy = this.form.isPrivacy ? true : false;
        // this.form.designList = JSON.parse(data.designList);
      }
    },
    async handleDelete() {
      const res = await this.$api.deleteCustomer({
        id: this.id
      });
      if (!res.code) {
        uni.showToast({
          icon: "none",
          title: res.message
        });
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/index/index"
          });
        }, 500);
      }
    },
    async submit() {
      const requestFn = this.id
        ? this.$api.editCustomer
        : this.$api.addCustomer;
      const res = await requestFn({
        customer_id: this.customer_id,
        id: this.id || "",
        ...this.form,
        isPrivacy: this.form.isPrivacy ? 1 : 0
      });
      if (!res.code) {
        uni.showToast({
          icon: "none",
          title: res.message
        });
        this.operateType = "edit";

        this.id = res.re.id || this.id;
        uni.showToast({
          icon: "none",
          title: "操作成功！"
        });
      } else {
        uni.showToast({
          icon: "none",
          title: res.message
        });
      }
    },

    handleFormChange(key, value) {
      this.$set(this.form, key, value);
    },
    handleDesignImage(value) {
      this.form.designList.push(value);
    },
    deleteDesignImg(index) {
      this.$set(this.form.designList, index, "");
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
.footer {
  width: 100%;
  background: #fff;
  z-index: 999999;
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
    min-height: 160rpx;
    align-self: flex-start;
    // height: 200rpx;
    // border-radius: 36rpx;
  }
  //TODO:没生效
  /deep/.u-textarea {
    border-radius: 36rpx !important;
  }
  /deep/.u-cell__body {
    border-radius: 16px;
    background-color: #fff;
  }
  /deep/.u-cell__title-text {
    color: #dd524d63;
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
    margin: 20rpx 0rpx;
  }
  .image {
    width: 120rpx;
    height: 120rpx;
    background: #898787a3;
    border-radius: 16rpx;

    position: relative;
  }
  .preview {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10rpx;
    bottom: 10rpx;
  }
  .image-2 {
    width: 160rpx;
    height: 160rpx;
    // width: 100%;
    // height: 100%;
    background: #898787a3;
    border-radius: 16rpx;
    // margin: 20rpx 0rpx;
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
  color: #30313363;
  justify-content: space-between;
  border-radius: 40rpx;
  font-size: 30rpx;
}
.active {
  border: 2rpx solid red;
}
.img-item {
  position: relative;
}
/deep/ .uni-calendar-item--isDay,
/deep/ .uni-calendar-item--checked {
  background-color: #eb2b24e3 !important;
}
.img_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
/deep/ .u-popup__content__close--top-left {
  top: 75px !important;
  left: 28px !important;
}
.problem-text {
  height: 100%;
}
.slide-img {
  position: relative;
}
</style>
