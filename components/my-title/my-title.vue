<template>
	<view class="title">
		<view class="title-title" :style="{
				'color' : color, 
				'background-color' : bgc,
				'padding-top' : top+'rpx', 
				'height' : tops+'rpx',
				'line-height' : tops+'rpx'
			}">
			<view v-if="isReturn" class="title-return" @click="returns()">
				<image
					:src="returnColor?'https://img0.baidu.com/it/u=4214833221,765701070&fm=253&fmt=auto&app=138&f=JPEG?w=260&h=260':'https://img0.baidu.com/it/u=4214833221,765701070&fm=253&fmt=auto&app=138&f=JPEG?w=260&h=260'">
				</image>
			</view>
			<view class="title-name">{{title_name}}</view>
		</view>
		<view :style="{height: top+tops+'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name: "titles",
		data() {
			return {
				top: 0,
				tops: 100,
				isLast: false
			};
		},
		created() {
			this.getTopWeiXin()
			this.getLast()
		},
		// title_name标题名称  	isReturn是否显示返回按钮   returnColor返回按钮颜色    color标题颜色    bgc背景色    
		props: {
			title_name: {
				type: String,
				default: ""
			},
			isReturn: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#FFFFFF"
			},
			bgc: {
				type: String,
				default: "#FFA621"
			},
			returnColor: {
				type: Boolean,
				default: true
			},
		},

		methods: {
			// 返回的箭头
			returns() {
				if (this.isLast) {
					uni.switchTab({
						url: '/pages/index/index' //返回首页
					})
				} else {
					uni.navigateBack({
						delta: 1 //返回上一页
					});
				}
			},
			// 获取小程序安全区域的高度
			getTopWeiXin() {
				this.top = parseInt(uni.getSystemInfoSync().safeAreaInsets.top * 750 / uni.getSystemInfoSync().windowWidth)
				uni.setStorageSync('top', this.top);
			},
			// 获取有无上一页
			getLast() {
				let pages = getCurrentPages(); //当前页
				console.log(pages);
				if (pages.length == 1) {
					this.isLast = true
				} else {
					this.isLast = false
				}
			}
		},
	}
</script>

<style lang="scss">
	.title {
		.title-title {
			position: fixed;
			z-index: 999;
			width: 750rpx;
			display: flex;
			justify-content: center;
			text-align: center;

			.title-return {
				width: 60rpx;
				height: 80rpx;
				margin: 15rpx 0 0 20rpx;
				position: absolute;
				z-index: 999;
				left: 0rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.title-name {
				width: 500rpx;
				text-align: center;
				font-weight: bold;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-all;
			}
		}
	}
</style>