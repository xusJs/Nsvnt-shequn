const cordovaPlugin = {
  state: {

    isListen: false,     // cordova deviceready 事件监听 控制器

    isQrcode: false,   // 是否进行过 扫描二维码
    _badgeNum: "0"      // 当前徽章的数量
  },
  mutations: {
    SET_isQrcode(state, str) {
      state.isQrcode = str
    },
    SET_badgeNum(state, str) {
      state._badgeNum = str
    },
    SET_isListen(state, str) {
      state.isListen = str
    }
  },
  actions: {}
}

export default cordovaPlugin
