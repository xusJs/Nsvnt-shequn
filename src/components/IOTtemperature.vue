<template>
  <div class="page">
    <xheader is-left="true" title="温度"></xheader>
    <div class="box">

      <!--  <div v-if="$store.state.IOT.NowIOTType.TempType" style="text-align: center;">
        </div>-->
      <mt-cell title="是否开启温度监控">
        <mt-switch v-model="$store.state.IOT.NowIOTType.TempType" @change="changeTemp"></mt-switch>
      </mt-cell>
      <div style="text-align: center;">
        <temp :value="$store.state.IOT.IOTTempValue"></temp>
        <h4>温度计状态 ：
          <span v-if="$store.state.IOT.NowIOTType.TempType"> 开 </span>
          <span v-else> 关 </span>
        </h4>
      </div>

    </div>


    <!-- <div class="xfooter"
          v-if="$store.state.IOT.NowIOTType.TempType"
          @click="sendTemperatureEnd">
       关 闭
     </div>
     <div v-else class="xfooter"
          @click="sendTemperatureStart">
       打 开
     </div>-->



  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import temp from "../components/public/temp"

  export default {
    name: "IOTTemperature",
    components: {
      xheader,
      temp
    },
    methods: {

      changeTemp(Booleans) {
        // console.log(Booleans)
        this.$store.commit("SET_NowIOTType_TempType", !Booleans)

        if (Booleans) {
          this.sendTemperatureEnd()
        } else {
          this.sendTemperatureStart()
        }
      },

      sendTemperatureStart() {
        let $self = this
        $self.$store.dispatch("_openTemp", {devid: $self.$store.state.IOT.NowIot.devid})
      },
      sendTemperatureEnd() {
        let $self = this
        $self.$store.dispatch("_closeTemp", {devid: $self.$store.state.IOT.NowIot.devid})
      },
    }
  }
</script>

<style scoped lang="scss">

  .xfooter {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #00aaef;
    color: #fff;
  }

</style>
