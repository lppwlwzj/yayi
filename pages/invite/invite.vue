<template>
	<view class="login">
		<view style="width: 100%">
			<image :src="bg" mode="widthFix" style="width: 100%"></image>
		</view>
		<view class="footer">
			<view class="content flex jc_start">
				<image :src="qrcode" mode="aspectFill" class="qrcode"></image>
				<image :src="userinfo.avatar" mode="scaleToFill" class="images"></image>
				<view class="tip">
					<view class="name">{{userinfo.nickname}}</view>
					<view class="job"> {{userinfo.company}}  |   {{userinfo.job}}</view>

				</view>
			</view>
			<view class="btn" >长按保存图片到手机</view>
		</view>
		<image v-if="toCanvas" :src="toCanvas" style="width: 100%;height:100%;position: absolute;top: 0;left: 0;"></image>
	</view>
</template>

<script>
	import html2canvas from '@/common/html2canvas.js'
	export default {
		data() {
			return {
				bg: "",
				qrcode:"",
				userinfo:{},
				toCanvas:''
			};
		},
		onLoad() {
			this.userinfo = uni.getStorageSync("userInfo");
			this.getShareCover();
			this.getUserQrCode()
		},
		onReady() {
			setTimeout(()=>{
				this.save()
			},3000)
		},
		methods: {
			save(){
				html2canvas(document.querySelector('.login'),{
					useCORS: true  //很重要支持跨域图片，否则需要自己将线上图片转为本地图片（转base64）
				}).then(canvas=>{
					let url = canvas.toDataURL("image/png");
					this.toCanvas = url
				})
			},
			async getShareCover() {
				const res = await this.$api.getShareCover();
				console.log(res);
				this.bg = res.image;
			},
			async getUserQrCode() {
				const res = await this.$api.getUserQrCode();
				this.qrcode = res.qrcode;
			}
		}
	};
</script>

<style scoped lang="scss">
	.login {
		width: 100%;
        height: 100vh;
		position: relative;
		.images {
			width: 100rpx;
			height: 100rpx;
		}

		.footer {
			padding: 30rpx;
			box-sizing: border-box;

			background: #ffffff;
			font-size: 16px;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #ffffff;

			.content {
				position: relative;
				padding: 30rpx 0;
			}

			.qrcode {
				position: absolute;
				bottom: 30rpx;
				right: 30rpx;
				width: 240rpx;
				height: 240rpx;
			}
			.tip{
				margin-left: 20rpx;
			}
			.name {
				font-size: 32rpx;
				font-weight: 600;
				margin-bottom: 16rpx;
			}

			.btn {
				width: 700rpx;
				text-align: center;
				border-radius: 36rpx;
				background-color: #02c3a8;
				margin: 28rpx auto;
				height: 80rpx;
				color: #ffffff;
				line-height: 80rpx;
			}

		}
	}
</style>