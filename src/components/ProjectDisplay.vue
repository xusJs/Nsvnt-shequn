<template>
  <div class="page">
    <xheader is-left="true" title="社群"></xheader>
    <div class="box">
      <div>
        <header class="community_header">
          <div>
            <input type="text" placeholder="请输入您需要查找的内容" v-model="searchKeyWord" @keyup.enter="search">
            <img src="../img/search.jpg" alt="" @click="search">
          </div>
        </header>
        <section class="community_section">
          <div class="section_nav">
            <swiper :options="HeaderSwiperOption" ref="mySwiper">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" @click.native="changeSwiper(index)"
                            :class="{active : index === swiperSlidesIndex}">
                {{slide.laber}}
              </swiper-slide>
            </swiper>
          </div>
          <div class="section_Carousel">
            <swiper :options="CarouselSwiperOption" ref="mySwiper2">
              <swiper-slide v-for="(slide, index) in $store.state.community.carouselList" :key="index"
                            @click.native="TransmissionOperation(slide)">
                <img :src="slide.picPath" alt="" v-lazy="slide.picPath">
              </swiper-slide>
            </swiper>
          </div>

          <div class="section_section" v-if="$store.state.community.communityList.length">
            <ul class="section_list">
              <li class="section_item" v-for="(item,index) in $store.state.community.communityList" :key="item+index">
                <div class="project_top">
                  <h6 @click="$router.push({name:'Personalinformation',params:{uid:item.userId}})">
                    <img :src="item.headPortrait" alt="" v-lazy="item.headPortrait">
                  </h6>
                  <div>
                    <h4>{{item.realName}}</h4>
                    <p>{{item.coName}}</p>
                  </div>
                  <span v-if="item.isConcern === '1'" @click="addisConcern(item.userId,item)"> + 关注</span>
                  <span v-else @click="removeisConcern(item.userId,item.realName,item)">已 关注</span>
                </div>
                <div class="project_section"
                     @click="$router.push({name:'ProjectDetails',params:{ProjectId:item.id,ProjectType:item.ptype}})">
                  <p>{{item.title}}</p>
                  <div>
                    <img v-for="(items,indexs) in item.picturePath" :key="items+indexs" :src="items" alt=""
                         v-if="items.substring(items .lastIndexOf('\.') + 1, items .length) === 'jpg' || items.substring(items .lastIndexOf('\.') + 1, items .length) === 'gif' || items.substring(items .lastIndexOf('\.') + 1, items .length) === 'png'"
                         v-lazy="items">
                    <div v-else style="background: #efefef">
                      <video :src="items" v-lazy="items"></video>
                      <img src="../img/videomodal.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="project_bottom">
                  <ul>
                    <li>
                      <img src="../img/praise.jpg" alt="">
                      <span>{{item.praiseCount}}</span>
                    </li>
                    <li class="center">
                      <img src="../img/comment.jpg" alt="">
                      <span>{{item.commentCount}}</span>
                    </li>
                    <li>
                      <img src="../img/share.jpg" alt="">
                      <span>{{item.shareCount}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            没有找到更多了
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

  /****原首页 现项目展示**********/

  import xheader from "../components/public/xheader"
  import {MessageBox, Toast, Indicator, Lazyload} from "mint-ui"


  export default {
    name: "ProjectDisplay",
    components: {
      xheader
    },
    data() {
      return {
        HeaderSwiperOption: {
          speed: 300,          // 动画速度
          slidesPerView: 4,     // 一页展示数量
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
        },
        swiperSlides: [
          {
            laber: "最新",
            value: null,
          },
          {
            laber: "教育培训",
            value: "45ff40bb26bd43b09827e9d5b0867160",
          },
          {
            laber: "医疗健康",
            value: "c6310b0b81c84b8a9590968fbbef4668",
          },
          {
            laber: "文化艺术",
            value: "3279d98af38e4c5da55ffafdd64189e2",
          },
        ],
        swiperSlidesIndex: 0,     //被选中的 index
        CarouselSwiperOption: {
          speed: 300,          // 动画速度
          autoplay: {
            delay: 3000
          },
          loop: true
        },
        carousellist: [],        //轮播列表
        communityHttpData: {
          categoryId: null,
          page: "1",
          pageSize: "20"
        },
        searchKeyWord: "",
      }
    },
    methods: {
      // 切换分类
      changeSwiper(index) {
        this.swiperSlidesIndex = index
        this.communityHttpData.categoryId = this.swiperSlides[index].value
        this.communityData()
      },

      // 查数据
      communityData() {
        let $self = this

        $self.$store.dispatch("_communityData", $self.communityHttpData)
          .then((response) => {
            if (response.success) {
              $self.$store.commit("SET_communityDataList", response.result)
            } else {
              Toast(response.result)
            }
          })
      },
      //加关注
      addisConcern(concernId, item) {
        this.isConcern(concernId, item)
      },

      //取消关注
      removeisConcern(concernId, name, item) {
        let $self = this
        MessageBox.confirm('确定取消' + name + '的关注？').then(action => {
          if (action === $self.$result.MessageBoxAction) {
            this.isConcern(concernId, item)
          }
        });
      },
      //关注方法
      isConcern(concernId, item) {
        let $self = this;
        $self.$store.dispatch("_isConcern", item)
          .then(response => {
            if (response.success) {
              if (item.isConcern === '1') {
                item.isConcern = '0'
              } else {
                item.isConcern = '1'
              }
            } else {
              Toast(response.result)
            }
          })
      },

      //  搜索
      search() {
        let $self = this
        $self.$store.dispatch("_communitySearch", {searchKeyWord: $self.searchKeyWord})
          .then((response) => {
            if (response.success) {
              $self.$store.commit("SET_communityDataList", response.result.resultList)
            } else {
              Toast(response.result)
            }
          })
      },

      //轮播
      bannerObtain() {
        let $self = this;
        $self.$store.dispatch("_bannerObtain")
          .then(response => {
            if (response.success) {
              $self.$store.commit("SET_carouselList", response.result)
            } else {
              Toast(response.result)
            }
          })
      },

      /**
       *
       * 轮播操作
       *
       * ctype== 1
       *项目跳转
       * ctype = 2
       * 外部链接
       *
       * */
      TransmissionOperation(item) {
        let $self = this;
        if (item.ctype === "1") {
          $self.$router.push({
            name: "ProjectDetails",
            params: {ProjectId: item.theId, ProjectType: item.remarks}
          });
        } else if (item.ctype === "2") {
          window.open("http://" + item.content)
        }
      }
    },
    created() {

      this.communityData();
      this.bannerObtain()

    }
  }
</script>


<style scoped lang="scss">
  .page {
    .community_header {
      width: 100%;
      padding: 10px 0 20px 0;
      background: #eee;
      div {
        position: relative;
        input {
          width: 90%;
          margin: 0 5%;
          height: 30px;
          line-height: 30px;
          padding-left: 35px;
          border: 1px solid #5a5a5a;
          border-radius: 5px;
        }
        img {
          width: 28px;
          height: 28px;
          position: absolute;
          top: 0;
          left: 5%;
          margin-top: 1px;
          margin-left: 5px;
        }
      }

    }
    .community_section {
      text-align: center;
      .section_nav {
        padding: 10px;
        .swiper-wrapper {
          .swiper-slide {
            padding: 10px 0px;
            font-size: 12px;
          }
          & .active {
            border-bottom: 1px solid #66b1ff;
          }
        }
      }
      .section_Carousel {
        padding: 10px;
        img {
          width: 100%;
          height: 200px;
          border-radius: 5px;
        }
      }
      .section_section {
        .section_list {
          background: #eee;
          .section_item {
            background: #fff;
            margin-bottom: 20px;
            div {
            }
            .project_top {
              display: flex;
              padding: 10px;
              div {
                text-align: left;
                flex: 1;
                line-height: 24px;
                h4 {
                  font-size: 14px;
                }
                p {
                  font-size: 12px;
                  color: #ddd;
                }
              }
              h6 {
                margin-right: 10px;
              }
              span {
                float: right;
                border: 1px solid #dd6161;
                width: 60px;
                height: 30px;
                line-height: 30px;
                color: #dd6161;
                text-align: center;
              }
              img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
              }
            }
            .project_section {
              padding: 10px;
              p {
                text-align: left;
                line-height: 22px;
                display: -webkit-box;
                word-break: break-all;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              div {
                margin-top: 5px;
                display: flex;
                flex-wrap: wrap;
                img {
                  /*flex: 1;*/
                  width: 100px;
                  height: 100px;
                  margin: 4px;
                }
                div {
                  position: relative;
                  video {
                    /*flex: 1;*/
                    width: 100px;
                    height: 100px;
                    margin: 4px;
                  }
                  img {
                    position: absolute;
                    z-index: 99;
                    width: 60px;
                    height: 60px;
                    margin: 24px;
                  }
                }
              }
            }
            .project_bottom {
              padding: 10px;
              ul {
                background: #fff;
                padding: 10px;
                display: flex;
                text-align: left;
                border-top: 1px solid #5a5a5a;
                li {
                  img {
                    width: 20px;
                    height: 20px;
                  }
                  span {

                  }
                }
                & .center {
                  flex: 1;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
