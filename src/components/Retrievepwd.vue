<template>
  <div class="page">
    <xheader is-left="true" title="找回密码"></xheader>
    <div class="box">
      <img src="../img/logo.jpg" alt="">
      <input type="text" v-model="RetrieveData.phone" class="xqd-input" placeholder="输入手机号">
      <span class="xqd-input-button">
        <input type="text" placeholder="验证码" v-model="RetrieveData.captcha">
        <button @click="addCaptcha">点击获取</button>
      </span>
      <input type="text" v-model="RetrieveData.newpwd" class="xqd-input" placeholder="输入新的密码">
      <button class="xqd-button" @click="Retrieve">修改</button>
      <div class="btn">
        <a @click="$router.push({name:'login'})">登录</a>
        <span></span>
        <a @click="$router.push({name:'register'})">注册</a>
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"

  import {Toast} from "mint-ui"

  export default {
    name: "Retrievepwd",
    data() {
      return {
        RetrieveData: {
          phone: "",
          captcha: "",
          newpwd: "",
        }
      }
    },
    components: {
      xheader
    },
    methods: {
      addCaptcha() {
        this.$store.dispatch("_addCaptcha", {phone: this.RetrieveData.phone})
          .then(response => {
            if (response.result) {
              Toast('验证码发送成功')
            } else {
              Toast(response.result)
            }
          })
      },
      Retrieve() {
        this.$store.dispatch("_Retrieve", this.RetrieveData)
          .then(response => {
            if (response.success) {
              Toast("更改成功")
              this.$router.push({
                name:"login"
              })
            } else {
              Toast(response.result)
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">

  .box {
    text-align: center;
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
</style>
