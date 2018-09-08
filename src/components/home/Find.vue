<template>
  <div class="find ">
    <ul class="xlist">
      <!-- <li class="xitem" @click="$router.push({name:'addIOT'})">
         <div>
           <img src="../../img/find_03.jpg" alt="">
         </div>
         <div class="center">
           <span>添加新设备</span>
         </div>
         <div>
           <img src="../../img/right_icon.jpg" alt="">
         </div>
       </li>-->
      <li class="xitem" @click="$router.push({name:'WifiQrCode'})">
        <div>
          <img src="../../img/find_03.jpg" alt="">
        </div>
        <div class="center">
          <span>wifi 二维码</span>
        </div>
        <div>
          <img src="../../img/right_icon.jpg" alt="">
        </div>
      </li>
    </ul>
    <div class="addIOT_header" @click="$router.push({name:'QRcode'})">
      <img src="../../img/addqrcode.jpg" alt="">
    </div>

    <nav class="contacts_nav">
      <ul>
        <li class="active">
          智能设备 （{{$store.state.IOT.IOTEquipmentList.length}}）
          <!--智能设备-->
        </li>
      </ul>
    </nav>
    <div class="contacts_IOT_list contacts_list">
      <ul>
        <li v-for="(item,index) in  $store.state.IOT.IOTEquipmentList" :key="item+index" @click="IOTlink(item)">
          <div>
            <b><img :src="item.pic===''|| item.pic===undefined ? $config.img: item.pic " alt=""></b>
            <span>{{item.devname}}</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: "find",
    data() {
      return {}
    },
    methods: {

      // 我的IOT 设备列表 版本查询
      FindIOTVersion() {
        let $self = this
        $self.$store.dispatch("DevVersionFind")
          .then(resposne => {
            if (resposne.success) {
              $self.$store.dispatch("DB_IOTVersion", {version: resposne.result})
            } else {
              //    查询失败 获取本地设备列表
            }
          })
      },

      // IOT 的link
      IOTlink(item) {
        this.$store.commit("SET_NowIot", item)

        this.$router.push({name: 'IOTDetails', params: {devid: item.devid}})
      },


    },
    created() {
      let $self = this
      // 获取 iot设备列表 版本
      $self.FindIOTVersion()

      this.$store.commit("SET_HomeIndex", 3)
      // alert(JSON.stringify(this.$store.state.IOT.IOTEquipmentList))

    },
  }
</script>

<style scoped lang="scss">
  .find {
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

    .addIOT_header {
      padding: 10px;
      img {
        width: 100%;
      }
    }

  }
</style>
