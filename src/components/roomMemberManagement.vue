<template>
  <div class="management">
    <xheader is-left="true"></xheader>
    <div class="box">
      <mt-checklist
        v-if="nameslist.length"
        title="选择需要操作的人员"
        v-model="islist"
        :options="nameslist">
      </mt-checklist>
      <div v-if="!nameslist.length" class="nop">
        没有人员可以操作
      </div>
    </div>
    <div class="btn" v-if="nameslist.length">
      <mt-button @click="operationFun()">确定</mt-button>
    </div>
  </div>
</template>

<script>
  import xheader from "@/components/public/xheader"
  import md5 from "js-md5"
  import Qs from "qs"
  import {MessageBox,Toast} from "mint-ui"


  export default {
    name: "room-member-management",
    components: {
      xheader
    },
    data() {
      return {
        operation: this.$route.params.operation,
        nameslist: [],
        islist: [],
      }
    },
    methods: {
      judgeoperation() {
        if (this.operation === "add") {
          this.nameslist = [];
          let list = this.$store.state.community.FriendsList;
          list.forEach(res => {
            this.nameslist.push({label: res.realName, value: res.friendId})
          })
        } else if (this.operation === "rem") {
          this.nameslist = [];

          let list = this.$store.state.chat.RoomMemberList;
          list.forEach(res => {
            if (res.owner === "1") {

            } else {
              this.nameslist.push({label: res.realName, value: res.userId})
            }
          })
        }

      },
      operationFun() {

        let $self = this;
        let timer = Date.parse(new Date());
        let data;


        if ($self.operation === "add") {

          data = Qs.stringify({
            sendId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            recvId: $self.$store.state.chat.RoomNowChatId,
            comm: "rmmg",
            timestamp: timer + "",
            sign: md5($self.$store.state.login.token + timer),
            data: JSON.stringify({dtype: "3", content: '', mbList: $self.islist}),
          })

        } else if ($self.operation === "rem") {

          data = Qs.stringify({
            sendId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token ,
            recvId: $self.$store.state.chat.RoomNowChatId,
            comm: "rmmg",
            timestamp: timer + "",
            sign: md5($self.$store.state.login.token + timer),
            data: JSON.stringify({dtype: "4", content: '', mbList: $self.islist}),
          })
        }

        $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
          .then(res => {
            if (res.data.success) {
              $self.$router.go(-1)
            } else {
              Toast(res.data.result)
            }
          })
      }
    },
    created() {
      this.judgeoperation()
    }
  }
</script>

<style scoped lang="scss">
  .management {
    .box {
      margin-top: 40px;
      .nop {
        line-height: 100px;
        text-align: center;
      }
    }
    .btn {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
