<template>
  <div class="home page">
    <xheader :title="$store.state.community.homeName"></xheader>
    <div class="box">
      <router-view/>
    </div>
    <xfooter></xfooter>
  </div>
</template>

<script>
  import xfooter from "../components/public/xfooter"
  import xheader from "../components/public/xheader"
  // import {Toast} from "mint-ui"
  import {gettoken} from "../store/set"

  export default {
    name: "home",
    data() {
      return {
        IOTselectdevinfo: [], // IOT设备列表
        requestData: [],      // 推送 消息数据
        FriendsListData: [],  //我的好友列表
        FriendVersion: '',    //好友版本号
        roomVersion: ""       //群版本号
      }
    },
    methods: {},
    components: {
      xfooter,
      xheader
    },
    created() {
      this.$store.dispatch("_CSRMsg")
      if (gettoken() === "") {
        this.$router.replace({name: 'login'})
      }
    }
  }
</script>

<style scoped>

  .ContactsBox img {
    width: 48px;
    height: 48px;
  }

  .mint-tabbar {
    position: fixed;
  }
</style>
