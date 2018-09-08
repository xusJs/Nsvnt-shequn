<template>
  <div>
    <xheader is-left="true" :title="$store.state.chat.RoomMsg.naturalName"></xheader>
    <div class="box">
      <mt-field label="群名" placeholder="请输入群名" v-model="alterRoomFrom.naturalName"></mt-field>
      <mt-field label="描述" placeholder="请输入描述" v-model="alterRoomFrom.description"></mt-field>
      <!--<mt-field label="主题" placeholder="请输入主题" v-model="alterRoomFrom.subject"></mt-field>-->
    </div>
    <div class="btn">
      <mt-button @click="alterRoom">修改</mt-button>
    </div>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"


  export default {
    name: "alter-room-msg",
    components: {
      xheader
    },
    data() {
      return {
        alterRoomFrom: {
          naturalName: this.$store.state.chat.RoomMsg.naturalName,
          description: this.$store.state.chat.RoomMsg.description,
        }
      }
    },
    methods: {
      alterRoom() {
        let $self = this
        let times = Date.parse(new Date())
        let data = Qs.stringify({
          sendId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          recvId: $self.$store.state.chat.RoomNowChatId,
          comm: "rmg",
          timestamp: times + "",
          sign: md5($self.$store.state.login.token + times),
          data: JSON.stringify({dtype: "6", content: {}, detail: $self.alterRoomFrom}),
        })

        $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
          .then(res => {
            if (res.data.success) {
              $self.$store.commit("SETnowRoomMsg", {nowRoomMsg: res.data.result})
              MessageBox("提示", "修改成功").then(action => {
                if (action == $self.$result.MessageBoxAction) {
                  $self.$router.go(-1)
                }
              })
            } else {
              Toast(res.data.result)
            }
          })
      }
    }
  }
</script>

<style scoped>

  .box {
    margin-top: 40px;
  }

  .btn {
    text-align: center;
  }
</style>
