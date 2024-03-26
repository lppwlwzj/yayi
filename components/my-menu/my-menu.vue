<template>
	<view class="menu-box u-flex u-flex-wrap">
		<view class="item" :style="style" v-for="(item,index) in list" :key="index" @click="goPage(item.link)">
			<view class="u-flex-column u-row-center u-col-center pd-top10rpx pd-bottom10rpx ">
				<view class="image-msg">
					<u--image width="80rpx" height="80rpx" :src="item.url"></u--image>
					<view class="msg_count" v-if="item.msg_count>0">
						{{item.msg_count}}
					</view>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-menu",
		props: {
			count: Number,
			list: Array
		},
		data() {
			return {
				style:''
			};
		},
		mounted(){
			if(this.count){
				let width = Math.floor(100 / this.count) + '%'
				
				//this.$set(this.style, 'width',width)
				this.style = `width: ${width};`
			}
			
		},
		methods: {
			goPage(link){
				if(link){
					this.$emit('goPage', link)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-box {
		.item {
			width: 20%;
			margin-bottom: 10upx;
			.name {
				font-size: 24upx;
			}
		}
	}
	.image-msg{
		position: relative;
		.msg_count{
			background-color: #df2019;
			font-size: 22rpx;
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 50%;
			width: 30rpx;
			height: 30rpx;
			text-align: center;
			line-height: 30rpx;
			color: #fff;
		}
	}
</style>