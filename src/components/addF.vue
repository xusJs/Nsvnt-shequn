<template>
  <div class="addF page">
    <xheader is-left="true" title="添加好友" is-right="SearchQrCode"></xheader>
    <div class="box">
      <div class="searchBox">
        <mt-field placeholder="请输入用户名或手机号码" v-model="username" style="border: 1px solid #ddd">
          <mt-button @click="findF">查询</mt-button>
        </mt-field>
      </div>

      <div class="searchContent" v-if="searchData.length">
        <ul>
          <li v-for="(item,index) in searchData" :key="item+index">
            <div class="f_content">
              <div class="f_img">
                <img :src="item.headPortrait==='' ? $store.state.defaultImg : item.headPortrait" alt="">
              </div>
              <div class="f_center">
                <div class="ff_center">
                  <div class="ff_name">{{item.realName}}</div>
                  <div class="ff_address">{{item.addr}}</div>
                </div>
              </div>
              <div class="f_footer">
                <span @click="addF(item.id)">添加</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="searchContent" v-else-if="isclickSearch===true">
        <p style="padding: 50px 0;text-align: center;">
          该用户不存在
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import Qs from "qs"
  import md5 from "js-md5"
  import {MessageBox, Toast} from "mint-ui"
  import xheader from "../components/public/xheader"


  export default {
    name: "add-f",
    components: {
      xheader
    },
    data() {
      return {
        username: "",
        searchData: [],
        isclickSearch: false,
        remark: ""
      }
    },
    methods: {
      addF(id) {
        let $self = this
        $self.$store.dispatch("AddFriend", {id: id, nick: $self.remark})
          .then((res) => {
            if (res.success) {
              MessageBox('提示', '好友申请发送成功')
            } else {
              Toast(res.result)
            }
          })
      },
      findF() {
        let $self = this
        $self.$store.dispatch("QueryFriend", {str: $self.username})
          .then((res) => {
            if (res.success && res.result !== null) {
              $self.searchData = res.result
              $self.isclickSearch = true;
            } else {
              Toast(res.result)
            }
          })
      }
    },
  }
</script>

<style scoped lang="scss">

  .searchBox {
    padding: 10px 0;
  }

  .searchContent {
    ul {
      li {
        padding: 10px 0;
        border-bottom: 1px solid #edefef;
        .f_content {
          display: flex;
          .f_img {
            padding: 0 10px;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
          }
          .f_center {
            flex: 1;
            .ff_center {
              display: flex;
              flex-direction: column;
              .ff_name {
                font-size: 13px;
                color: #333;
                padding-bottom: 6px;
              }
              .ff_address {
                font-size: 12px;
                color: #999;
              }
            }
          }
          .f_footer {
            span {
              padding: 3px 8px;
              color: #fff;
              background: #42c408;
              border-radius: 5px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
</style>
