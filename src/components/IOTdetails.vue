<template>
  <div class="IOTDetails page">
    <xheader is-left="true" :title="$store.state.IOT.NowIot.devname"></xheader>
    <div class="box">
      <ul class="detailsList">
        <li v-if="MusicColl" @click="$router.push({name:'IOTMusic'})">音乐</li>
        <li v-if="PhotoColl" @click="$router.push({name:'IOTPhoto'})">照相</li>
        <li v-if="LockColl" @click="$router.push({name:'IOTLock'})">锁</li>
        <li v-if="SearchColl" @click="GoToSearch">寻找</li>
        <li v-if="temperatureColl" @click="$router.push({name:'IOTTemperature'})">温度</li>
      </ul>
      <div class="headerImg">
        <img :src="$store.state.IOT.NowIot.pic === '' ? $config.img : $store.state.IOT.NowIot.pic" alt="">
      </div>
      <div class="detailDetail">
        <h3>设备信息</h3>
        <ul class="xlist">
          <li class="xitem">
            <span>设备名称</span>
            <span>{{$store.state.IOT.NowIot.devname}}</span>
          </li>
          <li class="xitem">
            <span>设备来源</span>
            <span>{{$store.state.IOT.NowIot.downer==='0' ? '共享' : '绑定' }}</span>
          </li>
          <li class="xitem">
            <span>设备状态</span>
            <span v-if="$store.state.IOT.NowIOTisOpne">开</span>
            <span v-else>关</span>
          </li>
          <li class="xitem qrCode" @click="QrcodePopup = true">
            <span>设备二维码</span>
            <span class="qrcode">
              <vue-qr :text="$store.state.IOT.NowIot.devQrcode"
                      height="200"
                      width="200">

              </vue-qr>
            </span>
          </li>
        </ul>
      </div>
      <div class="baidu_map">
        <baidu-map class="map" :center="center" :zoom="zoom">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <!--  <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                       :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}">
            </bm-marker>-->
          <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            <!--    <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}"
                          :offset="{width: -35, height: 30}"/>-->
          </bm-marker>
        </baidu-map>
      </div>
    </div>

    <!-- 二维码 -->
    <mt-popup
      v-model="QrcodePopup"
      popup-transition="popup-fade">
      <vue-qr :text="JSON.stringify({XType: 'dev', content: $store.state.IOT.NowIot.devid})" size="300"></vue-qr>
    </mt-popup>
  </div>
</template>

<script>
  // import vuebarcode from "@xkeshi/vue-barcode"
  import vueQr from "vue-qr"

  import xheader from "../components/public/xheader"
  import aplayer from 'vue-aplayer'
  import {Toast} from "mint-ui"

  export default {
    name: "i-o-tdetails",
    data() {
      return {
        MusicColl: false,
        PhotoColl: false,
        LockColl: false,
        SearchColl: false,
        temperatureColl: false,
        paymentColl: false,
        Popup: {
          MusicPopupVisible: false,
          PhotoPopupVisible: false,
          LockPopupVisible: false,
        },

        QrcodePopup: false,  //  二维码弹出


        center: {
          lng: 116.404,
          lat: 39.915
        },    // 地图位置
        zoom: 12  // 地图层级

      }
    },
    methods: {
      /**
       *
       * 判断 设备类型，
       * 确定其设备对应操作
       *
       * iot_mu_a_1   音乐盒子  开关音乐
       * iot_ph_b_2   相机    拍照
       * iot_lk_c_1   智能锁   开关
       * iot_ml_a_1   多功能型  以上所有
       *
       * @type {methods}
       */
      operationType() {
        let $self = this
        switch ($self.$store.state.IOT.NowIot.devType) {
          case 'iot_mu_a_1':
            $self.MusicColl = true
            $self.PhotoColl = false
            // $self.PhotoColl = true
            $self.LockColl = false
            $self.SearchColl = false
            $self.temperatureColl = false
            break;
          case 'iot_ph_b_2':
            $self.MusicColl = false
            $self.PhotoColl = true
            $self.LockColl = false
            $self.SearchColl = false
            $self.temperatureColl = false
            break;
          case 'iot_lk_c_1':
            $self.MusicColl = false
            $self.PhotoColl = false
            $self.LockColl = true
            $self.SearchColl = false
            $self.temperatureColl = false
            break;
          case 'iot_ml_a_1':
            $self.MusicColl = true
            $self.PhotoColl = true
            $self.LockColl = false
            $self.SearchColl = true
            $self.temperatureColl = true
            break
        }
      },

      /***查询 设备信息****/
      findIOTDetailFun() {
        let $self = this

        $self.$store.dispatch("FindMeIOTDetail", {devid: this.$route.params.devid})
          .then(response => {
            if (response.success) {
              $self.$store.commit("SET_NowIot", response.result)
              $self.operationType()
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      GoToSearch() {
        this.$router.push({name: 'IOTSearch'})
      },

      //   获取位置信息
      LocationDev() {
        let $self = this
        $self.$store.dispatch("DevLocation", {devid: this.$route.params.devid})
          .then(response => {
            // console.log(response)
            // alert('获取位置' + JSON.stringify(response))
            if (response.success) {
              $self.center.lng = response.result.lng
              $self.center.lat = response.result.lat
            }
          })
      },

      QrcodeChange() {
        let $self = this
        return JSON.stringify({XType: 'dev', content: $self.$store.state.IOT.NowIot.devid})
      }
    },
    created() {
      let $self = this

      /*
            if ($self.$store.state.login.IMws === '') {
              $self.$store.dispatch("createWebSocket")
            }
            if ($self.$store.state.login.IOTws === '') {
              $self.$store.dispatch("IOTcreateWebSocket")
            }*/


      this.findIOTDetailFun()
      $self.$store.dispatch("_voteIOT", {devid: this.$route.params.devid})
      this.timer = setInterval(function () {
        $self.$store.dispatch("_voteIOT", {devid: this.$route.params.devid})
      }, 1000000)
      //  初始化 寻人信息
      this.$store.commit("SET_IOTSearchType", {
        type: '未寻找',
        result: "",
      })

      this.LocationDev()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    components: {
      xheader,
      aplayer,
      vueQr
    }
  }
</script>

<style scoped lang="scss">
  .headerImg {
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }

  }

  .detailsList {
    text-align: center;
    display: flex;
    padding: 0;
    li {
      padding: 10px 0;
      flex: 1;
      border: 1px solid #ddd;
      background: #00aaef;
      color: #fff;
    }
  }

  .detailDetail {
    h3 {
      padding-left: 10px;
    }
    .xlist {
      .xitem {
        display: flex;
        span {
          flex: 1;
        }
      }
    }
  }

  .Popup {
    width: 100%;
    height: 100%;
  }

  .map {
    width: 100%;
    height: 300px;
  }


</style>
