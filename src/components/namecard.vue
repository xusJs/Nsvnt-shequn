<template>
  <div class="namecard page">
    <xheader is-left="true"></xheader>
    <div class="box">
      <!--联系人 详情-->
      <!--{{ID}}-->
      <mt-cell
        :title="$store.state.chat.FriendMsg.realName"
        :label="$store.state.chat.FriendMsg.nick">
        <img slot="icon" :src="$store.state.chat.FriendMsg.headPortrait">
      </mt-cell>

      <!--   <mt-cell
           title="备注名称修改"
           is-link
         >
         </mt-cell>-->

      <div class="btn">
        <mt-button size="large"
                   type="primary"
                   @click="$router.replace({name:'chat',parms:{id:FID}})">聊天
        </mt-button>
        <br>
        <mt-button size="large"
                   type="primary"
                   @click="$router.push({name:'HistoricalRecords',params:{uid:$route.params.id}})">最近7天历史记录
        </mt-button>
        <br>
        <mt-button size="large" type="danger">清除历史记录</mt-button>
        <br>
        <mt-button size="large" type="danger" @click="removeF">删除好友</mt-button>
      </div>


    </div>
  </div>
</template>

<script>
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "@/components/public/xheader"


  export default {
    name: "namecard",
    components: {
      xheader
    },
    data() {
      return {
        FID: this.$route.params.id
      }
    },
    methods: {
      removeF() {
        let $self = this;
        MessageBox.confirm('确定删除好友?').then(action => {
          console.log(action)
          if (action === 'confirm') {
            $self.$store.dispatch("removeFriend", {fId: $self.$route.params.id})
              .then(response => {
                if (response.success) {
                  $self.$router.replace({name: 'Contacts'})
                } else {
                  Toast(response.result)
                }
              })
              .catch(error => {
                console.error(error)
              })
          }
        });
      },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">

  .box {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .btn {
    margin: 40px 0;
  }
</style>
