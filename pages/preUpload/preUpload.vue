<template>
  <view class="content">
    <view class="rfb" style="margin-bottom: 24rpx">
      <navigator
        url="/pages/index/index"
        hover-class="navigator-hover"
        open-type="navigate"
      >
        <u-icon size="30" name="../../static/images/ECO-UI-03.png"></u-icon>
      </navigator>

      <u-icon size="30" name="../../static/images/ECO-UI-02.png"></u-icon>
    </view>

    <!-- <u--input
      :customStyle="{
        width: '660rpx',
        margin: '24rpx 0',
        border: 'solid 1px #dd524d63 !important',
        borderRadius: '40rpx',
        background:'#FFF'
      }"
      placeholderStyle="color:#dd524d63"
      placeholder=""
      v-model="search"
      border="surround"
      suffixIcon="search"
      suffixIconStyle=" color: #dd524dab !important;"
      @confirm="handleSearch"
    ></u--input> -->

    <u-collapse>
      <u-collapse-item title="边缘" name="bianyuan">
        <MultiUpload :list="form.bianyuan" activeKey="bianyuan" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="角度方圆" name="round">
        <MultiUpload :list="form.round" activeKey="round" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="1号2号落差" name="luocha">
        <MultiUpload :list="form.luocha" activeKey="luocha" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="窄细角度" name="angle">
        <MultiUpload :list="form.angle" activeKey="angle" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="尖or钝" name="jiandun">
        <MultiUpload :list="form.jiandun" activeKey="jiandun" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="2号远中切端上扬幅度" name="qieduan">
        <MultiUpload :list="form.qieduan" activeKey="qieduan" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="纹理" name="texture">
        <MultiUpload :list="form.texture" activeKey="texture" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="颈部光点" name="dot">
        <MultiUpload :list="form.dot" activeKey="dot" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="透亮" name="touliang">
        <MultiUpload :list="form.touliang" activeKey="touliang" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="切端渐变层" name="linear">
        <MultiUpload :list="form.linear" activeKey="linear" />
      </u-collapse-item>
    </u-collapse>

    <u-collapse>
      <u-collapse-item title="角度方圆" name="thickness">
        <MultiUpload :list="form.thickness" activeKey="thickness" />
      </u-collapse-item>
    </u-collapse>

    <view class="btn afc" @tap.stop="handleSubmit"> 确认 </view>
  </view>
</template>

<script>
import MultiUpload from "../../components/multi-upload";
export default {
  components: {
    MultiUpload
  },
  data() {
    return {
      form: {
        bianyuan: [],
        round: [],
        luocha: [],
        angle: [],
        jiandun: [],
        qieduan: [],
        texture: [],
        dot: [],
        touliang: [],
        linear: [],
        thickness: []
      }
    };
  },
  methods: {
    handleSubmit() {
      const params = {};
      Object.keys(this.form).map((key) => {
        params[key] = this.form[key].length ? JSON.stringify(this.form[key]) : '';
      });
      console.log("bianyuan", params);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background-color: $uni-color-bg;
  padding: 40rpx 26rpx;
}
/deep/.u-collapse-item__content {
  height: auto !important;
}
/deep/.u-cell__title-text {
  color: #dd524dab !important;
}
/deep/.u-cell__body {
  border-radius: 16px;
  background-color: #fff;
}
/deep/.u-collapse-item {
  margin: 18rpx 0;
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
</style>
