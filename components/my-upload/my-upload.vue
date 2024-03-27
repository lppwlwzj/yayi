<template>
  <view>
    <u-upload
      :accept="accept"
      :fileList="data"
      @afterRead="afterRead"
      @delete="deletePic"
      :name="name"
      :multiple="multiple"
      :maxCount="maxCount"
      :width="width"
      :height="height"
    >
      <slot />
    </u-upload>
  </view>
</template>

<script>
export default {
  name: "my-upload",
  props: {
    width: {
      type: String,
      default: "80rpx"
    },
    height: {
      type: String,
      default: "80rpx"
    },
    fileList: {
      //显示已上传的文件列表
      type: Array,
      default: () => []
    },
    multiple: {
      //是否多选
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: "image"
    },
    maxCount: {
      //最大上传数量
      type: Number,
      default: 10
    },
    name: {
      //名称
      type: String,
      default: "1"
    },
    customBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: []
    };
  },
  watch: {
    fileList: {
      deep: true,
      handler(newVal, oldVal) {
        this.data = newVal;
      }
    }
  },
  mounted() {
    this.data = this.fileList;
    console.log("🚀 ~ mounted ~ this.data:", this.customBg);
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.data.splice(event.index, 1);
      this.$emit("deleteCall", this.data);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this.data.length;
      lists.map((item) => {
        this.data.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      for (let i = 0; i < lists.length; i++) {
        let result = "";
        await this.$api
          .uploadImg(lists[i].url)
          .then((res) => {
            result = res.data;
          })
          .catch((res) => {
            console.log(res);
          });
        this.$emit("successCall", result);
        let item = this.data[fileListLen];
        this.data.splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result
          })
        );
        fileListLen++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.default-bg {
  position: relative;

  background: #000;
}
</style>
