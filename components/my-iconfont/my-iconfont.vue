<template>
	<view class="icon-box">
		<view class="iconfont myIconfont" :class="name" 
		:style="style"></view>
	</view>
</template>

<script>
	export default {
		name:"my-iconfont",
		props: {
			name: String,//阿里图标名称
			size: String,//大小
			color: String,//色值
			back: Boolean,//开启背景颜色
			backColor: {//背景颜色值
				type: String,
				default: '#fff'
			},
			shape: {//背景盒子样式,circle为圆形，square为方形
				type: String,
				default: 'circle'
			}
		},
		data() {
			return {
				red:{'background':'#008000'},
				style: "",
				gold:"",
			};
		},
		mounted(){
			console.log('this.backColor',this.backColor)
			console.log('this.color',this.color)
			let b=""
			if(this.size){
				// this.$set(this.style, 'font-size',this.size)
				b="font-size"+":"+this.size+";"
			}
			if(this.color){
				// this.$set(this.style, 'color',this.color)
				b=b+"color"+":"+this.color+";"
			}
			if(this.back){
				// this.$set(this.style, 'background-color',this.backColor)
				// this.$set(this.style, 'padding','15upx')
				b=b+"background-color"+":"+this.backColor+";"
				+"padding"+":"+"15rpx"+";"
				if(this.shape == 'circle'){
					// this.$set(this.style, 'border-radius','50%')
					b=b+"border-radius"+":"+"50%"+";"
				}else{
					// this.$set(this.style, 'border-radius','5px')
					b=b+"border-radius"+":"+"5px"+";"
				}
				
			}
			this.style=b
			console.log("style",this.style)
		}
	}
</script>

<style lang="scss" scoped>
	.my-iconfont{
		font-size: 32upx;
		color: $u-tips-color;
	}
	

</style>