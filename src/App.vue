<template>
  <div id="app">
    <!--<keep-alive v-if="$route.meta.keepAlive">-->
    <!--<keep-alive>-->

    <!--<transition name="slide-fade">-->
    <transition name="bounce">
      <router-view/>
    </transition>
    <!--</keep-alive>-->
  </div>
</template>

<script>

  export default {
    name: 'App',
    methods: {
      DBConnectFun() {
        let $self = this
        $self.$store.dispatch("DBConnect").then(response => {
          // $self.$store.dispatch("DBConnects", {name: $self.$store.state.login.userId}).then(response => {
          if (response) {
            // alert('数据库连接成功')
            $self.$store.commit("SET_isConnect", true);
            // alert("当前DB 为" + JSON.stringify($self.$store.state.chat.DB))

            /*****初始化 系统消息*****/
            // $self.$store.dispatch("SystemMsgFind")

            /******初始化 客服消息********/
            // $self.$store.dispatch("InitializationCustomer")

          } else {
            alert('数据库连接失败')
            $self.$store.commit("SET_isConnect", false)
          }
        })
      }
    },
    created() {

      let $self = this
      // 所有 cordova  事件捕捉

      // alert('app created 执行')

      document.addEventListener('deviceready', function () {
        //  前后台 事件捕捉
        document.addEventListener("pause", function () {
          // alert("暂停程序")
          $self.$store.commit("SET_APPState", true)

        }, false)
        document.addEventListener("resume", function () {
          // alert("恢复了")
          $self.$store.commit("SET_APPState", false)
        }, false)

        $self.$store.commit("SET_isListen", true)

        // alert('cordova 插件 准备完成')

        // 数据库 连接
        $self.DBConnectFun()


        /*****初始化 登录 数据******/

        $self.$store.dispatch('Initialization').then(() => {
          if (getUser() === "") {
            router.replace({name: "login"})
          }
        });

        /*****web socket 连接*****/
        if ($self.$store.state.login.IMws === '') {
          $self.$store.dispatch("createWebSocket")
        }
        if ($self.$store.state.login.IOTws === '') {
          $self.$store.dispatch("IOTcreateWebSocket")
        }
      }, false);


      /*  /!*****web socket 连接*****!/
        if (this.$store.state.login.IMws === '') {
          this.$store.dispatch("createWebSocket")
        }
        if (this.$store.state.login.IOTws === '') {
          this.$store.dispatch("IOTcreateWebSocket")
        }*/
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*display: flex;*/
    height: 100%;
  }

  /*html,body{height:100%}*/

  html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  ul, ol {
    list-style: none;
  }

  img {
    border: none;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: #232323;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  input, textarea {
    outline: none;
    border: none;
  }

  textarea {
    resize: none;
    overflow: auto;
  }

  button {
    border: 0;
    background-color: transparent;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow: hidden;
  }

  .fl {
    float: left
  }

  .fr {
    float: right
  }

  .tl {
    text-align: left;
  }

  .tc {
    text-align: center
  }

  .tr {
    text-align: right;
  }

  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inline {
    display: inline-block;
    *display: inline;
    *zoom: 1;
  }

  .page {
    display: -webkit-box;
    // eslint-disable-next-line
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    height: 100%;

  }

  /*flex内容区*/
  .page .box {
    position: relative;
    // eslint-disable-next-line
    /* autoprefixer: off */
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    /* autoprefixer: on */
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    /*height: 100%;*/
    background-color: #fff;
  }

  /*flex头部*/
  .header {
    display: -webkit-box;
  }

  .header * {
    display: block;
  }

  /*flex底部，按钮平均分布*/
  .footer {
    overflow: hidden;
    /*background: #fff;*/
  }

  /*  .foot-nav {
      display: -webkit-box;
      height: 2rem;
      line-height: 2rem;
    }

    .foot-nav * {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }*/

  .xlist {
    margin-top: 11px;
    margin-bottom: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    /*border-right: 1px solid #ccc;*/
    .xitem {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
      display: flex;
      div {
        padding: 0 10px;
        img {
          width: 30px;
          height: 30px;
        }
        span {
          font-size: 13px;
        }
      }
      & .center {
        flex: 1;
      }
      .qrcode {
        div {
          img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
    & .qrCode {
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
      display: flex;
      div {
        padding: 0 10px;
        img {
          width: 30px;
          height: 30px;
        }
        span {
          font-size: 13px;
        }
      }
      & .center {
        flex: 1;
      }
      .qrcode {
        div {
          img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
    :last-child {
      border-bottom: 0
    }
  }

  /***********路由动画***************************************/
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 1s ease;
  }

  .slide-fade-leave-active {
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(20px);
    opacity: 0;
  }

  // 动画二

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    /*  30% {
        transform: scale(0.4);
      }*/
    100% {
      transform: scale(1);
    }
  }


</style>
