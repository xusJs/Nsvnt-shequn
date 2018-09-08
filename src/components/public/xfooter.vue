<template>
  <div class="footer">
    <ul>
      <li @click="changehomename(1)">
        <img v-if="$store.state.community.HomeIndex===1" src="../../img/home.png" alt="">
        <img v-else src="../../img/home2.png" alt="">
        <p>首页</p>
      </li>
      <li @click="changehomename(2)">
        <img v-if="$store.state.community.HomeIndex===2" src="../../img/Contacts.png" alt="">
        <img v-else src="../../img/Contacts2.png" alt="">
        <p>联系人</p>
      </li>
      <li class="center">
        <div @click="open">
          +
        </div>
        <ol v-if="isopen">
          <li class="newroom" @click="$router.push({name:'addR'})">
            <h6>
              <img src="../../img/group.png" alt="">
              <p>建群</p>
            </h6>
          </li>
          <li class="addroom" @click="$router.push({name:'ApplicationGroup'})">
            <h6>
              <img src="../../img/addgroup.png" alt="">
              <p>加群</p>
            </h6>
          </li>
          <li class="send" @click="$router.push({name:'ReleaseProject'})">
            <h6>
              <img src="../../img/send.png" alt="">
              <p>发布</p>
            </h6>
          </li>
        </ol>
      </li>
      <li @click="changehomename(3)">
        <img v-if="$store.state.community.HomeIndex===3" src="../../img/find.png" alt="">
        <img v-else src="../../img/find2.png" alt="">
        <p>发现</p>
      </li>
      <li @click="changehomename(4)">
        <img v-if="$store.state.community.HomeIndex===4" src="../../img/Brandcenter.png" alt="">
        <img v-else src="../../img/Brandcenter2.png" alt="">
        <p>品牌中心</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "xfooter",
    data() {
      return {
        isopen: false,
      }
    },
    methods: {
      open() {
        this.isopen = !this.isopen
      },
      changehomename(index) {

        let $self = this;

        switch (index) {
          case 1 :
            $self.$store.commit("SET_homeName", "首页")
            $self.$router.replace({name: 'Community'})
            break;
          case 2 :
            $self.$store.commit("SET_homeName", "联系人")
            $self.$router.replace({name: "Contacts"})
            break;
          case 3 :
            $self.$store.commit("SET_homeName", "发现")
            $self.$router.replace({name: "Find"})
            break;
          case 4 :
            $self.$store.commit("SET_homeName", "品牌中心")
            $self.$router.replace({name: "Personal"})
            break;
        }


        $self.$store.commit("SET_HomeIndex", index)
      }
    },
    created() {
      let names = this.$router.currentRoute.name
      let $self = this
      switch (names) {
        case 'Community' :
          $self.$store.commit("SET_homeName", "首页")
          $self.$store.commit("SET_HomeIndex", 1)
          break;
        case 'Contacts' :
          $self.$store.commit("SET_homeName", "联系人")
          $self.$store.commit("SET_HomeIndex", 2)
          break;
        case 'Find' :
          $self.$store.commit("SET_homeName", "发现")
          $self.$store.commit("SET_HomeIndex", 3)
          break;
        case 'Personal' :
          $self.$store.commit("SET_homeName", "品牌中心")
          $self.$store.commit("SET_HomeIndex", 4)
          break;
      }
      $self.$router.replace({name: names})
    }
  }
</script>

<style scoped lang="scss">
  .footer {
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
