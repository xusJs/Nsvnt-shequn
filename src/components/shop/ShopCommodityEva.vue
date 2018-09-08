<template>
  <div class="page">
    <xheader is-left="true" title="评价"></xheader>
    <div class="contents">
      <ul class="Evaluation_list">
        <li class="Evaluation_item" v-for="(item,index) in $store.state.Shop.EvaluationData.detailList"
            :key="item+index">
          <div class="Evaluation_header">
            <div class="Evaluation_left">
              <img :src="item.productInfo.picList[0]" alt=""
                   @click="$router.push({name:'ShopCommodityDetails',params:{CID:item.productInfo.id}})">
            </div>
            <div class="Evaluation_center">
              <div class="box">
                <div class="box_name">{{item.productInfo.productName}}</div>
                <div class="box_pic">{{item.productInfo.price}}</div>
              </div>
            </div>
            <div class="Evaluation_right">
              <img src="../../img/right_icon.png" alt="">
            </div>
          </div>
          <div class="Evaluation_content">
            <div class="Evaluation_content_top">
              <h4>商品评分</h4>
              <van-rate v-model="EvaluationData.productScore"/>
            </div>
            <div class="Evaluation_content_center">
              <!--<h4>商品评价</h4>-->
              <van-cell-group>
                <van-field
                  v-model="EvaluationData.content"
                  label="商品评价"
                  type="textarea"
                  placeholder="请输入留言"
                  rows="3"
                  autosize
                />
              </van-cell-group>
            </div>
            <div class="Evaluation_content_bottom">
              <van-button type="primary" @click="orderProductEvaluationFun">提交评价</van-button>


              <!--    <div>
                    {{$store.state.user.EvaluationData}}
                  </div>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import xheader from "../public/xheader"
  import {Toast} from "mint-ui"

  export default {
    name: "ShopCommodityEva",
    components: {
      xheader
    },
    data() {
      return {
        EvaluationData: {
          productScore: 5,
          content: ""
        }
      }
    },
    methods: {
      orderProductEvaluationFun() {
        let $self = this
        if ($self.Evaluation_value === null) {
          Toast("商品评分不能为空")
        } else if ($self.message === "") {
          Toast("评价内容不能为空")
        } else {
          $self.$store.dispatch("ShopOrderEva", $self.EvaluationData)
            .then(response => {
              if (response.success) {
                Toast("评价成功")
                $self.$router.go(-1)
              } else {
                Toast("评价失败！" + response.result)
              }
            })
            .catch(error => {
              Toast(error)
            })
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .Evaluation_list {
    .Evaluation_item {
      .Evaluation_header {
        display: flex;
        align-items: center;
        background: #F7F7F8;
        padding: 16px;
        .Evaluation_left {
          img {
            border: 1px solid #999;
            width: 60px;
            height: 60px;
          }
        }
        .Evaluation_center {
          flex: 1;
          padding: 0 16px;
          /*height: 100%;*/
          .box {
            display: flex;
            flex-direction: column;
            .box_name {
              flex: 1;
              font-size: 14px;
              padding: 4px;
            }
            .box_pic {
              font-size: 12px;
              color: #ef2929;
              padding: 0 4px;
            }
          }
        }
        .Evaluation_right {
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
      .Evaluation_content {
        border: 1px solid #ddd;
        .Evaluation_content_top {
          padding: 6px 20px;
          h4 {
            padding: 8px;
          }
        }
        .Evaluation_content_center {
          padding: 6px 10px;
        }
        .Evaluation_content_bottom {
          text-align: center;
        }
      }
    }
  }

</style>
