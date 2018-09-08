import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import store from "./store/index2"
// import store from "./store/index"
import VueI18n from "vue-i18n"
import lang from "./Lang/index"
import mintui from "mint-ui"
import "mint-ui/lib/style.css"

import axios from "axios"
import config from "./config/index"
import result from "./config/result"


/**
 *
 * 视频 直播 播放
 * */

import VideoPlayer from 'vue-video-player'

Vue.use(VideoPlayer);

require('videojs-contrib-hls/dist/videojs-contrib-hls');
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


// 过滤器
import filter from './filter/index'

//Vue-Awesome-Swiper 插件  滑动

import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.use(elementUi)
Vue.use(mintui)

Vue.use(VueI18n)
const i18n = new VueI18n(lang)

Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.prototype.$result = result


//  文件保存插件
window.FS = require('./assets/file-saver/FileSaver.min.js');


// 下拉
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)


/****百度 地图**/

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'r4uGwGDohrhw49mohZoqwc8wA2wU7VFV'
})


/**
 *
 * cordova 插件系列管理
 *
 * */

import VueCordova from 'vue-cordova'

Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})


// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}



/*********** 有赞 ui库*******************/
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import {Lazyload} from "vant"

Vue.use(Vant);
Vue.use(Lazyload);





Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
