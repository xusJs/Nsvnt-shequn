<template>
  <div class="page">
    <div class="box">
      <div class="content_box">
        <img src="../../img/logo.png" alt="">
        <p class="XQD_p">以下是您的二级密码</p>
        <div class="password_box">
          <textarea type="text" v-model="newPassPhrase" class="xqd-input" placeholder="二级密码"></textarea>
        </div>
        <p class="XQD_p">请确定您已经安全保存了二级密码，稍后将会要求您重复输入以确认密码.</p>
        <div class="password_box XButtonBox">
          <button class="xqd-button" @click="_generatePwd">新创建</button>
          <button class="xqd-button" @click="_ExportData">保存主密码</button>
          <button class="xqd-button" @click="_Next">接受/下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BlockChainNewUser",
    data() {
      return {
        newPassPhrase: ""
      }
    },
    methods: {
      _generatePwd() {
        let Mnemonic = require('bitcore-mnemonic');
        let code = new Mnemonic(Mnemonic.Words.ENGLISH);
        this.newPassPhrase = code.toString();
      },
      _ExportData() {
        let pass = this.newPassPhrase
        let blob = new Blob([pass], {type: "text/plain;charset=utf-8"});
        FS.saveAs(blob, "NSCPassphrase.txt");
      },
      _Next() {
        this.$store.commit("SET_chainPassPhrase", this.newPassPhrase)
        this.$router.push({name: 'BlockChainConfirm'})
      },
    },
    created() {
      this._generatePwd()
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
