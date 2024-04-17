<template>
  <div class="mask" :style="customeStyle">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    // borderWidth:{
    //   type: String,
    //   default: "0 28px 36px 25px"
    // } ,
    customeStyle: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
.mask {
  width: 100px;
  height: 0;
  border-width: 0 28px 36px 25px;
  /* //12px 48px 35px 52px */
  border-style: none solid solid;
  border-color: transparent transparent #cccccc45;
  /* box-shadow: 2px 2px 5px #33333340; */
}
</style>
