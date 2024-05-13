<template>
  <view class="content">
    <view
      class="rfb"
      :style="{ paddingTop: statusBarHeight, marginBottom: '24rpx ' }"
    >
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
    <!-- 
    <view class="user-select">
      <uni-data-select
        v-model="form.root"
        placeholder="请选择上帝用户"
        :localdata="userList"
      ></uni-data-select>
    </view> -->
    <uni-collapse :show-arrow="true">
      <uni-collapse-item title="客户意向图">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.intentList"
            activeKey="intentList"
            @delete="(index) => deleteImg(index, 'intentList')"
            @add="(value) => handleAddImg(value, 'intentList')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse :show-arrow="true">
      <uni-collapse-item title="边缘">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.bianyuan"
            activeKey="bianyuan"
            @delete="(index) => deleteImg(index, 'bianyuan')"
            @add="(value) => handleAddImg(value, 'bianyuan')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="角度方圆" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.round"
            activeKey="round"
            @delete="(index) => deleteImg(index, 'round')"
            @add="(value) => handleAddImg(value, 'round')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="1号2号落差" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.luocha"
            activeKey="luocha"
            @delete="(index) => deleteImg(index, 'luocha')"
            @add="(value) => handleAddImg(value, 'luocha')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="窄细角度" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.angle"
            activeKey="angle"
            @delete="(index) => deleteImg(index, 'angle')"
            @add="(value) => handleAddImg(value, 'angle')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="尖or钝" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.jiandun"
            activeKey="jiandun"
            @delete="(index) => deleteImg(index, 'jiandun')"
            @add="(value) => handleAddImg(value, 'jiandun')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="2号远中切端上扬幅度" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.qieduan"
            activeKey="qieduan"
            @delete="(index) => deleteImg(index, 'qieduan')"
            @add="(value) => handleAddImg(value, 'qieduan')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="纹理" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.texture"
            activeKey="texture"
            @delete="(index) => deleteImg(index, 'texture')"
            @add="(value) => handleAddImg(value, 'texture')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="颈部光点" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.dot"
            activeKey="dot"
            @delete="(index) => deleteImg(index, 'dot')"
            @add="(value) => handleAddImg(value, 'dot')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="透亮" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.touliang"
            activeKey="touliang"
            @delete="(index) => deleteImg(index, 'touliang')"
            @add="(value) => handleAddImg(value, 'touliang')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="切端渐变层" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.qieduanLinears"
            activeKey="qieduanLinears"
            @delete="(index) => deleteImg(index, 'qieduanLinears')"
            @add="(value) => handleAddImg(value, 'qieduanLinears')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="厚度" :show-arrow="true">
        <div style="margin: 20rpx 0">
          <MultiUpload
            :list="form.thickness"
            activeKey="thickness"
            @delete="(index) => deleteImg(index, 'thickness')"
            @add="(value) => handleAddImg(value, 'thickness')"
          />
        </div>
      </uni-collapse-item>
    </uni-collapse>

    <view class="btn afc" @tap.stop="handleSubmit"> 确认 </view>
  </view>
</template>

<script>
import MultiUpload from "../components/multi-upload";
export default {
  components: {
    MultiUpload
  },
  data() {
    return {
      form: {
        intentList: [],
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
        thickness: [],
        root: ""
      },
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      userList: []
    };
  },
  options: { styleIsolation: "shared" },

  onLoad: function () {
    this.getInfo();
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$api.getUserList().then((res) => {
        if (!res.code) {
          this.userList = res.re.list;
        }
      });
    },
    deleteImg(index, activeKey) {
      this.form[activeKey][index] = "";
      const imgList = this.form[activeKey];
      const newList = imgList.map((item, idx) => (idx === index ? "" : item));
      this.$set(this.form, activeKey, newList);
    },
    handleAddImg(img_url, activeKey) {
      this.form[activeKey].push(img_url);
      const imgList = this.form[activeKey];
      this.$set(this.form, activeKey, imgList);
    },
    async getInfo() {
      const res = await this.$api.getPreinstall();
      if (!res.code) {
        if (!res.re) return;
        const params = {};
        Object.keys(this.form).map((key) => {
          params[key] =
            res.re[key] && key !== "id" && key !== "root"
              ? JSON.parse(res.re[key])
              : [];
        });
        this.form = {
          ...params,
          id: res.re?.id || "",
          root: res.re?.root || ""
        };
      }
    },
    async handleSubmit() {
      const params = {};
      Object.keys(this.form).map((key) => {
        params[key] =
          this.form[key].length && key !== "id" && key !== "root"
            ? JSON.stringify(this.form[key])
            : "";
      });
      const res = await this.$api.editPreinstall({
        ...params,
        id: this.form?.id || "",
        root: this.form?.root
      });
      this.form.id == res.re?.id;
      uni.showToast({
        title: res.message,
        icon: "none"
      });
      setTimeout(() => {
        uni.navigateTo({
          url: "/pages/index/index"
        });
      }, 100);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  background-color: $uni-color-bg;
  padding: 40rpx 26rpx;
  min-height: 100vh;
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
/deep/.uni-collapse-item__title-text {
  color: #dd524dab !important;
  font-size: 34rpx;
}
/deep/.uni-collapse-item__wrap {
  background: $uni-color-bg;
}
/deep/.uni-collapse-item__title-arr {
  color: $uni-color-bg;
}
/deep/.uni-collapse {
  margin: 14rpx 0rpx;
}
.user-select {
  width: 100%;
  background: #fff;
  height: 90rpx;
  border: none;
}
/deep/.uni-select {
  border: none;
}
/deep/.uni-select__input-placeholder {
  font-size: 28rpx;
  color: #dd524dab !important;
}
/deep/.uni-select__input-text {
  font-size: 28rpx;
  color: #dd524dab !important;
}
</style>
<style lang="scss">
/deep/.uni-collapse-item__wrap {
  height: auto !important;
}
</style>
