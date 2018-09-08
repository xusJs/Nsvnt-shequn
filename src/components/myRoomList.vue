<template>
  <div class="roomList page">
    <xheader title="群聊" is-left="true"></xheader>
    <div class="box">
      <div class="roomListCon">
        <ul>
          <li v-for="(item ,index) in $store.state.group.RoomList" :key="item+index" @click="routerRoom(item)">
            <div>
              <b><img :src="item.avatar === null || item.avatar === '' ? $config.roomimg :item.avatar " alt=""></b>
              <span>{{item.naturalName}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "@/components/public/xheader"

  export default {
    name: "my-room-list",
    components: {
      xheader
    },
    methods: {
      routerRoom(item) {
        if (item.owner === "1") {
          this.$store.commit("SET_RoomPermissions", 1)
        } else if (item.admin === "1") {
          this.$store.commit("SET_RoomPermissions", 2)
        } else {
          this.$store.commit("SET_RoomPermissions", 3)
        }

        this.$store.commit("SET_RoomMsg", item)
        this.$router.push({name: 'roomchat', params: {rid: item.roomId}})

      },
      //群列表
      RoomList() {
        let $self = this
        $self.$store.dispatch("_RoomList")
          .then(res => {
            if (res.success) {
              $self.$store.commit("SET_RoomList", res.result)
            }
          })
      },

      //  群版本查询
      FindRoomVersion() {
        let $self = this
        $self.$store.dispatch("RoomVersionFind")
          .then(response => {
            if (response.success) {
              $self.$store.dispatch("DB_RoomVersion", {version: response.result})
            } else {
              $self.$store.dispatch("DB_RoomVersionView")
            }
          })
      }


    },
    created() {
      // this.RoomList()
      this.FindRoomVersion()
    },
    beforeDestroy() {
      this.$store.commit("SET_RoomPrompt", false)
    }
  }
</script>

<style scoped lang="scss">
  .roomList {
    .box {
      .roomListHeader {
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 16px;
      }
      .roomListCon {
        ul {
          li {
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #ddd;
            padding: 0 8%;
            div {
              b {
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }
              }
              span {
                padding: 0 20px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
