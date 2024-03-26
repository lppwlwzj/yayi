<template>
  <view class="content">
    <view class="tit">{{ title }}</view>
    <rich-text :nodes="nodes"></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      title: "",
      nodes: ""
    };
  },

  onLoad(options) {
    this.handleType(options.type);
  },
  methods: {
    async handleType(type) {
      let name = "";
      switch (type) {
        case "service":
          name = "服务协议";
          break;
        case "privacy":
          name = "隐私政策";
          break;
      }
      uni.setNavigationBarTitle({
        title: name
      });

      try {
        let res = await this.$api.getContract({
          type
        });
        this.nodes = res.content;
      } catch (err) {}
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 0 30rpx;
}
.tit {
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
  text-align: center;
  margin-bottom: 30rpx;
}
</style>
