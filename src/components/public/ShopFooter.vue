<template>
  <div class="X_footer">
    <ul>
      <li @click="$router.replace({name:'ShopHome'})">
        <img src="../../img/home.png" alt="">
        <p>首页</p>
      </li>
      <li @click="$router.replace({name:'ShopClassification'})">
        <img src="../../img/find.png" alt="">
        <p>分类</p>
      </li>
      <li @click="$router.push({name:'ShopCart'})">
        <img src="../../img/find.png" alt="">
        <p>购物车</p>
      </li>
      <li @click="$router.replace({name:'ShopPersonalCenter'})">
        <img src="../../img/Contacts.png" alt="">
        <p>个人中心</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ShopFooter"
  }
</script>

<style scoped lang="scss">
  .X_footer {
    position: relative;
    ul {
      display: flex;
      border-top: 1px solid #aaa;
      background: #fff;
      li {
        flex: 1;
        text-align: center;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .center {
        div {
          position: fixed;
          text-align: center;
          display: inline-block;
          width: 60px;
          height: 60px;
          background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
          left: 50%;
          margin-left: -30px;
          bottom: 20px;
          z-index: 999999999;
          color: #fff;
          line-height: 60px;
          font-size: 60px;
          border-radius: 50%;
        }
        ol {
          li {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 1px solid #ddd;
            position: fixed;
            background: #4caf50;
            color: #fff;
            border-radius: 50%;
            z-index: 999;
            h6 {
              img {
                width: 20px;
                height: 20px;
              }
              p {
                text-align: center;
              }
            }
          }
          .send {
            bottom: 70px;
            left: 50%;
            margin-left: 40px;
          }
          .newroom {
            bottom: 70px;
            left: 50%;
            margin-left: -80px;
          }
          .addroom {
            bottom: 94px;
            left: 50%;
            margin-left: -20px;
          }
        }
      }
    }
  }
</style>
