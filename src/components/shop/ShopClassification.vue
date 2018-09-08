<template>
  <div class="page">
    <xheader title="分类"></xheader>
    <div class="box">
      <div class="content" v-if="classificationList.length">
        <div class="box_left">
          <ul>
            <li
              v-for="(item,index) in classificationList"
              :key="item+index"
              :class="{active:index === classIndex}"
              @click="classIndex = index"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="box_right">
          <ul>
            <li v-for="(item,index) in classificationList[classIndex].subList" :key="item+index"
                @click="$router.push({name:'ShopSearchProduct',params:{cid:item.id}})"
            >
              <img :src="item.picture" alt="">
              <p> {{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <xfooter></xfooter>
  </div>
</template>

<script>

  import xheader from "../public/xheader"
  import xfooter from "../public/ShopFooter"
  import {Toast} from "mint-ui"

  export default {
    name: "ShopClassification",
    components: {
      xheader,
      xfooter
    },
    data() {
      return {
        classificationList: [],
        classIndex: 0               // 当前选择的一级分类索引
      }
    },
    methods: {
      classificationFun() {
        let $self = this
        $self.$store.dispatch("ShopFindClassification")
          .then(response => {
            if (response.success) {
              $self.classificationList = response.result
            } else {
              Toast(response.result)
            }
          })
      }
    },
    created() {
      this.classificationFun()
    }
  }
</script>

<style scoped lang="scss">
  .content {
    flex: 1;
    display: flex;
    .box_left {
      background: #efedef;
      flex: 0 0 26%;
      ul {
        display: flex;
        flex-direction: column-reverse;
        li {
          padding: 18px 6px;
          border-bottom: 1px solid #ddd;
          color: #333;
        }
        .active {
          color: #ef2929;
        }
      }
    }
    .box_right {
      flex: 0 0 74%;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          text-align: center;
          padding: 8px;
          flex: 0 0 33.33%;
          img {
            width: 66px;
            height: 66px;
          }
          span {
          }
        }
      }
    }
  }

  .box {
    display: flex;
    flex-direction: column;
  }
</style>
