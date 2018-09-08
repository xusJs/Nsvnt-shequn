<template>
  <div class="page">
    <xheader is-left="true" title="加群" is-right="SearchQrCode"></xheader>
    <div class="box">
      <nav class="nav_header">
        <input type="text" placeholder="请输入群名" v-model="roomKey" @keyup.enter="findRoom">
        <img src="../img/search.jpg" alt="" @click="findRoom">
      </nav>
      <div class="comment">
        <!-- <header>
           <div class="title">
             <h4>你可能感兴趣的</h4>
             <ul>
               <li>
                 <img src="../img/swiper1.jpg" alt="">
               </li>
               <li>
                 <img src="../img/swiper2.jpg" alt="">
               </li>
               <li>
                 <img src="../img/swiper3.jpg" alt="">
               </li>
             </ul>
           </div>
         </header>
         <nav>
           <mt-radio
             v-model="radiovalue"
             :options="['教育培训', '健康医疗', '艺术文化']">
           </mt-radio>
         </nav>-->
        <section>
          <ul class="comment_list" v-if="rommList.length">
            <li class="comment_item" v-for="(item,index) in rommList" :key="item+index">
              <div class="item_header">
                <img :src="item.avatar" alt="">
              </div>
              <div class="center">
                <div>
                  <h4>{{item.naturalName}}</h4>
                  <span>{{item.mbCount}}人</span>
                </div>
              </div>
              <div class="item_footer">
                <span @click="addRoom(item.id)">加入</span>
              </div>
            </li>
          </ul>
          <div style="text-align: center;padding: 50px 0" v-else-if="roomSearch">
            没有找到群，换个关键字试试吧
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {Toast} from "mint-ui"

  export default {
    name: "applicationGroup",
    components: {
      xheader
    },
    data() {
      return {
        radiovalue: "教育培训",
        roomKey: "",
        rommList: [],
        roomSearch: false
      }
    },
    methods: {
      findRoom() {
        let $self = this;
        /*   let timestamp = Date.parse(new Date());

           let data = Qs.stringify({
             token: $self.$store.state.login.token,
             str: $self.roomKey,
             timestamp: timestamp + "",
             sign: md5($self.$store.state.login.token + timestamp)
           });

           $self.$http.post($self.$config.bizserverApi + "/imservice/findroom", data)*/

        $self.$store.dispatch("QueryRoomList", {str: $self.roomKey})
          .then(res => {
            if (res.success) {
              $self.rommList = res.result;
              $self.roomSearch = true
            } else {
              Toast(res.result)
            }
          })

      },
      addRoom(id) {
        let $self = this;
        /*  let timestamp = Date.parse(new Date());

          let data = Qs.stringify({
            token: $self.$store.state.login.token,
            sendId: $self.$store.state.login.userId,
            recvId: id,
            comm: "rmmg",
            data: JSON.stringify(
              {
                dtype: "1",
                content: {
                  name: $self.$store.state.login.realName
                },
                mbList: [$self.$store.state.login.userId]
              }
            ),
            timestamp: timestamp + "",
            sign: md5($self.$store.state.login.token + timestamp)
          });

          $self.$http.post($self.$config.sendserverApi + "/sendservice/send", data)*/

        $self.$store.dispatch("AddRoom", {id: id})
          .then(res => {
            if (res.success) {
              Toast('申请加群成功！待群主审核')
              $self.$router.go(-1)
            } else {
              Toast(res.result)
            }
          })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .nav_header {
    padding: 20px;
    position: relative;
    background: #efeded;
    input {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: right;
      padding-right: 40px;
    }
    img {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
    }
  }

  .comment {
    header {
      padding: 10px 0;
      .title {
        h4 {
          text-align: center;
          padding: 10px 0;
        }
        ul {
          display: flex;
          li {
            flex: 1;
            padding: 5px;
            img {
              width: 100%;
              height: 80px;
            }
          }
        }
      }
    }
    nav {
      padding: 10px 0;
      border-top: 2px solid #333;
    }
    section {
      padding: 20px 0;
      .comment_list {
        .comment_item {
          padding: 10px;
          display: flex;
          border-bottom: 1px solid #999;
          div {

          }
          & .center {
            flex: 1;
            padding: 0 15px;
            div {
              display: flex;
              flex-direction: column;
              height: 100%;
              h4 {
                font-size: 18px;
                flex: 1;
                line-height: 40px;
              }
              span {
                display: inline-block;
                text-align: center;
                width: 50px;
                padding: 0 5px;
                border-radius: 15px;
                background: #00aaef;
                color: #fff;
                line-height: 25px;
              }
            }
          }
          & .item_header {
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }
          & .item_footer {
            line-height: 80px;
            span {
              border: 1px solid #00aaef;
              color: #00aaef;
              padding: 5px 10px;
              text-align: center;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
</style>
