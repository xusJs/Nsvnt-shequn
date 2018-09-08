<template>
  <div class="page">
    <xheader title="商城"></xheader>
    <div class="box">
      <div class="search" @click="$router.push({name:'ShopSearchProduct',params:{cid:'null'}})">
        <input type="text" placeholder="输入想要查询的关键字">
        <span>搜索</span>
      </div>
      <div class="content">
        <hr/>
        <div class="title">
          热卖单品
        </div>
        <ul v-if="ProductList.length">
          <li v-for="(item,index) in ProductList" :key="item+index"
              @click="$router.push({name:'ShopCommodityDetails',params:{ShopPid:item.id}})"
          >
            <div class="component">
              <img :src="item.pic[0]" alt="" v-lazy="item.pic[0]">
              <div>
                <span>{{item.productName}}</span>
                <b>￥ {{item.price}}</b>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <xfooter></xfooter>
  </div>
</template>

<script>

  import {Toast} from "mint-ui"
  import xheader from "../public/xheader"
  import xfooter from "../public/ShopFooter"

  export default {
    name: "ShopHome",
    components: {
      xheader,
      xfooter
    },
    data() {
      return {
        ProductList: []
      }
    },
    methods: {
      productListFun() {
        let $self = this
        $self.$store.dispatch("ShopHomeProduct", {page: '1', pageSize: "20"})
          .then(response => {
            if (response.success) {
              $self.ProductList = response.result.productList
            } else {
              Toast(response.result)
            }
          })
      }
    },
    created() {
      this.productListFun()
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .search {
      border-bottom: 1px solid #333;
      padding: 10px 8px;
      display: flex;
      input {
        flex: 1;
        border: 1px solid #999;
        padding: 6px 8px;
        border-radius: 5px;
        margin-right: 10px;
      }
      span {
        /*border: 1px solid #999;*/
        padding: 6px 8px;
        border-radius: 5px;
        color: #fff;
        background: #00aaef;
      }
    }
    img {
      /*  position: relative;
        !*top: 50%;*!
        left: 50%;
        transform: translate(-50%, 0);
        height: 140px;*/
      width: 100%;
      height: 140px;
    }
    .content {
      background: #efefef;
      .title {
        margin: 10px 8px;
        padding-left: 10px;
        border-left: 3px solid #ef2929;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        li {
          flex: 0 0 50%;
          padding-left: 4px;
          padding-right: 5px;
          background: #fff;
          .component {
            div {
              padding: 9px 0;
              span {
                font-size: 13px;
                padding: 4px 8px;
                color: #333;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden; /** 隐藏超出的内容 **/
              }
              b {
                padding: 0 8px;
                font-size: 16px;
                color: #FE2929;
              }
            }
          }
        }
      }
    }
  }
</style>
