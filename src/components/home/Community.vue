<template>
  <div class="home_box">
    <div class="home_header">
      <ul :style="note">
        <li>
          <div @click="$router.push({name:'ProjectDisplay'})">
            <p><img src="../../img/qrcode.png" alt=""></p>
            <p><span>社群项目</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'QRcode'})">
            <p><img src="../../img/qrcode.png" alt=""></p>
            <p><span>扫一扫</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="home_nav">
      <ul>
        <li>
          <div @click="$router.push({name:'sysmsgs'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>通知</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'Customer'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>客服</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'MyWallet'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>钱包</span></p>
          </div>
        </li>
        <!--  <li>
            <div @click="$router.replace({name:'Contacts'})">
              <p><img src="../../img/msgs.png" alt=""></p>
              <p><span>我的好友</span></p>
            </div>
          </li>
          <li>
            <div @click="$router.push({name:'myRoomList'})">
              <p><img src="../../img/msgs.png" alt=""></p>
              <p><span>我的群</span></p>
            </div>
          </li>-->

        <li>
          <div @click="$router.push({name:'Find'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>IPU</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'ShopHome'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>商城</span></p>
          </div>
        </li>

        <li>
          <div @click="$router.push({name:'PersonalCenter'})">
            <p><img src="../../img/msgs.png" alt=""></p>
            <p><span>个人中心</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="home_ad_banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item @click.native="HomeGo('http://www.baidu.com')">
          <div>
            <img src="../../img/banner001.jpg" alt="">
          </div>
        </mt-swipe-item>
        <mt-swipe-item @click.native="HomeGo('http://www.hao123.com')">
          <div>
            <img src="../../img/blue_banner.jpg" alt="">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="home_bottom">
      <ul>
        <li>
          <div @click="$router.replace({name:'Contacts'})">
            <p><img src="../../img/books.png" alt=""></p>
            <p><span>我的好友</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'myRoomList'})">
            <p><img src="../../img/books.png" alt=""></p>
            <p><span>我的群</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'addF'})">
            <p><img src="../../img/books.png" alt=""></p>
            <p><span>加好友</span></p>
          </div>
        </li>
        <li>
          <div @click="$router.push({name:'ApplicationGroup'})">
            <p><img src="../../img/books.png" alt=""></p>
            <p><span>加群</span></p>
          </div>
        </li>
        <li>
          <a href="./bitshares.html">
            <p><img src="../../img/books.png" alt=""></p>
            <p><span>虚拟钱包</span></p>
          </a>
        </li>
        <!--    <li>
              <div @click="$router.replace({name:'Find'})">
                <p><img src="../../img/books.png" alt=""></p>
                <p><span>IPU</span></p>
              </div>
            </li>
            <li>
              <div @click="$router.push({name:'ShopHome'})">
                <p><img src="../../img/books.png" alt=""></p>
                <p><span>商城</span></p>
              </div>
            </li>-->

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "community",
    data() {
      return {
        note: {
          backgroundImage: "url(" + require("../../img/blue_banner.jpg") + ")",
        },
      }
    },
    methods: {
      HomeGo(url) {
        location.href = url
      }
    },
    created() {
      this.$store.commit("SET_HomeIndex", 1)
    }
  }
</script>

<style scoped lang="scss">
  .home_box {
    background: #efefef;
    .home_header {
      ul {
        padding: 8px 0;
        display: flex;
        /*background: #00aaef;*/
        text-align: center;
        /*background: url("../../img/blue_banner.jpg") no-repeat;*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        li {
          flex: 1;
          div {
            p {
              padding: 4px 0;

              img {
                width: 48px;
                height: 48px;
              }
              span {
                color: #fff;
              }
            }
          }
        }
      }
    }
    .home_nav {
      ul {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        background: #ddd;
        li {
          box-sizing: border-box;
          flex: 0 0 33.33%;
          padding: 6px 0;
          border: 1px solid #ddd;
          background: #fff;
          div {
            p {
              padding: 4px 0;
              img {
                width: 40px;
                height: 40px;
              }
              span {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
    .home_ad_banner {
      height: 150px;
      margin: 20px 0;
      /*      border-top: 1px solid #000;
            border-bottom: 1px solid #000;*/
      img {
        height: 150px;
        width: 375px;
      }
    }
    .home_bottom {
      margin-bottom: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        background: #ddd;
        li {
          box-sizing: border-box;
          flex: 0 0 50%;
          padding: 8px 0;
          border: 1px solid #ddd;
          background: #fff;
          div {
            p {
              padding: 4px 0;
              img {
                width: 50px;
                height: 50px;
              }
              span {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
</style>
