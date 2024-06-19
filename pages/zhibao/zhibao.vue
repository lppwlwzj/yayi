<template>
  <view class="content">
    <view class="top">
      <image
        src="https://gdcasa.cn:3010/img/images/static/logo.png"
        mode="scaleToFill"
        class="logo"
      ></image>
    </view>

    <image
      src="https://gdcasa.cn:3010/img/images/static/tiepian.png"
      key=""
      mode="scaleToFill"
      class="title"
    >
    </image>

    <view class="query-result-info fc" v-if="data">
      <p>尊敬的女士/先生</p>
      <p>
        感谢您使用源自<text>{{ data.origin }}</text
        >的义齿产品。
      </p>
      <p>以下是这副义齿的相关信息。</p>
    </view>
    <view class="query-result-info" v-if="data">
      DEAR MADAM/SIR <br />
      THANK YOU FOR USING OUR DENTURE PRODUCT.<br />
      THE FOLLOWING IS THE RELEVANT INFORMATION ABOUT THIS DENTURE.
    </view>
    <view class="query-result-table" v-if="data">
      <view
        class="query-result-item rfa"
        v-for="(item, index) in result"
        :key="index"
      >
        <view class="query-result-left"> {{ item.label }} </view>
        <view class="query-result-right fc"> {{ item.value }}</view>
      </view>
      <view class="query-result-item rfa">
        <view class="query-result-left"> 牙位图 </view>
        <view class="query-result-right fc">
          <image
            src="https://gdcasa.cn:3010/img/images/static/yawei.png"
            key=""
            mode="scaleToFill"
            class="yawei"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      result: [],
      data: null
    };
  },
  options: {
    styleIsolation: "shared"
  }, //这样deep的样式在微信小程序上才可以显示
  onLoad(options) {
    console.log(options, "options");
    if (options.scene) {
      this.getZhibaoDetailById(options.scene);
    }
  },
  methods: {
    async getZhibaoDetailById(id) {
      const res = await this.$api.getZhibaoDetailById({
        id
      });
      if (!res.code) {
        this.data = res.data;
        const result = [
          {
            key: "dateTime",
            label: "日期",
            value: ""
          },
          {
            key: "patient",
            label: "患者",
            value: ""
          },
          {
            key: "orderNo",
            label: "产品序列号",
            value: ""
          },
          {
            key: "zhibaoDate",
            label: "质保期",
            value: ""
          },
          {
            key: "hospital",
            label: "医院、诊所",
            value: ""
          },
          {
            key: "top",
            label: "上牙位",
            value: ""
          },
          {
            key: "bottom",
            label: "下牙位",
            value: ""
          },
          {
            key: "colorNo",
            label: "色号",
            value: ""
          },
          {
            key: "liscens",
            label: "生产许可证",
            value: ""
          },
          {
            key: "certificate",
            label: "注册证",
            value: ""
          }
          // {
          // 	key: "business",
          // 	label: "营业执照",
          // 	value: ""
          // }
        ].map((item) => ({
          ...item,
          value: res.data[item.key] || ""
        }));
        const keys = ["business", "certificate", "liscens"];
        this.result = result.filter((item) => {
          if (!keys.includes(item.key)) return true;
          return !!item.value;
        });
      } else {
        this.result = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  // height: 100vh;
  box-sizing: border-box;
  background: #fff !important;
  min-height: 100vh;

  .top {
    height: 400rpx;
    width: 100%;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    margin: 40rpx 20%;
    height: 90rpx;
    width: 60%;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 680rpx !important;
    margin: 0 auto 30rpx;
  }

  .query-result-info {
    width: 680rpx !important;
    margin: 40rpx auto 16rpx;
    background-color: #c1eadd59;
    font-size: 24rpx;
    text-align: center;
    padding: 30rpx 24rpx;
    box-sizing: border-box;

    p {
      font-size: 32rpx;
      color: #000;

      text {
        color: #26bafd;
      }
    }
  }
}

.query-result-table {
  width: 680rpx !important;
  margin: 16rpx auto;
  border: 1px solid #cccccc69;

  .query-result-item {
    border-bottom: 1px solid #cccccc69;
    background-color: #c1eadd59;

    .query-result-left {
      width: 180rpx;
      padding: 28rpx 24rpx;
      align-self: flex-start;
    }

    .query-result-right {
      flex: 1;
      padding: 28rpx 24rpx;
      background-color: #fff;
      min-height: 50rpx;
    }
  }
}

.yawei {
  width: 86%;
  margin: 0 auto;
  height: 540rpx;
}
</style>
