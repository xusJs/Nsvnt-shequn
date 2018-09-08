<template>
  <div class="page">
    <xheader is-left="true" title="个人设置"></xheader>
    <div class="box">
      <header>
        <ul class="xlist">
          <li class="xitem">
            <div>
              <img :src="$store.state.login.headPortrait" alt="">
            </div>
            <div class="center"></div>
            <div @click="otherData.ImgVisible = !otherData.ImgVisible">
              更改头像
              <img src="../img/right_icon.jpg" alt="">
            </div>
          </li>
        </ul>
        <ul class="xlist">
          <li class="xitem">
            <div class="center">用户名</div>
            <div>
              {{$store.state.login.realName}}
              <img src="../img/right_icon.jpg" alt="">
            </div>
          </li>
          <li class="xitem">
            <div class="center">手机号</div>
            <div>
              {{$store.state.login.phone}}
              <img src="../img/right_icon.jpg" alt="">
            </div>
          </li>
        </ul>
        <ul class="xlist">
          <li class="xitem" @click="$router.push({name:'AboutMe'})">
            <div>
              关于我们
            </div>
            <div class="center"></div>
            <div>
              <img src="../img/right_icon.png" alt="">
            </div>
          </li>
        </ul>
      </header>
    </div>
    <div class="footer" @click="removeLogin">
      退出登录
    </div>
    <mt-popup
      v-model="otherData.ImgVisible"
      popup-transition="popup-fade"
    >
      <div class="ImgChangeModal">
        <h4 class="title">选择上传的图片</h4>
        <div class="content">
          <ul>
            <li>+</li>
          </ul>
          <!--<input class="addV" name="file" type="file" accept="image/jpeg,image/jpg,image/png,"-->
          <input class="addV" name="file" type="file" accept="image/*"
                 @change="update"/>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>

  import xheader from "../components/public/xheader"
  import {Indicator, MessageBox, Toast} from "mint-ui"

  export default {
    name: "personal-setting",
    data() {
      return {
        otherData: {
          ImgVisible: false
        },
        datas: {},
        ImgUrl: ""
      }
    },
    components: {
      xheader
    },
    methods: {
      removeLogin() {
        MessageBox.confirm('确认退出登录吗？')
          .then(action => {
            if (action === 'confirm') {
              localStorage.removeItem("UserLoginMsg");
              this.$store.commit("clearLogin");
              this.$router.replace({name: 'login'});
            }
          })
      },
      setEntryId() {
        let $self = this
        $self.$store.dispatch("GetEntryId")
          .then(response => {
            if (response.success) {
              $self.datas = response.result
            } else {
              Toast(response.errorCode)
            }
          })
      },
      update(e) {
        Indicator.open("上传中");
        let $self = this;
        let file = e.target.files[0];
        let param = new FormData()  // 创建form对象
        param.append('uploadFileName', file, file.name)
        param.append('entryid', $self.datas.entryid,)
        param.append('timestamp', $self.datas.timestamp,)
        param.append('sign', $self.datas.sign,)
        $self.$http.post($self.$config.flieserverApi + '/operate/cosfileuploadsync', param)
          .then(response => {
            Indicator.close();
            if (response.data.success) {
              $self.ImgUrl = response.data.result
              $self.changeHeadPortrait()
            } else {
              MessageBox("提示", response.data.result + ",或换一张图片试试？")
            }
          })
          .catch(() => {
            Indicator.close();
            Toast('上传失败，换一张再试试')
          })
      },
      changeHeadPortrait() {
        let $self = this;
        $self.$store.dispatch("MyReviseHead", {headPortrait: $self.ImgUrl})
          .then(res => {
            if (res.success) {
              $self.$store.commit("SET_headPortrait", $self.ImgUrl)
              $self.otherData.ImgVisible = false
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    created() {
      this.setEntryId()
    }
  }
</script>

<style scoped lang="scss">

  .footer {
    height: 60px;
    line-height: 60px;
    background: #ddd;
    text-align: center;
    color: #fff;
    font-size: 18px;
    letter-spacing: 5px;
  }

  .ImgChangeModal {
    padding: 50px;
    width: 100%;
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

</style>
