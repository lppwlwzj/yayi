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

    <view class="fc" style="margin: 18rpx 0; font-size: 40rpx"> 售后服务 </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse style="width: 100%">
        <u-collapse-item
          ref="tryCollapse"
          :title="`试戴次数${tryInfo.length}`"
          name="Docs guide"
          :border="false"
        >
          <view v-for="(item, idx) in tryInfo" :key="idx" class="img-list">
            <view class="rfc" style="align-items: flex-start">
              <view class="rfsw" style="width: 55%">
                <MultiUpload
                  :list="item.tryImg"
                  activeKey="tryImg"
                  @delete="
                    (index) => {
                      handleDelTryImg(idx, index);
                    }
                  "
                />
              </view>
              <view class="diagnose-text">
                <u--textarea
                  :disabled="disabled"
                  v-model="item.remark"
                  border="none"
                  placeholder="请输入内容"
                ></u--textarea>
              </view>
            </view>
          </view>
          <view v-show="!disabled" class="btn afc" @tap.stop="handleAddTry">
            添加一条
          </view>
        </u-collapse-item>
      </u-collapse>
    </view>
    <view class="fc" style="margin: 18rpx 0; padding: 16rpx">
      <u-collapse style="width: 100%">
        <u-collapse-item
          :title="`修复次数${recoverInfo.length}`"
          name="Docs guide"
        >
          <view v-for="(item, idx) in recoverInfo" :key="idx" class="img-list">
            <view class="rfc" style="align-items: flex-start">
              <view class="rfsw" style="width: 55%">
                <MultiUpload
                  :list="item.recoverImg"
                  activeKey="recoverImg"
                  @delete="
                    (index) => {
                      handleDelRecoverImg(idx, index);
                    }
                  "
                />
  
              </view>
              <view class="diagnose-text">
                <u--textarea
                  :disabled="disabled"
                  v-model="item.remark"
                  border="none"
                  placeholder="请输入内容"
                ></u--textarea>
              </view>
            </view>
          </view>
          <view v-show="!disabled" class="btn afc" @tap.stop="handleRecoverTry">
            添加一条
          </view>
        </u-collapse-item>
      </u-collapse>
    </view>
    <view v-show="!disabled" class="btn afc" @tap.stop="submit"> 确认 </view>

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
      tryInfo: [],
      recoverInfo: []
    };
  },
  components: {
    Upload,
    MultiUpload
  },
  onLoad: function (option) {
    if (option.customer_id) {
      this.customer_id = option.customer_id;
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
        tryInfo: JSON.stringify(this.tryInfo),
        recoverInfo: JSON.stringify(this.recoverInfo),
        imgList: "",
        customer_id: this.customer_id,
        service_id: this.service_id
      };
      const res = await this.$api.submitService({
        ...form
      });
      if (!res.code) {
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
        const { tryInfo, recoverInfo } = res.re;

        this.tryInfo = tryInfo ? JSON.parse(tryInfo) : [];
        this.recoverInfo = recoverInfo ? JSON.parse(recoverInfo) : [];
      }
    },

    handleDelTryImg(idx, index) {
      const item = this.tryInfo[idx];
      const tryImg = item.tryImg;
      this.$set(tryImg, index, '')
      this.$set(this.tryInfo, idx, {
        ...this.tryInfo[idx],
        tryImg
      });
    },

    handleAddTry() {
      this.tryInfo.push({
        tryImg: [],
        remark: ""
      });
    },

    handleDelRecoverImg(idx, index) {
      const item = this.recoverInfo[idx];
      const recoverImg = item.recoverImg;
      this.$set(recoverImg, index, '')
      this.$set(this.recoverInfo, idx, {
        ...this.recoverInfo[idx],
        recoverImg
      });
    },
    handleRecoverTry() {
      this.recoverInfo.push({
        recoverImg: [],
        remark: ""
      });
    },

  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
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
  min-height: 100vh;
  box-sizing: border-box;
  background-color: $uni-color-bg;
  padding: 50rpx 30rpx 0;
  padding-bottom: 40rpx;

  // padding-bottom: 160rpx;

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
.img-list {
  margin: 16rpx 0;
  border-bottom: 1px solid #cccccc6b;
  padding-bottom: 16rpx;
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
