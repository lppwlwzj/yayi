<template>
	<view class="img-box" :style="{'padding-bottom': height,'border-radius': radius}">
		<image class="img" :src="src" mode="aspectFill"/>
	</view>
</template>

<script>
	export default {
		name:"my-image",
		props: {
			height:String,
			src: String,
			radius: {
				type: String,
				default: '0px'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.img-box{
		position: relative;
		width: 100%;
		overflow: hidden;
		.img{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;								
		}
	}

</style>