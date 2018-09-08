<template>
  <div>
    <header>
      <img src="../../../img/header.jpg" alt="">
    </header>
    <nav class="personal_nav" v-if="projectList.orUserInfo !==null ">
      <div class="nav_left">
        <img :src="$store.state.login.headPortrait" alt="">
      </div>
      <div class="nav_center">
        <div>
          <b>{{$store.state.login.realName}} /</b>
          <span>{{projectList.orUserInfo.named}}</span>
        </div>
      </div>
      <div class="nav_right"></div>
    </nav>
    <nav class="personal_nav" v-else style="color: #fff;text-align: center;"
         @click="$router.push({name:'ApplicationClub'})">
      还不是社团组织 ？？？ 点我加入！！！
    </nav>

    <div class="section_section" v-if="projectList.baseList.length">
      <ul class="section_list">
        <li class="section_item" v-for="(item,index) in projectList.baseList" :key="item+index">
          <div class="project_top">
            <h6 @click="$router.push({name:'Personalinformation',params:{uid:item.userId}})">
              <img :src="$store.state.login.headPortrait" alt="">
            </h6>
            <div>
              <h4>{{$store.state.realName}}</h4>
              <p>{{projectList.orUserInfo.named}}</p>
            </div>
            <!--   <span> + 关注</span>-->
          </div>
          <div class="project_section"
               @click="$router.push({name:'ProjectDetails',params:{ProjectId:item.id,ProjectType:'3'}})">
            <p>{{item.title}}</p>
            <div>
              <img :src="items" alt="" v-for="(items,indexs) in item.picturePath" :key="items+indexs">
            </div>
          </div>
          <div class="project_bottom">
            <ul>
              <li>
                <img src="../../../img/praise.png" alt="">
                <span>{{item.praiseCount}}</span>
              </li>
              <li class="center">
                <img src="../../../img/comment.png" alt="">
                <span>{{item.commentCount}}</span>
              </li>
              <li>
                <img src="../../../img/share.png" alt="">
                <span>{{item.shareCount}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-else style="text-align: center;">
      还没有社团项目
    </div>
  </div>
</template>

<script>
  import Qs from "qs"
  import md5 from "js-md5"
  import {Toast} from "mint-ui"


  export default {
    name: "association",
    data() {
      return {
        projectList: {
          baseList: [],
          orUserInfo: {
            named: ""
          }
        }
      }
    },
    methods: {
      MyEnterpriseProject() {
        let $self = this
     $self.$store.dispatch("_MyOEnterpriseProject")
          .then((res) => {
            if (res.success) {
              $self.projectList = res.result
            } else {
              Toast(res.result)
            }
          })
      }
    },
    created() {
      this.MyEnterpriseProject()
    }
  }
</script>

<style scoped lang="scss">

  header {
    margin-top: 10px;
    img {
      width: 100%;
    }
  }

  .personal_nav {
    margin: 20px 0;
    height: 100px;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
    line-height: 100px;
    display: flex;
    .nav_left {
      margin: 0 20px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .nav_center {
      flex: 1;
      b {
        color: #fff;
        font-size: 20px;
        font-weight: normal;
      }
      span {
        color: #fff;
        font-size: 14px;
      }
    }
    .nav_right {
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
                width: 30px;
                height: 30px;
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
</style>
