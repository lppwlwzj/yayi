<template>
  <view class="content" :style="{ paddingTop: statusBarHeight }">
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
    <image
      :src="require('./static/title.png')"
      key=""
      mode="scaleToFill"
      class="title"
    ></image>

    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="患者姓名"
          disabledColor="#fff"
          :disabled="disabled"
          placeholderStyle="color:#4c789b69"
          v-model="form.patient"
          border="none"
          :customStyle="{
            padding: '18rpx',
            color: '#4c789b69'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
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
          <u-icon size="19" name="edit-pen" color="#4c789b69"></u-icon>
        </view>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="订单编号"
          disabledColor="#fff"
          v-model="form.orderNo"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          placeholderStyle="color:#4c789b69"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
        ></u--input>
      </view>
      <view class="input">
        <view
          @click="calendarOpen('zhibaoDate')"
          class="rfa date-btn"
          :disabled="disabled"
        >
          <view>
            {{ `${form.zhibaoDate || "质保日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#4c789b69"></u-icon>
        </view>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="医院、诊所"
          disabledColor="#fff"
          v-model="form.hospital"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          placeholderStyle="color:#4c789b69"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="产品产地"
          disabledColor="#fff"
          v-model="form.origin"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          placeholderStyle="color:#4c789b69"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
        ></u--input>
      </view>
    </view>

    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="产品名称"
          disabledColor="#fff"
          placeholderStyle="color:#4c789b69"
          v-model="form.product"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#4c789b69"
          placeholder="色号"
          disabledColor="#fff"
          v-model="form.colorNo"
          border="none"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #4c789b69 !important;"
        ></u--input>
      </view>
    </view>
    <view class="rfaw my-input" style="margin: 18rpx auto">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#4c789b69"
        placeholder="上牙位"
        disabledColor="#fff"
        v-model="form.top"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #4c789b69 !important;"
      ></u--input>
    </view>
    <view class="rfaw my-input">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#4c789b69"
        placeholder="下牙位"
        disabledColor="#fff"
        v-model="form.bottom"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #4c789b69 !important;"
      ></u--input>
    </view>
    <!-- 放图片 -->
    <image
      src="https://gdcasa.cn:3010/img/images/yawei.png"
      mode="scaleToFill"
      class="yawei"
    ></image>
    <view class="rfaw my-input">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#4c789b69"
        placeholder="生产许可证"
        disabledColor="#fff"
        v-model="form.liscens"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #4c789b69 !important;"
      ></u--input>
    </view>
    <view class="rfaw my-input">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#4c789b69"
        placeholder="注册证"
        disabledColor="#fff"
        v-model="form.certificate"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #4c789b69 !important;"
      ></u--input>
    </view>
    <view class="rfaw my-input">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#4c789b69"
        placeholder="营业执照"
        disabledColor="#fff"
        v-model="form.business"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #4c789b69 !important;"
      ></u--input>
    </view>

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
    <view class="btn afc" @tap.stop="handleCreateQr" v-show="id">
      生成二维码
    </view>
    <u-modal
      confirmColor="#4c789b69"
      :show="modalShow"
      :showConfirmButton="false"
      :showCancelButton="false"
      :closeOnClickOverlay="true"
      @close="modalShow = false"
      ref="uModal"
    >
      <view class="fc"> </view>
    </u-modal>
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
      userInfo: {},
      id: "", //数据库自动生成的
      operateType: "create",
      popupShow: false,
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {
        patient: "",
        dateTime: "",
        orderNo: "",
        zhibaoDate: "",
        hospital: "",
        origin: "",
        product: "",
        colorNo: "",
        top: "",
        bottom: "",
        liscens: "",
        certificate: "",
        business: "",
        imgQr: ""
      },
      show: false,
      timeKey: ""
    };
  },
  onReady() {
    this.startDate = getDate(new Date(), -60).fullDate;
    this.endDate = getDate(new Date(), 30).fullDate;
  },
  onLoad: function (option) {
    if (option.id) {
      this.id = option.id;
      this.getZhibaoDetailById(option.id);
    }
  },
  options: { styleIsolation: "shared" },
  computed: {
    disabled() {
      return this.operateType === "view";
    }
  },

  methods: {
    calendarOpen(key) {
      this.timeKey = key;
      this.$refs.myCalendar.open();
    },
    handleDaiYaTime(time) {
      this.form[this.timeKey] = time.fulldate;
    },
    canceltime() {},
    handleChoseImg(key) {
      this.activeIndex = key;
      this.modalShow = true;
    },

    async getZhibaoDetailById(id) {
      const res = await this.$api.getZhibaoDetailById({
        id
      });
      if (!res.code) {
        const data = res.data;
        this.form = data;
      }
    },
    async submit() {
      const requestFn = this.id ? this.$api.editZhibao : this.$api.addZhibao;
      const res = await requestFn({
        id: this.id || "",
        ...this.form
      });
      if (!res.code) {
        uni.showToast({
          icon: "none",
          title: res.message
        });
        // this.operateType = "edit";
        this.id = res.re.id || this.id;
        uni.showToast({
          icon: "none",
          title: "操作成功！"
        });
        // setTimeout(() => {
        //   uni.redirectTo({
        //     url: "/sub_pages/myQuery/myQuery"
        //   });
        // }, 100);
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
    async handleCreateQr() {
      const res = await this.$api.getQrImg({
        id: this.id,
        page: "pages/zhibao/zhibao"
      });
      console.log("🚀 ~ .then ~ res:", res);
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background: #fff;
  z-index: 999999;
}

.content {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 30rpx;
  padding-bottom: 60rpx;
  .title {
    margin: 50rpx 10% 20rpx;
    height: 130rpx;
    width: 80%;
  }
  .input,
  .my-input {
    width: 45% !important;
    border: 1px solid #4c789b69;
    margin: 16rpx 0;
    background-color: #fff;
  }
  .my-input {
    width: 94% !important;
    margin: 32rpx auto;
  }
  .yawei {
    width: 78%;
    height: 840rpx;
    margin: 40rpx 11%;
  }

  .btn {
    margin-top: 50rpx;
    width: 100%;
    background-color: #4c789b69;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    color: #fff;
    font-size: 16px;
  }
}
.date-btn {
  padding: 18rpx;
  color: #4c789b69;
  justify-content: space-between;
  font-size: 30rpx;
}
.active {
  border: 2rpx solid red;
}

/deep/ .uni-calendar-item--isDay,
/deep/ .uni-calendar-item--checked {
  background-color: #eb2b24e3 !important;
}

/deep/ .u-popup__content__close--top-left {
  top: 75px !important;
  left: 28px !important;
}
</style>
