<template>
  <div class="page">
    <xheader is-left="true" title="充值"></xheader>

    <div class="box">
      <div class="Recharge_top"></div>
      <div class="Recharge_center">
        <ul>
          <li v-for="(item,index) in RechargeNumList" :key="index+item" :class="{ active : index===isActive}"
              @click="changeRechargeNum(item,index)">
            <div>
              ￥{{item.Num}}
            </div>
          </li>
        </ul>
        <div class="RechargeNum">
          <label for="RechargeNum">
            充值金额
            <input type="number" id="RechargeNum" placeholder="充值金额" v-model="RechargeNum">
          </label>
        </div>
      </div>
      <div class="Recharge_bottom">
        <mt-radio
          title="支付方式"
          v-model="RechargeMode"
          :options="RechargeModeList">
        </mt-radio>
      </div>
    </div>

    <div class="footer">
      <div class="footer_btn" @click="_Recharge">
        充值
      </div>
    </div>


  </div>
</template>

<script>
  import xheader from "../components/public/xheader"
  import {Toast,Indicator} from "mint-ui"

  export default {
    name: "Recharge",
    data() {
      return {
        RechargeNumList: [
          {Num: 100},
          {Num: 200},
          {Num: 500},
          {Num: 1000},
          {Num: 2000},
          {Num: 5000},
        ],
        isActive: -1,
        RechargeNum: "",
        RechargeMode: "啧啧啧",
        RechargeModeList: [
          /* {
             label: '被禁用',
             value: '值F',
             disabled: true
           },*/
          {
            label: '微信',
            value: '啧啧啧'
          },
        ]
      }
    },
    methods: {
      changeRechargeNum(item, index) {
        this.isActive = index
        this.RechargeNum = item.Num
      },
      _Recharge() {
        Indicator.open()
        this.$store.dispatch("WSRecharge", {Num: this.RechargeNum})
          .then(response => {
            // console.log(response)
            Indicator.close()
            Wechat.sendPaymentRequest(response.result, function () {
              Toast("Success");
            }, function (reason) {
              // Toast("Failed: " + reason);
            })
          })
      }
    },
    components: {
      xheader
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .Recharge_top {
    }
    .Recharge_center {
      ul {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        margin: 20px auto;
        li {
          flex: 0 0 33.33%;
          /*padding: 10px 0;*/
          div {
            margin: 10px;
            padding: 6px 0;
            border: 1px solid #333;
          }
        }

        .active {
          div {
            border: 1px solid #fe2929;
            color: #fe2929;
          }
        }
      }
      .RechargeNum {
        padding: 10px;
        label {
          font-size: 16px;
        }
        input {
          font-size: 14px;
          /*border-bottom: 1px solid #00aaee;*/
          padding: 4px 10px;
        }
      }
    }
    .Recharge_bottom {
    }
  }

  .footer_btn {
    font-size: 16px;
    text-align: center;
    background: #00aaee;
    color: #fff;
    height: 43px;
    line-height: 43px;
  }
</style>
