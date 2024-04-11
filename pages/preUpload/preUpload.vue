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
      <u-collapse-item title="切端渐变层" name="qieduanLinears">
        <MultiUpload :list="form.qieduanLinears" activeKey="qieduanLinears" />
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
import { onLoad } from "uview-ui/libs/mixin/mixin";
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
        qieduanLinears: [],
        thickness: []
      }
    };
  },
  onLoad: function () {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const res = await this.$api.getPreinstall();
      console.log("🚀 ~ getInfo ~ res:", res);
      if (!res.code) {
        if (!res.re) return;
        const params = {};
        Object.keys(this.form).map((key) => {
          params[key] =
            res.re[key] && key !== "id" ? JSON.parse(res.re[key]) : [];
        });
        this.form = {
          ...params,
          id: this.form?.id || ""
        };
        console.log("🚀 ~ getInfo ~ params:", params);
      }
    },
    async handleSubmit() {
      const params = {};
      Object.keys(this.form).map((key) => {
        params[key] =
          this.form[key].length && key !== "id"
            ? JSON.stringify(this.form[key])
            : "";
      });
      // const params = {
      //   bianyuan:
      //     '["http://127.0.0.1:3006/img/images/adminbianyuan1.05f5fa98d626e49722d442ab25d1286d.png"]',
      //   round:
      //     '["http://127.0.0.1:3006/img/images/adminround1.7091d39c3e9c27141711a53fbe912c8c.png"]',
      //   luocha:
      //     '["http://127.0.0.1:3006/img/images/adminluocha1.0337469a65c4624dddda0cbe3f1e9fed.png"]',
      //   angle:
      //     '["http://127.0.0.1:3006/img/images/adminangle1.656bafa918d855754ff8b014785dc5b9.png"]',
      //   jiandun:
      //     '["http://127.0.0.1:3006/img/images/adminjiandun1.81b4c68898053755845005190a6239ec.png"]',
      //   qieduan:
      //     '["http://127.0.0.1:3006/img/images/adminqieduan1.eb3ccb25bda766a5ebc64f2cd64f0f62.png"]',
      //   texture:
      //     '["http://127.0.0.1:3006/img/images/admintexture1.c2cd8e64df7eb07e9eff38977b3d9f79.png"]',
      //   dot: '["http://127.0.0.1:3006/img/images/admindot1.963ba7ace6e850acf8cc67ce77662824.png"]',
      //   touliang:
      //     '["http://127.0.0.1:3006/img/images/admintouliang1.e73d77d03ba5b4aa6e7e73f590994249.png"]',
      //   qieduanLinears:
      //     '["http://127.0.0.1:3006/img/images/adminlinear1.149d1ec26ad507dc8b36a3ecc5b666f4.png"]',
      //   thickness:
      //     '["http://127.0.0.1:3006/img/images/adminthickness1.a99c818d198a6fa3336fa7c822171d76.png"]'
      // };
      console.log(JSON.stringify(params));
      const res = await this.$api.editPreinstall({
        ...params,
        id: this.form?.id || ""
      });
      this.form.id == res.re?.id;
      uni.showToast({
        title: res.message,
        icon: "none"
      });
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
