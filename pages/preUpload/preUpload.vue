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

    <uni-data-select
      class="user-select"
      v-model="form.root"
      placeholder="请选择上帝用户"
      :localdata="userList"
    ></uni-data-select>
    <uni-collapse :show-arrow="true">
      <uni-collapse-item title="客户意向图">
        <MultiUpload
          :list="form.intentList"
          activeKey="intentList"
          @delete="(index) => deleteImg(index, 'intentList')"
        />
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse :show-arrow="true">
      <uni-collapse-item title="边缘">
        <MultiUpload
          :list="form.bianyuan"
          activeKey="bianyuan"
          @delete="(index) => deleteImg(index, 'bianyuan')"
        />
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="角度方圆" :show-arrow="true">
        <MultiUpload
          :list="form.round"
          activeKey="round"
          @delete="(index) => deleteImg(index, 'round')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="1号2号落差" :show-arrow="true">
        <MultiUpload
          :list="form.luocha"
          activeKey="luocha"
          @delete="(index) => deleteImg(index, 'luocha')"
        />
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="窄细角度" :show-arrow="true">
        <MultiUpload
          :list="form.angle"
          activeKey="angle"
          @delete="(index) => deleteImg(index, 'angle')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="尖or钝" :show-arrow="true">
        <MultiUpload
          :list="form.jiandun"
          activeKey="jiandun"
          @delete="(index) => deleteImg(index, 'jiandun')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="2号远中切端上扬幅度" :show-arrow="true">
        <MultiUpload
          :list="form.qieduan"
          activeKey="qieduan"
          @delete="(index) => deleteImg(index, 'qieduan')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="纹理" :show-arrow="true">
        <MultiUpload
          :list="form.texture"
          activeKey="texture"
          @delete="(index) => deleteImg(index, 'texture')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="颈部光点" :show-arrow="true">
        <MultiUpload
          :list="form.dot"
          activeKey="dot"
          @delete="(index) => deleteImg(index, 'dot')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="透亮" :show-arrow="true">
        <MultiUpload
          :list="form.touliang"
          activeKey="touliang"
          @delete="(index) => deleteImg(index, 'touliang')"
        />
      </uni-collapse-item>
    </uni-collapse>

    <uni-collapse>
      <uni-collapse-item title="切端渐变层" :show-arrow="true">
        <MultiUpload
          :list="form.qieduanLinears"
          activeKey="qieduanLinears"
          @delete="(index) => deleteImg(index, 'qieduanLinears')"
        />
      </uni-collapse-item>
    </uni-collapse>
    <uni-collapse>
      <uni-collapse-item title="厚度" :show-arrow="true">
        <MultiUpload
          :list="form.thickness"
          activeKey="thickness"
          @delete="(index) => deleteImg(index, 'thickness')"
        />
      </uni-collapse-item>
    </uni-collapse>

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
      userList: []
    };
  },
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
      //13666633692
      // const params =  {"intentList":"[\"http://127.0.0.1:3006/img/images/da66caef41e94149077c29b7e943b830.adminintentList1.png\"]","bianyuan":"[\"http://127.0.0.1:3006/img/images/d8e58f3592088697885daaf36e758271.adminbianyuan1.png\"]","round":"[\"http://127.0.0.1:3006/img/images/930ccdcaef4886330cbff6d786250a31.adminround1.png\",\"http://127.0.0.1:3006/img/images/9ff9a7453efe966ba8fd0ee8611135d2.adminround2.png\"]","luocha":"[\"http://127.0.0.1:3006/img/images/77d9d5cb7dcc7a0011aaef6cd13cbdb8.adminluocha1.png\"]","angle":"[\"http://127.0.0.1:3006/img/images/7330607ce8c121b69b6cbde9062026c5.adminangle1.png\"]","jiandun":"[\"http://127.0.0.1:3006/img/images/28f88070ce62f8320c9b58421b5fab60.adminjiandun1.png\"]","qieduan":"[\"http://127.0.0.1:3006/img/images/6fb9bcf4279fdccfb15b3aebe319e690.adminqieduan1.png\"]","texture":"[\"http://127.0.0.1:3006/img/images/2f594094bb7208b482f3dcd6e7a43d58.admintexture1.png\"]","dot":"[\"http://127.0.0.1:3006/img/images/da9b36ee6677054a7ff9a3ed7074d170.admindot1.png\"]","touliang":"[\"http://127.0.0.1:3006/img/images/76bedff082079077ad8bc917125a6497.admintouliang1.png\"]","qieduanLinears":"[\"http://127.0.0.1:3006/img/images/2dd315d8258ec0dee9425b04932d3212.adminqieduanLinears1.png\"]","thickness":"[\"http://127.0.0.1:3006/img/images/62cf45be9c15cf347a726b7ecf766b0b.adminthickness1.png\"]","root":""}
      console.log(JSON.stringify(params));
      const res = await this.$api.editPreinstall({
        ...params,
        id: this.form?.id || "",
        root: this.form?.root || ""
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
  margin: 24rpx 0rpx;
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
