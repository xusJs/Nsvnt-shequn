<template>
  <div class="footer">
    <ul>
      <li v-for="(item,index) in list"
          :key="item+index"
          @click="$router.replace({name:item.GoValue})"
      >
        <p :class="{active : index == Indexs }">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ChainFooter",
    props: {
      Indexs: Number
    },
    data() {
      return {
        list: [
          {name: "联系人", GoValue: "BlockChainContacts"},
          {name: "交易", GoValue: "BlockChainTransaction"},
          {name: "受托人", GoValue: "BlockChainClient"},
          {name: "个人中心", GoValue: "BlockChainHome"},
        ]
      }
    },
  }
</script>

<style scoped lang="scss">

  ul {
    display: flex;
    text-align: center;
    border-top: 1px solid #ddd;
    li {
      flex: 1;
      height: 60px;
      line-height: 60px;
    }
  }

  .active {
    background: #ddd;
  }
</style>
