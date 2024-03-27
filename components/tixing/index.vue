<template>
  <div
    class="mask"

  >
    <slot />
  </div>
</template>

<script>
export default {
  // props: {
  //   // borderWidth:{
  //   //   type: String,
  //   //   default: "0 28px 36px 25px"
  //   // } ,
  //   width: {
  //     type: String,
  //     default: "50px"
  //   }
  // }
};
</script>

<style>
.mask {
  width: 50px;
  height: 0;
  border-width: 0 28px 36px 25px;
  border-style: none solid solid;
  border-color: transparent transparent #cccccc45;
  /* box-shadow: 2px 2px 5px #33333340; */
}
</style>
