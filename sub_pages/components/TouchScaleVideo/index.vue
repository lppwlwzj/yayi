<template>
  <!-- <view class="container"> -->
  <video
    ref="myVideo"
    class="video"
    :style="{
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
    }"
    :src="video_url"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  ></video>
  <!-- </view> -->
</template>

<script>
export default {
  name: "touch-scale-video",
  props: {
    video_url: {
      //名称
      type: String,
      default: "",
      systemInfo: null
    }
  },
  data() {
    return {
    //   videoSrc: "https://gdcasa.cn:3010/img/images/test.mov",
      touchStart: { x: 0, y: 0, time: 0 },
      scale: 1,
      translateX: 0,
      translateY: 0,
      lastTouchDistance: 0
    };
  },
  methods: {
    handleTouchStart(event) {
      // 单指操作
      if (event.touches.length === 1) {
        this.touchStart.x = event.touches[0].pageX;
        this.touchStart.y = event.touches[0].pageY;
        this.touchStart.time = Date.now();
      } else if (event.touches.length === 2) {
        //双指操作
        this.lastTouchDistance = this.getTouchDistance(event.touches);
      }
    },
    handleTouchMove(event) {
      if (event.touches.length === 1) {
        //   const deltaX = event.touches[0].pageX - this.touchStart.x;
        //   const deltaY = event.touches[0].pageY - this.touchStart.y;
        //   this.translateX += deltaX;
        //   this.translateY += deltaY;

        const { pageX, pageY } = touches[0];
        this.translateX = pageX - this.touchStart.x;
        this.translateY = pageY - this.touchStart.y;

        this.applyTransform();
        this.touchStart.x = event.touches[0].pageX;
        this.touchStart.y = event.touches[0].pageY;
      } else if (event.touches.length === 2) {
        const touchDistance = this.getTouchDistance(event.touches);
        const deltaScale = touchDistance / this.lastTouchDistance;
        this.scale *= deltaScale;
        this.lastTouchDistance = touchDistance;
        this.applyTransform();
      }
    },
    handleTouchEnd(event) {
      // Reset touch start data
      this.touchStart = { x: 0, y: 0, time: 0 };
    },
    getTouchDistance(touches) {
      const dx = touches[0].pageX - touches[1].pageX;
      const dy = touches[0].pageY - touches[1].pageY;
      return Math.sqrt(dx * dx + dy * dy);
    },
    applyTransform() {
      // const video = document.getElementById('myVideo');
      // const video = this.$refs.myVideo;
      // console.log('video----',video)
      //    video.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }
  }
};
</script>
<!--   
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .video {
    width: 100%;
    height: 200px !important;
  /*  max-width: 100%;
    max-height: 100%; */
  }
  </style> -->

<style lang="scss" scoped>
.video {
  width: 100vw;
  height: 200px;
}
</style>
