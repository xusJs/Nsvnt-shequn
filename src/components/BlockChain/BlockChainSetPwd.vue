<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p>设置支付密码</p>
        <div class="password_box">
          <p>使用支付密码(可选)来保障帐户安全! 请稍待片刻以使信息成功保存到区块链.(本次操作5STU)</p>
          <input type="text" v-model="password" class="xqd-input" placeholder="支付密码">
          <input type="text" v-model="passwordConfirm" class="xqd-input" placeholder="确认密码">
        </div>
        <div class="password_box XButtonBox">
          <button class="xqd-button"
                  @click="$router.go(-1)">
            取消
          </button>
          <button class="xqd-button" @click="SetPassword">设置支付密码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Toast} from "mint-ui"

  export default {
    name: "BlockChainSetPwd",
    data() {
      return {
        password: "",
        passwordConfirm: ""
      }
    },
    methods: {
      SetPassword() {
        let $self = this
        if ($self.password === $self.passwordConfirm) {
          $self.$store.dispatch("ChainSetPwd", {secondSecret: $self.password})
            .then(response => {
              if (response.success) {
                Toast("设置成功")
                $self.$router.go(-1)
              }
            })
            .catch(error => {

            })
        } else {
          Toast("两次密码不一致")
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .box {
    position: relative;
    .content_box {
      width: 100%;
      height: 400px;
      position: relative;
      left: 0;
      top: -50%;
      margin-top: 200px;
      text-align: center;
      .password_box {
        margin: 8px 0;
        .xqd-input {
          border: 1px solid #00aaef;
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          width: 90%;
          margin-bottom: 20px;
        }
      }
      .XButtonBox {
        display: flex;
        .xqd-button {
          flex: 1;
          line-height: 28px;
          font-size: 16px;
          padding: 10px;
          margin: 10px 10px 10px 0;
          background: #00aaef;
          color: #fff;
          text-align: center;
        }
        :first-child {
          margin: 10px;
        }
      }
    }
  }
</style>
