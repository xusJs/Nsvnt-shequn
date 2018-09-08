<template>
  <div class="page">
    <xheader is-left="true" title="历史记录"></xheader>
    <div class="box">
      <ul v-if="HistoricalList.length ">
        <li v-for="(item ,index) in HistoricalList" :key="index">
          <p class="time">
            <span>{{ item.timestamp/1000 | timeFilter}}</span>
          </p>
          <div class="main" :class="{self: item.isSelf}">
            <img class="avatar"
                 :src=" item.isSelf ?  $store.state.login.headPortrait :item.content.headPortrait"/>
            <div class="text">{{item.content.content}}</div>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>
          <p class="time">
            <span>暂无历史记录</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import xheader from "../components/public/xheader"
  import {Toast} from "mint-ui"

  export default {
    name: "HistoricalRecords",
    data() {
      return {
        HistoricalList: [],
      }
    },
    components: {
      xheader
    },
    methods: {
      UserHistoricalRecordsFun() {
        let $self = this
        $self.$store.dispatch("UserHistoricalRecords", this.$route.params.uid)
          .then(response => {
            if (response.success) {

              let list = response.result
              let NewList = []

              for (let i = 0; i < list.length; i++) {
                let rej = JSON.parse(list[i])
                // console.log(rej)
                if (rej.comm === 'msg') {
                  NewList.push(rej)
                }
              }
              $self.HistoricalList = NewList
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            console.error(error)
          })
      },
    },
    created() {
      this.UserHistoricalRecordsFun()
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
