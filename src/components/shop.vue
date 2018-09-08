<template>
  <div class="page">
    <xheader is-left="true" title="设备市场"></xheader>
    <div class="box">
      <div class="section_nav">
        <swiper :options="CarouselSwiperOption" ref="mySwiper">
          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" @click.native="changeSwiper(index)"
          >
            <img :src="slide" alt="">
          </swiper-slide>
        </swiper>
      </div>
      <div class="section_content">
        <div class="title"> 其它物联设备</div>

        <!--  <el-row>
            <el-col :span="9"  v-for="(o, index) in 6" :key="o" :offset="2">
              <el-card :body-style="{ padding: '0px' }">
                <img src="http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg" class="image">
                <div style="padding: 14px;">
                  <span>商品商品商品商品商品</span>
                  <div class="bottom clearfix">
                    &lt;!&ndash;<time class="time">{{ currentDate }}</time>&ndash;&gt;
                    &lt;!&ndash;<el-button type="text" class="button">操作按钮</el-button>&ndash;&gt;
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>-->

        <ul>
          <li v-for="(o,p) in 8" :key="o+p">
            <div class="component">
              <img src="http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg" alt="">
              <div>
                <span></span>
                <b></b>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "./public/xheader"


  export default {
    name: "shop",
    components: {
      xheader
    },
    data() {
      return {
        CarouselSwiperOption: {
          speed: 300,          // 动画速度
          autoplay: {
            delay: 3000
          },
          loop: true,
          pagination: '.swiper-pagination',
        },
        swiperSlides: [
          "http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg",
          "http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg",
          "http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg",
          "http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg",
        ],
        currentDate: new Date()
      }
    },
    methods: {
      changeSwiper(index) {
        console.log(index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .section_nav {
    img {
      width: 100%;
      height: 180px;
    }
  }

  .section_content {
    padding: 0 9px;
    .title {
      margin: 18px 0 10px 4px;
      padding-left: 10px;
      border-left: 2px solid #00aaef;
      font-size: 13px;
      color: #333;
    }
    img {
      width: 100%;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 50%;
        padding-left: 4px;
        padding-right: 5px;
        .component {
          div {
            padding: 9px 0;
            span {
              font-size: 13px;
              color: #333;
              word-break: break-all;

              text-overflow: ellipsis;

              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

              -webkit-line-clamp: 2; /** 显示的行数 **/

              overflow: hidden; /** 隐藏超出的内容 **/
            }
            b {
              font-size: 16px;
              color: #FE2929;
            }
          }
        }
      }
    }

  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
