<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p class="XQD_p">确认二级密码</p>
        <div class="password_box">
          <textarea type="text" v-model="newPassPhrase" class="xqd-input" placeholder="二级密码"></textarea>
        </div>
        <!--<p class="XQD_p">请确定您已经安全保存了二级密码，稍后将会要求您重复输入以确认密码.</p>-->
        <div class="password_box XButtonBox">
          <button class="xqd-button" @click="$router.go(-1)">返回</button>
          <button class="xqd-button" @click="_started">开始吧！</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui"

  export default {
    name: "BlockChainConfirm",
    data() {
      return {
        newPassPhrase: ""
      }
    },
    methods: {
      _started() {
        let $self = this
        let reg = /\S/
        if (reg.test($self.newPassPhrase)) {
          $self.$store.dispatch("ChainLogin", {secret: $self.newPassPhrase})
            .then(response => {
              // Toast('登录成功')
              if (response.success) {
                // Toast(response.account)
                $self.$store.commit("SET_chainLoginMsg", response.account)
                $self.$store.commit("SET_secret", $self.newPassPhrase)
                $self.$router.replace({name: 'BlockChainHome'})
              } else {
                Toast(response.error)
              }
            })
            .catch(error => {

            })
        } else {
          Toast('密码不能为空')
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
          line-height: 24px;
          font-size: 16px;
          padding: 10px;
          width: 90%;
          margin-bottom: 20px;
          height: 88px;
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

  .XQD_p {
    padding: 4px 10px;
  }

</style>
