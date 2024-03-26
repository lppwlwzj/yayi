<template>
	<view class="line-box">
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name:"my-title-line",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.line-box{
		padding: 0 10upx;
		height: 100%;		
		height: 40upx;
		.line{
			height: 100%;
			width: 6upx;;
			background-color: #ffd94c;
			border-radius: 30px;
		}
	}

</style>