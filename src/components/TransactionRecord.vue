<template>
  <div class="page">
    <xheader is-left="true" title="交易记录"></xheader>

    <div class="box">
      <ul class="TransactionRecord_list" v-if="TransactionRecordList.length">
        <li class="TransactionRecord_item"
            v-for="(item,index) in TransactionRecordList"
            :key="item+index">
          <div class="TransactionRecord_header">
            <p class="center">
              {{TransactionType(item.opType)}}
            </p>
            <p>
              ￥ {{item.wamount}}
            </p>
          </div>
          <div class="TransactionRecord_footer">
            <!--<p class="center">{{item.opChannel}}</p>-->
            <p class="center"></p>
            <p>{{item.createdAt/1000 | timeYearFilter}}</p>
          </div>
        </li>
      </ul>
      <div style="text-align: center;padding: 20px 0">
        您暂无交易记录
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "./public/xheader"
  import {Toast} from "vant"

  export default {
    name: "TransactionRecord",
    components: {
      xheader
    },
    data() {
      return {
        TransactionRecordList: []
      }
    },
    methods: {
      TransactionRecordFun() {
        let $self = this
        $self.$store.dispatch("TransactionRecordFind")
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.TransactionRecordList = response.result
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })
      },


      /**
       * 0:转入资金 1:转出资金 2;消费 9：可提资金变动
       * */
      TransactionType(type) {
        if (type === 0) {
          return "转入资金"
        } else if (type === 1) {
          return "转出资金"
        } else if (type === 2) {
          return "消费"
        } else if (type === 9) {
          return "可提现资金变动"
        }
      },
    },
    created() {
      this.TransactionRecordFun()
    }
  }
</script>

<style scoped lang="scss">

  .TransactionRecord_list {
    .TransactionRecord_item {
      padding: 13px;
      border-bottom: 1px solid #ddd;
      .TransactionRecord_header {
        display: flex;
        .center {
          flex: 1;
          color: #333;
        }
        p {
          font-size: 16px;
          color: #ef2929;
        }
      }
      .TransactionRecord_footer {
        display: flex;
        padding-top: 12px;
        .center {
          flex: 1;
        }
        p {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }

</style>
