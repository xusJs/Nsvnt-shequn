<template>
  <div class="page">
    <div class="qrBox">
      <div class="scan_box">
        <div class="code-bg">
          <div class="line"></div>
        </div>
      </div>
      <div class="scan_bottom">

      </div>
    </div>


    <mt-popup
      v-model="PopupColl"
      position="bottom"
      class="photoPopup"
    >
      <div class="title">此设备已被绑定</div>
      <div class="PhotoCenter">
        <ul>
          <li>
            <mt-button plain @click.native="ApplicationShareFun">申请共享</mt-button>
          </li>
        </ul>
      </div>
      <div class="PhotoFooter" @click="$router.go(-1)"> 关 闭</div>
    </mt-popup>
  </div>
</template>

<script>

  import Vue from "vue"
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"


  export default {
    name: "QRcode",
    components: {
      xheader
    },
    data() {
      return {
        cordova: Vue.cordova,
        PopupColl: false,
        thisDevid: '',      // 当前扫描的信息
        IOTdetail: {},       //  查询 设备 信息
      }
    },
    methods: {
      onDone(err, status) {

        let $self = this

        if (err) {
          // here we can handle errors and clean up any loose ends.
          // console.error(err);
          alert("失败！" + err)
        }
        if (status.authorized) {
          // W00t, you have camera access and the scanner is initialized.

          // alert("准备完成")
          window.QRScanner.show(function (status) {
            document.body.style.backgroundColor = 'transparent'
          });

          window.QRScanner.scan(this.displayContents);
        } else if (status.denied) {
          // The video preview will remain black, and scanning is disabled. We can
          // try to ask the user to change their mind, but we'll have to send them
          // window.QRScanner.openSettings()
        } else {
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      },
      clicks() {
        window.QRScanner.prepare(this.onDone);
      },
      displayContents(err, text) {

        let $self = this

        if (err) {
          // an error occurred, or the scan was canceled (error code `6`)
          alert('错误' + err)
        } else {
          // The scan completed, display the contents of the QR code:

          // alert(text);

          let data = JSON.parse(text)

          if (data.XType === 'AddFriend') {
            // 加好友
            $self.$store.dispatch("AddFriend", {id: data.content})
              .then(response => {
                if (response.success) {
                  Toast('好友申请成功。待对方审核')
                } else {
                  Toast('好友添加失败:' + response.result)
                }
                $self.$router.go(-1)
              })
              .catch(error => {

              })
          }
          else if (data.XType === 'AddRoom') {
            //  加群
            $self.$store.dispatch("AddRoom", {id: data.content})
              .then(response => {
                if (response.success) {
                  Toast('群申请成功，待对方审核')
                } else {
                  Toast('群申请失败:' + response.result)
                }
                $self.$router.go(-1)
              })
              .catch(error => {

              })
          }
          else if (data.XType === 'dev') {
            // 设备
            this.bindDevice(data)
            this.thisDevid = data.content
          } else {
            Toast('此二维码不合规范！请扫描正确的二维码')
            $self.$router.go(-1)
          }

          window.QRScanner.destroy(function (status) {
            // alert('扫描成功，关闭插件')
          });
        }
      },

      // 绑定设备
      bindDevice(text) {
        let $self = this
        $self.$store.dispatch("_IOTBindDevice", {devid: text.content})
          .then(response => {
            if (response.success) {
              Toast("绑定成功");
              $self.$router.go(-1)
            } else {
              if (response.errorCode === '700100') {
                $self.PopupColl = true
                $self.FindIOTdetailFun(text.content)
              } else {
                $self.$router.go(-1)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      //查询设备信息
      FindIOTdetailFun(id) {
        // alert("查询 设备信息")

        let $self = this
        $self.$store.dispatch("FindIOTDetail", {devid: id})
          .then(response => {
            if (response.success) {
              $self.IOTdetail = response.result
              // alert(JSON.stringify($self.IOTdetail))
            } else {
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      //  申请共享
      ApplicationShareFun() {

        // alert("IOTdetail : " + this.IOTdetail)

        // alert('申请开始')

        let $self = this
        $self.$store.dispatch("IOTApplicationShare", {
          recvId: "12312312312",
          content: {
            dtype: "1",
            content: {
              userInfo: {
                userid: $self.$store.state.login.userId,
                uname: $self.$store.state.login.realName,
              },
              devInfo: {
                devname: $self.IOTdetail.devTname,
                devid: $self.IOTdetail.devid,
              }
            },
            devid: $self.thisDevid
          }
        })
          .then(response => {
            if (response.success) {
              Toast("申请成功，待设备所有者审核")
              // alert('申请成功')
              $self.$router.go(-1)
            } else {
              Toast('失败' + response.result)
              // alert('申请失败')
              $self.$router.go(-1)
            }
          })
          .catch(error => {
            Toast(error)
            $self.$router.go(-1)
            // console.log(error)
            // alert( '申请错误'+JSON.stringify(error))
          })
      }

    },
    created() {
      window.QRScanner.prepare(this.onDone);
      //
      //
      // document.addEventListener("deviceready", onDeviceReady, false);
    },
    beforeDestroy() {
      window.QRScanner.destroy(function (status) {
        // alert('退出 插件')
      });
    }
  }
</script>

<style scoped lang="scss">
  .addIOT_header {
    padding: 10px;
    img {
      width: 100%;
    }
  }

  .photoPopup {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      padding: 10px 0;
      text-align: center;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
      background: #00aaef;
      color: #fff;
    }
    .PhotoCenter {
      flex: 1;
      overflow: auto;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        li {
          text-align: center;
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

  .qrBox {
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    position: relative;
    /*background: rgba(255, 234, 255, 0.2);*/
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    .scan_box {
      border-top: 130px solid rgba(000, 000, 000, 0.9);
      border-left: 60px solid rgba(000, 000, 000, 0.9);
      border-bottom: 260px solid rgba(000, 000, 000, 0.9);
      border-right: 60px solid rgba(000, 000, 000, 0.9);
      .code-bg {
        position: relative;
        height: 240px;
        width: 240px;
        margin: 0px auto; /*此处为了居中*/
        /*background: url(img/ewm1.jpg) center top no-repeat; !*二维码*!*/
      }
      .line {
        position: absolute;
        z-index: 2;
        height: 3px;
        width: 240px;
        /*background: url(img/share/dapai.png) no-repeat; !*上下扫的线*!*/
        background: #dd6161;
        /*动画效果*/
        animation: myScan 2s infinite alternate;
        -webkit-animation: myScan 2s infinite alternate;
      }
      @keyframes myScan {
        from {
          top: 0px;
        }
        to {
          top: 240px;
        }
      }
    }
    .scan_bottom {
      flex: 1;
      /*border: 1px solid #000000;*/
      background: #000;
    }
  }

</style>
