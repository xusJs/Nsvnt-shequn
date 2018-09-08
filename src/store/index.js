/*
/!*
import Vue from "vue"
import Vuex from "vuex"
import config from "../config";


import axios from "axios"
import Qs from "qs"
import md5 from "js-md5"


Vue.use(Vuex)


const mutations = {
  // 初始化 登录数据
  Initialization(state) {
    let logindata = localStorage.getItem("LOGINMSG")
    let loginphone = localStorage.getItem("PHONE")
    if (logindata !== null && loginphone !== null) {
      let obj = JSON.parse(logindata)
      let phone = JSON.parse(loginphone)
      state.TOKEN = obj.token
      state.UID = obj.UID
      state.headPortrait = obj.headPortrait
      state.realName = obj.realName
      state.PHONE = phone.PHONE

    }

  },

  login(state, obj) {
    state.TOKEN = obj.token
    state.UID = obj.userid
    state.headPortrait = obj.headPortrait
    state.realName = obj.realName

    localStorage.setItem("LOGINMSG", JSON.stringify({
      token: obj.token,
      UID: obj.userid,
      headPortrait: obj.headPortrait,
      realName: obj.realName
    }))
  },
  setPhone(state, obj) {
    state.PHONE = obj.phone
    localStorage.setItem("PHONE", JSON.stringify({PHONE: obj.phone}))
  },
  clearLogin(state, obj) {
    state.PHONE = ""
    state.UID = ""
    state.TOKEN = ""
    state.headPortrait = ""
    state.realName = ""
  },
  setIOT(state, obj) {
    state.SETIOT = obj
  },
  iotisopen(state, obj) {
    state.IOTISOPEN = obj.isopen
  },
  imisopen(state, obj) {
    state.IMISOPEN = obj.isopen
  },
  homename(state, obj) {
    state.HOMENAME = obj.name
  },
  GETchatsession(state) {

    if (localStorage.getItem('chatsession' + state.UID) === null) {
      state.CHATSESSIONDATA = []
    } else {
      state.CHATSESSIONDATA = JSON.parse(localStorage.getItem('chatsession' + state.UID))
    }

  },
  SETchatsession(state, obj) {

    if (state.CHATSESSIONDATA.length === 0) {
      state.CHATSESSIONDATA.push({
        id: obj.id,
        messages: [obj.messages]
      })
    } else {
      // console.log(obj)
      for (let i = 0; i < state.CHATSESSIONDATA.length; i++) {
        if (state.CHATSESSIONDATA[i].id === obj.id) {
          state.CHATSESSIONDATA[i].messages.push(obj.messages)
          break
        } else {
          if (i === state.CHATSESSIONDATA.length - 1) {
            let datas = {}
            datas.id = obj.id
            datas.messages = [obj.messages]
            state.CHATSESSIONDATA.push(datas)
            break
          }
        }
      }
    }
    localStorage.setItem('chatsession' + state.UID, JSON.stringify(state.CHATSESSIONDATA))
  },

  GETNowChat(state, obj) {
    for (let i = 0; i < state.CHATSESSIONDATA.length; i++) {
      if (state.CHATSESSIONDATA[i].id === state.NOWCHATFID) {
        state.NOWCHATSESSIONDATA = state.CHATSESSIONDATA[i].messages
        break
      } else {
        if (i === state.CHATSESSIONDATA.length - 1) {
          state.NOWCHATSESSIONDATA = {}
          break
        }
      }
    }
  },

  GETNOWCHATFID(state, obj) {
    state.NOWCHATFID = obj.id
  },

  SETpermissions(state, obj) {
    state.permissions = obj.permissions
  },

  SRTRID(state, obj) {
    state.RID = obj.rid
  },
/!*  SETmyfriendslist(state, obj) {
    state.myfriendslist = obj.myfriendslist
  },*!/
  SETmyroomlist(state, obj) {
    state.myroomlist = obj.myroomlist
  },


  GETNOWROOMCHATSESSIONDATA(state) {
    for (let i = 0; i < state.ROOMCHATSESSIONDATA.length; i++) {
      if (state.ROOMCHATSESSIONDATA[i].rId === state.RID) {
        state.NOWROOMCHATSESSIONDATA = state.ROOMCHATSESSIONDATA[i].messages
        break
      } else {
        if (i === state.ROOMCHATSESSIONDATA.length - 1) {
          state.NOWROOMCHATSESSIONDATA = []
        }
      }
    }


  },
  GETROOMCHATSESSIONDATA(state) {
    if (localStorage.getItem('ROOMCHATSESSIONDATA' + state.UID) === null) {
      state.ROOMCHATSESSIONDATA = []
    } else {
      state.ROOMCHATSESSIONDATA = JSON.parse(localStorage.getItem('ROOMCHATSESSIONDATA' + state.UID))
    }
  },
  SETROOMCHATSESSIONDATA(state, obj) {

    if (state.ROOMCHATSESSIONDATA.length === 0) {
      state.ROOMCHATSESSIONDATA.push({
        rId: obj.rId,
        messages: [obj.messages]
      })
    } else {
      for (let i = 0; i < state.ROOMCHATSESSIONDATA.length; i++) {
        if (state.ROOMCHATSESSIONDATA[i].rId === obj.rId) {
          state.ROOMCHATSESSIONDATA[i].messages.push(obj.messages)
          break
        } else {
          if (i === state.ROOMCHATSESSIONDATA.length - 1) {
            let datas = {}
            datas.rId = obj.rId
            datas.messages = [obj.messages]
            state.ROOMCHATSESSIONDATA.push(datas)
            break
          }
        }
      }
    }
    localStorage.setItem('ROOMCHATSESSIONDATA' + state.UID, JSON.stringify(state.ROOMCHATSESSIONDATA))
  },


  /!**
   *
   * UI 替换  新增的数据 处理
   *
   * *!/
  GetFriendList(state, obj) {
    state.FriendList = obj.FriendList
  },
  GetRoomList(state, obj) {
    state.RoomList = obj.RoomList
  },
  GetIotList(state, obj) {
    state.IotList = obj.IotList
  },

  GetFriendMsg(state, obj) {
    state.FriendMsg = obj.FriendMsg
  },
  GetRoomMsg(state, obj) {
    state.RoomMsg = obj.RoomMsg
  },
  BrandCenterIndex(state, obj) {
    state.BrandCenterIndex = obj.BrandCenterIndex
  },


  /!**
   *
   * IM 重构 增加
   *
   * *!/

  SET_AllChatSession(state, list) {
    state.AllChatSession = list
  },
  SET_NowChatSession(state) {

    if (state.AllChatSession.length <= 0) {
      state.AllChatSession.push(
        {
          List: [],
          info: {
            fId: state.NowChatFid,
            headPortrait: state.headPortrait
          }
        }
      );
      state.NowChatSession = state.AllChatSession[state.AllChatSession.length - 1]

    } else {
      for (let i = 0; i < state.AllChatSession.length; i++) {
        if (state.AllChatSession[i].info.fId === state.NowChatFid) {
          console.log("have data" + "当前ID 为:" + state.NowChatFid)
          state.NowChatSession = state.AllChatSession[i]
          break;
        } else {
          if (i === state.AllChatSession.length - 1) {

            // console.log("no data +1" + "当前ID 为:" + state.NowChatFid)
            // console.log(i)
            // console.log(state.AllChatSession.length)

            state.AllChatSession.push(
              {
                List: [],
                info: {
                  fId: state.NowChatFid,
                  headPortrait: state.headPortrait
                }
              }
            );
            state.NowChatSession = state.AllChatSession[state.AllChatSession.length - 1]
            break;
          }
        }
      }
    }


  },
  SET_SendChatSession(state, obj) {
    state.NowChatSession.List.push(
      {
        content: obj.content,
        isSelf: true,
        timestamp: obj.timestamp,
      }
    )
  },
  SET_NowChatFid(state, str) {
    state.NowChatFid = str
  },


  SET_AllRoomChatSession(state, list) {
    state.AllRoomChatSession = list
  },
  SET_NowRoomChatSession(state) {
    if (state.AllRoomChatSession.length <= 0) {
      state.AllRoomChatSession.push(
        {
          List: [],
          info: {
            rId: state.NowRoomChatFid,
          }
        }
      );
      state.NowRoomChatSession = state.AllRoomChatSession[state.AllRoomChatSession.length - 1]

    } else {
      for (let i = 0; i < state.AllRoomChatSession.length; i++) {
        if (state.AllRoomChatSession[i].info.rId === state.NowRoomChatFid) {
          state.NowRoomChatSession = state.AllRoomChatSession[i]
          break;
        } else {
          if (i === state.AllRoomChatSession.length - 1) {
            state.AllRoomChatSession.push(
              {
                List: [],
                info: {
                  rId: state.NowRoomChatFid,
                }
              }
            );
            state.NowRoomChatSession = state.AllRoomChatSession[state.AllRoomChatSession.length - 1]

            break
          }
        }
      }
    }
  },
  SET_SendRoomChatSession(state, obj) {
    state.NowRoomChatSession.List.push(
      {
        content: obj.content,
        isSelf: true,
        timestamp: obj.timestamp,
      }
    )
  },
  SET_NowRoomChatFid(state, str) {
    state.NowRoomChatFid = str
  },


  SET_SystemMessage(state, list) {
    state.SystemMessage = list
  },

  SET_ChangeSystemMessage(state, obj) {
    state.SystemMessage.forEach(res => {
      if (res === obj.item) {
        res.Handle = obj.Handle
      }
    })


    localStorage.setItem("System" + state.UID, JSON.stringify(state.SystemMessage))
  },

  SET_CustomerMsgList(state, list) {
    state.CustomerMsgList = list
  }


};

const state = {
  TOKEN: "",   //登录后的KOKEN
  UID: "",      //登录后的uid
  headPortrait: "",    //登录之后的头像
  PHONE: "",      //登录时的手机号
  realName: "",     //我的名字

  SETIOT: {},     //操作IOT设备时，iot设备信息
  HOMENAME: "社群",         //home路由 下子路由选择 1首页 2联系人 3发现 4品牌中心
  CHATSESSIONDATA: [],      //所有聊天数据
  NOWCHATFID: '',            //当前聊天的好友ID
  NOWCHATSESSIONDATA: {},    //当前页面聊天数据
  permissions: 3,         //我在群里的权限身份 1群主 2管理员 3群员
  // myfriendslist: [],               // 我的好友列表
  myroomlist: [],                  //当前群成员列表

  // nowRoomMsg: {},                   //当前群的详细信息
  NOWROOMCHATSESSIONDATA: {},    //当前群聊天数据
  ROOMCHATSESSIONDATA: [],      //所有群聊数据
  RID: "",                        // 选择群之后的 群ID

  /!**
   * UI 替换 数据 新增调整
   *
   * *!/

  FriendList: [],     //我的好友列表
  FriendMsg: {},     //私聊时当前好友信息
  RoomList: [],     //我的群列表
  RoomMsg: {},     //群聊时当前群信息
  IotList: [],     //我的IOT设备列表

  BrandCenterIndex: 0, // 品牌中心下三个路由的选择索引


  /!**
   *
   * IM 项目 重构 增加
   *
   * *!/

  AllChatSession: [],     // 所有好友私聊数据

  NowChatSession: {
    List: [],
    info: {
      headPortrait: ""
    }
  },    // 当前好友私聊数据

  NowChatFid: "",      //当前私聊人 ID


  AllRoomChatSession: [],  //所有群聊数据

  NowRoomChatSession: {
    List: [],
    info: {
      headPortrait: ""
    }
  },   // 当前群聊数据

  NowRoomChatFid: "",      //当前群聊 群ID


  SystemMessage: [],  //系统消息

  CustomerMsgList: [],    //客服消息列表


  defaultImg:"http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg"    // 默认用户头像


};

const actions = {
 /!* // 系统消息 处理
  SystemMessageFun({state, commit}, list) {

    let SystemList = localStorage.getItem("System" + state.UID)
    if (SystemList === null) {

      list.forEach(res => {
        if (res.comm === "fdmg") {
          if (res.dtype === "1") {
            res.Handle = 0
          }
        }
      });
      state.SystemMessage = list
    } else {
      state.SystemMessage = JSON.parse(SystemList)
      list.forEach(res => {
        if (res.comm === "fdmg") {
          if (res.dtype === "1") {
            res.Handle = 0
          }
        }
        state.SystemMessage.unshift(res)
      })
    }
    localStorage.setItem("System" + state.UID, JSON.stringify(state.SystemMessage))

  },

//  客服 消息 处理
  CustomerMsgFun({state, commit}, list) {

    let OldList = localStorage.getItem("Customer" + state.UID)
    let NewList;
    if (OldList === null) {
      NewList = list
    } else {
      NewList = JSON.parse(OldList)
      list.forEach(response => {
        NewList.push(response)
      })
    }
    // state.CustomerMsgList = NewList
    commit("SET_CustomerMsgList",NewList)
    localStorage.setItem("Customer" + state.UID, JSON.stringify(NewList))
  }

//!*!/

};


export default new Vuex.Store({
  state,
  mutations,
  actions
})
*!/


const userIndex = {
  mutations: {
    // 初始化 登录数据
    Initialization(state) {
      let logindata = localStorage.getItem("LOGINMSG")
      let loginphone = localStorage.getItem("PHONE")
      if (logindata !== null && loginphone !== null) {
        let obj = JSON.parse(logindata)
        let phone = JSON.parse(loginphone)
        state.TOKEN = obj.token
        state.UID = obj.UID
        state.headPortrait = obj.headPortrait
        state.realName = obj.realName
        state.PHONE = phone.PHONE

      }

    },

    login(state, obj) {
      state.TOKEN = obj.token
      state.UID = obj.userid
      state.headPortrait = obj.headPortrait
      state.realName = obj.realName

      localStorage.setItem("LOGINMSG", JSON.stringify({
        token: obj.token,
        UID: obj.userid,
        headPortrait: obj.headPortrait,
        realName: obj.realName
      }))
    },
    setPhone(state, obj) {
      state.PHONE = obj.phone
      localStorage.setItem("PHONE", JSON.stringify({PHONE: obj.phone}))
    },
    clearLogin(state, obj) {
      state.PHONE = ""
      state.UID = ""
      state.TOKEN = ""
      state.headPortrait = ""
      state.realName = ""
    },
    setIOT(state, obj) {
      state.SETIOT = obj
    },
    iotisopen(state, obj) {
      state.IOTISOPEN = obj.isopen
    },
    imisopen(state, obj) {
      state.IMISOPEN = obj.isopen
    },
    homename(state, obj) {
      state.HOMENAME = obj.name
    },
    GETchatsession(state) {

      if (localStorage.getItem('chatsession' + state.UID) === null) {
        state.CHATSESSIONDATA = []
      } else {
        state.CHATSESSIONDATA = JSON.parse(localStorage.getItem('chatsession' + state.UID))
      }

    },
    SETchatsession(state, obj) {

      if (state.CHATSESSIONDATA.length === 0) {
        state.CHATSESSIONDATA.push({
          id: obj.id,
          messages: [obj.messages]
        })
      } else {
        // console.log(obj)
        for (let i = 0; i < state.CHATSESSIONDATA.length; i++) {
          if (state.CHATSESSIONDATA[i].id === obj.id) {
            state.CHATSESSIONDATA[i].messages.push(obj.messages)
            break
          } else {
            if (i === state.CHATSESSIONDATA.length - 1) {
              let datas = {}
              datas.id = obj.id
              datas.messages = [obj.messages]
              state.CHATSESSIONDATA.push(datas)
              break
            }
          }
        }
      }
      localStorage.setItem('chatsession' + state.UID, JSON.stringify(state.CHATSESSIONDATA))
    },

    GETNowChat(state, obj) {
      for (let i = 0; i < state.CHATSESSIONDATA.length; i++) {
        if (state.CHATSESSIONDATA[i].id === state.NOWCHATFID) {
          state.NOWCHATSESSIONDATA = state.CHATSESSIONDATA[i].messages
          break
        } else {
          if (i === state.CHATSESSIONDATA.length - 1) {
            state.NOWCHATSESSIONDATA = {}
            break
          }
        }
      }
    },

    GETNOWCHATFID(state, obj) {
      state.NOWCHATFID = obj.id
    },

    SETpermissions(state, obj) {
      state.permissions = obj.permissions
    },

    SRTRID(state, obj) {
      state.RID = obj.rid
    },
    /!*  SETmyfriendslist(state, obj) {
        state.myfriendslist = obj.myfriendslist
      },*!/
    SETmyroomlist(state, obj) {
      state.myroomlist = obj.myroomlist
    },


    GETNOWROOMCHATSESSIONDATA(state) {
      for (let i = 0; i < state.ROOMCHATSESSIONDATA.length; i++) {
        if (state.ROOMCHATSESSIONDATA[i].rId === state.RID) {
          state.NOWROOMCHATSESSIONDATA = state.ROOMCHATSESSIONDATA[i].messages
          break
        } else {
          if (i === state.ROOMCHATSESSIONDATA.length - 1) {
            state.NOWROOMCHATSESSIONDATA = []
          }
        }
      }


    },
    GETROOMCHATSESSIONDATA(state) {
      if (localStorage.getItem('ROOMCHATSESSIONDATA' + state.UID) === null) {
        state.ROOMCHATSESSIONDATA = []
      } else {
        state.ROOMCHATSESSIONDATA = JSON.parse(localStorage.getItem('ROOMCHATSESSIONDATA' + state.UID))
      }
    },
    SETROOMCHATSESSIONDATA(state, obj) {

      if (state.ROOMCHATSESSIONDATA.length === 0) {
        state.ROOMCHATSESSIONDATA.push({
          rId: obj.rId,
          messages: [obj.messages]
        })
      } else {
        for (let i = 0; i < state.ROOMCHATSESSIONDATA.length; i++) {
          if (state.ROOMCHATSESSIONDATA[i].rId === obj.rId) {
            state.ROOMCHATSESSIONDATA[i].messages.push(obj.messages)
            break
          } else {
            if (i === state.ROOMCHATSESSIONDATA.length - 1) {
              let datas = {}
              datas.rId = obj.rId
              datas.messages = [obj.messages]
              state.ROOMCHATSESSIONDATA.push(datas)
              break
            }
          }
        }
      }
      localStorage.setItem('ROOMCHATSESSIONDATA' + state.UID, JSON.stringify(state.ROOMCHATSESSIONDATA))
    },


    /!**
     *
     * UI 替换  新增的数据 处理
     *
     * *!/
    GetFriendList(state, obj) {
      state.FriendList = obj.FriendList
    },
    GetRoomList(state, obj) {
      state.RoomList = obj.RoomList
    },
    GetIotList(state, obj) {
      state.IotList = obj.IotList
    },

    GetFriendMsg(state, obj) {
      state.FriendMsg = obj.FriendMsg
    },
    GetRoomMsg(state, obj) {
      state.RoomMsg = obj.RoomMsg
    },
    BrandCenterIndex(state, obj) {
      state.BrandCenterIndex = obj.BrandCenterIndex
    },


    /!**
     *
     * IM 重构 增加
     *
     * *!/

    SET_AllChatSession(state, list) {
      state.AllChatSession = list
    },
    SET_NowChatSession(state) {

      if (state.AllChatSession.length <= 0) {
        state.AllChatSession.push(
          {
            List: [],
            info: {
              fId: state.NowChatFid,
              headPortrait: state.headPortrait
            }
          }
        );
        state.NowChatSession = state.AllChatSession[state.AllChatSession.length - 1]

      } else {
        for (let i = 0; i < state.AllChatSession.length; i++) {
          if (state.AllChatSession[i].info.fId === state.NowChatFid) {
            console.log("have data" + "当前ID 为:" + state.NowChatFid)
            state.NowChatSession = state.AllChatSession[i]
            break;
          } else {
            if (i === state.AllChatSession.length - 1) {

              // console.log("no data +1" + "当前ID 为:" + state.NowChatFid)
              // console.log(i)
              // console.log(state.AllChatSession.length)

              state.AllChatSession.push(
                {
                  List: [],
                  info: {
                    fId: state.NowChatFid,
                    headPortrait: state.headPortrait
                  }
                }
              );
              state.NowChatSession = state.AllChatSession[state.AllChatSession.length - 1]
              break;
            }
          }
        }
      }


    },
    SET_SendChatSession(state, obj) {
      state.NowChatSession.List.push(
        {
          content: obj.content,
          isSelf: true,
          timestamp: obj.timestamp,
        }
      )
    },
    SET_NowChatFid(state, str) {
      state.NowChatFid = str
    },


    SET_AllRoomChatSession(state, list) {
      state.AllRoomChatSession = list
    },
    SET_NowRoomChatSession(state) {
      if (state.AllRoomChatSession.length <= 0) {
        state.AllRoomChatSession.push(
          {
            List: [],
            info: {
              rId: state.NowRoomChatFid,
            }
          }
        );
        state.NowRoomChatSession = state.AllRoomChatSession[state.AllRoomChatSession.length - 1]

      } else {
        for (let i = 0; i < state.AllRoomChatSession.length; i++) {
          if (state.AllRoomChatSession[i].info.rId === state.NowRoomChatFid) {
            state.NowRoomChatSession = state.AllRoomChatSession[i]
            break;
          } else {
            if (i === state.AllRoomChatSession.length - 1) {
              state.AllRoomChatSession.push(
                {
                  List: [],
                  info: {
                    rId: state.NowRoomChatFid,
                  }
                }
              );
              state.NowRoomChatSession = state.AllRoomChatSession[state.AllRoomChatSession.length - 1]

              break
            }
          }
        }
      }
    },
    SET_SendRoomChatSession(state, obj) {
      state.NowRoomChatSession.List.push(
        {
          content: obj.content,
          isSelf: true,
          timestamp: obj.timestamp,
        }
      )
    },
    SET_NowRoomChatFid(state, str) {
      state.NowRoomChatFid = str
    },


    SET_SystemMessage(state, list) {
      state.SystemMessage = list
    },

    SET_ChangeSystemMessage(state, obj) {
      state.SystemMessage.forEach(res => {
        if (res === obj.item) {
          res.Handle = obj.Handle
        }
      })


      localStorage.setItem("System" + state.UID, JSON.stringify(state.SystemMessage))
    },

    SET_CustomerMsgList(state, list) {
      state.CustomerMsgList = list
    }


  },

  state: {
    TOKEN: "",   //登录后的KOKEN
    UID: "",      //登录后的uid
    headPortrait: "",    //登录之后的头像
    PHONE: "",      //登录时的手机号
    realName: "",     //我的名字

    SETIOT: {},     //操作IOT设备时，iot设备信息
    HOMENAME: "社群",         //home路由 下子路由选择 1首页 2联系人 3发现 4品牌中心
    CHATSESSIONDATA: [],      //所有聊天数据
    NOWCHATFID: '',            //当前聊天的好友ID
    NOWCHATSESSIONDATA: {},    //当前页面聊天数据
    permissions: 3,         //我在群里的权限身份 1群主 2管理员 3群员
    // myfriendslist: [],               // 我的好友列表
    myroomlist: [],                  //当前群成员列表

    // nowRoomMsg: {},                   //当前群的详细信息
    NOWROOMCHATSESSIONDATA: {},    //当前群聊天数据
    ROOMCHATSESSIONDATA: [],      //所有群聊数据
    RID: "",                        // 选择群之后的 群ID

    /!**
     * UI 替换 数据 新增调整
     *
     * *!/

    FriendList: [],     //我的好友列表
    FriendMsg: {},     //私聊时当前好友信息
    RoomList: [],     //我的群列表
    RoomMsg: {},     //群聊时当前群信息
    IotList: [],     //我的IOT设备列表

    BrandCenterIndex: 0, // 品牌中心下三个路由的选择索引


    /!**
     *
     * IM 项目 重构 增加
     *
     * *!/

    AllChatSession: [],     // 所有好友私聊数据

    NowChatSession: {
      List: [],
      info: {
        headPortrait: ""
      }
    },    // 当前好友私聊数据

    NowChatFid: "",      //当前私聊人 ID


    AllRoomChatSession: [],  //所有群聊数据

    NowRoomChatSession: {
      List: [],
      info: {
        headPortrait: ""
      }
    },   // 当前群聊数据

    NowRoomChatFid: "",      //当前群聊 群ID


    SystemMessage: [],  //系统消息

    CustomerMsgList: [],    //客服消息列表


    defaultImg: "http://romaxdata-1254236539.cosgz.myqcloud.com/20180503/3874961445619712.jpg"    // 默认用户头像


  },

  actions: {},
}


export default userIndex
*/
