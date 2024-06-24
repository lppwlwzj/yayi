<script>
export default {
  onLaunch: function (options) {
    if (options.path !== "pages/zhibao/zhibao") {
      const userInfo = uni.getStorageSync("userInfo"); //设置缓存
      if (userInfo) {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      } else {
        uni.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  }
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
.u-popup__content__close--top-left {
  top: 75px !important;
  left: 28px !important;
}
</style>
