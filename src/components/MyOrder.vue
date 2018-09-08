<template>
  <div class="page">
    <xheader is-left="true" title="我的订单"></xheader>
    <div class="box">
      <ul class="Order_list">
        <li class="Order_item">
          <div class="Order_header">
            <div class="Order_header_img">
              <img src="../img/search.jpg" alt="">
            </div>
            <div class="Order_header_name">
              新启点价值网络
            </div>
            <div class="Order_header_type">
              订单状态
            </div>
          </div>
          <div class="Order_content">
            <div class="Order_content_img">
              <img src="../img/swiper1.jpg" alt="">
            </div>
            <div class="Order_content_name">
              实话实说商品名称
            </div>
          </div>
          <div class="Order_footer">
            <ul>
              <li>
                <div class="Order_footer_my">金额：￥2345</div>
                <div class="Order_footer_Num">X 1</div>
              </li>
              <li>
                <div class="Order_footer_time">
                  创建时间
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import xheader from "./public/xheader"

  export default {
    name: "MyOrder",
    components: {xheader}
  }
</script>

<style scoped lang="scss">
  .Order_list {
    margin-top: 18px;
    .Order_item {
      border-bottom: 1px solid #999;
      .Order_header {
        display: flex;
        .Order_header_img {
          padding-left: 13px;
          padding-right: 10px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .Order_header_name {
          font-size: 11px;
          color: #333;
          flex: 1;
        }
        .Order_header_type {
          padding-right: 13px;
          font-size: 11px;
          color: #fe2929;
        }
      }
      .Order_content {
        display: flex;
        padding-top: 10px;
        .Order_content_img{
          padding: 0 9px 11px 13px;
          img{
            width: 60px;
            height: 60px;
          }
        }
        .Order_content_name{
          font-size: 11px;
          color: #333;
        }
      }
      .Order_footer {
        ul{
          li{
            padding: 0 13px;
            height: 21px;
            line-height: 21px;
            .Order_footer_Num{
            }
            .Order_footer_my{
              float: right;
            }
            .Order_footer_time{}
          }
        }
      }
    }
  }

</style>
