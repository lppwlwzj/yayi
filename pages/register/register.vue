<template>
  <view class="register">
    <view class="content">
      <image
        src="../../static/img/rergister.png"
        mode="widthFix"
        class="image"
      ></image>

      <view class="title">完善信息成为会员 </view>
      <u--form
        labelWidth="auto"
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="uForm"
      >
        <view class="info">
          <view class="info-title">基础信息</view>

          <!-- 昵称 -->
          <u-form-item label="昵称" prop="nickname" borderBottom required>
            <u--input
              placeholder="请输入"
              disabledColor="#fff"
              v-model="form.nickname"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <!-- 性别 -->
          <u-form-item label="性别" borderBottom prop="gender" required>
            <u-radio-group v-model="form.gender" placement="row">
              <u-radio
                label="男"
                :name="1"
                active-color="#02C3A8"
                style="margin-right: 12px"
              >
              </u-radio>
              <u-radio label="女" :name="0" active-color="#02C3A8"> </u-radio>
            </u-radio-group>
          </u-form-item>
          <!-- 公司 -->
          <u-form-item label="公司" prop="company" borderBottom required>
            <u--input
              placeholder="请输入"
              disabledColor="#fff"
              v-model="form.company"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <!-- 职位 -->
          <u-form-item label="职位" prop="job" borderBottom required>
            <u--input
              placeholder="请输入职位"
              v-model="form.job"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <!-- 身份类型 -->
          <u-form-item
            label="身份类型"
            prop="membertype"
            borderBottom
            @tap="membertypeShow = true"
            required
          >
            <u--input
              placeholder="请选择身份类型"
              disabled
              style="width: 100%"
              disabledColor="#fff"
              v-model="form.membertype"
              border="none"
              inputAlign="right"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-picker
              v-if="membertypeShow"
              :show="true"
              keyName="label"
              :columns="membertypeList"
              @cancel="membertypeShow = false"
              @confirm="selectMembertype"
            ></u-picker>
          </u-form-item>

          <u-form-item label="联系方式" prop="mobile" borderBottom required>
            <u--input
              placeholder="请输入联系方式"
              v-model="form.mobile"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <u-form-item label="真实姓名" prop="realname" borderBottom required>
            <u--input
              placeholder="请输入真实姓名"
              v-model="form.realname"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <u-form-item label="微信号" prop="wx_no" borderBottom required>
            <u--input
              placeholder="请输入微信号"
              v-model="form.wx_no"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
          <u-form-item label="联系邮箱" prop="email" required>
            <u--input
              placeholder="请保证真实有效"
              v-model="form.email"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
        </view>
        <view class="info">
          <view class="info-title">地址信息</view>
          <u-form-item
            label="所在地址"
            prop="distinct"
            borderBottom
            @tap="show = true"
            required
          >
            <!-- <u--input
              placeholder="省、市、区、街道"
              disabled
              style="width: 100%"
              disabledColor="#fff"
              v-model="form.membertype"
              border="none"
              inputAlign="right"
            ></u--input> -->
            <uni-data-picker
              placeholder="省、市、区、街道"
              :localdata="address"
              v-model="form.distinct"
              @change="onchange"
              popup-title="请选择地区"
              style="border: none"
            ></uni-data-picker>
          </u-form-item>
          <u-form-item label="详细地址" prop="address" required>
            <u--input
              placeholder="请输入详细地址"
              v-model="form.address"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
        </view>
        <view class="info">
          <view class="info-title">个人简历</view>
          <u-form-item prop="remark" required>
            <u--textarea
              confirm-type="send"
              v-model="form.remark"
              placeholder="请输入内容"
            ></u--textarea>
          </u-form-item>
        </view>
        <view class="info">
          <view class="info-title">可分享的资源（选填）</view>
          <u--textarea
            confirm-type="send"
            v-model="form.source"
            placeholder="请输入内容"
          ></u--textarea>
        </view>
        <view class="info">
          <view class="info-title">我的需求（选填）</view>
          <u--textarea
            confirm-type="send"
            v-model="form.demand"
            placeholder="请输入内容"
          ></u--textarea>
        </view>
        <view class="info">
          <u-form-item label="邀请码" prop="code" borderBottom>
            <u--input
              placeholder="请输入邀请码"
              v-model="form.code"
              border="none"
              inputAlign="right"
            ></u--input>
          </u-form-item>
        </view>
      </u--form>
    </view>
    <view class="footer">
      <view class="btn" @tap="register"> 提交注册 </view>
    </view>
  </view>
</template>

<script>
import address from "../../static/picker-region";
export default {
  data() {
    return {
      form: {
        /**
         * 详细地址
         */
        address: "",
        /**
         * 城市
         */
        city: "",
        /**
         * 公司
         */
        company: "",
        /**
         * 我的需求
         */
        demand: "",
        /**
         * 区
         */
        distinct: "",
        /**
         * 邮箱
         */
        email: "",
        /**
         * 性别 0 女 1男
         */
        gender: 1,
        /**
         * 职位
         */
        job: "",
        /**
         * 身份类型 通过身份列表获取
         */
        membertype: "",
        /**
         * 手机号
         */
        mobile: "",
        /**
         * 昵称
         */
        nickname: "",
        /**
         * 省份
         */
        province: "",
        /**
         * 真实姓名
         */
        realname: "",
        /**
         * 个人简介
         */
        remark: "",
        /**
         * 可分享资源
         */
        source: "",
        /**
         * 微信号
         */
        wx_no: "",

        code: ""
      },
      membertypeList: [],
      membertypeShow: false,
      show: false,
      rules: {
        nickname: [
          {
            required: true,
            message: "请填写昵称",
            trigger: ["change", "blur"]
          }
        ],
        // gender:[{
        // 	min:1,
        // 	required: true,
        // 	message: '请选择性别',
        // 	trigger: ['change']
        // }],
        company: [
          {
            required: true,
            message: "请填写公司",
            trigger: ["change", "blur"]
          }
        ],
        job: [
          {
            required: true,
            message: "请填写职位",
            trigger: ["change", "blur"]
          }
        ],
        membertype: [
          {
            required: true,
            message: "请选择身份类型",
            trigger: ["change", "blur"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "请填写联系方法",
            trigger: ["change", "blur"]
          }
        ],
        realname: [
          {
            required: true,
            message: "请填写真实姓名",
            trigger: ["change", "blur"]
          }
        ],
        wx_no: [
          {
            required: true,
            message: "请填写微信号",
            trigger: ["change", "blur"]
          }
        ],
        email: [
          {
            required: true,
            message: "请填写联系邮箱",
            trigger: ["change", "blur"]
          }
        ],
        distinct: [
          {
            required: true,
            message: "请选择所在地",
            trigger: ["change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: ["change", "blur"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请填写个人简历",
            trigger: ["change", "blur"]
          }
        ]
      },
      address: []
    };
  },
  created() {
    this.address = address;
    this.getMembertype();
    this.form.nickname = uni.getStorageSync("nickname") || "";
    this.form.code = uni.getStorageSync("qrcode") || "";
  },
  methods: {
    async getMembertype() {
      const res = await this.$api.getMembertype();
      const membertypeList = Object.entries(res.membertype).map((item) => ({
        label: item[1],
        value: item[0]
      }));
      this.membertypeList = [membertypeList];
    },
    selectMembertype(e) {
      this.form.membertype = e.value[0].label;
      this.membertypeShow = false;
    },
    async register() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          this.handleRegister();
        })
        .catch((errors) => {
          console.log("validate ~ valid:errors", errors);
        });
    },
    async handleRegister() {
      const res = await this.$api.register({
        ...this.form,
        open_id: uni.getStorageSync("openid"),
        avatar: uni.getStorageSync("avatar")
      });
      if (res.userinfo) {
        uni.setStorageSync("userInfo", res.userinfo); //设置缓存
        uni.showToast({
          title: "注册成功",
          success() {
            setTimeout(() => {
              uni.switchTab({
                url: "/pages/index/index"
              });
            }, 1500);
          }
        });
      } else {
        uni.showToast({
          title: res.msg,
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
    },
    inputclick(e) {
      console.log("inputclick");
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  .content {
    width: 750rpx;
    padding: 30rpx 0 250rpx;
    background-color: #37352c;
  }
  .image {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .title {
    width: 314rpx;
    height: 52rpx;
    font-size: 36rpx;
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: bold;
    color: #fde2a6;
    line-height: 42rpx;
    letter-spacing: 1px;
    padding: 30rpx 0 0 30rpx;
  }
  .info {
    width: 684rpx;

    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    border: 1rpx solid rgba(238, 238, 238, 0);
    background-color: #ffffff;
    margin: 30rpx auto 0;
    padding: 30rpx;
    box-sizing: border-box;
    border-radius: 30rpx;
    position: relative;
    // z-index: 9;
    &-title {
      width: 654rpx;
      height: 92rpx;
      font-size: 32rpx;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 600;
      color: #333333;
      line-height: 92rpx;
    }
  }
  .footer {
    right: 0;
    box-sizing: border-box;
  }
  .btn {
    text-align: center;
    line-height: 88rpx;
    width: 688rpx;
    height: 88rpx;
    border-radius: 20px;
    color: #ffffff;
    background: #edc68f;
    font-size: 16px;
    margin: 30rpx auto;
    font-size: 32rpx;
    font-family: Source Han Sans SC, Source Han Sans SC;
    font-weight: 500;
    color: #3e2e17;
    // position: fixed;
    // bottom: 32px;
    // left: 50%;
    // transform: translate(-50%);
  }
}
.u-form-item {
  padding: 12rpx;
}
.u-radio-group--row {
  justify-content: flex-end;
}
/deep/.input-value-border {
  border: none !important;
  .placeholder {
    justify-content: flex-end;
    span {
      color: rgb(192, 196, 204);
      font-size: 14px;
    }
  }
}
</style>
