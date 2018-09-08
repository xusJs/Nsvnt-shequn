<template>
  <div class="page">
    <xheader title="个人中心"></xheader>
    <div class="box">
      <div class="Personal_panel">
        <div class="panel_img">
          <img :src="$store.state.login.headPortrait" alt="">
        </div>
        <div class="center">
          <p>{{$store.state.login.realName}}</p>
          <!--<p></p>-->
        </div>
      </div>
      <div class="Personal_order">
        <ul>
          <li v-for="(item,index) in order_list" :key="item+index"
              @click="$router.push({name:'ShopMyOrder',params:{isIndex:index}})"
          >
            <div>
              <img src="../../img/share.png" alt="">
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="Personal_other">
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'ShopAddress'})">
            <div>
              <img src="../../img/share.png" alt="">
            </div>
            <div class="center">
              <span>收货地址</span>
            </div>
            <div>
              <img src="../../img/right_icon.png" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <xfooter></xfooter>
  </div>
</template>

<script>
  import xheader from "../public/xheader"
  import xfooter from "../public/ShopFooter"


  export default {
    name: "ShopPersonalCenter",
    components: {
      xheader,
      xfooter
    },
    data() {
      return {
        order_list: [
          {name: "待付款", Img: "../../img/share.png", value: 'order'},
          {name: "待发货", Img: "../../img/share.png", value: 'order'},
          {name: "待收货", Img: "../../img/share.png", value: 'order'},
          {name: "待评价", Img: "../../img/share.png", value: 'order'},
          // {name: "退款/售后", Img: "share.jpg", value: 'order'},
          {name: "全部订单", Img: "../../img/share.png", value: 'order'},
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .Personal_panel {
      margin: 10px;
      border-radius: 5px;
      display: flex;
      border: 1px solid #333a;
      align-items: center;
      .panel_img {
        padding: 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .center {
        flex: 1;
        p {
          font-size: 14px;

        }
      }
    }
    .Personal_order {
      background: #eee;
      padding: 10px 0;
      ul {
        display: flex;
        background: #fff;
        padding: 4px 0;
        li {
          flex: 1;
          div {
            text-align: center;
            img {
              width: 28px;
              height: 28px;
            }
          }
          p {
            text-align: center;
          }
        }
      }
    }
  }
</style>
