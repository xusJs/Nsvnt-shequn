<template>
  <div class="page">
    <xheader is-left="true" title="商品详情"></xheader>
    <div class="box">
      <div class="page">
        <div class="Details_nav">
          <!--  <ul class="Details_list">
              <li><a href="javascript:void(0)" @click="goAnchor('CommodityDetails')">商品</a></li>
              <li><a href="javascript:void(0)" @click="goAnchor('commodity_evaluate')">评价</a></li>
              <li><a href="javascript:void(0)" @click="goAnchor('commodity_introduce')">详情</a></li>
              &lt;!&ndash; <li><a href="#CommodityDetails">商品</a></li>
               <li><a href="#commodity_evaluate">评价</a></li>
               <li><a href="#commodity_introduce">详情</a></li>&ndash;&gt;
            </ul>-->
        </div>
        <div class="contents">
          <div class="swiper" id="CommodityDetails">
            <!--  <swiper :options="swiperOption" ref="mySwiper">
                &lt;!&ndash; slides &ndash;&gt;
                <swiper-slide v-for="(item,index) in ProductObj.pic" :key="item+index">
                  <img :src="item" alt="">
                </swiper-slide>
              </swiper>-->
            <mt-swipe :auto="4000" ref="mySwiper">
              <mt-swipe-item v-for="(item,index) in ProductObj.pic" :key="item+index">
                <div>
                  <img :src="item" alt="">
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>

          <div class="CommodityDetails">
            <p class="Commodity_name">{{ProductObj.productName}}</p>
            <p class="Commodity_dis">{{ProductObj.description}}</p>
            <div class="Commodity_pir">
              <span>￥ {{ProductObj.price}}</span>
            </div>
            <div class="Commodity_num">
              <div><b>数量</b></div>
              <div>
                <van-stepper
                  v-model="CommodityNum"
                  integer
                />
              </div>
            </div>
          </div>

          <div class="commodity_evaluate" id="commodity_evaluate">
            <div class="title">评价</div>
            <ul v-if="EvaluateList.length">
              <li v-for="(item,index) in EvaluateList" :key="item+index">
                <div class="evaluate_header">
                  <div>{{item.realName}}</div>
                  <div class="center">
                    <van-rate v-model="item.productScore" disabled disabled-color="#ffd21e"/>
                  </div>
                  <div>{{item.createDate/1000 | timeYearFilter}}</div>
                </div>
                <div class="evaluate_content">
                  <div class="title">{{item.content}}</div>
                </div>
              </li>
            </ul>
            <div v-else>
              暂无评价
            </div>
          </div>

          <div class="commodity_introduce" id="commodity_introduce">

          </div>

        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <div @click="PurchaseImmediately">
         立即购买
       </div>-->

      <van-goods-action>
        <van-goods-action-mini-btn icon="cart" text="购物车" @click="onGoShopping" :info="InfoNum"/>
        <van-goods-action-big-btn text="加入购物车" @click="addShopShopping"/>
        <van-goods-action-big-btn text="立即购买" @click="PurchaseImmediately" primary/>
      </van-goods-action>

    </div>
  </div>
</template>

<script>
  import xheader from "../public/xheader"
  import {Toast} from "mint-ui"

  export default {
    name: "ShopCommodityDetails",
    components: {
      xheader
    },
    data() {
      return {
        CommodityNum: 1,
        addressColl: false,   //地址选择框 控制器
        chosenAddressId: '1',
        list: [],
        ProductObj: {},        //  商品对象
        EvaluateList: [],       // 评论列表
        EvaluateObj: {
          productId: this.$route.params.ShopPid,
          page: "1",
          pageSize: "8"
        },       //   评价查询参数
        EvaluatePageSize: "",           //  评论总数
        InfoNum: "",             // 购物车商品 个数


      }
    },
    methods: {

      goAnchor(selector) {
        // console.log(selector)
        document.querySelector("#" + selector).scrollIntoView(true);
      },
      productFind() {
        let $self = this
        this.$store.dispatch("ShopFindProduct", {productId: this.$route.params.ShopPid})
          .then(response => {
            if (response.success) {
              $self.ProductObj = response.result
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })

      },
      productEvaluateFun() {
        let $self = this

        $self.$store.dispatch("ShopProductEva", $self.EvaluateObj)
          .then(response => {
            if (response.success) {
              $self.EvaluateList = response.result.evaluateList
              $self.EvaluatePageSize = response.result.count
            } else {
              Toast(response.result)
            }
          })

      },

      PurchaseImmediately() {
        this.ProductObj.CommodityNum = this.CommodityNum
        //
        this.$store.commit("SET_ConfirmationOrderList", [this.ProductObj])
        //
        this.$store.commit("SET_orderTotal")
        //
        this.$router.push({name: 'ShopConfirmationOrder'})

        // 直接购买传参
        this.$store.commit("SET_isPur", true)
      },


      //  去购物车
      onGoShopping() {
        this.$router.push({name: 'ShopCart'})
      },

      //加入购物车
      addShopShopping() {
        let $self = this
        $self.$store.dispatch("ShopAddShopping", {
          productId: $self.$route.params.ShopPid,
          purchaseCount: $self.CommodityNum
        })
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.ShopNum()
            } else {
              Toast(response)
            }
          })
          .catch(error => {
            Toast(error)
          })
      },

      //   购物车 计数
      ShopNum() {
        let $self = this
        $self.$store.dispatch("ShopCartNum")
          .then(response => {
            if (response.success) {
              $self.InfoNum = response.result
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })

      },
    },
    created() {
      this.productFind()
      this.productEvaluateFun()
      this.ShopNum()
    }
  }
</script>

<style scoped lang="scss">

  .Details_nav {
    .Details_list {
      display: flex;
      padding: 10px 0;
      border-bottom: 2px solid #efedef;
      li {
        text-align: center;
        flex: 1;
      }
    }
  }

  .swiper {
    height: 380px;
    img {
      height: 380px;
      width: 100%;
    }
  }

  .CommodityDetails {
    padding: 0 10px;
    .Commodity_name {
      font-size: 18px;
      padding: 8px;
    }
    .Commodity_dis {
      padding: 8px 0;
      font-size: 14px;
      color: red;
    }
    .Commodity_pir {
      span {
        font-size: 18px;
        color: #ef2929;
      }
    }
    .Commodity_num {
      display: flex;
      padding: 8px 0;
      align-items: center;
      div {
        padding: 10px 0;
        b {
          font-weight: 100;
          font-size: 14px;
          color: #999;
          padding-right: 6px;
        }
        span {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
        }
        input {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
          width: 60px;
        }
      }
    }
    .Commodity_address {
      display: flex;
      padding: 8px 0;
      align-items: center;
      div {
        padding: 10px 0;
        b {
          font-weight: 100;
          font-size: 14px;
          color: #999;
          padding-right: 6px;
        }
        span {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
        }
        input {
          border: 1px solid #999;
          padding: 4px 8px;
          border-radius: 5px;
          width: 60px;
        }
      }
    }
  }

  .commodity_evaluate {
    .title {
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    ul {
      li {
        border-bottom: 1px solid #ddd;
        padding-bottom: 8px;
        .evaluate_header {
          display: flex;
          align-items: center;
          div {
            padding: 4px 6px;
          }
          .center {
            flex: 1;
            align-items: center;
            img {
              width: 28px;
              height: 28px;
            }
          }
        }
        .evaluate_content {
          padding: 4px 6px;
          .title {
            font-size: 14px;
            border-bottom: 0;
          }
          .Img {
            img {
              width: 20%;
            }
          }
        }
      }
    }
  }

  .commodity_introduce {
    .title {
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    .introduce_title {
      img {
        width: 100%;
      }
    }
  }

  /*
    .footer {
      div {
        height: 40px;
        line-height: 40px;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
    }
  */
  .footer {
    height: 50px;
  }

</style>
