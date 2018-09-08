<template>
  <div class="page">
    <xheader is-left="true" title="商品查询"></xheader>
    <div class="box">
      <div class="search">
        <input type="text" v-model="FindProductData.word" placeholder="输入想要查询的关键字">
        <span @click="ProducListFun">搜索</span>
      </div>
      <ul class="ProductList_list" v-if="ProductList.length">
        <li class="ProductList_item"
            v-for="(item,index) in ProductList"
            :key="item+index"
            @click="$router.push({name:'ShopCommodityDetails',params:{ShopPid:item.id}})"
        >
          <div class="ProductList_left">
            <img :src="item.pic[0]" alt="">
          </div>
          <div class="ProductList_center">
            {{item.productName}}
          </div>
          <div class="ProductList_right">
            ￥ {{item.price}}
          </div>
        </li>
      </ul>
      <div v-else style="text-align: center; padding-top: 30px">
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "../public/xheader"


  export default {
    name: "ShopSearchProduct",
    components: {
      xheader
    },
    data() {
      return {
        FindProductData: {
          word: "",
          categoryId: this.$route.params.cid === 'null' ? "" : this.$route.params.cid,
          page: "1",
          pageSize: "20"
        },
        ProductList: [],
        pageData: {
          page: "",
          pageSize: ""
        }
      }
    },
    methods: {
      ProducListFun() {
        let $self = this
        $self.$store.dispatch("ShopSearchProducts", this.FindProductData)
          .then(response => {
            if (response.success) {
              $self.ProductList = response.result.productList

              $self.pageData.page = response.result.count
              $self.pageData.pageSize = response.result.countPage

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
      this.ProducListFun()
    }
  }
</script>

<style scoped lang="scss">
  .ProductList_list {
    .ProductList_item {
      border-bottom: 1px solid #ddd;
      padding: 4px;
      display: flex;
      align-items: center;
      .ProductList_left {
        padding: 0 10px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .ProductList_center {
        flex: 1;
      }
      .ProductList_right {
        padding: 0 10px;
        color: #ef2929;
        font-size: 16px;
      }
    }
  }

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
</style>
