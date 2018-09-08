<template>
  <div class="page">
    <xheader is-left="true" title="寻找"></xheader>
    <div class="box">
      <div class="uploadHeader">
        <div class="header_box">
          <input class="addV" name="file" type="file" accept="image/*"
                 @change="update"/>
        </div>
        <p>上传您需要寻找的人物图片</p>
        <p>
          <button class="btn" @click="IOTSearchPopup = true"> 查看状态</button>
        </p>

        <div class="imgBox" v-if="ImgUrl!==''">
          <img :src="ImgUrl" alt="">
        </div>

      </div>
    </div>
    <div class="xfooter" @click="sendSearch">
      发 送
    </div>


    <!--  查找状态  -->
    <mt-popup
      v-model="IOTSearchPopup"
      popup-transition="popup-fade">

      <div class="searchBox">
        <ul class="xlist">
          <li class="xitem">
            <div>
              <span>状态</span>
            </div>
            <div class="center">
              <span>{{$store.state.IOT.IOTSearchType.type}}</span>
            </div>
          </li>
          <li class="xitem qrCode" v-if="$store.state.IOT.IOTSearchType.type==='寻找结束'">
            <div>
              <span>结果</span>
            </div>
            <div class="center">
              <span><img :src="$store.state.IOT.IOTSearchType.result" alt=""></span>
            </div>
          </li>
          <li class="xitem" v-else>
            <div>
              <span>结果</span>
            </div>
            <div class="center">
              <span>{{$store.state.IOT.IOTSearchType.result}}</span>
            </div>
          </li>
        </ul>
      </div>

    </mt-popup>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import {Toast} from "mint-ui"


  export default {
    name: "IOTSearch",
    components: {
      xheader
    },
    data() {
      return {
        datas: {},    // 获取 EntryId 后的 返回值
        ImgUrl: "",   // 上传图片成功后 获取的url
        IOTSearchPopup: false,       /// 状态控制器
      }
    },
    methods: {
      getEntryId() {
        let $self = this
        $self.$store.dispatch("GetEntryId")
          .then(response => {
            if (response.success) {
              $self.datas = response.result
            } else {
              Toast(response.errorCode)
            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      update(e) {
        let $self = this
        let file = e.target.files[0]

        let param = new FormData()  // 创建form对象
        param.append('uploadFileName', file, file.name)
        param.append('entryid', $self.datas.entryid,)
        param.append('timestamp', $self.datas.timestamp,)
        param.append('sign', $self.datas.sign,)
        $self.$http.post($self.$config.flieserverApi + '/operate/cosfileuploadsync', param)
          .then(response => {
            if (response.data.success) {
              $self.ImgUrl = response.data.result
            } else {
              MessageBox("提示", response.data.result + ",或换一张图片试试？")
            }
          })
          .catch(() => {
            Toast('上传失败，换一张再试试')
            JSON.stringify()
          })
      },

      // 发送 寻找
      sendSearch() {
        let $self = this
        let reg = /\S/
        if (reg.test($self.ImgUrl)) {
          // $self.$store.dispatch("_SearchPeople", {devid: this.$store.state.IOT.NowIot.devid, pic: url})
          $self.$store.dispatch("_SearchPeople", {devid: $self.$store.state.IOT.NowIot.devid, pic: $self.ImgUrl})

          $self.IOTSearchPopup = true


        } else {
          Toast('请上传要寻找的人物图片')
        }
      },
    },
    created() {
      this.getEntryId()


    }
  }
</script>

<style scoped lang="scss">
  .uploadHeader {
    .header_box {
      width: 100px;
      height: 100px;
      margin: 10px auto;
      border: 1px solid #ddd;
      .addV {
        z-index: 100;
        width: 100px;
        height: 100px;
        top: 18px;
        left: 20px;
        padding-left: 0;
        opacity: 0;
      }
    }
    p {
      text-align: center;
    }
  }

  .xfooter {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #00aaef;
    color: #fff;
  }

  .imgBox {
    text-align: center;
    padding: 10px;
    img {
      width: 100px;
      height: 150px;
    }
  }

  .searchBox {
    width: 300px;
    height: 500px;
    .xitem {
      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .btn {
    background: #00aaef;
    color: #fff;
    padding: 8px 16px;
  }
</style>
