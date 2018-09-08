<template>
  <div class="sysmsgs page">
    <xheader is-left="true" title="系统消息"></xheader>
    <div class="box" v-if="$store.state.chat.SystemHints.length">
      <!------------------------------引入数据库之前---------------------------------------------------->
      <!--  <ul class="systemList">
          <li class="systemItem" v-for="(item,index) in $store.state.chat.SystemHints" :key="item+index">
            <div v-if="item.comm==='mgmsg'">
              <p>{{item.timestamp/1000 | timeFilter}}</p>
              <div class="SystemTitle">系统广播</div>
              <div class="content">
                {{item.content.content}}
              </div>
            </div>
            <div v-if="item.comm==='fdmg'">
              <p>{{item.timestamp/1000 | timeFilter}}</p>
              <div class="AddTitle">好友请求</div>
              <div class="content">
                {{item.content.name}} 请求加您为好友
                <div v-if="item.Handle ===0 ">
                  <mt-button v-if="item.dtype==='1'" size="small" @click="AgreeAddF(item,3)">同意</mt-button>
                  <mt-button v-if="item.dtype==='1'" size="small" @click="AgreeAddF(item,2)">拒绝</mt-button>
                </div>
                <div v-else>
                  <span> {{item.Handle===1 ? "已同意" : "已拒绝"}}</span>
                </div>
              </div>
            </div>
            <div v-if="item.comm==='lvmsg'">
              <p>{{item.timestamp/1000 | timeFilter}}</p>
              <div class="LiveTitle">直播</div>
              <div class="content" @click="liveRouters(item.content.roomId)">
                <p><span>{{item.content.roomTitle}}</span></p>
                <img :src="item.content.picture" style="width: 100%;max-height: 100px" alt="">
              </div>
            </div>
            <div v-if="item.comm==='rmmg'">
              <p>{{item.timestamp/1000 | timeFilter}}</p>
              <div class="AddTitle">群申请</div>
              <div class="content">
                {{item.content.name}} 申请加群
                <div v-if="item.Handle ===0 ">
                  <mt-button v-if="item.dtype==='1'" size="small" @click="Groupadd(item,3)">同意</mt-button>
                  <mt-button v-if="item.dtype==='1'" size="small" @click="Groupadd(item,2)">拒绝</mt-button>
                </div>
                <div v-else>
                  <span> {{item.Handle===1 ? "已同意" : "已拒绝"}}</span>
                </div>
              </div>
            </div>
            <div v-if="item.comm==='dbmg'">
              <p>{{item.timestamp/1000 | timeFilter}}</p>
              <div class="AddTitle">设备共享申请</div>
              <div class="content">
                {{item.content.userInfo.uname}} 申请共享设备 {{item.content.devInfo.devname}}
                <div v-if="item.Handle ===0 ">
                  <mt-button v-if="item.dtype==='1'" size="small" @click="DevAdd(item,3)">同意</mt-button>
                  <mt-button v-if="item.dtype==='1'" size="small" @click="DevAdd(item,2)">拒绝</mt-button>
                </div>
                <div v-else>
                  <span> {{item.Handle===1 ? "已同意" : "已拒绝"}}</span>
                </div>
              </div>
            </div>

          </li>
        </ul>-->

      <!------------------------------引入数据库之后---------------------------------------------------->
      <ul class="systemList">
        <li class="systemItem" v-for="(item,index) in $store.state.chat.SystemHints" :key="item+index">
          <div v-if="item.data.comm==='mgmsg'">
            <p>{{item.data.timestamp/1000 | timeFilter}}</p>
            <div class="SystemTitle">系统广播</div>
            <div class="content">
              {{item.data.content.content}}
            </div>
          </div>
          <div v-if="item.data.comm==='fdmg'">
            <p>{{item.data.timestamp/1000 | timeFilter}}</p>
            <div class="AddTitle">好友请求</div>
            <div class="content">
              {{item.data.content.name}} 请求加您为好友
              <div v-if="item.data.Handle ===0 ">
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="AgreeAddF(item,3)">同意</mt-button>
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="AgreeAddF(item,2)">拒绝</mt-button>
              </div>
              <div v-else>
                <span> {{item.data.Handle===1 ? "已同意" : "已拒绝"}}</span>
              </div>
            </div>
          </div>
          <div v-if="item.data.comm==='lvmsg'">
            <p>{{item.data.timestamp/1000 | timeFilter}}</p>
            <div class="LiveTitle">直播</div>
            <div class="content" @click="liveRouters(item.data.content.roomId)">
              <p><span>{{item.data.content.roomTitle}}</span></p>
              <img :src="item.data.content.picture" style="width: 100%;max-height: 100px" alt="">
            </div>
          </div>
          <div v-if="item.data.comm==='rmmg'">
            <p>{{item.data.timestamp/1000 | timeFilter}}</p>
            <div class="AddTitle">群申请</div>
            <div class="content">
              {{item.data.content.name}} 申请加群
              <div v-if="item.data.Handle ===0 ">
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="Groupadd(item,3)">同意</mt-button>
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="Groupadd(item,2)">拒绝</mt-button>
              </div>
              <div v-else>
                <span> {{item.Handle===1 ? "已同意" : "已拒绝"}}</span>
              </div>
            </div>
          </div>
          <div v-if="item.data.comm==='dbmg'">
            <p>{{item.data.timestamp/1000 | timeFilter}}</p>
            <div class="AddTitle">设备共享申请</div>
            <div class="content">
              {{item.data.content.userInfo.uname}} 申请共享设备 {{item.data.content.devInfo.devname}}
              <div v-if="item.data.Handle ===0 ">
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="DevAdd(item,3)">同意</mt-button>
                <mt-button v-if="item.data.dtype==='1'" size="small" @click="DevAdd(item,2)">拒绝</mt-button>
              </div>
              <div v-else>
                <span> {{item.data.Handle===1 ? "已同意" : "已拒绝"}}</span>
              </div>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="box" v-else>
      <p style="line-height: 100px;text-align: center;">您还没有信息</p>
    </div>
  </div>
</template>

<script>
  import xheader from "@/components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"

  export default {
    name: "sysmsgs",
    components: {
      xheader
    },
    data() {
      return {
        sysmsgsData: []
      }
    },
    methods: {
      //好友申请处理
      AgreeAddF(item, dtype) {
        let $self = this
        let time = Date.parse(new Date())
        let data = Qs.stringify({
          sendId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          recvId: item.data.fId,
          comm: "fdmg",
          timestamp: time,
          sign: md5($self.$store.state.login.token + time),
          data: JSON.stringify({dtype: dtype, content: {}, nick: ''}),
        })

        $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
          .then(res => {
            // console.log(res)
            if (res.data.success) {
              MessageBox("提示", '操作成功')

              // 更新数据层
              /************数据库 引入之前***********************/
              /*   let Handle = 0;
                 if (dtype === 2) {
                   Handle = -1
                 } else if (dtype === 3) {
                   Handle = 1
                 }
                 $self.$store.commit("SET_ChangeSystemHints", {item: item, Handle: Handle})*/

              /*******************数据库 引入之后****************************/

              let Handle = 0;
              if (dtype === 2) {
                Handle = -1
              } else if (dtype === 3) {
                Handle = 1
              }
              $self.$store.dispatch("SystemFriendHandle", {item: item, Handle: Handle})

            } else {
              MessageBox('提示', res.data.result)
            }
          })
      },
      //进入直播间
      liveRouters(id) {
        this.$router.push({
          name: "liveRoom",
          params: {liveId: id}
        })
      },
      //  群申请 处理
      Groupadd(item, dtype) {
        let $self = this
        let time = Date.parse(new Date())
        let data = Qs.stringify({
          sendId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          recvId: item.data.rId,
          comm: "rmmg",
          timestamp: time,
          sign: md5($self.$store.state.login.token + time),
          data: JSON.stringify({dtype: dtype, content: {}, mbList: [item.data.fId]}),
        })
        $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
          .then(res => {
            if (res.data.success) {
              Toast('操作成功')
              // 更新数据层
              let Handle = 0;
              if (dtype === 2) {
                Handle = -1
              } else if (dtype === 3) {
                Handle = 1
              }
              $self.$store.dispatch("SystemFriendHandle", {item: item, Handle: Handle})
            } else {
              Toast(res.data.result)
            }
          })
      },

      //  设备共享 处理
      DevAdd(item, dtype) {

        // alert("item :" + JSON.stringify(item))

        let $self = this
        let data = {
          recvId: item.data.fId,
          content: {
            dtype: dtype,
            content: {},
            devid: item.data.content.devInfo.devid
          }
        }

        // alert('data :' + JSON.stringify(data))

        $self.$store.dispatch("IOTApplicationShare", data)
          .then(response => {
            if (response.success) {
              Toast('处理成功')
              let Handle = 0;
              if (dtype === 2) {
                Handle = -1
              } else if (dtype === 3) {
                Handle = 1
              }
              $self.$store.dispatch("SystemFriendHandle", {item: item, Handle: Handle})

            } else {
              Toast('处理失败' + response.result)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
    created() {
      // alert('当前页面数据：' + JSON.stringify(this.$store.state.chat.SystemHints))

      // 初始化
      this.$store.dispatch("SystemMsgFind")
    },
    beforeDestroy() {
      this.$store.commit("SET_SystemPrompt", false)
    }
  }
</script>

<style scoped lang="scss">

  .systemList {

    .systemItem {
      padding: 10px;
      border-top: 1px solid #999;
      p {
        text-align: center;
        padding-bottom: 10px;
      }
      .SystemTitle {
        color: #00aaef;
        text-align: center;
        padding-bottom: 10px;
      }
      .AddTitle {
        color: #dd6161;
        text-align: center;
        padding-bottom: 10px;
      }
      .content {
        div {
          text-align: center;
          padding: 5px;
        }
      }
      .LiveTitle {
        color: #cf9236;
        text-align: center;
        padding-bottom: 10px;
      }
    }
    li:last-child {
      border-bottom: 1px solid #999;
    }
  }

</style>
