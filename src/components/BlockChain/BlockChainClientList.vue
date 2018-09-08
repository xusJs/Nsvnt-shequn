<template>
  <div class="page">
    <xheader is-left="true" :title="title"></xheader>
    <div class="box">
      <ul class="ClientList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-if="$route.params.type !==3"
      >
        <li class="ClientItem" v-for="(item,index) in ClientList" :key="item+index">
          <div>
            <span class="title">排名</span>
            <span class="center">{{item.rate}}</span>
          </div>
          <div>
            <span class="title">名称</span>
            <span class="center">{{item.username}}</span>
          </div>
          <div>
            <span class="title">STU 地址</span>
            <span class="center">{{ item.address}}</span>
          </div>
          <div>
            <span class="title"> 在线率</span>
            <span class="center">{{item.productivity}} %</span>
          </div>
          <div>
            <span class="title">得票率</span>
            <span class="center">{{item.vote | AppFilter}} %</span>
          </div>
          <div class="btn">
            <mt-button plain size="small" v-if="VoteColl" @click="_Vote('+',item.publicKey)">投票</mt-button>
            <mt-button plain size="small" v-else @click="_Vote('-',item.publicKey)">取消投票</mt-button>
          </div>
        </li>
      </ul>

      <ul class="ClientList"
          v-infinite-scroll="loadMores"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          v-else
      >
        <li class="ClientItem" v-for="(item,index) in MyVote" :key="item+index">
          <div>
            <span class="title">排名</span>
            <span class="center">{{item.rate}}</span>
          </div>
          <div>
            <span class="title">名称</span>
            <span class="center">{{item.username}}</span>
          </div>
          <div>
            <span class="title">STU 地址</span>
            <span class="center">{{ item.address}}</span>
          </div>
          <div>
            <span class="title"> 在线率</span>
            <span class="center">{{item.productivity}} %</span>
          </div>
          <div>
            <span class="title">得票率</span>
            <span class="center">{{item.vote | AppFilter}} %</span>
          </div>
          <div class="btn">
            <mt-button plain size="small" v-if="VoteColl" @click="_Vote('+',item.publicKey)">投票</mt-button>
            <mt-button plain size="small" v-else @click="_Vote('-',item.publicKey)">取消投票</mt-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import xheader from "../public/xheader"
  import {Toast, MessageBox} from "mint-ui"
  import test from "../../store/modules/test";


  export default {
    name: "BlockChainClientList",
    components: {
      xheader
    },
    data() {
      return {
        title: "",
        chainClients: {
          offset: 0,
          limit: 0,
        },
        ClientList: [],
        MyVote: [],
        VoteColl: true
      }
    },
    methods: {
      ChainClient() {
        let $self = this
        $self.$store.dispatch("ChainClientFind", this.chainClients)
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.ClientList = response.delegates
              $self.loading = false
            } else {
              Toast(response)
            }
          })
      },
      ChainMyVote() {
        let $self = this
        $self.$store.dispatch("ChainClientVote")
          .then(response => {
            if (response.success) {
              $self.MyVote = response.delegates
              $self.loading = false
            } else {
              Toast(response)
            }
          })
      },

      //  投票 取消投票
      _Vote(type, publicKey) {
        let $self = this
        if ($self.$store.state.login.chainLoginMsg.secondSignature) {
          MessageBox.prompt('输入支付密码')
            .then(({value, action}) => {
              if (action === "confirm") {
                let delegates = type + publicKey
                let arr = [delegates]
                $self.$store.dispatch("ChainVote", {
                  delegates: arr,
                  secondSecret: value
                })
                  .then(resoponse => {
                    // console.log(resoponse)
                    if (resoponse.success) {
                      Toast("操作成功")
                    } else {
                      Toast(resoponse)
                    }
                  })
              }
            })
        }
        else {
          let delegates = type + publicKey
          let arr = [delegates]
          $self.$store.dispatch("ChainVote", {
            delegates: arr,
          })
            .then(resoponse => {
              if (resoponse.success) {
                Toast("操作成功")
              } else {
                Toast(resoponse)
              }
            })
        }
      },
      loadMore() {
        this.loading = true;

        this.chainClients.limit += 10
        this.ChainClient()
        // this.ChainMyVote()

        this.loading = false
      },

      loadMores() {
        this.loading = true;

        this.chainClients.limit += 10
        // this.ChainClient()
        this.ChainMyVote()

      }
    },
    created() {
      if (this.$route.params.type === 1) {
        this.chainClients.offset = 0
        this.chainClients.limit = 10
        this.title = "已入围委托人"
        this.VoteColl = true
        this.ChainClient()
      } else if (this.$route.params.type === 2) {
        this.chainClients.offset = 101
        this.chainClients.limit = 10
        this.title = "候选委托人"
        this.VoteColl = true
        this.ChainClient()
      } else if (this.$route.params.type === 3) {
        this.chainClients.offset = 101
        this.chainClients.limit = 10
        this.title = "我的投票"
        this.VoteColl = false
        this.ChainMyVote()
      }
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
