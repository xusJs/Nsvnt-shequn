<template>
  <div id="roomchat" class="page">
    <div class="headers">
      <div class="header-left">
        <span @click="$router.go(-1)"> 返回 </span>
      </div>
      <div class="header-center" @click="$router.push({name:'roomcard',param:{rid:$route.params.rid}})">
        <!--{{title}}-->
        {{$store.state.chat.RoomMsg.naturalName }}
      </div>
      <div class="header-right">

      </div>
    </div>
    <div class="box" id="chatContainer" ref="chatContainer">
      <!--数据库之前-->
      <!--  <ul v-if="$store.state.chat.RoomNowChatSessionList.List.length">
          <li v-for="(item ,index) in $store.state.chat.RoomNowChatSessionList.List" :key="index">
            <p class="time">
              <span>{{ item.timestamp/1000 | timeFilter}}</span>
            </p>
            <div class="main" :class="{self: item.isSelf}">
              <img class="avatar" :src=" item.isSelf ?  $store.state.login.headPortrait : item.headPortrait"/>
              <div class="text">{{item.content}}</div>
            </div>
          </li>
        </ul>-->

      <!--数据库之后-->

      <ul v-if="$store.state.chat.RoomNowChatSessionList.length">
        <li v-for="(item ,index) in $store.state.chat.RoomNowChatSessionList" :key="index">
          <p class="time">
            <span>{{ item.timestamp/1000 | timeFilter}}</span>
          </p>
          <div class="main" :class="{self: item.content.isSelf}">
            <img class="avatar" :src="item.content.headPortrait"/>
            <div class="text">{{item.content.content}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div>
        <input type="text" placeholder="我也说两句" v-model="content.content" @keyup.enter="sendMsg">
        <span @click="sendMsg">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast, Indicator} from "mint-ui"


  export default {
    name: "roomchat",
    data() {
      return {
        content: {
          content: "",
          headPortrait: this.$store.state.login.headPortrait
        },
        rid: this.$route.params.rid,
        chatRecord: [],
      }
    },
    methods: {
      sendMsg() {
        let $self = this
        Indicator.open()
        if ($self.Trim($self.content.content) === "") {
          Toast('发送内容不能为空')
        }
        else {
          $self.$store.dispatch("_RoomSendChatSession", {rId: $self.$route.params.rid, content: $self.content})
            .then(res => {
              Indicator.close()
              if (res.success) {
                let timestamp = Date.parse(new Date())
                /****数据库之前*/
                /*   // 当前聊天记录 插入 自己输入内容
                   $self.$store.commit("SET_SendRoomChatSession", {
                     content: $self.content.content,
                     timestamp: timestamp,
                   });
                   // 将当前聊天记录存储至本地
                   localStorage.setItem("RoomChatInformationList" + $self.$store.state.login.userId, JSON.stringify($self.$store.state.chat.RoomChatSessionList))
                   $self.content.content = ""*/

                /*数据库之后*/
                let data = {
                  fId: $self.$store.state.login.userId,
                  rId: $self.$route.params.rid,
                  timestamp: timestamp,
                  content: {
                    content: $self.content.content,
                    headPortrait: $self.content.headPortrait,
                    isSelf: true
                  }
                }
                $self.$store.dispatch("RoomChatSessionFun", [data])

                $self.content.content = ""

              } else {
                MessageBox("提示", res.data.result)
              }
            })
            .catch(() => {
              Indicator.close()
            })
        }
      },
      Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }
    },
    created() {
      //   将 当前 群 ID 赋值
      this.$store.commit("SET_RoomNowChatId", this.$route.params.rid)
      //  将 当前群聊信息 赋值
      this.$store.dispatch("RoomChatNowSessionFun", {rid: this.$route.params.rid})


      // alert('当前数据为：' + JSON.stringify(this.$store.state.chat.RoomNowChatSessionList))
    },
    mounted: function () {
      this.$nextTick(function () {
        document.getElementById("chatContainer").scrollTop = document.getElementById("chatContainer").scrollHeight
      })
    },
    updated() {
      this.$nextTick(() => {
        // console.log("数据变化")
        document.getElementById("chatContainer").scrollTop = document.getElementById("chatContainer").scrollHeight
        // console.log("距离顶部距离"+ document.body.scrollTop)

      })
    }
  }
</script>

<style scoped lang="scss">

  .headers {
    font-size: 16px;
    height: 80px;
    line-height: 60px;
    padding-top: 20px;
    /*background: #0b9be4;*/
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
    color: #ffffff;
    display: flex;
    .header-left {
      width: 20%;
      span {
        padding: 0px 10px;
      }
    }
    .header-center {
      text-align: center;
      flex: 1;
      font-size: 20px;
    }
    .header-right {
      width: 20%;
    }
  }

  .box {
    background: #eee;
    ul {
      li {
        margin-bottom: 20px;
        div {
          .avatar {
            float: left;
            margin: 0 10px 0 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
          .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: 60%;
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;
            :before {
              content: " ";
              position: absolute;
              top: 9px;
              right: 100%;
              border: 6px solid transparent;
              border-right-color: #fafafa;
            }
          }
        }
        div & .self {
          text-align: right;
          .avatar {
            float: right;
            margin: 0 10px 0 10px;
          }
          .text {
            background-color: #66b1ff;
            :before {
              right: inherit;
              left: 100%;
              border-right-color: transparent;
              border-left-color: #04b3f7;
            }
          }
        }
        .time {
          margin: 7px 0;
          text-align: center;
          span {
            display: inline-block;
            padding: 0 18px;
            font-size: 12px;
            border-radius: 2px;
          }
        }
      }
    }
  }

  .footer {
    div {
      background: #ddd;
      display: flex;
      input {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        margin: 10px 2% 10px 2%;
        font-size: 16px;
        border: 1px solid #aaa;
        flex: 1;
      }
      span {
        display: inline-block;
        background: #66b1ff;
        border-radius: 5px;
        color: #fff;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 10px 2% 10px 1%;
      }
    }
  }


</style>
