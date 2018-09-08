<template>
  <div class="page">
    <xheader is-left="true" title="直播间"></xheader>
     <div class="box">
       <div v-if="liveRoomMsg.rstatus === '0'">
         还未开启直播 请稍后
       </div>
       <div class="container">
         <div class="player">
           <video-player class="video-player vjs-custom-skin"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
                         @play="onPlayerPlay($event)"
                         @pause="onPlayerPause($event)"
           >
           </video-player>
         </div>
       </div>
       <div v-if="liveRoomMsg.rstatus==='2'">
         直播已经结束
       </div>
     </div>

  </div>
</template>

<script>
  import xheader from "../components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {videoPlayer} from 'vue-video-player'
  import {Indicator} from "mint-ui"

  export default {
    name: "liveRoom",
    data() {
      return {
        liveRoomMsg: {},
        playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",
            src: "http://vatimebank.com:81/hls/test.m3u8" //你的m3u8地址（必填）
          }],
          // poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
        }
      }
    },
    components: {
      xheader,
      videoPlayer
    },
    methods: {
      queryLiveRoom() {
        Indicator.open()
        let $self = this
        let timestamp = Date.parse(new Date())
        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp),
          roomId: $self.$route.params.liveId
        })

        $self.$http.post($self.$config.bizserverApi + "/liveservice/selectlivebyid", data)
          .then(response => {
            if (response.data.success) {
              $self.liveRoomMsg = response.data.result;
              $self.playerOptions.sources[0].src = response.data.result.pullHlsUrl
              // console.log("拉取数据" + $self.playerOptions)
              Indicator.close()
            }
          })
      },


      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    created() {
      this.queryLiveRoom()
    }
  }
</script>

<style lang="scss">
  .box {
    .my_video-dimensions {
      width: 100%;
      height: 752px;
    }
    .container {
      background-color: #efefef;
      min-height: 100%;
    }
  }
</style>
