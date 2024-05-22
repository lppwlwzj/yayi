<template>
  <image
    :src="img_url"
    mode="scaleToFill"
    :style="{
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      width: `100vw`,
      height: `${imageHeight}px`
    }"
    :show-menu-by-longpress="true"
    class="img-block"
    @load="imageLoad"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  ></image>
  <!-- transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`, -->
</template>

<script>
export default {
  name: "touch-scale-img",
  props: {
    img_url: {
      //名称
      type: String,
      default: "",
      systemInfo: null
    }
  },
  mounted() {
    const res = uni.getSystemInfoSync();
    this.systemInfo = res;
  },
  data() {
    return {
      imageHeight: 0,
      data: [],
      timer: null,
      popupShow: false,
      translateX: 0,
      translateY: 0,
      distance: 0,
      scale: 1,
      rotate: 0,
      oldRotate: 0,
      baseScale: 1,
      baseDistance: 0, // 初始化基准距离
      startMove: {
        x: 0,
        y: 0
      },
      startTouches: []
    };
  },
  methods: {
    imageLoad: function (e) {
      let $width = e.detail.width; //获取图片真实宽高
      let $height = e.detail.height;
      this.imageHeight = (this.systemInfo.screenWidth * $height) / $width;
    },
    //实现单指拖拽比较简单，只需要记录移动的点坐标，然后减去起始点坐标，就可以求出相对页面的移动距离
    // touchStart(e) {
    //   const touches = e.touches;
    //   const { translateX, translateY } = this;
    //   const { pageX, pageY } = touches[0];
    //   this.startMove = {
    //     x: pageX - translateX,
    //     y: pageY - translateY
    //   };
    //   this.startTouches = touches;
    // },
    touchStart(e) {
      const touches = e.touches;
      const { translateX, translateY } = this;
      const { pageX, pageY } = touches[0];
      this.startMove = {
        x: pageX - translateX,
        y: pageY - translateY
      };
      this.startTouches = touches;
      console.log("单值操作");
      if (touches.length === 2) {
        // 双指操作开始，记录初始状态
        this.baseDistance = Math.sqrt(
          (touches[0].pageX - touches[1].pageX) ** 2 +
            (touches[0].pageY - touches[1].pageY) ** 2
        );
        this.baseScale = this.scale; // 记录当前缩放比例作为基准
        console.log("双指操作开始", this.baseDistance, this.baseScale);
      }
    },

    // touchMove(e) {
    //   console.log("🚀 ~ touchMove ~ e:", e);
    //   const touches = e.touches;
    //   const { pageX: onePageX, pageY: onePageY } = touches[0];
    //   const { startMove } = this;
    //   this.translateX = onePageX - startMove.x;
    //   this.translateY = onePageY - startMove.y;
    // },
    //双指缩放的原理是根据两点坐标求出距离(勾股定理)，然后在用移动坐标的距离比就可以求出缩放倍数
    // touchMove(e) {
    //   const touches = e.touches;
    //   const { pageX: onePageX, pageY: onePageY } = touches[0];
    //   const { startMove, scale, distance: oldDistance, startTouches } = this;
    //   if (touches.length === 2 && startTouches.length === 2) {
    //     // 双指缩放
    //     const { pageX: twoPageX, pageY: twoPageY } = touches[1];
    //     // 求出当前双指距离
    //     const distance = Math.sqrt(
    //       (twoPageX - onePageX) ** 2 + (twoPageY - onePageY) ** 2
    //     );
    //     this.distance = distance;
    //     this.scale = scale * (distance / (oldDistance || distance));
    //   } else if (startTouches.length !== 2) {
    //     // 单指拖拽
    //     this.translateX = onePageX - startMove.x;
    //     this.translateY = onePageY - startMove.y;
    //   }
    // },
    getAngle(p1, p2) {
      const x = p1.pageX - p2.pageX;
      const y = p1.pageY - p2.pageY;
      return (Math.atan2(y, x) * 180) / Math.PI;
    },
    //优化前
    //双指旋转的原理是根据三角函数求出起始点的角度，然后再求出移动坐标的角度，相减然后加上上一次旋转的角度就等于你当前所需的选择角度
    // touchMove(e) {
    //   const touches = e.touches;
    //   const { pageX: onePageX, pageY: onePageY } = touches[0];
    //   const {
    //     startMove,
    //     scale,
    //     distance: oldDistance,
    //     startTouches,
    //     oldRotate
    //   } = this;
    //   if (touches.length === 2 && startTouches.length === 2) {
    //     const { pageX: twoPageX, pageY: twoPageY } = touches[1];
    //     const distance = Math.sqrt(
    //       (twoPageX - onePageX) ** 2 + (twoPageY - onePageY) ** 2
    //     );
    //     let rotate =
    //       this.getAngle(touches[0], touches[1]) -
    //       this.getAngle(startTouches[0], startTouches[1]) +
    //       oldRotate;
    //     // 如果大于360度，就减去360
    //     rotate = rotate > 360 ? rotate - 360 : rotate;
    //     this.distance = distance;
    //     this.scale = scale * (distance / (oldDistance || distance));
    //     this.rotate = rotate;
    //   } else if (startTouches.length !== 2) {
    //     this.translateX = onePageX - startMove.x;
    //     this.translateY = onePageY - startMove.y;
    //   }
    // },
    touchMove(e) {
      const touches = e.touches;
      if (touches.length === 2 && this.startTouches.length === 2) {
        // 双指操作，进行缩放
        const currentDistance = Math.sqrt(
          (touches[0].pageX - touches[1].pageX) ** 2 +
            (touches[0].pageY - touches[1].pageY) ** 2
        );
        const scaleChange = currentDistance / this.baseDistance;
        const _scale = this.baseScale * scaleChange;
        this.scale = _scale < 0.3 ? 0.3 : _scale; // 相对于初始缩放比例进行调整
        // if( this.scale <= 1.5) {
        //   this.translateX = 0;
        //   this.translate= 0;
        // }
        console.log("哈哈哈哈哈哈", this.scale, this.baseScale, scaleChange);

        let rotate =
          this.getAngle(touches[0], touches[1]) -
          this.getAngle(this.startTouches[0], this.startTouches[1]) +
          this.oldRotate;
        rotate = rotate > 360 ? rotate - 360 : rotate;
        this.rotate = rotate;
      } else if (this.startTouches.length !== 2) {
        // 单指操作，进行平移
        const { pageX, pageY } = touches[0];
        this.translateX = pageX - this.startMove.x;
        this.translateY = pageY - this.startMove.y;
      }
    },
    touchEnd() {
      // 保存当前旋转角度
      this.oldRotate = this.rotate;
    }
  }
};
</script>

<style lang="scss" scoped>
.img-block {
  width: 100vw;
  height: 320px;
}
</style>
