import Vue from "vue"
import Vuex from "vuex"
import login from "./modules/login"
import chat from "./modules/chat"
import community from "./modules/community"
import group from "./modules/group"
import IOT from "./modules/IOT"
import cordovaPlugin from "./modules/cordovaPlugin"
import DB from "./modules/DB"
import test from "./modules/test"

// 商城
import Shop from "./modules/Shop"


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login,
    chat,
    community,
    group,
    IOT,
    cordovaPlugin,
    DB,
    Shop,
    test
  }
});

export default store
