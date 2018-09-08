<template>
  <canvas class="canvas-gauges" id="canvas-gauges_"></canvas>
</template>

<script>
  import {LinearGauge} from 'canvas-gauges'

  export default {

    props: {
      value: String,
    },

    data() {
      return {
        chart: null,
        option: {
          renderTo: 'canvas-gauges_',
          width: 120,
          height: 400,
          value: this.value,
          minValue: -100,
          maxValue: 100,
          majorTicks: [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
      }
    },

    mounted() {
      this.chart = new LinearGauge(this.option).draw()
    },

    beforeDestroy() {
      this.chart.destroy()
    },

    watch: {
      value(val) {
        this.chart.value = val
      }
    }
  }
</script>
