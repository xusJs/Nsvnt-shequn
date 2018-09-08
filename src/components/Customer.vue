<template>
  <div class="chat page" id="chat">
    <xheader is-left="true" title="客服"></xheader>
    <div class="box" id="chatContainer" ref="chatContainer">
      <!--********************数据库引入之前页面展示************************-->
      <!-- <ul v-if="$store.state.chat.CustomerList.length ">
         <li v-for="(item ,index) in $store.state.chat.CustomerList" :key="index">
           <p class="time">
             <span>{{ item.timestamp/1000 | timeFilter}}</span>
           </p>
           <div class="main" :class="{self: item.dtype==='1'}">
             &lt;!&ndash;<img class="avatar" :src=" item.dtype==='1' ?  $store.state.headPortrait : $store.state.NowChatSession.info.headPortrait"/>&ndash;&gt;
             <div class="text">{{item.content.content}}</div>
           </div>
         </li>
       </ul>-->


      <!--********************数据库引入之后页面展示****************************************-->
      <ul v-if="$store.state.chat.CustomerList.length ">
        <li v-for="(item ,index) in $store.state.chat.CustomerList" :key="index">
          <p class="time">
            <span>{{ item.data.timestamp/1000 | timeFilter}}</span>
          </p>
          <div class="main" :class="{self: item.data.dtype==='1'}">
            <!--<img class="avatar" :src=" item.dtype==='1' ?  $store.state.headPortrait : $store.state.NowChatSession.info.headPortrait"/>-->
            <div class="text">{{item.data.content.content}}</div>
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
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"

  export default {
    name: "Customer",
    components: {
      xheader
    },
    data() {
      return {
        content: {
          content: "",
          headPortrait: this.$store.state.login.headPortrait
        },
      }
    },
    methods: {
      sendMsg() {
        let $self = this
        let timestamp = Date.parse(new Date())


        if ($self.Trim($self.content.content) === "") {
          Toast("发送内容不能为空")
        } else {
          $self.$http.post($self.$config.sendserverApi + "/sendservice/send",
            Qs.stringify({
              sendId: $self.$store.state.login.userId,
              token: $self.$store.state.login.token,
              recvId: $self.$store.state.login.userId,
              comm: "fbmsg",
              timestamp: timestamp,
              sign: md5($self.$store.state.login.token + timestamp),
              data: JSON.stringify({dtype: "1", content: $self.content}),
            }))
            .then(res => {
              if (res.data.success) {
                $self.$store.dispatch("CustomerMsgFun", [{
                  comm: "mgmsg",
                  content: {content: $self.content.content},
                  dtype: "1",
                  fId: $self.$store.state.login.userId,
                  timestamp: timestamp,
                }]);
                $self.content.content = ""
              } else {
                Toast(res.data.result)
              }
            })
        }
      },
      Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }
    },
    created() {
      // alert('当前页面数据为：' + JSON.stringify(this.$store.state.chat.CustomerList))
      this.$store.dispatch("CustomerMsgFun", [])
    },
    mounted: function () {
      this.$nextTick(function () {
        document.getElementById("chatContainer").scrollTop = document.getElementById("chatContainer").scrollHeight
      })
    },
    updated() {
      this.$nextTick(() => {
        document.getElementById("chatContainer").scrollTop = document.getElementById("chatContainer").scrollHeight
      })
    },
    beforeDestroy() {
      this.$store.commit("SET_CustomerPrompt", false)
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
