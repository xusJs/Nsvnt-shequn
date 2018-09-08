<template>
  <div class="page">
    <xheader title="联系人"></xheader>
    <div class="box">
      <div class="b_header">
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'BlockChainAddContact',params:{addressId:'null'}})">
            <div>
              <img src="../../img/books.png" alt="">
            </div>
            <div class="center">
              <span>添加联系人</span>
            </div>
            <div>
              <img src="../../img/right_icon.jpg" alt="">
            </div>
          </li>
          <!-- <li class="xitem">
             <div>
               <img src="../../img/books.png" alt="">
             </div>
             <div class="center">
               <span>待处理（{{ContactsList.length}}）</span>
             </div>
             <div>
               <img src="../../img/right_icon.jpg" alt="">
             </div>
           </li>-->
        </ul>
      </div>
      <div class="b_content">
        <ul class="xlist" v-if="ContactsList.length">
          <li class="xitem">
            <div class="center">
              好友申请
            </div>
          </li>
          <li class="xitem" v-for="(item,index) in ContactsList" :key="item+index"
          >
            <div class="b_c_name">
              <p>{{item.username}}</p>
            </div>
            <div class="center">
              <span>{{item.address}}</span>
            </div>
            <div>
              <img src="../../img/addgroup.png" alt=""
                   @click="$router.push({name:'BlockChainAddContact',params:{addressId:item.address}})">
            </div>
          </li>
        </ul>
        <nav>我的联系人</nav>
        <ul class="xlist">
          <li class="xitem" v-for="(item,index) in ContactingList" :key="item+index"
          >
            <div class="b_c_name">
              <p>{{item.username}}</p>
            </div>
            <div class="center">
              <span>{{item.address}}</span>
            </div>
            <div>
              <img src="../../img/send.png" alt=""
                   @click="$router.push({name:'BlockChainSend',params:{addressId:item.address}})">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <chainfooter :Indexs="Index"></chainfooter>
  </div>
</template>

<script>


  /*联系人*/
  import chainfooter from "../public/ChainFooter"
  import xheader from "../public/xheader"

  export default {
    name: "BlockChainContacts",
    components: {
      chainfooter,
      xheader
    },
    data() {
      return {
        Index: 0,
        ContactingList: [], // 我的好友列表
        ContactsList: []      // 待处理列表
      }
    },
    methods: {
      //  联系人 查询
      ChainContactsFindFun() {
        let $self = this
        $self.$store.dispatch("ChainContactsFind")
          .then(response => {
            $self.ContactingList = response.following
            $self.ContactsList = response.followers
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    created() {
      this.ChainContactsFindFun()
    }
  }
</script>

<style scoped lang="scss">

  .b_content {
    nav {
      padding: 4px 0 4px 10px;
      font-size: 16px;

    }
    .xitem {
      img {
        background: #000000;
        border-radius: 5px;
      }
      .b_c_name {
        width: 100px;
      }
    }
  }
</style>
