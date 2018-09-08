<template>
  <div class="addR page">
    <xheaders title="建群" is-left="true"></xheaders>
    <div class="box">
      <mt-field label="群名" placeholder="请输入群名" v-model="addRoomFrom.naturalName"></mt-field>
      <mt-field label="描述" placeholder="请输入描述" v-model="addRoomFrom.description"></mt-field>
      <div class="content">
        <h4 class="title">内容分类</h4>
        <select v-model="addRoomFrom.subject">
          <option v-for="(item,index) in subjectList" :key="item+index" :value="item.value">
            {{item.key}}
          </option>
        </select>
      </div>
      <mt-radio
        title="群最大人数"
        v-model="addRoomFrom.maxUsers"
        :options="['100', '500', '1000']">
      </mt-radio>
      <mt-checklist
        title="选择您的好友"
        v-model="addRoomFrom.mbList"
        :options="options">
      </mt-checklist>
    </div>
    <div class="btn" @click="addRoom">
      创 建
    </div>
  </div>
</template>

<script>

  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Indicator, Toast} from "mint-ui"
  import xheaders from "@/components/public/xheader"


  export default {
    name: "add-r",
    components: {
      xheaders
    },
    data() {
      return {
        addRoomFrom: {
          naturalName: "",
          description: "",
          subject: "1632aac0066e4694b5f58add6fd11077",
          maxUsers: "100",
          mbList: [],
          avatar: "http://romaxdata-1254236539.cosgz.myqcloud.com/20180502/3872972662130688.jpg"
        },
        options: [],
        subjectList: [
          {key: "文化艺术", value: '1632aac0066e4694b5f58add6fd11077'},
          {key: '教育培训', value: '23b188bfbc8846ec9e7d8ffb39513211'},
          {key: '医疗健康', value: 'b8cdff1046e947939a0c185c7fa5c908'},
        ]
      }
    },
    methods: {
      //多选数据处理
      checkList() {
        let $self = this
        let datalist = $self.$store.state.community.FriendsList

        datalist.forEach((res, index) => {
          $self.options.push({
            label: res.realName,
            value: res.friendId
          })
        })
      },

      //建群
      addRoom() {
        let $self = this;
        let times = Date.parse(new Date());
        if ($self.checkNumber($self.addRoomFrom.maxUsers)) {
          MessageBox('提示', "请输入1以上的数字")
        } else {
          Indicator.open('创建中')
          let data = Qs.stringify({
            sendId: $self.$store.state.login.userId,
            recvId: $self.$store.state.login.userId,
            comm: "rmg",
            token: $self.$store.state.login.token,
            timestamp: times + "",
            sign: md5($self.$store.state.login.token + times),
            data: JSON.stringify({
              dtype: "3",
              content: "",
              detail: $self.addRoomFrom
            })
          });
          $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)
            .then(res => {
              Indicator.close()
              if (res.data.success) {
                /* MessageBox("提示", "创建成功").then(action => {
                   if (action === $self.$result.MessageBoxAction) {
                   }
                 })*/
                $self.$router.replace({
                  name: "myRoomList"
                })
                Toast('创建成功')
              } else {
                Toast(res.data.result)
              }
            })
        }
      },
      //  正则验证 是否是数字
      checkNumber(theObj) {
        var reg = /^[1-9]+.?[1-9]*$/;
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      }
    },
    created() {
      this.checkList()
    }
  }
</script>

<style scoped lang="scss">
  .addR {
    .btn {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      text-align: center;
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
      color: #fff;
    }
  }

  .content {
    position: relative;
    select {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px transparent;
      padding-left: 20px;
      option {

      }
    }
    .title {
      /*padding-left: 20px;*/
      font-size: 16px;
      padding: 10px;
    }
  }
</style>
