<template>
  <div class="login page">
    <xheader title="登录"></xheader>
    <div class="box">
      <img src="../img/logo.jpg" alt="">
      <input type="text" v-model="loginFrom.phone" class="xqd-input" placeholder="输入手机号">
      <input type="text" v-model="loginFrom.password" class="xqd-input" placeholder="输入密码" @keyup.enter="_login">
      <button class="xqd-button" @click="_login">{{$t('currency.login')}}</button>
      <div class="btn">
        <!--<mt-button type="primary" @click="$router.push({path:'/register'})">{{$t('currency.register')}}</mt-button>-->
        <a @click="$router.push({name:'Retrievepwd'})">忘记密码？</a>
        <span></span>
        <a @click="$router.push({name:'register'})">注册</a>
      </div>

    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"
  import {gettoken, getUser} from "../store/set"

  export default {
    name: "login",
    components: {
      xheader,
    },
    data() {
      return {
        loginFrom: {
          phone: "",
          password: ""
        },
      }
    },
    methods: {
      _login() {
        let $self = this
        if (this.Trim($self.loginFrom.phone) && this.Trim($self.loginFrom.password)) {
          $self.$store.dispatch('AppLogin', $self.loginFrom).then(response => {
            if (response.success) {

              // IM websocket 登录
              $self.$store.dispatch("createWebSocket")
              // iot websocket 登录
              $self.$store.dispatch("IOTcreateWebSocket")


              /*   /!*****数据库 连接******!/
                 $self.DBConnects()
   */
              //登录之后 查询信息
              /*  $self.$store.dispatch("QueryInformation")*/
              $self.$router.replace({
                name: "Community"
              })

            } else {
              Toast(response.result)
            }
          })
        } else {
          Toast("内容不能为空")
        }
      },
      Trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },

      /*
             addDatas() {

               let $self = this

               if (this.$store.state.chat.isConnect) {
                 $self.$store.state.chat.DB.transaction(function (tx) {
                   // tx.executeSql('DROP TABLE IF EXISTS test_table');
                   tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

                   tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", [{name: 'Tom'}, 100], function (tx, res) {
                     tx.executeSql("select * from test_table", [], function (tx, res) {
                       alert("hello world");
                       var row = res.rows.item(0);
                       /!* for (var j in row) {
                          document.write(j + "=" + row[j] + "<br />");
                        }*!/
                     });
                   }, function (e) {
                     alert("ERROR: " + e.message);
                   });
                 });
               } else {
                 alert('未联通数据库')
               }

             },

             findData() {
               let $self = this

               if (this.$store.state.chat.isConnect) {
                 $self.$store.state.chat.DB.transaction(function (tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
                   tx.executeSql("select * from test_table", [], function (tx, res) {
                     alert("hello world");
                     var row = res.rows.item(0);
                     for (var j in row) {
                       document.write(j + "=" + row[j] + "<br />");
                     }
                   });
                 });
               } else {
                 alert('未联通数据库')
               }

             },*/
    },
    beforeDestroy() {

    },
    created() {

      this.$store.dispatch("Initialization")
        .then(() => {
          if (gettoken() === "") {
          } else {
            this.$router.replace({name: 'Community'})
          }
        })
    }
  }
</script>

<style scoped lang="scss">
  .login {
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
