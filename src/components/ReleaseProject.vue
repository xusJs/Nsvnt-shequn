<template>
  <div class="page">
    <xheader is-left="true" title="发布"></xheader>
    <div class="box">
      <ul class="release_list">
        <li class="release_item">
          <div>
            <h4 class="title">添加视频或图片</h4>
            <div class="content">
              <ul>
                <li>
                  +
                </li>
                <li v-if="releaseData.picturePath.length" v-for="(item,index) in releaseData.picturePath"
                    :key="item+index" @click="delpicturePath(index)">

                  <img :src="item" alt=""
                       v-if="item.substring(item .lastIndexOf('\.') + 1, item .length) === 'jpg' || item.substring(item .lastIndexOf('\.') + 1, item .length) === 'gif' || item.substring(item .lastIndexOf('\.') + 1, item .length) === 'png'">

                  <video :src="item" v-else></video>
                </li>
              </ul>
              <input class="addV" name="file" type="file" accept="image/*,video/mp4"
                     @change="update"/>
            </div>
          </div>
        </li>
        <li class="release_item">
          <div>
            <h4 class="title">选择您的身份</h4>
            <div class="content">
              <select v-model="Ptype">
                <option v-for="(item,index) in PtypeList" :key="item+index" :value="item.ptype">
                  {{conversion(item.ptype)}} -- {{item.named}}
                </option>
              </select>
            </div>
          </div>
        </li>
        <li class="release_item">
          <div>
            <h4 class="title">内容分类</h4>
            <div class="content">
              <select v-model="releaseData.categoryId">
                <option v-for="(item,index) in categoryList" :key="item+index" :value="item.categoryId">
                  {{item.categoryName}}
                </option>
              </select>
            </div>
          </div>
        </li>
        <li class="release_item">
          <div>
            <h4 class="title">添加标题</h4>
            <div class="content">
              <input type="text" placeholder="输入标题名称" v-model="releaseData.title">
            </div>
          </div>
        </li>
        <li class="release_item">
          <div>
            <h4 class="title">内容详情</h4>
            <div class="content">
              <input type="text" placeholder="内容" v-model="releaseData.content">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div @click="releaseproject">
        确认发布
      </div>
    </div>
  </div>
</template>

<script>

  import Qs from "qs"
  import md5 from "js-md5"
  import xheader from "../components/public/xheader"
  import {MessageBox, Toast, Indicator} from "mint-ui"


  export default {
    name: "release-project",
    components: {
      xheader
    },
    data() {
      return {
        categoryList: [
          {
            categoryName: "文化艺术",
            categoryId: "3279d98af38e4c5da55ffafdd64189e2"
          },
          {
            categoryName: "教育培训",
            categoryId: "45ff40bb26bd43b09827e9d5b0867160"
          },
          {
            categoryName: "医疗健康",
            categoryId: "c6310b0b81c84b8a9590968fbbef4668"
          }
        ],
        datas: {},
        releaseData: {
          title: "",
          categoryId: "3279d98af38e4c5da55ffafdd64189e2",
          picturePath: [],
          content: ""
        },
        imgFlie: [],   // 本地存储 图片展示 ？待用
        PtypeList: [],   //身份列表
        Ptype: "1"

      }
    },
    methods: {
      setEntryId() {
        let $self = this
        let timer = Date.parse(new Date())
        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          timestamp: timer,
          sign: md5($self.$store.state.login.token + timer)
        })
        this.$http.post($self.$config.bizserverApi + "/userservice/getfileuploadentrysign", data)
          .then(response => {
            if (response.data.success) {
              $self.datas = response.data.result
            } else {
              MessageBox("提示", response.data.result)
            }
          })
      },
      update(e) {
        Indicator.open("上传中");
        let $self = this
        let file = e.target.files[0]

        let param = new FormData()  // 创建form对象
        param.append('uploadFileName', file, file.name)
        param.append('entryid', $self.datas.entryid)
        param.append('timestamp', $self.datas.timestamp)
        param.append('sign', $self.datas.sign)
        $self.$http.post($self.$config.flieserverApi + '/operate/cosfileuploadsync', param)
          .then(response => {
            Indicator.close()
            if (response.data.success) {
              $self.releaseData.picturePath.push(response.data.result)
            } else {
              MessageBox("提示", response.data.result + ",或换一张图片试试？")
            }
          })
          .catch(() => {
            Indicator.close()
            Toast("上传失败，换一张试试")
          })
      },
      releaseproject() {
        let $self = this
        let timestamp = Date.parse(new Date())

        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          comm: "2",
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp),
          data: JSON.stringify($self.releaseData),
        });

        if ($self.Ptype === "1") {
          $self.$http.post($self.$config.bizserverApi + "/peproservice/proaction", data)
          // $self.$http.post("http://192.168.1.167:8080/nsvntbizserver/coproservice/proaction",data)
            .then((res) => {
              console.log(res)
              if (res.data.success) {
                $self.$router.go(-1)
              } else {
                MessageBox("提示", res.data.result)
              }
            })
        } else if ($self.Ptype === "2") {

          $self.$http.post($self.$config.bizserverApi + "/coproservice/proaction", data)
          // $self.$http.post("http://192.168.1.167:8080/nsvntbizserver/coproservice/proaction",data)
            .then((res) => {
              console.log(res)
              if (res.data.success) {
                $self.$router.go(-1)
              } else {
                MessageBox("提示", res.data.result)
              }
            })
        } else if ($self.Ptype === "3") {
          $self.$http.post($self.$config.bizserverApi + "/orproservice/proaction", data)
          // $self.$http.post("http://192.168.1.167:8080/nsvntbizserver/coproservice/proaction",data)
            .then((res) => {
              console.log(res)
              if (res.data.success) {
                $self.$router.go(-1)
              } else {
                MessageBox("提示", res.data.result)
              }
            })
        }
      },
      delpicturePath(index) {
        let $self = this
        MessageBox.confirm('确定删除这张图片/视频?').then(action => {
          if (action === $self.$result.MessageBoxAction) {
            this.releaseData.picturePath.splice(index, 1)
          }
        });
      },

      //  获取本人身份
      findType() {
        let $self = this
        let timestamp = Date.parse(new Date())
        let data = Qs.stringify({
          userId: $self.$store.state.login.userId,
          token: $self.$store.state.login.token,
          timestamp: timestamp + "",
          sign: md5($self.$store.state.login.token + timestamp)
        })

        $self.$http.post($self.$config.bizserverApi + "/proservice/userquery", data)
          .then(res => {
            if (res.data.success) {
              $self.PtypeList = res.data.result
            } else {
              Toast(res.data.result)
            }


          })


      },

      //  身份的转化
      conversion(ptype) {
        if (ptype === '1') {
          return "个人"
        } else if (ptype === '2') {
          return "企业"
        } else if (ptype === '3') {
          return "社团"
        }
      }

    },
    created() {
      this.setEntryId()
      this.findType()
    }
  }
</script>

<style scoped lang="scss">
  .box {
    background: #eee;
    .release_list {
      .release_item {
        padding-bottom: 20px;
        .title {
          padding-left: 20px;
          font-size: 16px;
          line-height: 36px;
        }
        .content {
          position: relative;
          ul {
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            padding: 18px;
            li {
              width: 100px;
              height: 100px;
              color: #aaa;
              border: 1px solid #aaa;
              font-size: 100px;
              text-align: center;
              line-height: 100px;
              font-weight: 100;
            }
          }
          input {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            font-size: 16px;
          }
          select {
            width: 100%;
            height: 40px;
            line-height: 40px;
            border: 1px transparent;
            padding-left: 20px;
            option {

            }
          }
          .addV {
            position: absolute;
            z-index: 100;
            width: 100px;
            height: 100px;
            top: 18px;
            left: 20px;
            padding-left: 0;
            opacity: 0;
          }
          img {
            width: 90px;
            height: 90px;
            position: relative;
            left: 50%;
            top: 50%;
            margin-left: -98px;
            margin-top: -120px;
          }
          video {
            display: inline-block;
            width: 90px;
            height: 90px;
            position: relative;
            left: 50%;
            /*top: 50%;*/
            top: 10px;
            margin-left: -98px;
            margin-top: -120px;
          }
        }
      }
    }
  }

  .footer {
    div {
      text-align: center;
      height: 50px;
      line-height: 50px;
      background: #fff;
      font-size: 18px;
      border: 1px solid #ddd;
    }
  }
</style>
