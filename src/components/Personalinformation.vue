<template>
  <div class="page">
    <xheader is-left="true" title="个人信息"></xheader>
    <div class="box">
      <header class="information_header">
        <ul class="information_list">
          <li class="information_item_img">
            <div>
              <img :src="info.userInfo.headPortrait" alt="">
            </div>
          </li>
          <li class="information_item_name">
            <div>
              {{info.userInfo.realName}}
            </div>
          </li>
          <li class="information_item_fans">
            <div>
              <span>粉丝：{{info.userInfo.fans}}</span>
            </div>
            <div>
              <span>关注：{{info.userInfo.concern}}</span>
            </div>
          </li>
          <li class="information_item_operation">
            <!--  <div>
                <span class="LeavingMsg">留言</span>
              </div>-->
            <div>
              <span class="follow" v-if="info.userInfo.isConcern==1" @click="addisConcern">关注</span>
              <span class="follow" v-else @click="removeisConcern">已关注</span>
            </div>
          </li>
        </ul>
      </header>
      <nav class="information_nav">
        <ul>
          <li>
            <span :class="{active : !Controller}" @click="findVideo">视频</span>
          </li>
          <li>
            <span :class="{active : Controller}" @click="Controller=true">资料</span>
          </li>
        </ul>
      </nav>
      <div class="information_section" v-if="Controller">
        <ul class="information_section_list">
          <li class="information_section_item">
            <div>
              <h4 class="title">个人信息</h4>
              <!-- <ul>
                 <li><span>性别：女</span></li>
                 <li>年龄：18</li>
                 <li>职业：小姐</li>
               </ul>-->
              <ul>
                <li>地址：{{info.peInfo.addr}}</li>
                <!-- <li>社群号：6666666666</li>-->
              </ul>
              <ul>
                <li>注册日期 {{ info.peInfo.createDate/1000 | timeYearFilter}}</li>
              </ul>
            </div>
          </li>
          <li class="information_section_item" v-if="info.coInfo!==null">
            <div>
              <h4 class="title">企业播客</h4>
              <h3>{{info.coInfo.named}}</h3>
              <p>{{info.coInfo.description}}</p>
            </div>
          </li>
          <li class="information_section_item" v-if="info.orInfo!==null">
            <div>
              <h4 class="title"> Teams 与 社团</h4>
              <h3>{{info.orInfo.named}}</h3>
              <p>{{info.orInfo.description}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="information_section" v-else>
        <ul class="video_list">
          <li class="video_item" v-for="(item,index) in videoList" :key="item.createDate +index">
            <!--<img :src="item.picturePath" alt="">-->
            <div
              v-if="item.picturePath.substring(item.picturePath .lastIndexOf('\.') + 1, item.picturePath .length) === 'jpg' || item.picturePath.substring(item .picturePath.lastIndexOf('\.') + 1, item .picturePath.length) === 'gif' || item.picturePath.substring(item.picturePath .lastIndexOf('\.') + 1, item .picturePath.length) === 'png'">
              <img :src="item.picturePath" alt="">
            </div>
            <div v-else class="video_box">
              <video :src="item.picturePath" preload controls></video>
              <!--<img src="../img/videomodal.png" alt="">-->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from "qs"
  import md5 from "js-md5"
  import xheader from "../components/public/xheader"

  import {MessageBox, Toast} from "mint-ui"


  export default {
    name: "Personalinformation",
    components: {
      xheader
    },
    data() {
      return {
        Controller: true, // 视频与资料页面展示 控制器
        info: {
          coInfo: {
            createDate: 0,
            description: "",
            fansCount: 1,
            named: "",
            userId: ""
          },
          orInfo: {
            createDate: 0,
            description: "",
            fansCount: 0,
            named: "",
            userId: "",
            vocation: ""
          },
          peInfo: {
            addr: "",
            createDate: 0
          },
          userInfo: {
            concern: 0,
            fans: 0,
            headPortrait: "",
            isConcern: "0",
            realName: "",
          }
        },         // 用户信息
        videoList: [],    // 用户视频列表
        otherData: {
          videoController: true,     // 视频 方法 只执行一次控制器
        }    // 其它数据
      }
    },
    methods: {
      findUserInformation() {
        let $self = this
        let timestamp = Date.parse(new Date());
        let data = Qs.stringify({
          showId: $self.$route.params.uid,
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp)
        });

        $self.$http.post($self.$config.bizserverApi + "/proservice/userinfoquery", data)
          .then(res => {
            if (res.data.success) {
              $self.info = res.data.result
            } else {
              Toast(res.data.result)
            }
          })
      },
      findVideo() {
        let $self = this;
        $self.Controller = false;
        if ($self.otherData.videoController) {
          let timestamp = Date.parse(new Date());

          let data = Qs.stringify({
            showId: $self.$route.params.uid,
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            timestamp: timestamp + "",
            sign: md5($self.$store.state.login.token + timestamp),
            page: "1",
            pageSize: "20"
          });

          $self.$http.post($self.$config.bizserverApi + "/proservice/picpathlist", data)
            .then(res => {
              if (res.data.success) {
                $self.videoList = res.data.result.pathList;
                $self.otherData.videoController = false
              }
            })
        }
      },
      //加关注
      addisConcern() {
        this.isConcern()
      },

      //取消关注
      removeisConcern() {
        let $self = this;
        MessageBox.confirm('确定取消' + $self.info.userInfo.realName + '的关注？').then(action => {
          if (action === $self.$result.MessageBoxAction) {
            this.isConcern()
          }
        });

      },
      isConcern() {
        let $self = this;
        let timestamp = Date.parse(new Date());
        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          concernId: $self.$route.params.uid,
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp),
          token: $self.$store.state.login.token
        });

        $self.$http.post($self.$config.bizserverApi + "/peproservice/concern", data)
          .then((res) => {
            if (res.data.success) {
              $self.info.userInfo.isConcern = res.data.result
            } else {
              Toast(res.data.result)
            }
          })
      },
    },
    created() {
      this.findUserInformation()
    }
  }
</script>

<style scoped lang="scss">

  .information_header {
    .information_list {
      .information_item_img {
        padding: 10px 0;
        div {
          text-align: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }
      }
      .information_item_name {
        div {
          text-align: center;
          font-size: 24px;
          font-weight: 600;
        }
      }
      .information_item_fans {
        display: flex;
        text-align: center;
        padding: 10px 0;
        div {
          flex: 1;
        }
      }
      .information_item_operation {
        text-align: center;
        display: flex;
        div {
          flex: 1;
          span {
            width: 20px;
            border: 1px solid #000;
            padding: 5px 20px;
            border-radius: 5px;
          }
          & .follow {

            border: 1px solid #fe2929;
            color: #fe2929;
          }
          & .LeavingMsg {
            border: 1px solid #00aaef;
            color: #00aaef;
          }
        }
      }
    }
  }

  .information_nav {
    margin-top: 20px;
    ul {
      line-height: 40px;
      border-bottom: 1px solid #999;
      display: flex;
      text-align: center;
      li {
        flex: 1;
        span {
          padding: 0 5px;
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
        }
        & .active {
          border-bottom: 3px solid #00aaef;
        }
      }
    }
  }

  .information_section {
    .information_section_list {
      .information_section_item {
        border-bottom: 1px solid #999;
        div {
          padding: 10px;

          .title {
            padding-left: 10px;
            margin: 8px 0;
            font-size: 18px;
            border-left: 4px solid #00aaef;
          }
          ul {
            padding: 8px 0;
            display: flex;
            li {
              /*text-align: left;*/
              flex: 1;
              /*width: 33%;*/
            }
          }
          p {
            padding: 4px 0;
          }
        }
      }
    }

    .video_list {
      display: flex;
      flex-wrap: wrap;
      .video_item {
        width: 50%;
        padding: 10px;
        img {
          width: 100%;
          max-height: 200px;
        }
        video {
          width: 100%;
          max-height: 200px;
        }
      }
    }

  }
</style>
