const install = (Vue, vm) => {
	Vue.prototype.$t = {
		// 上传图片的api
		uploadUrl() {
			return "https://ditui.shandongweipai.com/api/repair/upload";
		},
		uploadTestUrl() {
			return "https://ditui.shandongweipai.com/college/img_sec_check";
		},
		// tabbar底部导航
		tabbarList() {
			return [{
					url: "/pages/business/home/home",
					iconPath: "/static/images/home.png",
					selectedIconPath: "/static/images/home-active.png",
					text: "首页",
				},
				{
					url: "/pages/business/member/member",
					iconPath: "/static/images/member.png",
					selectedIconPath: "/static/images/member-active.png",
					text: "会员",
				},
				{
					url: "/pages/business/order/order",
					iconPath: "/static/images/order.png",
					selectedIconPath: "/static/images/order-active.png",
					text: "订单",
				},
				// {
				//   url: "/pages/business/coupon/coupon",
				//   iconPath: "/static/images/coupon.png",
				//   selectedIconPath: "/static/images/coupon-active.png",
				//   text: "优惠券",
				// },
				// {
				//   url: "/pages/business/prize/prize",
				//   iconPath: "/static/images/gift.png",
				//   selectedIconPath: "/static/images/gift-active.png",
				//   text: "奖品",
				// },
				// {
				//   url: "/pages/business/ad/ad",
				//   iconPath: "/static/images/ad.png",
				//   selectedIconPath: "/static/images/ad-active.png",
				//   text: "广告",
				// },
				{
					url: "/pages/business/mine/mine",
					iconPath: "/static/images/personal.png",
					selectedIconPath: "/static/images/personal-active.png",
					text: "我的",
				},
			]
		},
		agentTabbarList() {
			return [{
					url: "/pages/agent/home/home",
					iconPath: "/static/images/home.png",
					selectedIconPath: "/static/images/home-active.png",
					text: "首页统计",
				},
				{
					url: "/pages/agent/store/store",
					iconPath: "/static/images/store.png",
					selectedIconPath: "/static/images/store-active.png",
					text: "商家列表",
				},
				{
					url: "/pages/agent/ad/ad",
					iconPath: "/static/images/ad.png",
					selectedIconPath: "/static/images/ad-active.png",
					text: "广告推广",
				},
				{
					url: "/pages/agent/mine/mine",
					iconPath: "/static/images/personal.png",
					selectedIconPath: "/static/images/personal-active.png",
					text: "我的",
				},
			]
		},
		// 模态框
		modal(title, content, showCancel, confirmText, confirmColor, callback) {
			uni.showModal({
				title: title || "提示",
				content: content,
				showCancel: showCancel,
				cancelColor: "#666",
				confirmColor: confirmColor || "#389bf2",
				confirmText: confirmText || "确定",
				success(res) {
					if (res.confirm) {
						callback && callback(true)
					} else {
						callback && callback(false)
					};
				}
			});
		},
		// 是否登录
		goLogin() {
			this.modal("提示", "您还未登录，现在需要登录吗？", true, "登录", "", (res) => {
				if (res) {
					uni.navigateTo({
						url: "/pages/login/login",
					});
				} else {
					// uni.switchTab({
					//   url: "/pages/home/home",
					// });
				};
			});
		},
		// 查看位置权限
		locationPower() {
			this.modal("提示", "获取当前的位置信息，以便更好的服务您", false, "设置", "", () => {
				uni.openSetting({
					success: () => {},
				});
			});
		},
		// 查看订阅消息权限
		messagePower() {
			this.modal("提示", "开启消息订阅，以便更好的服务您", false, "设置", "", () => {
				uni.openSetting({
					success: () => {},
				});
			});
		},
		// 检测内容
		async testContent(openid, content) {
			let data = {
				openid,
				content
			};
			let result = await vm.$api.testContent(data).then(res => {
				return res;
			})
			return result;
		},
		cloneText(text) {
			uni.setClipboardData({
				data: text.toString(),
				showToast: false,
				success: () => {
					// $u.toast("复制成功~");
					uni.showToast({
						icon: 'none',
						title: '复制成功~',
						duration: 2000
					});
				},
			});
		},
		// 获取日期
		getDate(type = 1, num = 0) {
		  let second = num * 1000 * 24 * 60 * 60;
		  let date = new Date(new Date().getTime() + (type == 1 ? second : -second));
		  let year = date.getFullYear();
		  let month = date.getMonth() + 1;
		  let day = date.getDate();
		  let currentDate = `${year}-${this.zeroFill(month)}-${this.zeroFill(day)}`;
		  return currentDate;
		},
		// 获取日期
		addDate(dateStr, num = 0) {
		  let second = num * 1000 * 24 * 60 * 60;
		  let date = new Date(new Date(dateStr).getTime() + second);
		  let year = date.getFullYear();
		  let month = date.getMonth() + 1;
		  let day = date.getDate();
		  let currentDate = `${year}-${this.zeroFill(month)}-${this.zeroFill(day)}`;
		  return currentDate;
		},
		// 补领函数
		zeroFill(data) {
		  return data >= 10 ? data : "0" + data;
		},
	};
	
};

export default {
	install
};