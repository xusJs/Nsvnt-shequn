<template>
  <div class="page application">
    <xheader is-left="true" title="申请企业播客"></xheader>
    <div class="box">
      <img src="../img/logo.jpg" alt="">
      <input type="text" class="xqd-input" placeholder="企业名" v-model="applicationFrom.named">
      <input type="text" class="xqd-input" placeholder="描述" v-model="applicationFrom.description">
      <button class="xqd-button" @click="application">申请</button>
    </div>
  </div>
</template>

<script>

  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"

  import xheader from "../components/public/xheader"


  export default {
    name: "application-enterprises",
    components: {
      xheader
    },
    data() {
      return {
        applicationFrom: {
          named: "",
          description: ""
        }
      }
    },
    methods: {
      application() {
        let $self = this
        let timestamp = Date.parse(new Date())

        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          comm: "1",
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp),
          data: JSON.stringify($self.applicationFrom),
        })

        $self.$http.post($self.$config.bizserverApi + "/coproservice/proaction", data)
          .then((res) => {
            if (res.data.success) {
              $self.$router.go(-1)
            } else {
              Toast(res.data.result)
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .application {
    text-align: center;
    .box {
      .btn {
        display: flex;
        span {
          flex: 1;
        }
        a {
          padding: 0 5%;
        }
      }
      .xqd-input {
        border: 1px solid #00aaef;
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
      }
      .xqd-button {
        line-height: 28px;
        font-size: 16px;
        padding: 10px;
        width: 90%;
        margin-bottom: 20px;
        background: #00aaef;
        color: #fff;
        text-align: center;
      }
      img {
        width: 300px;
      }
    }
  }


</style>
