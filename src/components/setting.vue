<template>
  <div class="setting">
    <mt-header fixed :title="$t('currency.setting')">
      <mt-button slot="left" icon="back" @click="$router.go(-1)">{{$t('currency.back')}}</mt-button>
      <mt-button slot="right" @click="$router.push({path:'/setting'})">{{$t('currency.setting')}}</mt-button>
    </mt-header>
    <div class="box">
      <div>
        {{$t('currency.language')}}
        <el-select v-model="selectValue" placeholder="请选择" @change="_changeLang">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button size="small" v-if="loginJudge" @click="_loginOut">{{$t('currency.loginOut')}}</el-button>
        <el-button size="small" v-if="!loginJudge" @click="$router.push({path:'/'})">{{$t('currency.login')}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import {MessageBox} from "mint-ui"


  export default {
    name: "setting",
    data() {
      return {
        options: [
          {
            value: 'zh',
            label: '中文'
          },
          {
            value: 'en',
            label: 'English'
          }],
        selectValue: '',
        loginJudge: false
      }
    },
    methods: {
      _changeLang(val) {
        // console.log(val)
        this.$i18n.locale = val
      },
      _loginOut() {

        let $self = this
        MessageBox($self.$t('currency.Whether')).then(action =>{
          console.log(action)
          if  (action){
            $self.$http.post($self.$config.loginserver + "/userservice/logout",
              JSON.stringify({
                token: $self.$store.state.TOKEN
              })
            ).then(res => {
              console.log(res)
              if (res.data.success){

                // $self.$IOTwebsocket.send(
                //   JSON.stringify({"comm":"logoutuser","userid":$self.$store.state.UID}
                //   ))

                $self.$store.commit("clearLogin")

                $self.$router.push({
                  path:"/"
                })
              }

            })
          }
        })
      },
      _Judge() {
        if (this.$store.state.TOKEN.length === 0 && this.$store.state.UID.length === 0) {
          this.loginJudge = false
        } else {
          this.loginJudge = true
        }
      }
    },
    created() {
      this._Judge()
    }
  }

</script>

<style scoped>
  .setting{
    text-align: center;
  }
  .box {
    margin-top: 40px;
    padding: 20px 0;
  }

  .btn {
    margin: 30px 0;
  }
</style>
