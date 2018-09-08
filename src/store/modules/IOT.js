/*IOT 相关数据*/
const IOT = {
  state: {
    IOTEquipmentList: [],      //IOT设备列表

    NowIot: {},      //当前IOT 设备 信息
    NowIOTisOpne: false,  // 当前设备 是否在线 默认为false


    IOTphotoImg: "",     // 拍照 后回来的 图片路径
    IOTphotoColl: false,  // 拍照后 与 回来图片 之间的间隙 控制


    //  当前iot 寻人状态
    IOTSearchType: {
      type: '',      // 当前状态  未寻找  寻找中  寻找结束
      result: "",    // 结果
    },

    /****当前 IOT 温度*****/

    IOTTempValue: "",


    /************当前设备 各个功能的状态****************************************/

    NowIOTType: {
      MusicType: false,       // 音乐
      LockType: false,         //锁
      PhotoType: false,        //摄像机
      TempType: false,         // 温度计
      AiFindType: false,       // 智能寻找

      SimuType: false,         // 测试留用
    }

  },
  mutations: {
    SET_IOTEquipmentList(state, list) {
      state.IOTEquipmentList = list
    },
    SET_NowIot(state, obj) {
      state.NowIot = obj
    },
    SET_NowIOTisOpne(state, str) {
      state.NowIOTisOpne = str
    },
    SET_IOTphotoImg(state, str) {
      state.IOTphotoImg = str
    },
    SET_IOTphotoColl(state, str) {
      state.IOTphotoColl = str
    },
    SET_IOTSearchType(state, obj) {
      state.IOTSearchType = obj
    },


    //  当前 设备 各个功能状态
    SET_NowIOTType_MusicType(state, str) {
      state.NowIOTType.MusicType = str
    },
    SET_NowIOTType_LockType(state, str) {
      state.NowIOTType.LockType = str
    },
    SET_NowIOTType_PhotoType(state, str) {
      state.NowIOTType.PhotoType = str
    },
    SET_NowIOTType_TempType(state, str) {
      state.NowIOTType.TempType = str
    },
    SET_NowIOTType_AiFindType(state, str) {
      state.NowIOTType.AiFindType = str
    },
    SET_NowIOTType_SimuType(state, str) {
      state.NowIOTType.SimuType = str
    },
    //


    SET_IOTTempValue(state, str) {
      state.IOTTempValue = str
    },

  },
  actions: {}
}


export default IOT
