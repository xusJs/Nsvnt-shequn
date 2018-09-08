<template>
  <div class="page">
    <xheader is-left="true" title="个人中心"></xheader>
    <div class="box">
      <header class="center_header">
        <div class="center_left">
          <!--<img src="../img/setting.jpg" alt="">-->
        </div>
        <div class="center_center">
          <img :src="$store.state.login.headPortrait" alt="">
          <p>{{$store.state.login.realName}}</p>
        </div>
        <div class="center_right" @click="$router.push({name:'PersonalSetting'})">
          <img src="../img/setting.jpg" alt="">
        </div>
      </header>
      <section>
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'MyWallet'})">
            <div>
              <img src="../img/make.png" alt="">
            </div>
            <div class="center">
              <span>我的钱包</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'BlockChainLogin'})">
            <div>
              <img src="../img/make.png" alt="">
            </div>
            <div class="center">
              <span>虚拟资产</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
          <li class="xitem" @click="QrcodePopup = true">
            <div>
              <img src="../img/msgs.png" alt="">
            </div>
            <div class="center">
              <span>我的二维码</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
          <!--<li class="xitem" @click="$router.push({name:'MyOrder'})">
            <div>
              <img src="../img/个人中心_23.jpg" alt="">
            </div>
            <div class="center">
              <span>我的订单</span>
            </div>
            <div>
              <img src="../img/right_icon.jpg" alt="">
            </div>
          </li>-->
          <li class="xitem" @click="$router.push({name:'TransactionRecord'})">
            <div>
              <img src="../img/个人中心_25.jpg" alt="">
            </div>
            <div class="center">
              <span>交易记录</span>
            </div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
        </ul>
      </section>
    </div>

    <mt-popup
      v-model="QrcodePopup"
      popup-transition="popup-fade">
      <vue-qr :text="UserQrcode" :size="Sizes"></vue-qr>
    </mt-popup>

  </div>
</template>

<script>

  import xheader from '../components/public/xheader'
  import vueQr from "vue-qr"

  export default {
    name: "personal-center",
    data() {
      return {
        QrcodePopup: false,
        Sizes: 300,
        UserQrcode: "",        //  二维码内容
      }
    },
    components: {
      xheader,
      vueQr
    },
    methods: {},
    created() {
      let $self = this
      this.UserQrcode = JSON.stringify({
        XType: "AddFriend",
        content: $self.$store.state.login.userId
      })
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .center_header {
      display: flex;
      background: #ebfffe;
      padding: 10px;
      min-height: 200px;
      .center_left {
        width: 50px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .center_center {
        flex: 1;
        text-align: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        p {
          line-height: 36px;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 3px;
          /*font-family: "Arial Black";*/
        }
      }
      .center_right {
        width: 50px;
        text-align: right;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .footer {
    height: 60px;
    line-height: 60px;
    background: #ddd;
    text-align: center;
    color: #fff;
    font-size: 18px;
    letter-spacing: 5px;
  }

</style>
