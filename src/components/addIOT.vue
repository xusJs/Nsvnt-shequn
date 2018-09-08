<template>
  <div class="page">
    <xheader is-left="true" title="添加新设备"></xheader>
    <div class="box">
      <ul class="xlist">
     <!--   <li class="xitem" @click="$router.push({name:'shop'})">
          <div class="center">
            <span>设备市场</span>
          </div>
          <div>
            <img src="../img/right_icon.jpg" alt="">
          </div>
        </li>-->
        <li class="xitem" @click="$router.push({name:'WifiQrCode'})">
          <div class="center">
            <span>wifi 二维码</span>
          </div>
          <div>
            <img src="../img/right_icon.jpg" alt="">
          </div>
        </li>
      </ul>
      <div class="addIOT_header" @click="$router.push({name:'QRcode'})">
        <img src="../img/addqrcode.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from "vue"
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"


  export default {
    name: "addIOT",
    components: {
      xheader
    },
    data() {
      return {}
    },
    methods: {},
    created() {
      Vue.cordova.geolocation.getCurrentPosition((position) => {
        // window.alert('Current position : ' + position.coords.latitude + ',' + position.coords.longitude)
      }, (error) => {
        // window.alert('FAILED Error #' + error.code + ' ' + error.message)
      }, {
        timeout: 1000,
        enableHighAccuracy: true
      })
    }
  }
</script>

<style scoped lang="scss">

  .addIOT_header {
    padding: 10px;
    img {
      width: 100%;
    }
  }
</style>
