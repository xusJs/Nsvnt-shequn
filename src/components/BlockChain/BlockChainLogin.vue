<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <div class="password_box">
          <input type="text" v-model="password" class="xqd-input" placeholder="二级密码">
        </div>
        <div class="password_box XButtonBox">
          <button class="xqd-button"
                  @click="$router.push({name:'BlockChainNewUser'})">
            新账户
          </button>
          <button class="xqd-button" @click="chainLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Toast} from "mint-ui"


  export default {
    name: "BlockChainLogin",
    data() {
      return {
        password: ""
      }
    },
    methods: {
      chainLogin() {
        let reg = /\S/
        let $self = this
        if (reg.test($self.password)) {
          $self.$store.dispatch("ChainLogin", {secret: $self.password})
            .then(response => {
              // Toast(response)

              if (response.success) {
                // Toast(response.account)
                $self.$store.commit("SET_chainLoginMsg", response.account)
                $self.$store.commit("SET_secret", $self.password)
                $self.$router.replace({name: 'BlockChainHome'})
              } else {
                Toast(response.error)
              }
            })
            .catch(error => {
              Toast(error)
            })
        } else {
          Toast('二级密码不能为空')
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
