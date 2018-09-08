<template>
  <div class="page">
    <xheader is-left="true" title="照相"></xheader>
    <div class="box">
      <div v-if="$store.state.IOT.IOTphotoColl" style="display: flex;height: 100%;align-items: center">
        <img :src="$store.state.IOT.IOTphotoImg" alt="" style="width: 100%">
      </div>
      <div v-else class="BoxCenter">

      </div>
      <mt-popup
        v-model="PopupColl"
        position="bottom"
        class="photoPopup"
      >
        <div class="PhotoCenter">
          <ul v-if="ImgList.length">
            <li v-for="item in ImgList" :key="item.createDate">
              <img :src="item.filePath" alt="">
            </li>
          </ul>
          <p v-else>暂无照片</p>
        </div>
        <div class="PhotoFooter" @click="closePhotoPopup"> 关 闭</div>
      </mt-popup>

    </div>
    <footer class="footer">
      <ul class="footerUl">
        <li class="footerLi"></li>
        <li class="footerLi center" v-if="$store.state.IOT.NowIot.downer==='1'">
          <div @click="openPhoto">
            <img src="../img/icon/1117285.png" alt="">
          </div>
        </li>
        <li class="footerLi">
          <div @click="PhotoFindImg">
            <img src="../img/icon/1117312.png" alt="">
          </div>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import {Indicator, Toast} from "mint-ui"

  export default {
    name: "IOTPhoto",
    components: {
      xheader
    },
    data() {
      return {
        PopupColl: false,
        ImgList: []
      }
    },
    methods: {
      openPhoto() {
        this.$store.dispatch('_openPhoto', {devid: this.$store.state.IOT.NowIot.devid})
        this.$store.commit("SET_IOTphotoColl", false)
        Indicator.open()

        let timers = setTimeout(function () {
          Indicator.close()
          // console.log('循环执行')
          // Toast('超时，请重新拍摄')

          clearTimeout(timers)
        }, 10000)

      },
      closePhoto() {
        this.$store.dispatch('_closePhoto', {devid: this.$store.state.IOT.NowIot.devid})
      },
      closePhotoPopup() {
        this.PopupColl = false
        this.$store.commit("SET_IOTphotoColl", false)
      },
      PhotoFindImg() {
        let $self = this
        this.PopupColl = true
        this.$store.dispatch("FindIOTResource", {devid: this.$store.state.IOT.NowIot.devid, rtype: '3'})
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.ImgList = response.result
            } else {

            }

          })
          .catch(error => {
            console.log(error)
          })
      },

    }
  }
</script>

<style scoped lang="scss">
  .footer {
    background: #000;
    height: 100px;
    .footerUl {
      display: flex;
      align-items: center;
      .footerLi {
        flex: 1;
        text-align: right;
        div {
          display: inline-block;
          /*background: #fff;*/
          margin-top: 10px;
          margin-right: 10px;
          width: 80px;
          height: 80px;
        }
      }
      .center {
        text-align: center;
        div {
          display: inline-block;
          margin-top: 10px;
          width: 80px;
          height: 80px;
          /*background: #fff;*/
          border-radius: 50%;
        }
      }
    }
  }

  .photoPopup {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .PhotoCenter {
      flex: 1;
      overflow: auto;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 0 0 50%;
          padding: 4px;
          img {
            width: 100%;
            max-height: 100px;
          }
        }
      }
    }
    .PhotoFooter {
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: #00aaef;
      color: #fff;
      font-size: 16px;
    }
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efefef;
    .BoxCenter {
      /*flex: 1;*/
      width: 140px;
      height: 140px;
      border: 1px solid #cf9236;
    }
  }
</style>
