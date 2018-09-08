<template>
  <div class="page">
    <xheader title="受托人"></xheader>
    <div class="box">
      <div class="b_header">
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'BlockChainClientReg'})">
            <div>
              <img src="../../img/books.png" alt="">
            </div>
            <div class="center">
              <span>受托人注册</span>
            </div>
            <div>
              <img src="../../img/right_icon.jpg" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'BlockChainClientList',params:{type:1}})">
            <div>
              <img src="../../img/books.png" alt="">
            </div>
            <div class="center">
              <span>已入围受托人</span>
            </div>
            <div>
              <img src="../../img/right_icon.jpg" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'BlockChainClientList',params:{type:2}})">
            <div>
              <img src="../../img/books.png" alt="">
            </div>
            <div class="center">
              <span>候选受托人</span>
            </div>
            <div>
              <img src="../../img/right_icon.jpg" alt="">
            </div>
          </li>
          <li class="xitem" @click="$router.push({name:'BlockChainClientList',params:{type:3}})">
            <div>
              <img src="../../img/books.png" alt="">
            </div>
            <div class="center">
              <span>我的投票</span>
            </div>
            <div>
              <img src="../../img/right_icon.jpg" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="b_content">

      </div>
    </div>
    <chainfooter :Indexs="Index"></chainfooter>
  </div>
</template>

<script>
  /*受托人*/

  import chainfooter from "../public/ChainFooter"
  import xheader from "../public/xheader"

  export default {
    name: "BlockChainClient",
    components: {
      chainfooter,
      xheader
    },
    data() {
      return {
        Index: 2
      }
    }
  }
</script>

<style scoped>

</style>
