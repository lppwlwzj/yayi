<template>
  <div class="mask" :style="customeStyle">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
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
  border-style: none solid solid;
  border-color: transparent transparent #cccccc45;
}
</style>
