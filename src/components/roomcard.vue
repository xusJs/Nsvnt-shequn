<template>
  <div class="page">
    <xheader :title="$store.state.chat.RoomMsg.naturalName" is-left="true"></xheader>
    <div class="box">
      <div class="usernav">
        <ul class="Userlist">
          <li v-for="(item,index) in $store.state.chat.RoomMemberList" :key="item.roomId+index">
            <img :src="item.headPortrait" alt="">
            <p>{{item.nick==null ? item.realName : item.nick}}</p>
          </li>
          <li v-if="$store.state.group.RoomPermissions === 1 || $store.state.group.RoomPermissions === 2"
              @click="operation('add')">
            <img src="../img/orb_plus.png" alt="">
          </li>
          <li v-if="$store.state.group.RoomPermissions === 1 || $store.state.group.RoomPermissions === 2"
              @click="operation('rem')">
            <img src="../img/orb_minus.png" alt="">
          </li>
        </ul>
      </div>
      <mt-cell title="群名称" :value="$store.state.chat.RoomMsg.naturalName"
               :is-link="$store.state.permissions === 3 ? false : true" to="/alterRoomMsg"></mt-cell>
      <mt-cell title="群描述" :value="$store.state.chat.RoomMsg.description"
               :is-link="$store.state.permissions === 3 ? false : true" to="/alterRoomMsg"></mt-cell>

      <ul class="xlist">
        <li class="xitem" @click="QrcodePopup =true">
          <div></div>
          <div class="center"> 群二维码</div>
          <div></div>
        </li>
      </ul>


      <!-- <mt-cell title="群主题" :value="$store.state.RoomMsg.subject"
                :is-link="$store.state.permissions === 3 ? false : true" to="/alterRoomMsg"></mt-cell>
 -->

      <div class="btn">
        <mt-button size="large" type="primary" @click="$router.push({name:'roomchat',parms:{id:rid}})">聊天</mt-button>
        <br>
        <mt-button size="large" type="primary">历史记录</mt-button>
        <br>
        <mt-button size="large" type="danger" @click="removeR(5)"
                   v-if="$store.state.group.RoomPermissions ===2 || $store.state.group.RoomPermissions ===3">
          退出群
        </mt-button>
        <mt-button size="large" type="danger" v-if="$store.state.group.RoomPermissions === 1" @click="removeR(4)">解散群
        </mt-button>
      </div>
    </div>


    <mt-popup
      v-model="QrcodePopup"
      popup-transition="popup-fade">
      <vue-qr :text="UserQrcode" :size="Sizes"></vue-qr>
    </mt-popup>


  </div>
</template>

<script>
  import xheader from "@/components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"
  import vueQr from "vue-qr"

  export default {
    name: "roomcard",
    components: {
      xheader,
      vueQr
    },
    data() {
      return {
        roomMsg: this.$store.state.chat.RoomList,
        rid: this.$route.params.rid,
        // roomMemberData: [],
        // roomPermissions: this.$store.state.permissions


        QrcodePopup: false,
        Sizes: 300,
        UserQrcode: "",        //  二维码内容

      }
    },
    methods: {
      removeR(num) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          if (action === 'confirm') {
            let $self = this
            let times = Date.parse(new Date())
            let data = Qs.stringify({
              sendId: $self.$store.state.login.userId,
              token: $self.$store.state.login.token,
              recvId: $self.$store.state.chat.RoomNowChatId,
              comm: num === 5 ? "rmmg" : "rmg",
              timestamp: times + "",
              sign: md5($self.$store.state.login.token + times),
              data: JSON.stringify({dtype: num, content: {}, mbList: [$self.$store.state.login.userId]}),
            })
            $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
              .then(res => {
                // console.log(res)
                if (res.data.success) {
                  MessageBox("提示", "操作成功").then(action => {
                    if (action === $self.$result.MessageBoxAction) {
                      /*  $self.$router.push({
                          path: "/home"
                        })*/
                      // $self.$router.go(-2)

                      $self.$router.replace({name: "myRoomList"})

                    }
                  })
                } else {
                  MessageBox("提示", res.data.result)
                }
              })
          }
        });
      },

      //当前群信息/版本 查询
      selectroom() {
        let $self = this
        this.$store.dispatch("selectNowRoom", {roomId: this.$route.params.rid})
          .then(response => {
            if (response.success) {
              $self.$store.commit("SET_RoomMsg", response.result)

              //   群成员版本 与数据库比对
              $self.$store.dispatch("DB_RoomInfoVersion",
                {rId: $self.$route.params.rid, version: response.result.version}
              )

            } else {
              Toast(response.result)
            }
          })
      },

      /*  //群成员 查询
        roomMember() {

          let $self = this
          let times = Date.parse(new Date())
          let data = Qs.stringify({
            roomId: $self.rid,
            token: $self.$store.state.login.token,
            timestamp: times + "",
            sign: md5($self.$store.state.login.token + times)
          })

          $self.$http.post($self.$config.bizserverApi + "/imservice/selectrmlist", data)
            .then(res => {
              if (res.data.success) {
                $self.roomMemberData = res.data.result
                $self.$store.commit("SET_RoomMemberList", res.data.result)
              } else {
                Toast(res.data.result)
              }
            })
        },*/

      // 判断操作 添加？删除成员
      operation(operation) {
        this.$router.push({
          name: "roomMemberManagement",
          params: {operation: operation}
        })
      },
    },
    created() {
      let $self = this
      // this.roomMember()
      this.selectroom()

      this.UserQrcode = JSON.stringify({
        XType: "AddRoom",
        content: $self.$route.params.rid
      })
    }
  }
</script>

<style scoped lang="sass">
  .box
    margin-top: 40px
    .btn
      margin: 40px 0
    .usernav
      .Userlist
        display: flex
        flex-flow: row wrap
        li
          flex: 1
          min-width: 20%
          max-width: 20%
          text-align: center
          p
            word-wrap: break-word
            word-break: break-all
            overflow: hidden
          img
            width: 48px
            height: 48px


</style>
