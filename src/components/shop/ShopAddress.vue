<template>
  <div class="page">
    <xheader is-left="true" title="地址管理"></xheader>
    <div class="box">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        v-if="list.length"
      />
      <div style="text-align: center;padding: 20px 0" v-else>
        <p>您还没有收货地址 <span @click="$router.push({name:'ShopAddAddress'})">点我添加</span></p>
      </div>
      <div style="text-align: center;" v-if="list.length">
        <van-button type="primary" @click="removeAdd">删除选中的地址</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import xheader from "../public/xheader"
  import {Toast} from "vant"


  export default {
    name: "ShopAddress",
    components: {
      xheader
    },
    data() {
      return {
        chosenAddressId: '',
        list: []
      }
    },
    methods: {
      onAdd() {
        // Toast('新增收货地址');
        this.$router.push({name: 'ShopAddAddress'})
      },
      onEdit(item, index) {
        // Toast('编辑收货地址:' + index);
        // Toast('编辑收货地址:' + item);
      },
      findAddFun() {
        let $self = this
        this.$store.dispatch("ShopFindAddress")
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.list = [];

              response.result.forEach(function (res, index) {
                $self.list.push(
                  {
                    id: res.id,
                    name: res.userName,
                    tel: res.mobilePhoneNo,
                    address: res.region + "  " + res.address
                  }
                )
              })

            } else {
              Toast("失败：" + response.result)
            }


          })
          .catch(error => {
            Toast(error)
          })
      },
      removeAdd() {
        // console.log(this.chosenAddressId)

        let $self = this
        $self.$store.dispatch("ShopDelAddress", {addrId: this.chosenAddressId})
          .then(response => {
            if (response.success) {
              // Toast()
              $self.findAddFun()
            } else {
              Toast("删除失败！" + response.result)
            }
          })
      },
    },
    created() {
      this.findAddFun()
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
