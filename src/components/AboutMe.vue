<template>
  <div class="page">
    <xheader is-left="true" title="关于我们"></xheader>
    <div class="box">
      <div class="b_content">
        <img src="../img/logo.png" alt="">
      </div>
      <ul class="xlist">
        <li class="xitem">
          <div></div>
          <div class="center">特别声明</div>
          <div><img src="../img/right_icon.png" alt=""></div>
        </li>
        <li class="xitem">
          <div></div>
          <div class="center">使用帮助</div>
          <div><img src="../img/right_icon.png" alt=""></div>
        </li>
        <li class="xitem">
          <div></div>
          <div class="center">给我评分</div>
          <div><img src="../img/right_icon.png" alt=""></div>
        </li>
        <li class="xitem">
          <div></div>
          <div class="center">隐私政策</div>
          <div><img src="../img/right_icon.png" alt=""></div>
        </li>
        <!--  <li class="xitem" @click="appPlay">
            <div></div>
            <div class="center">app支付</div>
            <div><img src="../img/right_icon.png" alt=""></div>
          </li>
          <li class="xitem" @click="WechatShare">
            <div></div>
            <div class="center">微信分享</div>
            <div><img src="../img/right_icon.png" alt=""></div>
          </li>
          <li class="xitem" @click="WechatLogin">
            <div></div>
            <div class="center">微信登录</div>
            <div><img src="../img/right_icon.png" alt=""></div>
          </li>
          <li class="xitem" @click="WechatCheck">
            <div></div>
            <div class="center">微信安装确认</div>
            <div><img src="../img/right_icon.png" alt=""></div>
          </li>-->
      </ul>


      <div class="b_footer">
        <p>Copyright@2016-2018 新启点价值网络 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui"
  import xheader from "./public/xheader"

  export default {
    name: "AboutMe",
    components: {
      xheader
    },
    methods: {
      appPlay() {
        let $self = this
        // debugger;
        // $self.$store.dispatch("AppPlayDev", {devid: 'f60354003a684724a37952fc3fee4785'})
        $self.$store.dispatch("AppPlayDev", {devid: '24dc3a1567e342bf8158c070a1140dd8'})
          .then(response => {
            // Toast("成功")
            alert(JSON.stringify(response))
            /*
                        let data = {
                          partnerid: response.result.partnerid,
                          prepayid: response.result.prepayid,
                          package: response.result.package,
                          noncestr: response.result.noncestr,
                          timestamp: response.result.timestamp,
                          sign: response.result.sign,
                        }*/

            // alert(JSON.stringify(data))
            Wechat.sendPaymentRequest(response.result, function () {
              alert("Success");
            }, function (reason) {
              alert("Failed: " + reason);
            });
          })
        // .catch(error => {
        // Toast('失败')
        // })
      },

      WechatShare() {
        Wechat.share({
          text: "This is just a plain string",
          scene: Wechat.Scene.TIMELINE   // share to Timeline
        }, function () {
          alert("Success");
        }, function (reason) {
          alert("Failed: " + reason);
        });
      },

      WechatCheck() {
        Wechat.isInstalled(function (installed) {
          alert("Wechat installed: " + (installed ? "Yes" : "No"));
        }, function (reason) {
          alert("Failed: " + reason);
        });
      },

      WechatLogin() {
        let scope = "snsapi_userinfo"
        let state = "_" + (+new Date())
        Wechat.auth(scope, state, function (response) {
          // you may use response.code to get the access token.
          alert(JSON.stringify(response));
        }, function (reason) {
          alert("Failed: " + reason);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .b_content {
    text-align: center;
  }

  .b_footer {
    text-align: center;
    margin-top: 40px;
    p {
      display: inline-block;
      width: 158px;
      text-align: center;
      color: #ccc;
    }
  }
</style>
