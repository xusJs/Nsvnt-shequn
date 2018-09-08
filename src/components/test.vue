<template>
  <div class="FLEX">
    <p>404啦</p>


    <H2 @click="$router.push({name:'Community'})">点我回首页</H2>
  </div>
</template>

<script>


  export default {
    name: 'carrousel',
    data() {
      return {}
    },
    computed: {},
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped lang="scss">

</style>

<!--<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in List" :key="index+item"   @click.native="changeclick(index)">I'm Slide {{item}}</swiper-slide>
    </swiper>
    <swiper :options="swiperOption2" ref="mySwiper2">
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
    </swiper>
  </div>

</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          slidesPerView: 3,
          onTap: function () {
               mySwiper3.slideTo( this.clickedIndex)
          }

        },
        swiperOption2: {
          onSlideChangeStart: function () {
            updateNavPosition()
          }
        },
        List:[1,2,3,4,5,6,7],
        List2:[1,2,3,4,5,6,7]
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      swiper2() {
        return this.$refs.mySwiper2.swiper
      }
    },
    methods:{
      updateNavPosition(){
        $('#swiper-container2 .active-nav').removeClass('active-nav')
        var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');


        if (!activeNav.hasClass('swiper-slide-visible')) {
          console.log(1);
          if (activeNav.index()>mySwiper2.activeIndex) {
            console.log(2);
            var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1
            mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
          }
          else {
            console.log(3);
            mySwiper2.slideTo(activeNav.index())
          }
        }

      },
      changeclick(index){
        console.log(index)
        // console.log(  this.swiper2())
        // console.log(  this.swiper())
        this.swiper2().clickedIndex = index
      },
    },
    mounted() {
    }
  }
</script>-->


<!---->

<!--<template>
  <div>

    <social-sharing url="https://vuejs.org/"
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
    </social-sharing>

  </div>
</template>

<script>

  import Vue from "vue"
  var SocialSharing = require('vue-social-sharing');
  Vue.use(SocialSharing);








</script>-->


<!--
<template>
  <div id="accident">
    <div class="wrapper">
      <i class="icon-pic"></i>相关照片
      <button type="button" @click="change_input()">上传照片</button>
      <form id="addTextForm" @change="setImg($event)">
      </form>
    </div>
    <div id="img-wrapper" @click="deleteImg($event)"></div>
    <P class="btn-wrapper">
      <mt-button type="primary" @click="submit()">提交</mt-button>
    </P>
  </div>
</template>


<script>
  /**
   * 从 file 域获取 本地图片 url
   */
  function getFileUrl(obj) {
    let url;
    url = window.URL.createObjectURL(obj.files.item(0));
    return url;
  }

  export default {
    name: 'accident',
    // 定义数据
    data () {
      return {
        imgNum:4,    //上传的照片数量，可根据实际情况自定义
      }
    },//定义事件
    methods:{
      //根据点击上传按钮触发input
      change_input(){
        let inputArr=$('#addTextForm input');
        let add_inputId='';     //需要被触发的input
        for(let i=0;i<inputArr.length;i++){
          // 根据input的value值判断是否已经选择文件
          if(!inputArr[i].value){          //如果没有选择,获得这个input的ID
            add_inputId=inputArr[i].id;
            break;
          }
        }
        if(add_inputId){                   //如果需要被触发的input ID存在,将对应的input触发
          return  $("#"+add_inputId).click();
        }else{
          alert("最多选择"+this.imgNum+"张图片")
        }
      },
      //当input选择了图片的时候触发,将获得的src赋值到相对应的img
      setImg(e){
        let target=e.target;
        $('#img_'+target.id).attr('src',getFileUrl(e.srcElement));
      },
      //点击图片删除该图片并清除相对的input
      deleteImg(e){
        let target=e.target;
        let inputID='';       //需要清除value的input
        if(target.nodeName=='IMG'){
          target.src='';
          inputID=target.id.replace('img_','');    //获得需要清除value的input
          $('input#'+inputID).val("");
        }
      },
      //提交信息到后台
      submit(){
        $("#addTextForm").ajaxSubmit({
          url: this.$root.api+"/Index/staff_accident/add",
          type: "post",
          data: {
            'total_price':this.price,
            'descript':this.descript,
          },
          success:  (data) => {
            if(data.code==0){
              console.log("提交成功");
              $("#addTextForm input").val('');
              $('div#img-wrapper img').attr('src','');

            }else{
              alert('提交失败');
            }
          }
        });
      }
    },
    //页面加载后执行
    mounted(){
      for(let i=0;i<this.imgNum;i++){
        //生成input框，默认为1
        let my_input = $('<input type="file" name="image" />');   //创建一个input
        my_input.attr('id',i);                           //为创建的input添加id
        $('#addTextForm').append(my_input);                     //将生成的input追加到指定的form
        //生成img，默认为1
        let my_img = $('<img src="">');
        my_img.attr('id', 'img_'+i);
        my_img.css({"max-width":"50%","max-height":"200px"});   //添加样式，由于vue的执行机制，页面加载的时候img标签还没有生成，直接写在style样式会不生效
        $('#img-wrapper').append(my_img);
      }
    },
  }
</script>
-->
