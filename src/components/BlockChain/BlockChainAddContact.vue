<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p>添加新的联系人</p>
        <div class="password_box">
          <p>请在下方填写您需要添加的帐户名或者帐户ID</p>
          <input type="text" v-model="username" class="xqd-input" placeholder="账户名">
          <!--<input type="text" v-model="TransactionData.Amount" class="xqd-input" placeholder="金额">-->
          <!--<p>请确认您正发送 STU 给正确的接收人，因为该过程是无法撤消的</p>-->
        </div>
        <div class="password_box XButtonBox">
          <button class="xqd-button"
                  @click="$router.go(-1)">
            取消
          </button>
          <button class="xqd-button" @click="addContact">添加联系人</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Toast, MessageBox} from "mint-ui"


  export default {
    name: "BlockChainAddContact",
    data() {
      return {
        username: ""
      }
    },
    methods: {
      addContact() {
        let $self = this
        if ($self.$store.state.login.chainLoginMsg.secondSignature) {
          MessageBox.prompt('请输入支付密码')
            .then(({value, action}) => {
              if (action === "confirm") {
                $self.$store.dispatch("ChainAddContacts", {
                  type: "+",
                  ID: $self.username,
                  secondSecret: value
                })
                  .then(response => {
                    // console.log(response)
                    if (response.success) {
                      Toast("添加申请发送成功")
                      $self.$router.go(-1)
                    } else {
                      Toast(response)
                    }
                  })
              }
            });
        }
        else {
          $self.$store.dispatch("ChainAddContacts", {
            type: "+",
            ID: $self.username,
          })
            .then(response => {
              // console.log(response)
              if (response.success) {
                Toast("添加申请发送成功")
                $self.$router.go(-1)
              } else {
                Toast(response)
              }
            })
        }
      }
    },
    created() {
      if (this.$route.params.addressId === 'null') {

      } else {
        this.username = this.$route.params.addressId
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
