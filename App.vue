<script>
export default {
	onLaunch: function(options) {
		// TODO:记得注释掉
		uni.setStorageSync('openid', 'od-AX6IkbseRcOAebloryqO8I_pE');
		console.log(options, 'options');
		if (options.query.qrcode) {
			let qrcode = options.query.qrcode;
			uni.setStorageSync('qrcode', qrcode);
		}
		let openid = uni.getStorageSync('openid');
		if (openid) {
			this.login(openid);
		} else {
			const code = this.queryURLParams('code');
			if (code) {
				this.getOpenId(code);
			} else {
				const redirectUri = encodeURIComponent(window.location.href.split('?code')[0]);
				const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${'wx6a23d20cdaa17e17'}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
				location.href = url;
			}
		}
	},
	methods: {
		queryURLParams(key) {
			let url = window.location.href;
			let pattern = /(\w+)=(\w+)/gi; //定义正则表达式
			let parames = {}; // 定义参数对象
			url.replace(pattern, ($, $1, $2) => {
				parames[$1] = $2;
			});
			return parames ? parames[key] : null;
		},
		async getOpenId(code) {
			const res = await this.$api.getOpenId({
				code
			});
			uni.setStorageSync('openid', res.open_id);
			uni.setStorageSync('nickname', res.nickname);
			uni.setStorageSync('avatar', res.avatar);
			this.login(res.open_id);
		},
		async login(open_id) {
			const res = await this.$api.login({
				open_id
			});
			if (!res.data && !res.userinfo) {
				// uni.redirectTo({
				// 	url:'/pages/register/register'
				// })
			} else {
				if (res.userinfo) {
					console.log(res.userinfo);
					uni.setStorageSync('userInfo', res.userinfo);
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
