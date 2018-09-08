<template>
  <div class="register page">
    <xheader title="注册" is-left="ture"></xheader>
    <div class="box">
      <img src="../img/logo.jpg" alt="">
      <input type="text" class="xqd-input" placeholder="请输入用户名" v-model="registerFrom.username">
      <input type="text" class="xqd-input" placeholder="请输入手机号" v-model="registerFrom.phone">
      <span class="xqd-input-button">
        <input type="text" placeholder="验证码" v-model="registerFrom.captcha">
        <button @click="_addCaptcha">点击获取</button>
      </span>
      <!--<input type="text" class="xqd-input" placeholder="请输入地址" v-model="registerFrom.address">-->
      <button class="xqd-button" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"

  export default {
    name: "register",
    data() {
      return {
        registerFrom: {
          captcha: "",
          username: "",
          phone: "",
          address: ""
        }
      }
    },
    components: {
      xheader
    },
    methods: {
      _addCaptcha() {
        let $self = this
        let reg = /\S/
        if (reg.test($self.registerFrom.phone)) {
          $self.$store.dispatch("_addCaptcha", {phone: $self.registerFrom.phone})
            .then((response) => {
              if (response.success) {
                Toast("验证发送成功")
              } else {
                Toast(response.result)
              }
            })
        }
        else {
          Toast("手机号不能为空")
        }
      },
      register() {
        let $self = this
        let reg = /\S/
        if (!reg.test($self.registerFrom.phone)) {
          Toast('手机号不能为空')
        } else if (!reg.test($self.registerFrom.captcha)) {
          Toast('验证码不能为空')
        } else if (!reg.test($self.registerFrom.username)) {
          Toast('用户名不能为空')
        } else {
          $self.$store.dispatch("_register", $self.registerFrom)
            .then(res => {
              if (res.success) {
                MessageBox.alert('注册成功！您的密码为手机号后四位')
                  .then(action => {
                    if (action === 'confirm') {
                      // $self.$router.push({name: 'login'})
                      $self.loginFun()
                    }
                  })
              } else {
                Toast(res.result)
              }
            })
        }
      },

      loginFun() {
        let $self = this
        let str = $self.registerFrom.phone;
        let password = str.substr(str.length - 4)
        $self.$store.dispatch("AppLogin", {phone: $self.registerFrom.phone, password: password})
          .then(response => {
            if (response.success) {

              // IM websocket 登录
              $self.$store.dispatch("createWebSocket")
              // iot websocket 登录
              $self.$store.dispatch("IOTcreateWebSocket")

              
              $self.$router.replace({
                name: "Community"
              })

            } else {
              Toast(response.result)
            }
          })
          .catch(error => {

          })
      },

    }
  }
</script>

<style scoped lang="scss">
  .register {
    text-align: center;
    .box {
      .xqd-input {
        border: 1px solid #00aaef;
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
      }
      .xqd-button {
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
        background: #00aaef;
        color: #fff;
        text-align: center;
      }
      .xqd-input-button {
        display: flex;
        width: 90%;
        margin-bottom: 20px;
        margin-left: 5%;
        input {
          border: 1px solid #00aaef;
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          flex: 1;
        }
        button {
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          width: 100px;
          background: #00aaef;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

</style>
