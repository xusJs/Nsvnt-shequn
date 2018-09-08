<template>
  <div class="page">
    <xheader is-left="true" title="我的订单"></xheader>
    <div class="box">
      <van-tabs sticky @click="changeTabs" v-model="isActive">
        <van-tab v-for="index in myOrderList" :title="index.name" :key="index.name">
          <div v-if="index.name==='待付款'">
            <ul class="order_list" v-if="paymentOrderList.length">
              <li class="order_item" v-for="(item,index) in paymentOrderList" :key="item+index"
                  v-if="item.delFlag ==='0'">
                <div class="order_num">
                  <span>订单号：</span>{{item.orderNo}}
                </div>
                <div class="order_types">
                  <div>
                    <p><span>状态：</span>待付款</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="cancelOrderFun(item)">取消订单</span>
                    <span @click="WeixinJSBridgePlay(item.orderNo)">去付款</span>
                  </div>
                </div>
                <div class="order_commodity">
                  <ul class="commodity_list">
                    <li class="commodity_item" v-for="(items, indexs) in item.detailList" :key="items+indexs">
                      <div class="commodity_img">
                        <img :src="items.productInfo.picList[0]" alt="">
                      </div>
                      <div class="commodity_name">
                        <p>{{items.productInfo.productName}}</p>
                        <span> X {{items.purchaseCount}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>
              您暂时还没有订单
            </div>
          </div>
          <div v-if="index.name==='待发货'">
            <ul class="order_list" v-if="PayOrderList.length">
              <li class="order_item" v-for="(item,index) in PayOrderList" :key="item+index">
                <div class="order_num">
                  <span>订单号：</span>{{item.orderNo}}
                </div>
                <div class="order_types">
                  <div>
                    <p><span>状态：</span>待发货</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span>待商家发货</span>
                  </div>
                </div>
                <div class="order_commodity">
                  <ul class="commodity_list">
                    <li class="commodity_item" v-for="(items, indexs) in item.detailList" :key="items+indexs">
                      <div class="commodity_img">
                        <img :src="items.productInfo.picList[0]" alt="">
                      </div>
                      <div class="commodity_name">
                        <p>{{items.productInfo.productName}}</p>
                        <span> X {{items.purchaseCount}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>
              您暂时还没有订单
            </div>
          </div>
          <div v-if="index.name==='待收货'">
            <ul class="order_list" v-if="receivedOrderList.length">
              <li class="order_item" v-for="(item,index) in receivedOrderList" :key="item+index">
                <div class="order_num">
                  <span>订单号：</span>{{item.orderNo}}
                </div>
                <div class="order_types">
                  <div>
                    <p><span>状态：</span>待收货</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="OrderReceipt(item.id)">去收货</span>
                  </div>
                </div>
                <div class="order_commodity">
                  <ul class="commodity_list">
                    <li class="commodity_item" v-for="(items,indexs) in item.detailList" :key="items+indexs">
                      <div class="commodity_img">
                        <img :src="items.productInfo.picList[0]" alt="">
                      </div>
                      <div class="commodity_name">
                        <p>{{items.productInfo.productName}}</p>
                        <span> X {{items.purchaseCount}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>
              您暂时还没有订单
            </div>
          </div>
          <div v-if="index.name==='待评价'">
            <ul class="order_list" v-if="evaluateOrderList.length">
              <li class="order_item" v-for="(item,index) in evaluateOrderList" :key="item+index">
                <div class="order_num">
                  <span>订单号：</span>{{item.orderNo}}
                </div>
                <div class="order_types">
                  <div>
                    <p><span>状态：</span>待评价</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="GoEvaluation(item)">去评价</span>
                  </div>
                </div>
                <div class="order_commodity">
                  <ul class="commodity_list">
                    <li class="commodity_item" v-for="(items,indexs) in  item.detailList" :key="items+indexs">
                      <div class="commodity_img">
                        <img :src="items.productInfo.picList[0]" alt="">
                      </div>
                      <div class="commodity_name">
                        <p>{{items.productInfo.productName}}</p>
                        <span> X {{items.purchaseCount}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>
              您暂时还没有订单
            </div>
          </div>
          <div v-if="index.name==='全部订单'">
            <ul class="order_list" v-if="allOrderList.length">
              <li class="order_item" v-for="(item,index) in allOrderList" :key="item+index">
                <div class="order_num">
                  <span>订单号：</span>{{item.orderNo}}
                </div>
                <div class="order_types" v-if="item.orderStatus ==='1'">
                  <div>
                    <p><span>状态：</span>待付款</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="cancelOrderFun(item)">取消订单</span>
                    <span @click="WeixinJSBridgePlay(item.orderNo)">去付款</span>
                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='2'">
                  <div>
                    <p><span>状态：</span>待发货</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span>等待商家发货</span>
                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='3'">
                  <div>
                    <p><span>状态：</span>待收货</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="OrderReceipt(item.id)">确认收货</span>
                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='4'">
                  <div>
                    <p><span>状态：</span>待评价</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                  <div>
                    <span @click="GoEvaluation(item)">去评价</span>
                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='5'">
                  <div>
                    <p><span>状态：</span>已取消</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='6'">
                  <div>
                    <p><span>状态：</span>退款中</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                </div>
                <div class="order_types" v-if="item.orderStatus ==='7'">
                  <div>
                    <p><span>状态：</span>已完成</p>
                    <p><span>价格：</span>{{item.totalPrice}}</p>
                  </div>
                  <div class="center">

                  </div>
                </div>
                <div class="order_commodity">
                  <ul class="commodity_list">
                    <li class="commodity_item" v-for="(items,indexs) in item.detailList" :key="items+indexs">
                      <div class="commodity_img">
                        <img :src="items.productInfo.picList[0]" alt="">
                      </div>
                      <div class="commodity_name">
                        <p>{{items.productInfo.productName}}</p>
                        <span> X {{items.purchaseCount}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>
              您暂时还没有订单
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>

  import xheader from "../public/xheader"
  import {Toast, Dialog} from "vant"

  export default {
    name: "ShopMyOrder",
    components: {
      xheader
    },
    data() {
      return {
        myOrderList: [
          {name: "待付款"},
          {name: "待发货"},
          {name: "待收货"},
          {name: "待评价"},
          {name: "全部订单"},
        ],
        allOrderList: [],        //所有订单
        paymentOrderList: [],    //待付款订单
        PayOrderList: [],        //待付款订单
        receivedOrderList: [],   //待收货订单
        evaluateOrderList: [],   //待评价订单
        isActive: this.$route.params.isIndex
      }
    },
    methods: {
      changeTabs(index, title) {

        let $self = this
        if (index === 0) {
          $self.$store.dispatch("ShopMyOrders", {orderStatus: '1'})
            .then(response => {
              // console.log(response)
              if (response.success) {
                $self.paymentOrderList = response.result

              } else {
                Toast(response.result)
              }

            })
            .catch(error => {
              Toast(error)
            })
        } else if (index === 2) {
          $self.$store.dispatch("ShopMyOrders", {orderStatus: '3'})
            .then(response => {
              if (response.success) {
                $self.receivedOrderList = response.result

              } else {
                Toast(response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        } else if (index === 3) {
          $self.$store.dispatch("ShopMyOrders", {orderStatus: '4'})
            .then(response => {
              if (response.success) {
                $self.evaluateOrderList = response.result
              } else {
                Toast(response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        } else if (index === 4) {
          $self.$store.dispatch("ShopMyOrders", {orderStatus: null})
            .then(response => {
              if (response.success) {
                $self.allOrderList = response.result
              } else {
                Toast(response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        } else if (index === 1) {
          $self.$store.dispatch("ShopMyOrders", {orderStatus: '2'})
            .then(response => {
              if (response.success) {
                $self.PayOrderList = response.result
              } else {
                Toast(response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        }
      },

      //  付款
      WeixinJSBridgePlay(orderNo) {

        let $self = this

        this.$store.dispatch("ShopWechatPlay", {orderNo: orderNo})
          .then(response => {
            if (response.success) {
              $self.onBridgeReady(response.result);
            } else {
              Toast("ERR：" + response.result)
            }
          })
          .catch(error => {
            Toast("ERR：" + error)
          })
      },
      onBridgeReady(obj) {
        Wechat.sendPaymentRequest(obj, function () {
          Toast("Success");
        }, function (reason) {
          // Toast("Failed: " + reason);
        });
      },
      //  确认收货
      OrderReceipt(orderId) {
        let $self = this;

        Dialog.confirm({
          title: "提示",
          message: "确认收货"
        })
          .then(() => {
            $self.$store.dispatch("ShopRecOrder", {orderId: orderId})
              .then(response => {
                if (response.success) {
                  Toast("收货成功")
                } else {
                  Toast("失败！" + response, result)
                }
              })
              .catch(error => {
                Toast("错误！" + error)
              })
          })
          .catch(() => {

          })
      },
      //  取消订单
      cancelOrderFun(item) {
        let $self = this;

        Dialog.confirm({
          title: "提示",
          message: "取消"
        })
          .then(() => {
            $self.$store.dispatch("ShopCancelOrder", {orderId: item.id})
              .then(response => {
                if (response.success) {
                  Toast("取消成功")
                  item.delFlag = 1
                } else {
                  Toast("取消订单失败！" + response.result)
                }
              })
              .catch(error => {
                Toast(error)
              })
          })
      },
      //  申请退款

      //  去评价
      GoEvaluation(item) {
        let $self = this;
        $self.$store.commit("SET_EvaluationData", item);
        $self.$router.push({name: "ShopCommodityEva"})
      }
    },
    created() {
      let $self = this;
      $self.changeTabs($self.$route.params.isIndex)
    }
  }
</script>

<style scoped lang="scss">

  .box {
    background: #efedef;
  }

  .order_list {
    background: #efedef;
    .order_item {
      background: #fff;
      margin-bottom: 10px;
      .order_num {
        font-size: 12px;
        color: #333;
        padding: 6px;
        border-bottom: 1px solid #ddd;
        span {
          font-size: 12px;
          color: #999;
        }
      }
      .order_types {
        display: flex;
        align-items: center;
        padding: 6px;
        border-bottom: 1px solid #ddd;
        div {
          font-size: 12px;
          p {
            padding: 2px;
            span {
              padding: 0;
              color: #999;
              background: #fff;
            }
          }
          span {
            padding: 6px 20px;
            border-radius: 3px;
            background: #ef2929;
            color: #fff;
          }
        }
        .center {
          flex: 1;
        }
      }
      .order_commodity {
        .commodity_list {
          .commodity_item {
            padding: 4px;
            display: flex;
            /*align-items: center;*/
            .commodity_img {
              padding: 10px;
              img {
                width: 80px;
                height: 80px;
              }
            }
            .commodity_name {
              font-size: 12px;
              padding: 10px;
              p {
                padding: 4px 0;
              }
              span {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
</style>
