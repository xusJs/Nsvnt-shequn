<template>
  <div class="page">
    <xheader is-left="true" :title="details.title"></xheader>

    <div class="box">
      <div class="details_img">
        <swiper :options="SwiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in details.picturePath" :key="item+index">
            <div
              v-if="item.substring(item .lastIndexOf('\.') + 1, item .length) === 'jpg' || item.substring(item .lastIndexOf('\.') + 1, item .length) === 'gif' || item.substring(item .lastIndexOf('\.') + 1, item .length) === 'png'">
              <img :src="item" alt="">
            </div>
            <div v-else class="video_box">
              <video :src="item" preload controls></video>
              <!--<img src="../img/videomodal.png" alt="">-->
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="details_details">
        <div class="list_one">
          <div class="center">
            <b>{{details.title}}</b>
          </div>
          <div>
            <span>简介</span>
          </div>
          <div>
            <span><img src="../img/right_icon.jpg" alt=""></span>
          </div>
        </div>
        <div class="list_two">
          <ul>
            <li class="center">
              <img src="../img/videomodal.png" alt="">
              <span>播放{{details.visitCount}}次</span>
            </li>
            <li @click="Praise">
              <img src="../img/praise.png" alt="">
              <span>{{details.praiseCount}}</span>
            </li>
            <li>
              <img src="../img/comment.png" alt="">
              <span>{{details.commentCount}}</span>
            </li>
            <li @click="sharePopupVisible = !sharePopupVisible">
              <img src="../img/share.png" alt="">
              <span>{{details.shareCount}}</span>
            </li>
          </ul>
        </div>
        <div class="list_three" @click="PopupVisible=!PopupVisible">
          <div class="center">
            视频评价（{{details.evaluateCount}}）
          </div>
          <div>
            <img src="../img/evaluate_star.png" alt="" v-for="(item,index) in evaluateScoreList" :key="item+index"
                 v-if="item<=parseInt(details.evaluateScore)">
            <img src="../img/evaluate_star_on.png" alt="" v-for="(item,index) in evaluateScoreList"
                 :key="index + item +'s'" v-if="item<=(5-parseInt(details.evaluateScore))">
          </div>
        </div>
      </div>
      <div class="comment_details">
        <ul class="comment_list" v-if="commentList.length">
          <li class="comment_item" v-for="(items,indexs) in commentList" :key="items+indexs">
            <div class="headers">
              <div>
                <img :src="items.headPortrait" alt="" v-lazy="items.headPortrait">
              </div>
              <div class="center">
                <h4>
                  {{items.realName}}
                </h4>
                <p>
                  {{items.createDate/1000 | timeYearFilter}}
                </p>
              </div>
            </div>
            <div class="content">
              {{items.comment}}
            </div>
          </li>
        </ul>
        <div v-else>
          还没有人评论
        </div>
      </div>

      <!--评价项目-->
      <mt-popup
        v-model="PopupVisible"
        popup-transition="popup-fade"
        class="popupModal"
      >
        <div>
          <p>为本项目做个评价吧</p>
          <ul class="popupList">
            <li class="popupItem" v-for="(item,index) in popupItemList" :key="index+'z'" @click="changeEvaluate(index)">
              <img src="../img/evaluate_star.png" alt="" v-if=" index<=nowPopupIndex">
              <img src="../img/evaluate_star_on.png" alt="" v-else>
            </li>
          </ul>
        </div>
        <div class="btn" @click="evaluate">
          确定
        </div>
      </mt-popup>

      <!--分享popup-->
      <mt-popup
        v-model="sharePopupVisible"
        position="bottom"
        popup-transition="popup-fade"
        class="popupModal"
      >

        <!--     <social-sharing url="https://vuejs.org/"
                             title="The Progressive JavaScript Framework"
                             description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                             quote="Vue is a progressive framework for building user interfaces."
                             hashtags="vuejs,javascript,framework"
                             twitter-user="vuejs"
                             inline-template>
               <div>
                 <network network="email">
                   <i class="fa fa-envelope"></i> Email
                 </network>
                 <network network="facebook">
                   <i class="fa fa-facebook"></i> Facebook
                 </network>
                 <network network="googleplus">
                   <i class="fa fa-google-plus"></i> Google +
                 </network>
                 <network network="line">
                   <i class="fa fa-line"></i> Line
                 </network>
                 <network network="linkedin">
                   <i class="fa fa-linkedin"></i> LinkedIn
                 </network>
                 <network network="odnoklassniki">
                   <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                 </network>
                 <network network="pinterest">
                   <i class="fa fa-pinterest"></i> Pinterest
                 </network>
                 <network network="reddit">
                   <i class="fa fa-reddit"></i> Reddit
                 </network>
                 <network network="skype">
                   <i class="fa fa-skype"></i> Skype
                 </network>
                 <network network="sms">
                   <i class="fa fa-commenting-o"></i> SMS
                 </network>
                 <network network="telegram">
                   <i class="fa fa-telegram"></i> Telegram
                 </network>
                 <network network="twitter">
                   <i class="fa fa-twitter"></i> Twitter
                 </network>
                 <network network="vk">
                   <i class="fa fa-vk"></i> VKontakte
                 </network>
                 <network network="weibo">
                   <i class="fa fa-weibo"></i> Weibo
                 </network>
                 <network network="whatsapp">
                   <i class="fa fa-whatsapp"></i> Whatsapp
                 </network>
               </div>
             </social-sharing>-->
        <!--<h3>分享至：</h3>-->
        <ul class="share_list">
          <li class="share_item" @click="share(0)">
            <div><img src="../img/icon_share_wb.png" alt=""></div>
            <div>新浪微博</div>
          </li>
          <li class="share_item" @click="share(1)">
            <div><img src="../img/icon_share_qzone.png" alt=""></div>
            <div>QQ空间</div>
          </li>
        </ul>
      </mt-popup>


    </div>


    <div class="footer">
      <div>
        <input type="text" placeholder="我也说两句" v-model="comment" @keyup.enter="ReplyComment">
        <span @click="ReplyComment">发送</span>
      </div>
    </div>
  </div>

</template>

<script>
  import xheader from "../components/public/xheader"
  import Qs from "qs"
  import md5 from "js-md5"
  import {Indicator, MessageBox, Toast, Popup} from "mint-ui"

  export default {
    name: "project-details",
    components: {
      xheader
    },
    data() {
      return {
        details: {},   // 项目详情
        SwiperOption: {
          speed: 300
        },   //轮播配置
        comment: "",     // 回复内容
        commentList: [],   //回复列表
        evaluateScoreList: [1, 2, 3, 4, 5],    // 评论星级展示列表
        PopupVisible: false,       // 评价视频 控制器
        popupItemList: [],           //评论项目星级列表
        nowPopupIndex: 4,           //评价星级 的值
        sharePopupVisible: false,   //分享 控制器

      }
    },
    methods: {
      //   查询项目详情
      findProjectDetails() {
        let $self = this
        if ($self.$route.params.ProjectType === "1") {
          $self.$store.dispatch("_PfindProjectDetails", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // alert( "个人项目详情："+JSON.stringify(res))
              if (res.success) {
                $self.details = res.result
                $self.findProjectComment()
              } else {
                Toast(res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "2") {

          $self.$store.dispatch("_CfindProjectDetails", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // console.log(res)
              // alert( "企业项目详情："+JSON.stringify(res))
              if (res.success) {
                $self.details = res.result
                $self.findProjectComment()
              } else {
                Toast(res.result)
              }
            })

        } else if ($self.$route.params.ProjectType === "3") {

          $self.$store.dispatch("_OfindProjectDetails", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // alert( "社团项目详情："+JSON.stringify(res))
              if (res.success) {
                $self.details = res.result
                $self.findProjectComment()
              } else {
                Toast(res.result)
              }
            })
        }
      },

      //  查询项目评论列表
      findProjectComment() {
        let $self = this

        if ($self.$route.params.ProjectType === "1") {
          $self.$store.dispatch("_PfindProjectComment", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // alert( "个人项目评论："+JSON.stringify(res))
              if (res.success) {
                $self.commentList = res.result.comtList
              } else {
                Toast(res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "2") {

          $self.$store.dispatch("_CfindProjectComment", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // alert( "企业项目评论："+JSON.stringify(res))
              if (res.success) {
                $self.commentList = res.result.comtList
              } else {
                Toast(res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "3") {
          $self.$store.dispatch("_OfindProjectComment", {ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              // alert( "社团项目评论："+JSON.stringify(res))
              if (res.success) {
                $self.commentList = res.result.comtList
              } else {
                Toast(res.result)
              }
            })
        }
      },

      // 评论
      ReplyComment() {
        let $self = this
        Indicator.open('发送中...')
        if ($self.$route.params.ProjectType === "1") {
          $self.$store.dispatch("_PReplyComment", {comment: $self.comment, ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              Indicator.close()
              if (res.success) {
                $self.findProjectComment()
                $self.comment = ""
              } else {
                MessageBox("提示", res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "2") {
          $self.$store.dispatch("_CReplyComment", {comment: $self.comment, ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              Indicator.close()
              if (res.success) {
                $self.findProjectComment()
                $self.comment = ""
              } else {
                MessageBox("提示", res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "3") {
          $self.$store.dispatch("_OReplyComment", {comment: $self.comment, ProjectId: $self.$route.params.ProjectId})
            .then((res) => {
              Indicator.close()
              if (res.success) {
                $self.findProjectComment()
                $self.comment = ""
              } else {
                MessageBox("提示", res.result)
              }
            })
        }
      },

      //  点赞
      Praise() {
        let $self = this
        if ($self.$route.params.ProjectType === "1") {
          $self.$store.dispatch("_PPraise", {ProjectId: $self.$route.params.ProjectId})
            .then(res => {
              if (res.success) {
                if ($self.details.isPraise === "1") {
                  $self.details.praiseCount += 1
                  $self.details.isPraise = "0"
                } else {
                  $self.details.praiseCount -= 1
                  $self.details.isPraise = "1"
                }
              } else {
                Toast(res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "2") {
          $self.$store.dispatch("_CPraise", {ProjectId: $self.$route.params.ProjectId})
            .then(res => {
              if (res.success) {
                if ($self.details.isPraise === "1") {
                  $self.details.praiseCount += 1
                  $self.details.isPraise = "0"
                } else {
                  $self.details.praiseCount -= 1
                  $self.details.isPraise = "1"
                }
              } else {
                Toast(res.result)
              }
            })
        } else if ($self.$route.params.ProjectType === "3") {
          $self.$store.dispatch("_OPraise", {ProjectId: $self.$route.params.ProjectId})
            .then(res => {
              if (res.success) {
                if ($self.details.isPraise === "1") {
                  $self.details.praiseCount += 1
                  $self.details.isPraise = "0"
                } else {
                  $self.details.praiseCount -= 1
                  $self.details.isPraise = "1"
                }
              } else {
                Toast(res.result)
              }
            })
        }
      },

      //切换评价星级
      changeEvaluate(index) {
        // console.log(index)
        this.nowPopupIndex = index
      },

      // 评价项目
      evaluate(index) {
        let $self = this
        let timestamp = Date.parse(new Date())

        if ($self.$route.params.ProjectType === "1") {
          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "6",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify({
              score: $self.nowPopupIndex + 1,
              content: ""
            })
          })
          $self.$http.post($self.$config.bizserverApi + "/peproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.PopupVisible = !$self.PopupVisible
              } else {
                $self.PopupVisible = !$self.PopupVisible
                Toast(res.data.result)
              }


            })

        } else if ($self.$route.params.ProjectType === "2") {


          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "6",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify({
              score: $self.nowPopupIndex + 1,
              content: ""
            })
          })
          $self.$http.post($self.$config.bizserverApi + "/coproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.PopupVisible = !$self.PopupVisible
              } else {
                $self.PopupVisible = !$self.PopupVisible
                Toast(res.data.result)
              }


            })

        } else if ($self.$route.params.ProjectType === "3") {
          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "6",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify({
              score: $self.nowPopupIndex + 1,
              content: ""
            })
          })
          $self.$http.post($self.$config.bizserverApi + "/orproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.PopupVisible = !$self.PopupVisible
              } else {
                $self.PopupVisible = !$self.PopupVisible
                Toast(res.data.result)
              }


            })
        }


      },

      //  分享
      share(index) {
        let $self = this
        let timestamp = Date.parse(new Date())


        if ($self.$route.params.ProjectType === "1") {

          let title = "分享标题"
          let url = window.location.href;
          let datas = {channel: "分享渠道", url: "分享URL", description: "分享描述"}

          if (index === 0) {

            // let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;

            datas.channel = "sina"

            let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
          } else if (index === 1) {
            datas.channel = "Qzone"
            let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url;
            // let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
          }

          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "5",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify(datas)
          })
          $self.$http.post($self.$config.bizserverApi + "/peproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.sharePopupVisible = !$self.sharePopupVisible
              } else {
                $self.sharePopupVisible = !$self.sharePopupVisible
                Toast(res.data.result)
              }


            })


        } else if ($self.$route.params.ProjectType === "2") {
          let title = "分享标题"
          let url = window.location.href;
          let datas = {channel: "分享渠道", url: "分享URL", description: "分享描述"}

          if (index === 0) {

            // let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;

            datas.channel = "sina"

            let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
          } else if (index === 1) {
            datas.channel = "Qzone"
            let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url;
            // let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
          }

          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "5",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify(datas)
          })
          $self.$http.post($self.$config.bizserverApi + "/coproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.sharePopupVisible = !$self.sharePopupVisible
              } else {
                $self.sharePopupVisible = !$self.sharePopupVisible
                Toast(res.data.result)
              }


            })


        } else if ($self.$route.params.ProjectType === "3") {

          let title = "分享标题"
          let url = window.location.href;
          let datas = {channel: "分享渠道", url: "分享URL", description: "分享描述"}

          if (index === 0) {

            // let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;

            datas.channel = "sina"

            let sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
          } else if (index === 1) {
            datas.channel = "Qzone"
            let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url;
            // let shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
          }

          let data = Qs.stringify({
            userId: $self.$store.state.login.userId,
            token: $self.$store.state.login.token,
            comm: "5",
            timestamp: timestamp + "",
            proId: $self.$route.params.ProjectId,
            sign: md5($self.$store.state.login.token + timestamp),
            data: JSON.stringify(datas)
          })
          $self.$http.post($self.$config.bizserverApi + "/orproservice/proaction", data)
            .then(res => {
              // console.log(res)
              if (res.data.success) {
                $self.sharePopupVisible = !$self.sharePopupVisible
              } else {
                $self.sharePopupVisible = !$self.sharePopupVisible
                Toast(res.data.result)
              }
            })
        }
      },
    },
    created() {
      this.findProjectDetails()
      this.popupItemList.length = 5
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .details_img {
      div {
        img {
          width: 100%;
          height: 300px;
        }
        video {
          width: 100%;
          height: 300px;
        }
      }
      & .video_box {
        position: relative;
        img {
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          margin-left: -40px;
          margin-top: -40px;
          z-index: 99;
        }
      }
    }
    .details_details {
      .list_one {
        display: flex;
        padding: 10px;
        .center {
          flex: 1;
          font-size: 18px;
        }
        div {
          font-size: 16px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .list_two {
        padding: 0 10px;
        ul {
          display: flex;
          li {
            padding: 0 5px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          & .center {
            flex: 1;
          }
        }
      }
      .list_three {
        display: flex;
        padding: 0px 10px;
        margin: 10px 0;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
        div {

        }
        & .center {
          flex: 1;
          color: #fff;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .comment_details {
      padding: 0px 10px;
      .comment_list {
        .comment_item {
          padding-bottom: 20px;
          border-bottom: 1px solid #ccc;
          .headers {
            display: flex;
            div {
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
              padding: 10px;
            }

            & .center {
              flex: 1;
              line-height: 28px;
              h4 {
                font-size: 16px;
                color: #333;
              }
              p {
                color: #999;
              }
            }
          }
          .content {
            padding-left: 80px;
            font-size: 16px;
            color: #333;
            word-wrap: break-word;

          }
        }
      }
    }
  }

  .footer {
    div {
      background: #ddd;
      display: flex;
      input {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        margin: 10px 2% 10px 2%;
        font-size: 16px;
        border: 1px solid #aaa;
        flex: 1;
      }
      span {
        display: inline-block;
        background: #66b1ff;
        border-radius: 5px;
        color: #fff;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 10px 2% 10px 1%;
      }
    }
  }

  .popupModal {
    padding: 20px;
    width: 100%;
    height: 200px;
    background: #fff;
    .popupList {
      display: flex;
      text-align: center;
      padding-top: 20px;
      width: 150px;
      position: relative;
      left: 50%;
      margin-left: -75px;
      .popupItem {
        /*flex: 1;*/
        width: 30px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    p {
      text-align: center;
      font-size: 16px;
    }
    .btn {
      margin: 0 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#65ddf8), to(#00aaef));
      color: #fff;
      position: relative;
      bottom: -30px;
      font-size: 18px;
    }

  }

  .share_list {
    display: flex;
    .share_item {
      width: 20%;
      text-align: center;
      img {
        width: 60%;
      }
    }
  }
</style>
