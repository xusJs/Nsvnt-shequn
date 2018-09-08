<template>
  <div class="page">
    <xheader is-left="true" title="音乐"></xheader>
    <div class="box">
      <aplayer
        ref="Aplayer"
        v-if="MusicList.length"
        @play="play"
        @pause="pause"
        :volume="MusicOther.volume"
        :list="MusicList"
        :music="MusicList[0]"
      />
    </div>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import aplayer from 'vue-aplayer'

  export default {
    name: "IOTMusic",
    components: {
      xheader,
      aplayer
    },
    data() {
      return {
        MusicOther: {
          volume: 0,    //  音乐播放 音量
        },
        MusicList: [],
      }
    },
    methods: {
      openMusic(sname) {
        this.$store.dispatch('_openMusic', {devid: this.$store.state.IOT.NowIot.devid, sname: sname})
      },
      closeMusic() {
        this.$store.dispatch('_closeMusic', {devid: this.$store.state.IOT.NowIot.devid})
      },

      play() {
        // console.log('当前的参数为' + JSON.stringify(val))
        console.log('开始播放')
        // console.log(this.$refs.Aplayer)
        //
        // console.log(this.$refs.Aplayer.currentMusic.src)

        this.openMusic(this.$refs.Aplayer.currentMusic.src)
      },
      pause() {
        console.log('暂停')
        this.closeMusic()
      },


      FindIOTResourceFun() {
        let $self = this
        $self.$store.dispatch("FindIOTResource", {devid: this.$store.state.IOT.NowIot.devid, rtype: "2"})
          .then(response => {
            console.log(response)

            if (response.success) {

              let list = []

              response.result.forEach((res) => {
                let obj = {
                  title: res.title,
                  artist: '\0',
                  src: res.filePath,
                  pic: res.picUrl
                }
                list.push(obj)
              })

              $self.MusicList = list
            } else {

            }
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
    created() {
      this.FindIOTResourceFun()
    }
  }
</script>

<style scoped lang="scss">
  .aplayer-list {
    overflow: auto;
  }
</style>
