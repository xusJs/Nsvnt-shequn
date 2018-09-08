<template>
  <div class="page">
    <xheader is-left="true" title="申请提现"></xheader>
    <div class="box">
      <mt-field label="用户名" placeholder="用户名" v-model="ApplicationData.userName"></mt-field>
      <mt-field label="卡号" placeholder="银行卡号" type="number" v-model="ApplicationData.cardNumber"></mt-field>
      <mt-field label="金额" placeholder="提现金额" type="password" v-model="ApplicationData.withdrawalSum"></mt-field>
    </div>
    <div class="footer" @click="ApplicationCashFun">
      申请提现
    </div>
  </div>
</template>

<script>

  import xheader from "./public/xheader"

  import {Toast} from "mint-ui"

  export default {
    name: "ApplicationPresentation",
    components: {
      xheader
    },
    data() {
      return {
        ApplicationData: {
          withdrawalSum: "",
          cardNumber: "",
          userName: "",
        }
      }
    },
    methods: {
      ApplicationCashFun() {
        let $self = this
        let reg = /\d{15}|\d{19}/
        if (reg.test($self.ApplicationData.cardNumber)) {
          $self.$store.dispatch("ApplicationCash", this.ApplicationData)
            .then(response => {
              if (response.success) {
                Toast("申请成功！待后台审核")
              } else {
                Toast("申请失败" + response.result)
              }
            })
            .catch(error => {
              Toast("申请错误！" + error)
            })
        } else {
          Toast("请输入正确的银行卡号")
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    /*text-justify: auto;*/
    font-size: 16px;
    background: #00aaef;
  }
</style>
