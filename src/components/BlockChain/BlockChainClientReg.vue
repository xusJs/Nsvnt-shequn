<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p>注册为受托人</p>
        <div class="password_box">
          <p>请选择受托人名称</p>
          <input type="text" v-model="username" class="xqd-input" placeholder="受托人名称">
          <p>成为受托人是需要注册的，请选择您的受托人名称 ，并以此来推广您的受托人名称，只有得票排名在前101名以内才有资格进行锻造，锻造的所有手续费将均分给所有的101位受托人</p>
        </div>
        <div class="password_box XButtonBox">
          <button class="xqd-button"
                  @click="$router.go(-1)">
            取消
          </button>
          <button class="xqd-button" @click="ClientReg">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Toast, MessageBox} from "mint-ui"


  export default {
    name: "BlockChainClientReg",
    data() {
      return {
        username: ""
      }
    },
    methods: {
      ClientReg() {
        let $self = this
        if ($self.$store.state.login.chainLoginMsg.secondSignature) {
          MessageBox.prompt('请输入支付密码')
            .then(({value, action}) => {
              if (action === "confirm") {
                $self.$store.dispatch("ChainClientReg", {
                  username: $self.username,
                  secondSecret: value,
                })
                  .then(response => {
                    // console.log(response)
                    if (response.success) {
                      Toast("申请成功")
                      $self.$router.go(-1)
                    }
                  })
              }
            });
        }
        else {
          $self.$store.dispatch("ChainClientReg", {
            username: $self.username,
          })
            .then(response => {
              // console.log(response)
              if (response.success) {
                Toast("申请成功")
                $self.$router.go(-1)
              }
            })
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

  p {
    padding: 4px 10px;
  }
</style>
