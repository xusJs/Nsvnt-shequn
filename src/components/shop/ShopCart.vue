<template>
  <div class="page">
    <xheader is-left="true" title="购物车"></xheader>
    <div class="box">
      <ul class="CartList" v-if="CartList.length">
        <li class="CartItem" v-for="item in CartList" :key="item.id">

          <van-cell-swipe :right-width="65">
            <div class="content">
              <div class="ItemBox">
                <van-checkbox v-model="item.isChecked"></van-checkbox>
              </div>
              <div class="ItemBox" @click="$router.push({name:'ShopCommodityDetails',params:{ShopPid:item.productId}})">
                <img :src="item.productInfo.picList[0]" alt="">
              </div>
              <div class="center ItemBox">
                <div class="titles">
                  {{item.productInfo.productName}}
                </div>
                <div class="names">
                  {{item.productInfo.description}}
                </div>
                <div class="prices">
                  <div class="price center">
                    ￥ {{item.productInfo.price}}
                  </div>
                  <div class="Num">
                    <van-stepper
                      v-model="item.purchaseCount"
                      @change="changeCart(item.productId,item.purchaseCount)"
                      integer
                    />
                  </div>
                </div>
              </div>
            </div>
            <span slot="right" class="right_span">
              <van-button type="danger" @click="ShopCartDel(item.productId)">删除</van-button>
            </span>
          </van-cell-swipe>
        </li>
      </ul>
      <div v-else style="text-align: center;padding: 20px 0">
        购物车中还是空荡荡的
      </div>


      <van-goods-action v-if="CartList.length">
        <van-goods-action-big-btn text="立即购买" primary @click="ShopCartGoPay"/>
      </van-goods-action>

    </div>
  </div>
</template>

<script>

  import xheader from "../public/xheader"
  import {Toast} from "mint-ui"

  export default {
    name: "ShopCart",
    components: {
      xheader
    },
    data() {
      return {
        BoxValue: "",
        CommodityNum: "",
        CartList: []
      }
    },
    methods: {
      //   购物车列表
      ShopCartList() {
        let $self = this
        $self.$store.dispatch("ShopShowShopping")
          .then(response => {
            // console.log(response)
            if (response.success) {
              response.result.forEach((item) => {
                item.isChecked = false
              })

              $self.CartList = response.result

            } else {
              Toast(response, result)
            }
          })
          .catch(error => {
            Toast(error)
          })
      },

      // 商品数量增减
      changeCart(id, Num) {
        let $self = this
        $self.$store.dispatch("ShopAddShopping", {
          productId: id,
          purchaseCount: Num
        })
          .then(response => {
            if (response.success) {

            } else {
              Toast(response.result)
            }
          })
      },

      //  删除商品
      ShopCartDel(id) {
        let $self = this

        $self.$store.dispatch("ShopRemoveShopping", {productIds: [id]})
          .then(response => {
            if (response.success) {
              $self.ShopCartList()
            } else {
              Toast(response.result)
            }
          })
          .catch(error => {
            Toast(error)
          })


      },


      //  去购买
      ShopCartGoPay() {
        let isCheck = false
        let list = []


        for (let i = 0; i < this.CartList.length; i++) {
          if (this.CartList[i].isChecked) {
            isCheck = true
            list.push(this.CartList[i])
          }
        }

        if (isCheck) {
          this.$store.commit("SET_ConfirmationOrderList", list)
          this.$router.push({name: 'ShopConfirmationOrder'})

          this.$store.commit('SET_orderTotals')



        } else {
          Toast("选择需要购买的商品")
        }


      },

    },
    created() {
      this.ShopCartList()
    }
  }
</script>

<style scoped lang="scss">

  .CartList {
    .CartItem {
      display: flex;
      align-items: center;
      .content {
        display: flex;
        align-items: center;
        .center {
          flex: 1;

          .titles {
            padding: 4px 0;
          }
          .names {
            /*display: flex;*/
            /*flex-wrap: nowrap;*/
            width: 247px;
            padding: 4px 0;
            color: #ccc;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .prices {
            display: flex;
            align-items: center;
            .price {
              color: #ef2929;
              font-size: 16px;
            }
            .Num {

            }
          }

        }
        .ItemBox {
          padding: 8px;
          img {
            width: 60px;
            height: 60px;
          }
        }
      }

    }
  }

  .right_span {
    height: 100%;
    display: flex;
    align-items: center;
  }

</style>
