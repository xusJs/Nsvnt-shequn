<template>
  <div class="page">
    <xheader is-left="true" title="我的钱包"></xheader>
    <div class="box">
      <div class="Wallet_Top">
        <div class="Top_img">
          <img src="../img/MyWallet.png" alt="">
        </div>
        <div class="Top_title">
          余额
        </div>
        <div class="Top_Num">
          ￥ {{userInfo.balance}}
          <span style="font-size: 12px;color: #999">可提现金额 :{{userInfo.canpresent}}</span>
        </div>
      </div>
      <div class="Wallet_Center">
        <ul>
          <li @click="$router.push({name:'Recharge'})">
            <div>充值</div>
          </li>
          <li @click="$router.push({name:'ApplicationPresentation'})">
            <div>申请提现</div>
          </li>
        </ul>
      </div>
      <div class="Wallet_Bottom"></div>
    </div>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import {Toast} from "mint-ui"

  export default {
    name: "MyWallet",
    components: {
      xheader
    },
    data() {
      return {
        userInfo: {}
      }
    },
    methods: {
      MyWalletFun() {
        let $self = this;
        $self.$store.dispatch("FindMyWallet")
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.userInfo = response.result
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })
      }
    },
    created() {
      this.MyWalletFun()
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .Wallet_Top {
      text-align: center;
      div {
        margin-bottom: 12px;
        img {
          width: 49px;
          height: 49px;
        }
        :first-child {
          margin-top: 25px;
        }
      }
      .Top_title {
        font-size: 16px;
        color: #333;
      }
      .Top_Num {
        font-size: 21px;
        color: #666;
      }
    }
    .Wallet_Center {
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          height: 43px;
          line-height: 43px;
          background: #00aaee;
          color: #fff;
          border-right: 1px solid #fbfdfb;
          :last-child {
            border-right: 0;
          }
          div {
            font-size: 13px;
          }
        }
      }
    }
    .Wallet_Bottom {
    }
  }
</style>
