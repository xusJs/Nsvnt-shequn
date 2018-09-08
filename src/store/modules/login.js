//登录 注册数据
import {getUser, gettoken, getheadPortrait, getphone, getrealName, removeUser} from "../set"


import axios from "axios"
import $config from "../../config/index"
import Qs from "qs"
import md5 from "js-md5"
import config from "../../config/index";
import router from "../../router/index"
import {Indicator, Toast} from "mint-ui"
import store from "../index2"

let timestamp = Date.parse(new Date())

// 全局 设置
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么


  store.commit("SET_bufferColl", true)
  setTimeout(function () {
    if (store.state.login.bufferColl) {
      Indicator.open()
    }
  }, store.state.login.bufferTimer)
  return config;
}, function (error) {
  // 对请求错误做些什么

  setTimeout(function () {
    Indicator.close()
  }, store.state.login.bufferTimer)

  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  store.commit("SET_bufferColl", false)
  Indicator.close()
  if (response.data.errorCode === '800011') {
    removeUser()
    router.replace({
      name: 'login',
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  setTimeout(function () {
    Indicator.close()
    Toast(error)
  }, store.state.login.bufferTimer + 2000)

  return Promise.reject(error);
});


const user = {
  state: {
    token: gettoken(),   //登录后的KOKEN
    userId: getUser(),      //登录后的uid
    headPortrait: getheadPortrait(),    //登录之后的头像
    phone: getphone(),      //登录时的手机号
    realName: getrealName(),     //我的名字

    IMws: "",          //IM websocket
    lockReconnect: false,          // 避免 重复连接
    heartCheck: {
      timeout: 180000,
      timeoutObj: null,
      serverTimeoutObj: null,
    },
    IMSController: true,

    IOTws: "",          //IOT websocket
    IOTlockReconnect: false,          // 避免 重复连接
    IOTheartCheck: {
      timeout: 180000,
      timeoutObj: null,
      serverTimeoutObj: null,
    },

    APPstate: false,           //APP状态  false 为在前台 true为在后台


    bufferColl: true,           //  缓冲 图标控制器  // 发送请求后，5秒没有回应 才出现 缓冲图标
    bufferTimer: 5000,

    chainLoginMsg: {
      address: "",           // 地址
      balance: 0,              // 余额
      multisignatures: [],
      publicKey: "",                  // 公钥
      secondPublicKey: "",               //
      secondSignature: false,          // 是否有二级密码
      u_multisignatures: [],
      unconfirmedBalance: 0,
      unconfirmedSignature: false,
      username: ""
    },       // 区块链登录信息
    secret: "",        //   登录时 输入的密码


    chainPassPhrase: "",          // 区块链  注册 二级密码


  },
  mutations: {
    SET_token(state, str) {
      state.token = str
    },
    SET_userId(state, str) {
      state.userId = str
    },
    SET_headPortrait(state, str) {
      state.headPortrait = str
    },
    SET_phone(state, str) {
      state.phone = str
    },
    SET_realName(state, str) {
      state.realName = str
    },
    SET_IMSController(state, str) {
      state.IMSController = str
    },

    SET_APPState(state, str) {
      state.APPstate = str
    },
    SET_bufferColl(state, str) {
      state.bufferColl = str
    },

    SET_chainPassPhrase(state, str) {
      state.chainPassPhrase = str
    },

    SET_chainLoginMsg(state, str) {
      state.chainLoginMsg = str
    },

    SET_secret(state, str) {
      state.secret = str
    },

    clearLogin(state) {
      state.token = "";
      state.userId = "";
      state.headPortrait = "";
      state.phone = "";
      state.realName = ""
    },
  },
  actions: {

    // 初始化 登录数据
    Initialization({state, commit}) {
      return new Promise((resolve, reject) => {
        let logindata = localStorage.getItem("UserLoginMsg")
        if (logindata !== null) {
          let obj = JSON.parse(logindata)
          state.token = obj.token
          state.userId = obj.userid
          state.headPortrait = obj.headPortrait
          state.realName = obj.realName
          state.phone = obj.phone
        }
        resolve()
      })
    }, //初始化登录数据

    // 登录
    AppLogin({state, commit, dispatch}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          password: obj.password,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp)
        })
        axios.post($config.loginserver + "/userservice/login", data)
          .then(response => {
            if (response.data.success) {
              let values = response.data.result
              commit("SET_token", values.token)
              commit("SET_userId", values.userid)
              commit("SET_headPortrait", values.headPortrait)
              commit("SET_phone", obj.phone)
              commit("SET_realName", values.realName)

              values.phone = obj.phone
              values.password = obj.password

              // alert('登录成功,当前token' + state.token + '当前userid' + state.userId)
              localStorage.setItem("UserLoginMsg", JSON.stringify(values))


            }
            resolve(response.data)
          })
      })
    },

    // 获取注册验证码
    _addCaptcha({state, commit}, obj) {
      return new Promise(resolve => {

        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp)
        })

        axios.post($config.loginserver + "/userservice/verifycodebyphone", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    // 用户注册
    _register({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          realname: obj.username,
          mobile_phone_no: obj.phone,
          verifycode: obj.captcha,
          addr: obj.address,
          timestamp: timestamp,
          sign: md5(obj.username + timestamp),
        })

        axios.post($config.loginserver + "/userservice/reg", data)
          .then(response => {

            resolve(response.data)
          })


      })
    },

    //密码找回 修改
    _Retrieve({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          mobile_phone_no: obj.phone,
          timestamp: timestamp,
          sign: md5(obj.phone + timestamp),
          verifycode: obj.captcha,
          password: obj.newpwd
        })
        axios.post($config.loginserver + "/userservice/modpwd", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //首页数据查询
    _communityData({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          categoryId: obj.categoryId,
          page: obj.page,
          pageSize: obj.pageSize,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token
        })

        axios.post($config.bizserverApi + "/indexservice/list", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //首页轮播查询
    _bannerObtain({state, commit}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp + "",
          token: state.token,
          sign: md5(state.token + timestamp)
        });

        axios.post($config.bizserverApi + "/indexservice/carousellist", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    // 首页项目搜索
    _communitySearch({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token,
          page: "1",
          pageSize: "20",
          str: obj.searchKeyWord
        })
        axios.post($config.bizserverApi + "/indexservice/search", data)
          .then(response => {
            resolve(response.data)
          })

      })
    },

    //关注 取消关注
    _isConcern({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          concernId: obj.userId,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token
        })
        axios.post($config.bizserverApi + "/peproservice/concern", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //IM websocket 系列方法
    createWebSocket({state, commit, dispatch}) {
      try {
        state.IMws = new WebSocket($config.IMWEBSOCKET);
        dispatch("initEventHandle")
      } catch (e) {
        dispatch("reconnect")
      }
    },

    initEventHandle({state, commit, dispatch}) {
      state.IMws.onclose = function () {
        dispatch("reconnect")
      };
      state.IMws.onerror = function () {
        dispatch("reconnect")
      };
      state.IMws.onopen = function () {

        // alert('IM websocket 连接成功')
        // alert('当前Userid：' + state.userId)
        if (state.userId === "" || state.userId === null) {

        } else {
          let timestamp = Date.parse(new Date());
          let data = JSON.stringify({
            "comm": "login",
            "userid": state.userId,
            "token": state.token,
            "mphone": state.phone,
            "ctime": timestamp + ""
          });
          state.IMws.send(data);
        }
        dispatch("reset")
        dispatch("start")


        //  重连主动查询信息一次
        dispatch('QueryInformation')

      };
      state.IMws.onmessage = function (event) {
        if (event.data === 's') {
          // alert("收到 IM s信号")
          if (state.IMSController) {
            // console.log(state.IMSController)
            dispatch("QueryInformation")
            // dispatch('_increase_badge', {num: 1})
            commit("SET_IMSController", false)
          }
        }
        else {
          let response = JSON.parse(event.data)
          if (response.comm === "ping") {
            if (response.value === "ok") {
              dispatch("reset")
              dispatch("start")
            }
          } else if (response.comm === "login") {
            if (response.value === "ok") {
            }
          }
        }
      }
    },

    reconnect({state, commit, dispatch}) {
      if (state.lockReconnect) return;
      state.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        dispatch("createWebSocket")
        state.lockReconnect = false;
      }, 2000);
    },

    reset({state, commit, dispatch}) {
      clearTimeout(state.heartCheck.timeoutObj);
      clearTimeout(state.heartCheck.serverTimeoutObj);
      // return this;
    },

    start({state, commit, dispatch}) {
      // console.log("IM心跳方法 执行")
      state.heartCheck.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常

        let timestamp = Date.parse(new Date());
        let data = JSON.stringify({
          comm: "ping",
          ctime: timestamp + ""
        })
        // console.log("IM心跳数据发送:" + data)
        state.IMws.send(data);
        state.heartCheck.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
          state.IMws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, state.heartCheck.timeout)
      }, state.heartCheck.timeout)
    },


    //IOT websocket 系列方法
    IOTcreateWebSocket({state, commit, dispatch}) {
      try {
        state.IOTws = new WebSocket($config.IOTWEBSOCKET);
        dispatch("IOTinitEventHandle")
      } catch (e) {
        dispatch("IOTreconnect")
      }
    },

    IOTinitEventHandle({state, commit, dispatch}) {
      state.IOTws.onclose = function () {
        dispatch("IOTreconnect")
      };
      state.IOTws.onerror = function () {
        dispatch("IOTreconnect")
      };
      state.IOTws.onopen = function () {

        if (state.userId === "" || state.userId === null) {

        } else {
          let timestamp = Date.parse(new Date());
          let data = JSON.stringify({
            "comm": "loginuser",
            "userid": state.userId,
            "ctime": timestamp + ""
          });
          state.IOTws.send(data);
        }
        dispatch("IOTreset")
        dispatch("IOTstart")


      };
      state.IOTws.onmessage = function (event) {

        // Toast(event.data)

        if (event.data === 's') {
          if (state.IMSController) {

          }
        }
        else {
          let response = JSON.parse(event.data)
          if (response.comm === "heartbeat") {
            if (response.value.result === "ok") {
              dispatch("IOTreset")
              dispatch("IOTstart")
            }
          }
          else if (response.comm === "loginuser") {
            if (response.value.result === "ok") {
            }
          }
          else if (response.comm === 'ping') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '1') {
                commit('SET_NowIOTisOpne', true)
              }
            }
          }
          else if (response.comm === 'photo') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '1') {
                commit("SET_IOTphotoImg", response.value.sname)
                commit("SET_IOTphotoColl", true)
                commit('SET_NowIOTType_PhotoType', true)
                Indicator.close()
              } else {
                commit('SET_NowIOTType_PhotoType', false)
              }
            }
          }
          else if (response.comm === 'music') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '1') {
                commit("SET_IOTphotoColl", true)
                commit('SET_NowIOTType_MusicType', true)
              } else {
                commit('SET_NowIOTType_MusicType', false)
              }
            }
          }
          else if (response.comm === 'lock') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '1') {
                commit("SET_IOTphotoColl", true)
                commit("SET_NowIOTType_LockType", true)
              } else {
                commit("SET_NowIOTType_LockType", false)
              }
            }
          }
          else if (response.comm === 'temp') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '1') {
                commit("SET_IOTphotoColl", true)
                commit("SET_NowIOTType_TempType", true)
                commit("SET_IOTTempValue", response.value.temp)
              } else {
                commit("SET_NowIOTType_TempType", false)
                commit("SET_IOTTempValue", '')
              }
            }
          }
          else if (response.comm === 'aifind') {
            if (response.devid === store.state.IOT.NowIot.devid) {
              if (response.value.value === '0') {
                if (response.value.doing === 'ing') {
                  commit('SET_IOTSearchType', {
                    type: '寻找中',      // 当前状态  未寻找  寻找中  寻找结束
                    result: "请稍后...",
                  })
                }
              }
              else if (response.value.value === '1') {
                commit('SET_IOTSearchType', {
                  type: '寻找结束',      // 当前状态  未寻找  寻找中  寻找结束
                  result: response.value.fpic,
                })
              }
              commit('SET_NowIOTType_AiFindType', true)
            }
          }
        }
      }
    },

    IOTreconnect({state, commit, dispatch}) {
      if (state.IOTlockReconnect) return;
      state.IOTlockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        dispatch("IOTcreateWebSocket")
        state.IOTlockReconnect = false;
      }, 2000);
    },

    IOTreset({state, commit, dispatch}) {
      clearTimeout(state.IOTheartCheck.timeoutObj);
      clearTimeout(state.IOTheartCheck.serverTimeoutObj);
      // return this;
    },

    IOTstart({state, commit, dispatch}) {
      // console.log("IM心跳方法 执行")
      state.IOTheartCheck.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常

        let data = JSON.stringify({
          comm: "heartbeat",
          ctime: timestamp + ""
        })
        // console.log("IM心跳数据发送:" + data)
        state.IOTws.send(data);
        state.IOTheartCheck.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
          state.IOTws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, state.IOTheartCheck.timeout)
      }, state.IOTheartCheck.timeout)
    },


    //IOT 设备列表 查询
    /*  FindIot({state, commit, dispatch}) {
        return new Promise(resolve => {
          let data = Qs.stringify({
            userid: state.userId
          })
          axios.post($config.bizserverApi + "/iotservice/selectdevinfo", data)
            .then(response => {
              resolve(response.data)
            })
        })
      },*/
    FindIot({state, commit, dispatch}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
        })
        axios.post($config.iotserverApi + "/userdevservice/userdevdetaillist", data)
          .then(response => {
            resolve(response.data)
            if (response.data.success) {
              dispatch("DB_IOTVersionData", response.data.result)
            }
          })
      })
    },


    // IOT 我的 单设备信息查询
    FindMeIOTDetail({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          devid: obj.devid
        })
        axios.post($config.iotserverApi + "/userdevservice/userdevdetail", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // IOT 设备查询 是否在线
    _voteIOT({state, commit, dispatch}, obj) {
      let data = JSON.stringify({
        userid: state.userId,
        comm: 'ping',
        devid: obj.devid,
        ctime: timestamp + "",
        value: {
          value: '1'
        }
      })
      state.IOTws.send(data)
    },

    // iot 设备 绑定
    _IOTBindDevice({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          devid: obj.devid
        })
        axios.post($config.iotserverApi + "/userdevservice/adduserdev", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // IOT 设备信息 查询  // 所有
    FindIOTDetail({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          devid: obj.devid
        })
        axios.post($config.iotserverApi + "/userdevservice/devdetail", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //iot 设备共享  1申请 /  3同意  /  2拒绝
    IOTApplicationShare({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.recvId,
          comm: "dbmg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          // data: JSON.stringify({dtype: obj.dtype, content: obj.content, devid: obj.devid}),
          data: JSON.stringify(obj.content),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /****************IOT设备资源 查询********
     *
     *
     * rtype: 1 file,2 music,3 photo ,4 video
     *
     * ***/
    FindIOTResource({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          devid: obj.devid,
          rtype: obj.rtype,
          title: obj.title
        })

        axios.post($config.iotserverApi + "/userdevservice/resourcelist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /**
     *
     *  iot 设备 操作
     * */

    _openMusic({state}, obj) {
      let data = JSON.stringify({
        comm: "music",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '1',
          sname: obj.sname
        }
      })
      state.IOTws.send(data)
    },
    _closeMusic({state}, obj) {
      let data = JSON.stringify({
        comm: "music",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '0'
        }
      })
      state.IOTws.send(data)
    },

    _openPhoto({state}, obj) {
      let data = JSON.stringify({
        comm: "photo",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '1',
          sname: timestamp + ".jpg"
        }
      })
      state.IOTws.send(data)
    },
    _closePhoto({state}, obj) {
      let data = JSON.stringify({
        comm: "photo",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '0'
        }
      })
      state.IOTws.send(data)

    },

    _openLock({state}, obj) {
      let data = JSON.stringify({
        comm: "lock",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '1'
        }
      })
      state.IOTws.send(data)
    },
    _closeLock({state}, obj) {
      let data = JSON.stringify({
        comm: "lock",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '0'
        }
      })
      state.IOTws.send(data)
    },

    _openTemp({state}, obj) {
      let data = JSON.stringify({
        comm: "temp",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '1'
        }
      })
      state.IOTws.send(data)
    },
    _closeTemp({state}, obj) {
      let data = JSON.stringify({
        comm: "temp",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '0'
        }
      })
      state.IOTws.send(data)
    },


    // 多功能 查询 发送
    _SearchPeople({state}, obj) {
      let data = JSON.stringify({
        comm: "aifind",
        devid: obj.devid,
        userid: state.userId,
        ctime: timestamp + "",
        value: {
          value: '1',
          fpic: obj.pic
        }
      })
      state.IOTws.send(data)
    },


    //  查询信息
    QueryInformation({state, commit, dispatch}) {
      return new Promise(resolve => {
        let timestamps = localStorage.getItem("MSGTIME" + state.userId)
        if (timestamps == null) {
          timestamps = (Date.parse(new Date()) - 1000000)
        }
        let data = Qs.stringify({
          recvId: state.userId,
          token: state.token,
          timestamp: timestamp,
          lastTime: timestamps,
          sign: md5(state.userId + timestamp)
        });

        // axios.post("http://192.168.1.167:8080/nsvntreceiveserver/receiveservice/recv", data)
        axios.post($config.receiveservice + "/receiveservice/recv", data)
          .then(response => {
            resolve(response.data)
            if (response.data.success) {
              // alert('信息查询成功' + JSON.stringify(response.data.result))
              dispatch("IMMsgHandle", response.data.result)
            }
          })
      })
    },

    //  好友列表查询
    _FriendsList({state, commit, dispatch}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp)
        })
        axios.post($config.bizserverApi + "/imservice/selectfdslist", data)
          .then(response => {
            if (response.data.success) {
              response.data.result.forEach(function (item, index) {
                item.isNewMsg = false
              })

              //   查询成功  将数据 存储在本地数据库

              // alert("好友列表查询成功 调起 本地数据库更新")
              dispatch("DB_friend_userInfo", response.data.result)


            }
            resolve(response.data)
          })
      })
    },

    //  我的个人项目
    _MyPEnterpriseProject({state, commit}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          page: "1",
          pageSize: "20",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
        })
        axios.post($config.bizserverApi + "/peproservice/perlist", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //  我的企业项目
    _MyCEnterpriseProject({state, commit}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          page: "1",
          pageSize: "20",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
        })
        axios.post($config.bizserverApi + "/coproservice/perlist", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //  我的社团项目
    _MyOEnterpriseProject({state, commit}) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          page: "1",
          pageSize: "20",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
        })
        axios.post($config.bizserverApi + "/orproservice/perlist", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },


    //  项目详情页 项目详情查询 （个人）
    _PfindProjectDetails({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          proId: obj.ProjectId,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token
        })
        axios.post($config.bizserverApi + "/peproservice/proquery", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //  项目详情页 项目详情查询 （企业）
    _CfindProjectDetails({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          proId: obj.ProjectId,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token
        })
        axios.post($config.bizserverApi + "/coproservice/proquery", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //  项目详情页 项目详情查询 （社团）
    _OfindProjectDetails({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          proId: obj.ProjectId,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          token: state.token
        })
        axios.post($config.bizserverApi + "/orproservice/proquery", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    // 项目评论列表查询 （个人）
    _PfindProjectComment({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          proId: obj.ProjectId,
          page: "1",
          pageSize: "20"
        })

        axios.post($config.bizserverApi + "/peproservice/comtlist", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },
    // 项目评论列表查询 （企业）
    _CfindProjectComment({state, commit}, obj) {
      let data = Qs.stringify({
        userId: state.userId,
        token: state.token,
        timestamp: timestamp + "",
        sign: md5(state.token + timestamp),
        proId: obj.ProjectId,
        page: "1",
        pageSize: "20"
      })

      axios.post($config.bizserverApi + "/peproservice/comtlist", data)
        .then(response => {
          resolve(response.data)
        })
    },
    // 项目评论列表查询 （社团）
    _OfindProjectComment({state, commit}, obj) {
      let data = Qs.stringify({
        userId: state.userId,
        token: state.token,
        timestamp: timestamp + "",
        sign: md5(state.token + timestamp),
        proId: obj.ProjectId,
        page: "1",
        pageSize: "20"
      })

      axios.post($config.bizserverApi + "/peproservice/comtlist", data)
        .then(response => {
          resolve(response.data)
        })
    },


    //  项目评论查询（个人）
    _PReplyComment({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "7",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          proId: obj.ProjectId,
          data: JSON.stringify({
            comment: obj.comment,
          })
        })
        axios.post($config.bizserverApi + "/peproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })


      })
    },
    //  项目评论查询（企业）
    _CReplyComment({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "7",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          proId: obj.ProjectId,
          data: JSON.stringify({
            comment: obj.comment,
          })
        })
        axios.post($config.bizserverApi + "/coproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })


      })
    },
    //  项目评论查询（社团）
    _OReplyComment({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "7",
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          proId: obj.ProjectId,
          data: JSON.stringify({
            comment: obj.comment,
          })
        })
        axios.post($config.bizserverApi + "/orproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })


      })
    },

    //项目点赞 （个人）
    _PPraise({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "4",
          timestamp: timestamp + "",
          proId: obj.ProjectId,
          sign: md5(state.token + timestamp)
        })
        axios.post($config.bizserverApi + "/peproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })

      })
    },
    //项目点赞 （企业）
    _CPraise({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "4",
          timestamp: timestamp + "",
          proId: obj.ProjectId,
          sign: md5(state.token + timestamp)
        })
        axios.post($config.bizserverApi + "/coproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })

      })
    },
    //项目点赞 （社团）
    _OPraise({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          comm: "4",
          timestamp: timestamp + "",
          proId: obj.ProjectId,
          sign: md5(state.token + timestamp)
        })
        axios.post($config.bizserverApi + "/orproservice/proaction", data)
          .then(response => {
            resolve(response.data)
          })

      })
    },

    //  私聊 发送消息
    _SendChatSession({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.fId,
          comm: "msg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({dtype: "1", content: obj.content}),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //个人 历史记录的获取
    UserHistoricalRecords({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          queryId: obj,
          lastTime: timestamp - (7 * 24 * 3600 * 1000),
          sign: md5(state.userId + timestamp),
        })
        axios.post($config.receiveservice + "/receiveservice/recvsend", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 好友删除
    removeFriend({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.fId,
          comm: "fdmg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({dtype: "4", content: {}, nick: ''}),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //群聊 发送消息
    _RoomSendChatSession({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.rId,
          comm: "msg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({dtype: "2", content: obj.content}),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    //  获取群列表
    _RoomList({state, commit, dispatch}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
        })

        axios.post($config.bizserverApi + "/imservice/selectrslist", data)
          .then(response => {
            resolve(response.data)

            if (response.data.success) {
              dispatch("DB_RoomVersionData", response.data.result)
            }
          })
      })
    },

    //  当前群信息获取
    selectNowRoom({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          roomId: obj.roomId
        })

        axios.post($config.bizserverApi + "/imservice/selectroom", data)
          .then(response => {
            // alert(JSON.stringify(response.data))
            resolve(response.data)
          })
      })
    },

    // 群成员信息 获取
    selectRoomMember({state, dispatch}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          token: state.token,
          timestamp: timestamp + "",
          sign: md5(state.token + timestamp),
          roomId: obj.roomId
        })
        axios.post($config.bizserverApi + "/imservice/selectrmlist", data)
          .then(response => {
            resolve(response.data)
            // alert(JSON.stringify(response.data))

            dispatch('DB_RoomInfoVersionData', {rId: obj.roomId, list: response.data.result})

          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 发送通知
    SendNotice({state}, obj) {
      if (state.APPstate) {
        cordova.plugins.notification.local.schedule({
          id: obj.id,
          title: obj.title,
          text: obj.texts,
          icon: obj.icon,
          foreground: true
        });
      }
    },


    //好友申请 处理
    AgreeAddFriend({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.item.data.fId,
          comm: "fdmg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({dtype: obj.dtype, content: {}, nick: ''}),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //群申请 处理


    /**
     *
     * 充值
     *
     * */
    //  微信充值
    WSRecharge({state, commit}, obj) {
      return new Promise(resolve => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          rechargeSum: obj.Num,
          payType: "3"
        })
        axios.post(config.bizserverApi + "/orderservice/recharge", data)
          .then(response => {
            resolve(response.data)
          })
      })
    },

    // 钱包信息 查询
    FindMyWallet({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })

        axios.post($config.bizserverApi + "/userservice/walletinfo", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //交易记录 查询
    TransactionRecordFind({state, commit}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })
        axios.post($config.bizserverApi + "/userservice/walletrecord", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //提现申请
    ApplicationCash({state, commit}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          userName: obj.userName,
          cardNumber: obj.cardNumber,
          withdrawalSum: obj.withdrawalSum
        })

        axios.post($config.bizserverApi + "/orderservice/applywithdrawal", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })

      })
    },

    // 获取 EntryId
    GetEntryId({state}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })
        axios.post($config.bizserverApi + "/userservice/getfileuploadentrysign", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //  我的头像修改
    MyReviseHead({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          headPortrait: obj.headPortrait
        })
        axios.post($config.bizserverApi + "/userservice/modheadportrait", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //   获取设备 当前所在位置
    DevLocation({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          devid: obj.devid
        })
        axios.post($config.iotserverApi + "/userdevservice/devloc", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //   获取设备 历史轨迹
    DevHistoricalTrack({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          devid: obj.devid
        })

        axios.post($config.iotserverApi + "/userdevservice/devlocrecord", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /**********版本相关******************/
    //  好友版本 查询
    FriendVersionFind({state}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })
        axios.post($config.bizserverApi + "/imservice/fdsversion", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 群列表版本查询
    RoomVersionFind({state}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })
        axios.post($config.bizserverApi + "/imservice/roomsversion", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  设备列表 版本查询
    DevVersionFind({state}) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
        })
        axios.post($config.iotserverApi + "/userdevservice/devsversion", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /****整理 接口***********/
    //  搜索好友
    QueryFriend({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          str: obj.str
        })
        axios.post($config.bizserverApi + "/imservice/findfd", data)
          .then(response => {
            resolve(response.data)
          })
          .then(error => {
            reject(error)
          })
      })
    },

    //  添加好友
    AddFriend({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.id,
          comm: "fdmg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({
            dtype: '1',
            content: {name: state.realName, headPortrait: state.headPortrait},
            nick: obj.nick
          }),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  搜索群列表
    QueryRoomList({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          str: obj.str
        })
        axios.post($config.bizserverApi + "/imservice/findroom", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  申请加群
    AddRoom({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          sendId: state.userId,
          token: state.token,
          recvId: obj.id,
          comm: "rmmg",
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          data: JSON.stringify({
            dtype: '1',
            content: {name: state.realName},
            mbList: [state.userId]
          }),
        })
        axios.post($config.sendserverApi + "/sendservice/send", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // App 支付 ☞ 设备付费
    AppPlayDev({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: state.userId,
          timestamp: timestamp,
          sign: md5(state.token + timestamp),
          token: state.token,
          devid: obj.devid,
          // paySum: obj.paySum,
          paySum: '0.1',
          payType: "3"
        })
        axios.post($config.iotserverApi + "/userdevservice/payforuse", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    /************区块链钱包 相关系列**************************/

    //  钱包登录
    ChainLogin({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          secret: obj.secret
        })
        axios.post($config.chainApi + "/api/accounts/open", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  个人信息查询
    ChainUserInfo({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          address: state.chainLoginMsg.address
        }
        axios.get($config.chainApi + "/api/accounts", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  用户修改名称
    ChainChangeUserName({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          publicKey: state.chainLoginMsg.publicKey,
          secret: state.secret,
          secondSecret: obj.secondSecret,
          username: obj.username
        })
        axios.post($config.chainApi + "/api/accounts/username", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  交易 （发送）
    ChainTransactions({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          amount: parseInt(obj.Amount * 100000000),
          publicKey: state.chainLoginMsg.publicKey,
          recipientId: obj.recipientId,
          secret: state.secret,
          secondSecret: obj.value
        })

        axios.post($config.chainApi + "/api/transactions", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 联系人查询 及申请中的联系人
    ChainContactsFind({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          publicKey: state.chainLoginMsg.publicKey
        }
        axios.get($config.chainApi + "/api/contacts", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 添加联系人
    ChainAddContacts({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          following: obj.type + obj.ID,
          publicKey: state.chainLoginMsg.publicKey,
          secondSecret: obj.secondSecret,
          secret: state.secret
        })
        axios.post($config.chainApi + "/api/contacts", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  设置支付密码
    ChainSetPwd({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          publicKey: state.chainLoginMsg.publicKey,
          secondSecret: obj.secondSecret,
          secret: state.secret
        })
        axios.post($config.chainApi + "/api/signatures", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //  受托人查询
    /****
     * offset 0
     * limit 101
     * 入围受托人
     *
     * offset 101
     * limit 101
     * 候选受托人
     *
     *
     * *******/
    ChainClientFind({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          limit: obj.limit,
          offset: obj.offset,
          orderBy: 'rate:asc'
        }
        axios.get($config.chainApi + "/api/delegates", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 是否是受托人
    ChainClientJudge({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          publicKey: state.chainLoginMsg.publicKey
        }
        axios.get($config.chainApi + "/api/delegates/get", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 我投票的受托人
    ChainClientVote({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          address: state.chainLoginMsg.address
        }
        axios.get($config.chainApi + "/api/accounts/delegates", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 投票
    ChainVote({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          "delegates": obj.delegates,
          "publicKey": state.chainLoginMsg.publicKey,
          "secondSecret": obj.secondSecret,
          "secret": state.secret
        })
        axios.post($config.chainApi + "/api/accounts/delegates", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  委托人注册
    ChainClientReg({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          publicKey: state.chainLoginMsg.publicKey,
          secondSecret: obj.secondSecret,
          secret: state.secret,
          username: obj.username
        })
        axios.post($config.chainApi + "/api/delegates/", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // 我的最新交易
    ChainMyTransaction({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = {
          recipientId: state.chainLoginMsg.address,
          senderPublicKey: state.chainLoginMsg.publicKey,
          limit: obj.limit,
          orderBy: "t_timestamp:desc"
        }
        axios.get($config.chainApi + "/api/transactions", {params: data})
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

  }
};
export default user
