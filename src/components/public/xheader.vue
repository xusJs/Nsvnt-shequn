<template>
  <div class="headers">
    <div class="header-left">
      <span v-if="isLeft" @click="$router.go(-1)"> 返回 </span>
    </div>
    <div class="header-center">
      {{title}}
    </div>
    <div class="header-right">
      <span v-if="isRight === 'SearchQrCode'"
            class="right_box"
            @click="$router.push({name:'QRcode'})">
        <img src="../../img/qrcode.png" alt="">
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "xheader",
    // props: ["title", "isLeft", "isRight"]
    props: {
      title: String,
      isLeft: String,
      isRight: String
    }
  }
</script>

<style scoped lang="scss">
  .headers {
    font-size: 16px;
    height: 60px;
    line-height: 40px;
    padding-top: 20px;
    /*background: #0b9be4;*/
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
    color: #ffffff;
    display: flex;
    .header-left {
      width: 20%;
      span {
        padding: 0px 10px;
      }
    }
    .header-center {
      text-align: center;
      flex: 1;
      font-size: 20px;
    }
    .header-right {
      width: 20%;
      text-align: center;
      .right_box {
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>
