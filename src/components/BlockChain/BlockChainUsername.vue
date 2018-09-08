<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p>个人信息</p>
        <div class="password_box">
          <p>请填写您的用户名 （本次操作 100 STU）</p>
          <input type="text" v-model="userName" class="xqd-input" placeholder="用户名">
        </div>
        <div class="password_box XButtonBox">
          <button class="xqd-button"
                  @click="$router.go(-1)">
            取消
          </button>
          <button class="xqd-button" @click="Setuser">设置用户名</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from "mint-ui"

  export default {
    name: "BlockChainUsername",
    data() {
      return {
        userName: ""
      }
    },
    methods: {
      Setuser() {
        let $self = this
        if ($self.$store.state.login.chainLoginMsg.secondSignature) {
          MessageBox.prompt('请输入支付密码')
            .then(({value, action}) => {
              if (action === "confirm") {
                $self.$store.dispatch("ChainChangeUserName",
                  {
                    secondSecret: value,
                    username: $self.userName
                  })
                  .then(response => {
                    if (response.success) {
                      Toast("修改成功");
                      $self.$router.go(-1)
                    } else {

                    }
                  })
              }
            });
        } else {
          $self.$store.dispatch("ChainChangeUserName",
            {
              username: $self.userName
            })
            .then(response => {
              if (response.success) {
                Toast("修改成功");
                $self.$router.go(-1)
              } else {

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
