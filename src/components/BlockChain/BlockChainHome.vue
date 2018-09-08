<template>
  <div class="page">
    <!--  <input type="text" v-model="TransactionData.Id" placeholder="对方ID">
      <input type="text" v-model="TransactionData.Amount" placeholder="数量">

      <button @click="TransactionFun"> fa song</button>-->
    <div class="box">
      <div class="content">
        <div class="c_header">
          <div class="c_h_img">
            <img src="../../img/logo.png" alt="">
          </div>
          <div class="c_h_box">
            <h3
              v-if="$store.state.login.chainLoginMsg.username ==='' || $store.state.login.chainLoginMsg.username ===undefined "
              @click="$router.push({name:'BlockChainUsername'})"
            >点此编辑信息</h3>
            <h3 v-else>{{$store.state.login.chainLoginMsg.username}}</h3>
            <p> STU地址: {{$store.state.login.chainLoginMsg.address}}</p>
            <p> 当前金额: {{$store.state.login.chainLoginMsg.balance | STUFilter}} STU</p>
          </div>
        </div>
        <div class="c_content">
          <ul class="xlist">
            <li class="xitem"
                @click="$router.push({name:'BlockChainSend',params:{addressId:'null'}})">
              <div>
                <img src="../../img/books.png" alt="">
              </div>
              <div class="center">
                <span>发送 STU</span>
              </div>
              <div>
                <img src="../../img/right_icon.jpg" alt="">
              </div>
            </li>
            <li class="xitem" @click="$router.push({name:'BlockChainSetPwd'})" v-if="!isUnconfirmedSignature">
              <div>
                <img src="../../img/books.png" alt="">
              </div>
              <div class="center">
                <span>设置支付密码</span>
              </div>
              <div>
                <img src="../../img/right_icon.jpg" alt="">
              </div>
            </li>
            <li class="xitem" @click="LoginOut">
              <div>
                <img src="../../img/books.png" alt="">
              </div>
              <div class="center">
                <span>退出虚拟资产</span>
              </div>
              <div>
                <img src="../../img/right_icon.jpg" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <chainfooter :Indexs='Index'></chainfooter>
  </div>
</template>

<script>


  import chainfooter from "../public/ChainFooter"


  /*个人信息*/
  export default {
    name: "BlockChainHome",
    data() {
      return {
        TransactionData: {
          Id: "",
          Amount: ""
        },
        Index: 3,
        isUnconfirmedSignature: false
      }
    },
    methods: {
      /*     TransactionFun() {
             let $self = this
             $self.$store.dispatch("ChainTransactions", $self.TransactionData)
               .then(response => {
                 console.log(response)
               })
           },*/


      //  chain 个人信息 查询
      chainUserInfo() {
        let $self = this
        $self.$store.dispatch("ChainUserInfo")
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.$store.commit("SET_chainLoginMsg", response.account)
              if (response.account.unconfirmedSignature) {
                $self.isUnconfirmedSignature = true
              } else {
                $self.isUnconfirmedSignature = false
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      },

      LoginOut() {
        this.$router.replace({name: 'PersonalCenter'})
      }

    },
    components: {
      chainfooter
    },
    created() {
      this.chainUserInfo()
    }
  }
</script>

<style scoped lang="scss">

  .content {
    .c_header {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00aaef;
      .c_h_img {
        width: 128px;
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .c_h_box {
        flex: 1;
        p {
          height: 24px;
          line-height: 24px;
          color: #fff;
        }
        h3 {
          height: 28px;
          line-height: 28px;
          color: #fff;
        }
      }
    }
  }
</style>
