<template>
  <div class="contacts">
    <div class="search">
      <input type="text" placeholder="搜索">
      <img src="../../img/search.jpg" alt="">
    </div>
    <header class="contacts_header">
      <ul>
        <li @click="$router.push({name:'addF'})">
          <div>
            <b><img src="../../img/addf.png" alt=""> </b>
            <span class="list_name">添加联系人</span>
          </div>
        </li>
        <!--<li @click="$router.push({name:'sysmsgs'})">-->
        <!--<div>-->
        <!--<b><img src="../../img/comment.png" alt=""> </b>-->
        <!--<span class="list_name">系统消息</span>-->
        <!--<mt-badge size="small" type="error" v-if="$store.state.chat.SystemPrompt">&#8194;</mt-badge>-->
        <!--</div>-->
        <!--</li>-->
        <li @click="$router.push({name:'myRoomList'})">
          <div>
            <b><img src="../../img/addr.png" alt=""> </b>
            <span class="list_name">群聊</span>
            <mt-badge size="small" type="error" v-if="$store.state.chat.RoomPrompt">&#8194;</mt-badge>
          </div>
        </li>
        <!--<li @click="$router.push({name:'Customer'})">-->
        <!--<div>-->
        <!--<b><img src="../../img/addr.png" alt=""> </b>-->
        <!--<span class="list_name">客服</span>-->
        <!--<mt-badge size="small" type="error" v-if="$store.state.chat.CustomerPrompt">&#8194;</mt-badge>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
    </header>
    <nav class="contacts_nav">
      <ul>
        <li :class="{active:whereNav}" @click="whereNav=true">
          我的联系人（{{$store.state.community.FriendsList.length}}）
        </li>
        <!--<li :class="{active:!whereNav}" @click="whereNav=false">-->
        <!--智能设备 （{{$store.state.IOT.IOTEquipmentList.length}}）-->
        <!--&lt;!&ndash;智能设备&ndash;&gt;-->
        <!--</li>-->
      </ul>
    </nav>
    <div class="contacts_F_list contacts_list" v-if="whereNav">
      <ul>
        <li v-for="(item,index) in  $store.state.community.FriendsList" :key="item+index" @click="routerFriend(item)">
          <div>
            <b>
              <img :src="item.headPortrait==='' || item.headPortrait===undefined ? $config.img: item.headPortrait "
                   alt="">
            </b>
            <span class="list_name">{{item.realName}}</span>
            <mt-badge size="small" type="error" v-if="item.isNewMsg">&#8194;</mt-badge>
          </div>
        </li>
      </ul>
    </div>
    <!--<div class="contacts_IOT_list contacts_list" v-if="!whereNav">-->
    <!--<ul>-->
    <!--<li v-for="(item,index) in  $store.state.IOT.IOTEquipmentList" :key="item+index" @click="IOTlink(item)">-->
    <!--<div>-->
    <!--<b><img :src="item.pic===''|| item.pic===undefined ? $config.img: item.pic " alt=""></b>-->
    <!--<span>{{item.devname}}</span>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
  </div>
</template>
<script>

  import {Toast} from "mint-ui"

  export default {
    name: "contacts",
    data() {
      return {
        whereNav: true
      }
    },
    methods: {
      routerFriend(item) {
        this.$store.commit("SET_FriendMsg", item);
        this.$router.push({name: 'chat', params: {id: item.friendId}})
      },

      //   好友版本查询
      FindFriendVersion() {
        let $self = this
        this.$store.dispatch("FriendVersionFind")
          .then(response => {
            if (response.success) {
              // alert(response.result)
              $self.FriendVersionDB(response.result)
            } else {
              //    查询版本失败   本地数据库
              $self.$store.dispatch("DB_friend_userInfoSelect")
            }
          })
          .catch(error => {
          })
      },

      //  好友版本 与 数据库对比
      FriendVersionDB(version) {
        this.$store.dispatch("DB_FriendVersionEnter", {version: version})
        // alert('好友版本对比')
      }

    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    created() {
      let $self = this

      //  先获取好友版本
      $self.FindFriendVersion()

      this.$store.commit("SET_HomeIndex", 2)

      // Toast(this.$store.state.community.FriendsList)
      // alert(JSON.stringify(this.$store.state.community.FriendsList))
    }
  }
</script>

<style scoped lang="scss">
  .contacts {
    .search {
      background: #eee;
      position: relative;
      input {
        width: 92%;
        margin: 20px 4%;
        padding-left: 38px;
        border: 1px solid #000000;
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
      }
      img {
        position: absolute;
        left: 5%;
        top: 21px;
        width: 34px;
        height: 34px;
      }
    }
    .contacts_header {
      ul {
        li {
          /*height: 60px;*/
          /*line-height: 60px;*/
          border-bottom: 1px solid #ddd;
          padding: 5px 8%;
          div {
            /*display: flex;*/
            b {
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
            }
            .list_name {
              padding: 0 20px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .contacts_nav {
      ul {
        display: flex;
        li {
          flex: 1;
          height: 60px;
          line-height: 60px;
          text-align: center;
          background: #ccc;
          color: #fff;
          font-size: 16px;
        }
        & .active {
          background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
        }
      }
    }
    .contacts_list {
      ul {
        li {
          /*height: 60px;*/
          /*line-height: 60px;*/
          border-bottom: 1px solid #ddd;
          padding: 10px 8%;
          div {
            /*display: flex;*/
            .list_name {
              padding: 0 20px;
              font-size: 16px;
            }
            b {
              img {
                width: 50px;
                height: 50px;
                /*border-radius: 50%;*/
              }
            }
          }
        }
      }
    }
  }

  .mint-badge.is-size-small {
    padding: 0 4px;
  }
</style>
