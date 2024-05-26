<template>
  <view class="register fc">

    <u--form
      labelWidth="auto"
      labelPosition="left"
      :model="form"
      ref="uForm"
      :rules="rules"
    >
      <view class="info fc">
        <image
          src="../../static/images/ECO-UI-02.png"
          mode="widthFix"
          class="logo"
        ></image>

        <!-- 昵称 -->
        <u-form-item label="账号" prop="nickname">
          <u--input
            :disabled="true"
            placeholder=" "
            disabledColor="#fff"
            v-model="form.usercount"
            border="none"
            inputAlign="left"
            suffixIcon="edit-pen"
            suffixIconStyle=" color: #dd524dab !important;"
          ></u--input>
        </u-form-item>
    
        <u-form-item label="密码" prop="password">
          <!-- <u--input
            :password="!visible"
            placeholder=" "
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left"
          >
            
            <template slot="suffix">
              <u-icon
                slot="suffix"
                @click="visible = !visible"
                size="18"
                color="#dd524dab"
                :name="visible ? 'eye' : 'eye-off'"
              ></u-icon>
            </template>
          </u--input> -->

          		          <view class="u-demo-block__content">
        <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
        <!-- #ifndef APP-NVUE -->
        <u-input placeholder=" "   
           :password="!visible"
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left">
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
          <u--input  
            placeholder=" "   
           :password="!visible"
            disabledColor="#fff"
            v-model="form.password"
            border="none"
            inputAlign="left">
          <!-- #endif -->
             <u-icon
                slot="suffix"
                @click="visible = !visible"
                size="18"
                color="#dd524dab"
                :name="visible ? 'eye' : 'eye-off'"
              ></u-icon>
      <!-- #ifndef APP-NVUE -->
      </u-input>
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      </u--input>
      <!-- #endif -->
    </view>

        </u-form-item>

        <!-- <view class="btn" @tap="login"> 登录 </view> -->
        
        <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-show="show">授权手机号</button>
        <view class="btn" @tap="login"> 登录 </view>
      </view>
    </u--form>
  </view>
</template>

<script>
import WXBizDataCrypt from "../../common/WXBizDataCrypt.js" // 需要引入
export default {
  data() {
    return {
      visible: false,
      form: {
        usercount: "",

        password: ""
      },
      membertypeList: [],
      membertypeShow: false,
      show: false,
      rules: {
        usercount: [
          {
            required: true,
            message: "请填写账号",
            trigger: ["change", "blur"]
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["change", "blur"]
          }
        ]
      },
      address: [],
      appid:"wxde671469f6dd9711",
      phone_code:"",
      phone_encryptedData:"",
      phone_iv:"",
      login_code:"",
      openid:"",
      login_code:"",
      session_key:"",
      show:true
      
    };
  },
  onLoad:function() {
     const user =  uni.getStorageSync('user');
     if(user) {
      this.show = false;
      this.form = {...user}
     }else {
      uni.login({
				    provider: 'weixin',
				    success: res => {
						this.login_code = res.code // 获得的code
            this.get_miyao()
					}
				    
				});
     }
  },
  methods: {
    jiemi(){ // 解密需要appid 会话密钥；然后需要手机号的加密字段
				let pc = new WXBizDataCrypt(this.appid,  this.session_key);
				let data = pc.decryptData(this.phone_encryptedData , this.phone_iv);  
				this.form.usercount = data.phoneNumber // 手机号
			},
    getPhoneNumber(res){ // 获取手机号
				this.phone_code = res.detail.code // 获得的手机code
				this.phone_encryptedData = res.detail.encryptedData //用于解密
				this.phone_iv = res.detail.iv // 用于解密
        this.jiemi();
        this.show = false
			},

    get_miyao(){ // 获取密钥 === 需要登录才可以获取密钥
				uni.request({
				    url: 'https://api.weixin.qq.com/sns/jscode2session',// 请求微信服务器
				    method:'GET',
				    data: {
						appid: this.appid,        //你的小程序的APPID
						secret: '8163e585493cb7ac881574e1cec415a2',    //你的小程序秘钥secret,  
						js_code: 	this.login_code,    //wx.login 登录成功后的code
						grant_type:'authorization_code'
				    },
				    success: (res) => {
				        this.openid=res.data.openid    //openid 用户唯一标识
				        this.session_key=res.data.session_key    //session_key  会话密钥
				    }
				});
			},

    async login() {
      this.$refs.uForm
        .validate()
        .then(() => {
          this.handleRegister();
        })
        .catch((errors) => {
          console.log("validate ~ valid:errors", errors);
        });
    },
    async handleRegister() {
      // // #ifdef MP-WEIXIN
      // <view>仅在5+app平台上显示代码</view>;
      // // #endif

      // <!-- #ifndefMP-WEIXIN -->
      //       <view>
      //         <slot name="suffix">
      //           <u-icon
      //             @click="visible = !visible"
      //             size="18"
      //             color="#dd524dab"
      //             :name="visible ? 'eye' : 'eye-off'"
      //           ></u-icon>
      //         </slot>
      //       </view>
      const res = await this.$api.login({
        ...this.form
      });
      if (res.code === 0) {
        const userInfo = {
          token: res.re.token,
          ...res.re.userinfo
        };
        uni.setStorageSync("userInfo", userInfo); //设置缓存
        //记住账号密码
        uni.setStorageSync("user", res.re.userinfo); //设置缓存
        uni.showToast({
          title: "登录成功",
          success() {
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/index/index"
              });
            }, 100);
          }
        });
      } else {
        uni.showToast({
          title: res.message,
          icon: "none"
        });
      }
    },
    onchange(e) {
      const arr = e.detail.value;
      this.form.province = arr[0].text;
      this.form.city = arr[0].text;
      this.form.distinct = arr[0].text;
      this.$refs.uForm.validateField("distinct");
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100vh;
  // background-color: #37352c;
  background: $uni-color-bg !important;

  .logo {
    width: 220rpx;
    height: 220rpx;
    margin: 0 auto 20rpx;
  }

  .info {
    -moz-box-shadow: 2px 2px 5px #33333340;
    -webkit-box-shadow: 2px 2px 5px #33333340;
    box-shadow: 2px 2px 5px #33333340;

    width: 684rpx;

    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    border: 1rpx solid rgba(238, 238, 238, 0);
    background-color: #ffffff;
    margin: 0rpx auto 0;
    padding: 80rpx 30rpx;
    box-sizing: border-box;
    border-radius: 30rpx;
  }

  .btn {
    text-align: center;
    line-height: 88rpx;
    width: 100%;
    height: 88rpx;
    border-radius: 20px;
    color: #ffffff;
    background: #dd524d63;
    font-size: 16px;
    margin: 30rpx auto;
    font-size: 32rpx;
    font-family: Source Han Sans SC, Source Han Sans SC;
    font-weight: 500;
  }
}
.u-form-item {
  margin: 20rpx 0;
  width: 100%;
  padding: 0rpx 18rpx;
  box-sizing: border-box;
  border: solid 1px $uni-color-theme;
  border-radius: 46rpx;
  span {
    color: #dd524dab !important;
  }
}

/deep/.u-form-item__body__left__content__label {
  color: $uni-color-theme;
}
.slide-img{
  position: relative;
}
</style>
