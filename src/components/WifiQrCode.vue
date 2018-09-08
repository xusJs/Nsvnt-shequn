<template>
  <div class="page">
    <xheader is-left="true" title="wifi二维码"></xheader>
    <div class="box">
      <mt-field label="wifi名称" v-model="wifiData.name"></mt-field>
      <mt-field label="wifi密码" type="password" v-model="wifiData.pwd"></mt-field>

    </div>
    <div class="xfooter" @click="makeQrCode">
      生 成 二 维 码
    </div>


    <!--二维码弹框-->
    <mt-popup
      v-model="WifiPopup"
      popup-transition="popup-fade">
      <!--<vue-qr :text="QrText" width="300px" height="300px"></vue-qr>-->
      <vue-qr :text="QrText" size='300'></vue-qr>
    </mt-popup>
  </div>
</template>

<script>
  import xheader from "../components/public/xheader"
  import {Toast} from "mint-ui"
  import vueQr from "vue-qr"

  export default {
    name: "WifiQrCode",
    components: {
      xheader,
      vueQr
    },
    data() {
      return {
        wifiData: {
          name: "",
          pwd: ""
        },
        WifiPopup: false,
        QrText: "",
        qrSize: "width=300px;height=300px"
      }
    },
    methods: {
      makeQrCode() {
        let reg = /\S/
        if (reg.test(this.wifiData.name) && reg.test(this.wifiData.pwd)) {
          this.WifiPopup = true
          this.QrText = JSON.stringify({comm: 'wifi', ssid: this.wifiData.name, pwd: this.wifiData.pwd})

        } else {
          Toast('名称与密码不能为空')
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .xfooter {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #00aaef;
    color: #fff;
  }

  .mint-popup {
    img {
      width: 300px;
      height: 300px;
    }
  }
</style>
