<template>
  <div class="page">
    <xheader is-left="true" title="添加地址"></xheader>
    <div class="box">
      <van-address-edit
        :area-list="areaList"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
  import xheader from "../public/xheader"
  import areaList from "../../utils/address"

  import {Toast} from "vant"

  export default {
    name: "ShopAddAddress",
    components: {
      xheader
    },
    data() {
      return {
        areaList: areaList,
        searchResult: []
      }
    },
    methods: {
      onSave(content) {
        // Toast('save');
        // console.log(content)
        let $self = this

        this.$store.dispatch("ShopAddAddress", content)
          .then(response => {
            if (response.success) {
              Toast("成功")
              $self.$router.replace({name: 'ShopAddress'})
            } else {
              Toast("失败：" + response.result)
            }
          })
          .catch(error => {
            Toast("错误：" + error)
          })
      },
      onDelete() {
        Toast('delete');
      },
    }
  }
</script>

<style scoped lang="scss">
  .box {
    padding: 10px;
    ul {
      li {
        display: flex;
        padding: 10px 4px;
        border-bottom: 1px solid #ddd;
        span {
          width: 100px;
          color: #999;
        }
        input {
          flex: 1;
          padding: 4px;
        }
        input[type='button'] {
          color: #00aaef;
        }
      }
    }
  }

  .x_footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #00aaef;
    font-size: 16px;
    letter-spacing: 3px;
  }
</style>
