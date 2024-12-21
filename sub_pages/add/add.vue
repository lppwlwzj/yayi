<template>
  <view class="content" :style="{ paddingTop: statusBarHeight }">
    <view class="rfb">
      <navigator
        url="/pages/index/index"
        hover-class="navigator-hover"
        open-type="navigate"
      >
        <u-icon
          size="30"
          :name="require('../../static/images/ECO-UI-03.png')"
        ></u-icon>
      </navigator>

      <u-icon
        size="30"
        :name="require('../../static/images/ECO-UI-02.png')"
      ></u-icon>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          placeholder="客户姓名"
          disabledColor="#fff"
          :disabled="disabled"
          placeholderStyle="color:#dd524d63"
          v-model="form.customer"
          border="none"
          :customStyle="{
            padding: '18rpx',
            color: '#dd524d63'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <view
          @click="calendarOpen('dateTime')"
          class="rfa date-btn"
          :disabled="disabled"
        >
          <!-- :style="{
            color: form.dateTime ? '#000' : '#dd524d63'
          }" -->
          <view>
            {{ `${form.dateTime || "日期"}` }}
          </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </view>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="面诊医生"
          disabledColor="#fff"
          v-model="form.doctor"
          border="none"
          :customStyle="{
            padding: '18rpx 20rpx'
          }"
          placeholderStyle="color:#dd524d63"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="代理人"
          disabledColor="#fff"
          v-model="form.proxy"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          :placeholderStyle="{
            color: '#dd524d63 !important'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <view class="diagnose">
      <ti-xing>
        <view class="rfc" style="padding-top: 18rpx">
          <u-icon
            size="16"
            :name="require('../../static/images/ECO-UI-07.png')"
          ></u-icon>
          <text style="padding-left: 10rpx">面诊</text>
        </view>
      </ti-xing>
      <view class="diagnose-el">
        <view class="rfc">
          <Upload
            :img_url="form.frontPhoto"
            name="frontPhoto"
            :id="`${userInfo.usercount}${customer_id}`"
            :disabled="disabled"
            customClass="upload-img-el"
            @change="
              (value) => {
                handleFormChange('frontPhoto', value);
              }
            "
          >
            <view class="upload-img-el fc">
              <image
                :src="require('../../static/images/upload.png')"
                mode="aspectFill"
                class="upload-img"
              ></image>
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="
                  width: 30px;
                  height: 30px;
                  margin-bottom: 8px;
                  z-index: 9999;
                "
              ></image>
              <text style="color: #fff; font-size: 12px; z-index: 9999"
                >客户正面微笑照</text
              >
            </view>
          </Upload>
          <view class="diagnose-text">
            <u--textarea
              autoHeight
              :disabled="disabled"
              v-model="form.adviceContent"
              border="none"
              placeholder="主诉:全口/半口客户有什么问题希望得到什么改善"
            ></u--textarea>
          </view>
        </view>
        <view class="rfa image-list">
          <!-- 左45度 -->
          <Upload
            :disabled="disabled"
            name="leftFv"
            :id="`${userInfo.usercount}${customer_id}`"
            :img_url="form.leftFv"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('leftFv', value);
              }
            "
          >
            <view class="image fc" v-if="!form.leftFv">
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度</text>
            </view>
          </Upload>
          <!-- 右45度 -->
          <Upload
            :disabled="disabled"
            name="rightFv"
            :id="`${userInfo.usercount}${customer_id}`"
            :img_url="form.rightFv"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('rightFv', value);
              }
            "
          >
            <view class="image fc">
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度</text>
            </view>
          </Upload>
          <!-- 正面扩口 -->
          <Upload
            name="front"
            :disabled="disabled"
            :img_url="form.front"
            :id="`${userInfo.usercount}${customer_id}`"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('front', value);
              }
            "
          >
            <view class="image fc">
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">正面扩口</text>
            </view>
          </Upload>
          <!-- 右45度扩口 -->
          <Upload
            name="leftFvEdge"
            :disabled="disabled"
            :id="`${userInfo.usercount}${customer_id}`"
            :img_url="form.leftFvEdge"
            customClass="image"
            @change="
              (value) => {
                handleFormChange('leftFvEdge', value);
              }
            "
          >
            <view class="image fc">
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">左45度扩口</text>
            </view>
          </Upload>
          <Upload
            name="rightFvEdge"
            :img_url="form.rightFvEdge"
            customClass="image"
            :id="`${userInfo.usercount}${customer_id}`"
            :disabled="disabled"
            @change="
              (value) => {
                handleFormChange('rightFvEdge', value);
              }
            "
          >
            <view class="image fc">
              <image
                :src="require('../../static/images/add.png')"
                mode="aspectFill"
                style="width: 16px; height: 16px; margin-bottom: 4px"
              ></image>
              <text style="color: #fff; font-size: 24rpx">右45度扩口</text>
            </view>
          </Upload>
        </view>
      </view>
    </view>
    <view class="diagnose">
      <ti-xing width="100px" customeStyle="margin-left: 200px;">
        <view class="rfc" style="padding-top: 18rpx">
          <u-icon
            size="16"
            :name="require('../../static/images/ECO-UI-08.png')"
          ></u-icon>
          <text style="padding-left: 10rpx">设计师建议</text>
        </view>
      </ti-xing>
      <view class="diagnose-el">
        <view class="rfc">
          <view class="upload-img-el fc" @click="handleChoseImg('intentList')">
            <image
              :src="
                !form.intentImg
                  ? '../../static/images/upload.png'
                  : getImg(form.intentImg)
              "
              mode="aspectFill"
              class="upload-img"
              :show-menu-by-longpress="true"
            ></image>
            <image
              v-show="form.intentImg"
              @tap.stop="preview(getImg(form.intentImg))"
              :src="require('../../static//images/preview.png')"
              class="preview"
              mode="aspectFill"
            ></image>
            <image
              v-show="!form.intentImg"
              :src="require('../../static/images/add.png')"
              mode="aspectFill"
              style="
                width: 30px;
                height: 30px;
                margin-bottom: 8px;
                z-index: 9999;
              "
            ></image>
            <text
              v-show="!form.intentImg"
              style="color: #fff; font-size: 12px; z-index: 9999"
              >客户意向照</text
            >
          </view>
          <view class="diagnose-text">
            <u--textarea
              autoHeight
              :disabled="disabled"
              v-model="form.designAdvice"
              border="none"
              placeholder="方案:具体怎么去修改形态,注意事项"
            ></u--textarea>
          </view>
        </view>
        <view class="image-list">
          <MultiUpload
            :list="form.designList"
            activeKey="designList"
            @delete="
              (index) => {
                deleteImg(index, 'designList');
              }
            "
            @add="
              (value) => {
                handleImage(value, 'designList');
              }
            "
          />
        </view>
      </view>
    </view>
    <view class="rfaw" style="margin: 18rpx 0">
      <view class="input">
        <u--input
          :disabled="disabled"
          placeholder="瓷品"
          disabledColor="#fff"
          placeholderStyle="color:#dd524d63"
          v-model="form.porcelain"
          border="none"
          :customStyle="{
            padding: '18rpx'
          }"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
      <view class="input">
        <u--input
          :disabled="disabled"
          :customStyle="{
            padding: '18rpx'
          }"
          placeholderStyle="color:#dd524d63"
          placeholder="贴片颜色"
          disabledColor="#fff"
          v-model="form.tiepianColor"
          border="none"
          :suffixIcon="disabled ? '' : 'edit-pen'"
          suffixIconStyle=" color: #dd524dab !important;"
        ></u--input>
      </view>
    </view>
    <view class="rfa">
      <view class="upload-img-el fc" @click="handleChoseImg('tiemianDetail')" style="margin:16rpx;">
        <image
          :src="
            !form.tiemianDetail
              ? '../../static/images/upload.png'
              : getImg(form.tiemianDetail)
          "
          mode="aspectFill"
          class="upload-img"
          :show-menu-by-longpress="true"
        ></image>
        <image
          v-show="form.tiemianDetail"
          @tap.stop="preview(getImg(form.tiemianDetail))"
          :src="require('../../static//images/preview.png')"
          class="preview"
          mode="aspectFill"
        ></image>
        <image
          v-show="!form.tiemianDetail"
          :src="require('../../static/images/add.png')"
          mode="aspectFill"
          style="width: 30px; height: 30px; margin-bottom: 8px; z-index: 9999"
        ></image>
        <text
          v-show="!form.tiemianDetail"
          style="color: #fff; font-size: 12px; z-index: 9999"
          >贴片细节</text
        >
      </view>
      <view class="upload-img-el fc" @click="handleChoseImg('tiemianColor')">
        <image
          :src="
            !form.tiemianColor
              ? '../../static/images/upload.png'
              : getImg(form.tiemianColor)
          "
          mode="aspectFill"
          class="upload-img"
          :show-menu-by-longpress="true"
        ></image>
        <image
          v-show="form.tiemianColor"
          @tap.stop="preview(getImg(form.tiemianColor))"
          :src="require('../../static//images/preview.png')"
          class="preview"
          mode="aspectFill"
        ></image>
        <image
          v-show="!form.tiemianColor"
          :src="require('../../static/images/add.png')"
          mode="aspectFill"
          style="width: 30px; height: 30px; margin-bottom: 8px; z-index: 9999"
        ></image>
        <text
          v-show="!form.tiemianColor"
          style="color: #fff; font-size: 12px; z-index: 9999"
          >贴片颜色</text
        >
      </view>
    </view>
    <!-- 进度条 -->
    <u-collapse>
      <u-collapse-item title="形态设计" name="guide">
        <view style="margin: 18rpx 0">
          <view class="item" v-for="(item, index) in dentistList" :key="index">
            <view class="rfc" style="margin: 18rpx 0">
              <u-checkbox-group
                v-model="item.open"
                placement="column"
                @change="
                  (value) => {
                    hanldeListChange(value, index, 'open');
                  }
                "
              >
                <u-checkbox
                  :disabled="disabled"
                  shape="circle"
                  :name="item.id"
                  :customStyle="{ marginBottom: '8px' }"
                  activeColor="#dd524d63"
                >
                </u-checkbox>
              </u-checkbox-group>
              <image class="icon-image" :src="item.url" />

              <view class="u-page__slide-item">
                <u-slider
                  :value="item.value"
                  min="0"
                  max="100"
                  :disabled="disabled"
                  activeColor="#dd524d63"
                  @change="
                    (value) => {
                      hanldeListChange(value, index, 'value');
                    }
                  "
                ></u-slider>
                <view class="text">{{ item.text }} {{ item.value }}%</view>
              </view>
              <view class="slide-img">
                <image
                  mode="aspectFill"
                  @click="handleChoseImg(item.key)"
                  class="icon-image"
                  :src="item.img || require('../../static/images/upload.png')"
                />
                <image
                  v-show="item.img"
                  @tap.stop="preview(item.img)"
                  :src="require('../../static/images/preview.png')"
                  class="preview"
                  mode="aspectFill"
                ></image>
              </view>
            </view>
          </view>
        </view>
      </u-collapse-item>
    </u-collapse>

    <view class="rfsw" style="margin: 20rpx 0 30rpx 100rpx">
      <text style="color: #ccc; padding-right: 24rpx"> 是否做过矫正 </text>
      <u-switch
        v-model="form.adjust"
        size="30"
        activeColor="#f56c6c"
      ></u-switch>
      <text style="color: #f56c6c; padding-left: 12rpx">
        {{ form.adjust ? "是" : "否" }}
      </text>
    </view>

    <view class="rfc">
      <text style="color: #eb2b24e3; padding-right: 24rpx"> 预计戴牙日期 </text>
      <view class="input" @click="calendarOpen('daiyaTime')">
        <view :disabled="disabled" class="rfa date-btn">
          <view v-if="form.daiyaTime" style="color: #eb2b24e3">
            {{ form.daiyaTime }}
          </view>
          <view v-else> 日期 </view>
          <u-icon size="19" name="edit-pen" color="#dd524d63"></u-icon>
        </view>
      </view>
    </view>

    <view
      class="rfsw"
      style="margin: 20rpx 0 30rpx 100rpx"
      v-if="privacyVisible"
    >
      <text style="color: #ccc; padding-right: 24rpx"> 是否设置隐私 </text>
      <u-switch
        v-model="form.isPrivacy"
        size="30"
        activeColor="#f56c6c"
      ></u-switch>
    </view>

    <!-- 设计图 -->
    <view class="rfa" style="margin: 18rpx 0">
      <view class="image-list">
        <MultiUpload
          placeholder="CAD设计图"
          :list="form.CADImg"
          activeKey="CADImg"
          @delete="
            (index) => {
              deleteImg(index, 'CADImg');
            }
          "
          @add="
            (value) => {
              handleImage(value, 'CADImg');
            }
          "
        />
      </view>
    </view>
    <!-- 设计师 -->
    <view class="cad-name">
      <u--input
        :disabled="disabled"
        placeholder="CAD设计师"
        disabledColor="#fff"
        placeholderStyle="color:#dd524d63"
        v-model="form.CAD"
        border="none"
        :customStyle="{
          padding: '12rpx 12rpx'
        }"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="cad-remark">
      <u--textarea
        autoHeight
        :disabled="disabled"
        placeholderStyle="color:#dd524d63"
        v-model="form.CADRemark"
        border="none"
        placeholder="图纸备注留言"
      ></u--textarea>
    </view>
    <view class="rfa" style="margin: 18rpx 0">
      <view class="image-list">
        <MultiUpload
          placeholder="车瓷设计图"
          :list="form.checiImg"
          activeKey="checiImg"
          @delete="
            (index) => {
              deleteImg(index, 'checiImg');
            }
          "
          @add="
            (value) => {
              handleImage(value, 'checiImg');
            }
          "
        />
      </view>
    </view>
    <view class="cad-name">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '20rpx 12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="车瓷设计师"
        disabledColor="#fff"
        v-model="form.checi"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="cad-remark">
      <u--textarea
        autoHeight
        :disabled="disabled"
        placeholderStyle="color:#dd524d63"
        v-model="form.checiRemark"
        border="none"
        placeholder="车瓷备注留言"
      ></u--textarea>
    </view>

    <view class="rfa" style="margin: 18rpx 0">
      <view class="image-list">
        <MultiUpload
          placeholder="上釉"
          :list="form.shangyouImg"
          activeKey="shangyouImg"
          @delete="
            (index) => {
              deleteImg(index, 'shangyouImg');
            }
          "
          @add="
            (value) => {
              handleImage(value, 'shangyouImg');
            }
          "
        />
      </view>
    </view>
    <view class="cad-name">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="上釉"
        disabledColor="#fff"
        v-model="form.shangyou"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="cad-remark">
      <u--textarea
        autoHeight
        :disabled="disabled"
        placeholderStyle="color:#dd524d63"
        v-model="form.shangyouRemark"
        border="none"
        placeholder="上釉备注留言"
      ></u--textarea>
    </view>

    <view class="rfa" style="margin: 18rpx 0">
      <view class="image-list">
        <MultiUpload
          placeholder="上瓷"
          :list="form.shangciImg"
          activeKey="shangciImg"
          @delete="
            (index) => {
              deleteImg(index, 'shangciImg');
            }
          "
          @add="
            (value) => {
              handleImage(value, 'shangciImg');
            }
          "
        />
      </view>
    </view>
    <view class="cad-name">
      <u--input
        :disabled="disabled"
        :customStyle="{
          padding: '12rpx'
        }"
        placeholderStyle="color:#dd524d63"
        placeholder="上瓷"
        disabledColor="#fff"
        v-model="form.shangci"
        border="none"
        :suffixIcon="disabled ? '' : 'edit-pen'"
        suffixIconStyle=" color: #dd524dab !important;"
      ></u--input>
    </view>
    <view class="cad-remark">
      <u--textarea
        autoHeight
        :disabled="disabled"
        placeholderStyle="color:#dd524d63"
        v-model="form.shangciRemark"
        border="none"
        placeholder="上瓷备注留言"
      ></u--textarea>
    </view>

    <view class="rfa" style="margin: 18rpx 0; height: 160rpx">
      <u--textarea
        class="problem-text"
        autoHeight
        :disabled="disabled"
        v-model="form.problem"
        border="none"
        placeholder="请输入内容"
      ></u--textarea>
    </view>
    <uni-calendar
      ref="myCalendar"
      class="uni-calendar--hook"
      :clear-date="true"
      :insert="false"
      :lunar="false"
      :startDate="startDate"
      :endDate="endDate"
      :range="false"
      @confirm="handleDaiYaTime"
      @close="canceltime"
    />

    <view
      class="btn afc"
      @tap.stop="handleEdit"
      v-show="customer_id && operateType === 'view'"
    >
      编辑
    </view>
    <view
      class="btn afc"
      @tap.stop="submit"
      v-show="['create', 'edit'].includes(operateType)"
    >
      确认
    </view>
    <view
      class="btn afc"
      @tap.stop="handleDelete"
      v-show="['edit'].includes(operateType)"
    >
      删除
    </view>

    <view class="footer rfa">
      <u-icon
        size="26"
        :name="require('../../static/images/ECO-UI-07.png')"
      ></u-icon>
      <navigator
        :url="
          operateType === 'create'
            ? ''
            : `/sub_pages/customerFiles/customerFiles?id=${id}&operateType=${operateType}&service_id=${service_id}`
        "
      >
        <u-icon
          size="26"
          :name="require('../../static/images/ECO-UI-04.png')"
          style=""
        ></u-icon>
      </navigator>
    </view>
    <u-modal
      confirmColor="#dd524d63"
      :show="modalShow"
      :showConfirmButton="false"
      :showCancelButton="false"
      :closeOnClickOverlay="true"
      @close="modalShow = false"
      ref="uModal"
    >
      <view class="fc">
        <view class="rfaw">
          <view
            v-for="(item, index) in imgList"
            :key="index"
            v-show="item"
            :class="[{ active: selectIndex === index }, 'img-item']"
          >
            <image
              class="icon-image"
              :src="getImg(item)"
              @click="selectIndex = index"
              mode="aspectFill"
            />
            <image
              @tap.stop="preview(item)"
              :src="require('../../static//images/preview.png')"
              class="preview"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <u-button
          style="margin-top: 20rpx"
          color="#dd524d63"
          @click="handleChooseConfirm(imgList[selectIndex])"
          >选择</u-button
        >
      </view>
    </u-modal>

    <u-popup
      :show="popupShow"
      closeable
      mode="center"
      @close="popupClose"
      :overlayStyle="{
        background: '#000000d6'
      }"
      closeIconPos="top-left"
      bgColor="#000000"
    >
      <view class="fc img_wrapper">
        <TouchScaleVideo
        :video_url="previewImg"
        v-if="previewImg.indexOf('mp4') > -1"
      />
      <TouchScaleImg :img_url="previewImg" v-else />
      </view>
    </u-popup>
  </view>
</template>

<script>
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);

  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
import TiXing from "../components/tixing";
import Upload from "../components/my-upload/my-upload.vue";
import MultiUpload from "../components/multi-upload";
import TouchScaleImg from "../components/touchScaleImg/index.vue";
import TouchScaleVideo from "../components/TouchScaleVideo/index.vue";


export default {
  data() {
    return {
      selectIndex: -1,
      modalShow: false,
      service_id: "",
      startDate: "",
      endDate: "",
      time: Number(new Date()),
      userInfo: {},
      id: "", //数据库自动生成的
      customer_id: "", //自己生成的随机字符串，用来create时确定上传图片的唯一标识
      operateType: "create",

      previewImg: "",
      popupShow: false,
      statusBarHeight: +(+uni.getSystemInfoSync().statusBarHeight + 10) + "px",
      form: {
        isPrivacy: false,
        adjust: false,
        customer: "",
        dateTime: "",
        daiyaTime: "",
        doctor: "",
        proxy: "",
        tiepianColor: "",
        CADImg: [],
        problem: "",
        shangyou: "",
        shangyouRemark: "",
        shangci: "",
        shangciRemark: "",
        shangyouImg: [],
        shangciImg: [],
        checiImg: [],
        CAD: "",
        checiRemark: "",
        CADRemark: "",
        checi: "",
        porcelain: "",
        frontPhoto: "",
        adviceContent: "",
        leftFv: "",
        rightFv: "",
        front: "",
        leftFvEdge: "",
        rightFvEdge: "",
        intentImg: "",
        designAdvice: "",
        designList: [],
        bianyuanOpen: false,
        bianyuanValue: "",
        roundOpen: false,
        roundValue: "",
        luochaOpen: false,
        luochaValue: "",
        angleOpen: false,
        angleValue: "",
        jiandunOpen: false,
        jiandunValue: "",
        qieduanOpen: false,
        qieduanValue: "",
        textureOpen: false,
        textureValue: "",
        dotOpen: false,
        dotValue: "",
        touliangOpen: false,
        touliangValue: "",
        qieduanLinearsOpen: false,
        qieduanLinearsValue: "",
        thicknessOpen: false,
        thicknessValue: ""
      },
      show: false,
      dentistList: [
        {
          id: 1,
          key: "bianyuan",
          text: "边缘",
          value: 0,
          open: [],
          img: "",
          url: require("./static/images/1.png")
        },
        {
          id: 2,
          key: "round",
          text: "角度方圆",
          value: 0,
          open: [],
          img: "",
          url: require("./static/images/2.png")
        },

        {
          id: 3,
          key: "luocha",
          text: "1号2号落差",
          value: 0,
          open: [],
          url: require("./static/images/3.png")
        },
        {
          id: 4,
          text: "窄细角度",
          value: 0,
          key: "angle",
          open: [],
          img: "",
          url: require("./static/images/4.png")
        },
        {
          id: 5,
          text: "尖or钝",
          value: 0,
          open: [],
          key: "jiandun",
          img: "",
          url: require("./static/images/5.png")
        },
        {
          id: 6,
          text: "2号远中切端上扬幅度",
          value: 0,
          open: [],
          key: "qieduan",
          img: "",
          url: require("./static/images/6.png")
        },
        {
          id: 7,
          text: "纹理",
          value: 0,
          open: [],
          key: "texture",
          img: "",
          url: require("./static/images/7.png")
        },
        {
          id: 8,
          text: "颈部光点",
          value: 0,
          key: "dot",
          open: [],
          img: "",
          url: require("./static/images/8.png")
        },
        {
          id: 9,
          text: "透亮",
          value: 0,
          open: [],
          key: "touliang",
          img: "",
          url: require("./static/images/9.png")
        },
        {
          id: 10,
          key: "qieduanLinears",
          text: "切端渐变层",
          value: 0,
          open: [],
          img: "",
          url: require("./static/images/10.jpg")
        },
        {
          id: 11,
          key: "thickness",
          text: "厚度",
          value: 0,
          open: [],
          img: "",
          url: require("./static/images/11.jpg")
        }
      ],
      timeKey: "",
      activeIndex: "", //滑动条选择图片的时候的key
      preUploadInfo: {},
      preinstall: {
        intentList: [],
        bianyuan: [],
        round: [],
        luocha: [],
        angle: [],
        jiandun: [],
        qieduan: [],
        texture: [],
        dot: [],
        touliang: [],
        qieduanLinears: [],
        thickness: []
      }
    };
  },
  components: {
    TiXing,
    Upload,
    MultiUpload,
    TouchScaleImg,
    TouchScaleVideo
  },

  onReady() {
    this.startDate = getDate(new Date(), -60).fullDate;
    this.endDate = getDate(new Date(), 30).fullDate;
  },
  onLoad: function (option) {
    this.getPreinstall();
    if (option.id) {
      this.id = option.id;
      this.operateType = option.type;
      this.getCustomerDetailById(option.id);
    }
    if (this.operateType === "create")
      this.customer_id = Math.random().toString(36).substring(2, 6);
    this.userInfo = uni.getStorageSync("userInfo");
  },
  options: { styleIsolation: "shared" },
  computed: {
    disabled() {
      return this.operateType === "view";
    },
    designList() {
      return this.form.designList;
    },
    imgList() {
      return this.preinstall?.[this.activeIndex] || [];
    },
    privacyVisible() {
      return ["13588805863", "18516187777", "13666633692"].includes(
        this.userInfo.usercount
      );
    }
  },

  methods: {
    getImg(url) {
      return url?.indexOf("mp4") > -1
        ? require("../../static/images/video.png")
        : url;
    },
    preview(url) {
      this.popupShow = true;
      this.previewImg = url;
    },
    popupClose() {
      this.previewImg = "";
      this.popupShow = false;
    },

    async getPreinstall() {
      const res = await this.$api.getPreinstall();
      if (!res.code) {
        if (!res.re) return;
        const params = {};
        this.pre;
        Object.keys(this.preinstall).map((key) => {
          params[key] = res.re[key] ? JSON.parse(res.re[key]) : [];
        });
        this.preinstall = {
          ...params
        };
      }
    },
    calendarOpen(key) {
      this.timeKey = key;
      this.$refs.myCalendar.open();
    },
    handleDaiYaTime(time) {
      this.form[this.timeKey] = time.fulldate;
    },
    canceltime() {
      // this.daiyaShow = false;
    },
    hanldeListChange(value, index, key) {
      const item = this.dentistList[index];
      item[key] = value;

      this.$set(this.dentistList, index, {
        ...item
      });
    },
    handleChoseImg(key) {
      this.activeIndex = key;
      this.modalShow = true;
    },
    handleChooseConfirm(img) {
      if (this.activeIndex === "intentList") {
        this.form.intentImg = img;
      } else {
        const index = this.dentistList.findIndex(
          (item) => item.key === this.activeIndex
        );
        if (index > -1) {
          this.hanldeListChange(img, index, "img");
        }
      }
      this.modalShow = false;
    },
    handleEdit() {
      this.operateType = "edit";
    },
    async getCustomerDetailById(id) {
      const res = await this.$api.getCustomerDetailById({
        id
      });
      if (!res.code) {
        const data = res.data;
        this.form = data;
        this.customer_id = data.customer_id;
        this.service_id = data.service_id;

        this.form.isPrivacy = this.form.isPrivacy ? true : false;
        this.form.adjust = this.form.adjust ? true : false;
        this.form.designList = JSON.parse(data.designList);
        this.form.checiImg = JSON.parse(data.checiImg);
        this.form.shangciImg = JSON.parse(data.shangciImg);
        this.form.shangyouImg = JSON.parse(data.shangyouImg);
        this.form.CADImg = JSON.parse(data.CADImg);

        this.dentistList = this.dentistList.map((item) => {
          return {
            ...item,
            value: +data[`${item.key}Value`],
            open: data[`${item.key}Open`] === "true" ? [item.id] : []
          };
        });
      }
    },
    async handleDelete() {
      const res = await this.$api.deleteCustomer({
        id: this.id
      });
      if (!res.code) {
        uni.showToast({
          icon: "none",
          title: res.message
        });
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/index/index"
          });
        }, 500);
      }
    },
    async submit() {
      this.dentistList.forEach((item) => {
        this.form[`${item.key}Open`] = !!item.open.length;
        this.form[`${item.key}Value`] = item.value;
      });
      const requestFn = this.id
        ? this.$api.editCustomer
        : this.$api.addCustomer;
      const res = await requestFn({
        customer_id: this.customer_id,
        id: this.id || "",
        ...this.form,
        shangyouImg: JSON.stringify(this.form.shangyouImg),
        shangciImg: JSON.stringify(this.form.shangciImg),
        CADImg: JSON.stringify(this.form.CADImg),
        checiImg: JSON.stringify(this.form.checiImg),
        isPrivacy: this.form.isPrivacy ? 1 : 0,
        adjust: this.form.adjust ? 1 : 0
      });
      console.log("this.form,", this.form);
      if (!res.code) {
        uni.showToast({
          icon: "none",
          title: res.message
        });
        this.operateType = "edit";

        this.id = res.re.id || this.id;
        uni.showToast({
          icon: "none",
          title: "操作成功！"
        });
      } else {
        uni.showToast({
          icon: "none",
          title: res.message
        });
      }
    },

    handleFormChange(key, value) {
      this.$set(this.form, key, value);
    },
    handleImage(value, key) {
      const list = this.form[key];
      list.push(value);
    },
    deleteImg(index, key) {
      const list = this.form[key];
      this.$set(list, index, "");
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
}
.image-close {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
}
.footer {
  width: 100%;
  background: #fff;
  z-index: 999999;
}
.content {
  width: 100%;
  box-sizing: border-box;
  background-color: $uni-color-bg;
  padding: 0 30rpx;
  padding-bottom: 160rpx;
  .input {
    width: 45% !important;
    box-shadow: 2px 2px 5px #33333340;
    margin: 12rpx 0;
    border-radius: 40rpx;
    background-color: #fff;
  }
  .u-input--square {
    border-radius: 40rpx;
  }
  .diagnose {
    margin: 20rpx 0;
    font-size: 14px;
    color: #dd524d63;
    &-el {
      width: 100%;
      border-radius: 40rpx;
      padding: 26rpx;
      box-sizing: border-box;
      box-shadow: 2px 2px 5px #33333340;
    }
  }
  .diagnose-text {
    margin: 0 12rpx;
    width: 70%;
    background-color: #fff;
    min-height: 160rpx;
    align-self: flex-start;
    // height: 200rpx;
    // border-radius: 36rpx;
  }
  //TODO:没生效
  /deep/.u-textarea {
    border-radius: 36rpx !important;
  }
  /deep/.u-cell__body {
    border-radius: 16px;
    background-color: #fff;
  }
  /deep/.u-cell__title-text {
    color: #dd524d63;
  }
  .upload-bg {
    flex: 1;
    margin: 12rpx;
    flex-wrap: nowrap;
  }
  .upload-img-el {
    position: relative;
    width: 180rpx;
    height: 180rpx;
  }

  .upload-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .image-list {
    width: 100%;
    margin: 20rpx 0rpx;
  }
  .image {
    width: 120rpx;
    height: 120rpx;
    background: #898787a3;
    border-radius: 16rpx;

    position: relative;
  }
  .preview {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10rpx;
    bottom: 10rpx;
  }
  .image-2 {
    width: 160rpx;
    height: 160rpx;
    // width: 100%;
    // height: 100%;
    background: #898787a3;
    border-radius: 16rpx;
    // margin: 20rpx 0rpx;
  }
  .u-page__slide-item {
    flex: 1;
    margin-top: 30rpx;
    .text {
      text-align: center;
      color: #33333340;
    }
  }
  /deep/.uni-slider-handle-wrapper {
    background-color: #fff !important;
  }
  /deep/.u-radio-group {
    width: 80rpx !important;
    margin-right: 16rpx;
    flex: 0;
  }
  .btn {
    margin-top: 50rpx;
    width: 100%;
    background-color: #dd524d63;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 40rpx;
    color: #fff;
    font-size: 16px;
  }
}
.icon-image {
  width: 120rpx;
  height: 120rpx;
}
.date-btn {
  padding: 18rpx;
  color: #30313363;
  justify-content: space-between;
  border-radius: 40rpx;
  font-size: 30rpx;
}
.active {
  border: 2rpx solid red;
}
.img-item {
  position: relative;
}
/deep/ .uni-calendar-item--isDay,
/deep/ .uni-calendar-item--checked {
  background-color: #eb2b24e3 !important;
}
.img_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
/deep/ .u-popup__content__close--top-left {
  top: 75px !important;
  left: 28px !important;
}
.problem-text {
  height: 100%;
}
.slide-img {
  position: relative;
}
.cad-name {
  width: 220rpx;
  box-shadow: 2px 2px 5px #33333340;
  margin: 12rpx 0;
  border-radius: 40rpx;
  background-color: #fff;
}
.cad-remark {
  width: 100%;
  box-shadow: 2px 2px 5px #33333340;
  margin: 18rpx 0;
  border-radius: 40rpx;
  background-color: #fff;
}
</style>
