<template>
  <div class="page">
    <div class="box">
      <ul class="ClientList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
      >
        <li class="ClientItem" v-for="(item,index) in TransactionList" :key="item+index">
          <div>
            <span class="title">区块高度</span>
            <span class="center">{{item.height}}</span>
          </div>
          <div>
            <span class="title">发送者</span>
            <span class="center">{{item.senderId}}</span>
          </div>
          <div>
            <span class="title">接受者</span>
            <span class="center">
              {{ item.recipientUsername || item.recipientId || ""}}
            </span>
          </div>
          <div>
            <span class="title"> 日期</span>
            <span class="center">{{item.timestamp | TimeFilter}}</span>
          </div>
          <div>
            <span class="title">金额</span>
            <span class="center">{{item.amount | STUFilter}} STU</span>
          </div>
          <div>
            <span class="title">手续费</span>
            <span class="center">{{item.fee | STUFilter}} STU</span>
          </div>
        </li>
      </ul>
    </div>
    <chainfooter :Indexs="Index"></chainfooter>
  </div>
</template>

<script>

  /*交易*/

  import chainfooter from "../public/ChainFooter"

  export default {
    name: "BlockChainTransaction",
    components: {
      chainfooter
    },
    data() {
      return {
        Index: 1,
        TransactionList: [],
        limit: 10
      }
    },
    methods: {
      ChainTransactionList() {
        let $self = this
        $self.$store.dispatch("ChainMyTransaction", {limit: this.limit})
          .then(response => {
            if (response.success) {
              $self.TransactionList = response.transactions
            }
          })
      },
      loadMore() {
        this.loading = true;
        /*     setTimeout(() => {
               let last = this.list[this.list.length - 1];
               for (let i = 1; i <= 10; i++) {
                 this.list.push(last + i);
               }
               this.loading = false;
             }, 2500);*/
        this.limit += 10
        this.ChainTransactionList()
      }
    },
    created() {
      this.ChainTransactionList()
    }
  }
</script>

<style scoped lang="scss">

  .ClientList {
    .ClientItem {
      border: 1px solid #ddd;
      padding: 20px 0;
      div {
        display: flex;
        .title {
          padding: 4px 8px;
          width: 100px;
        }
        .center {
          padding: 4px;
          flex: 1;
        }
      }
      .btn {
        display: block;
        text-align: center;
      }
    }
  }
</style>
