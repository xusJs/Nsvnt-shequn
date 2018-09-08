/*聊天 相关数据*/
import store from "../index2";

const chat = {
  state: {
    // ChatSessionList: [],   // 本地所有聊天数据
    NowChatId: "",            // 当前聊天好友ID
    NowChatSessionList: [],   //当前聊天数据

    // RoomChatSessionList: [],   // 本地所有群聊数据
    RoomNowChatId: "",            // 当前群聊ID
    RoomNowChatSessionList: [],   //当前群聊数据

    CustomerList: [],       //客服聊天数据
    SystemHints: [],          //系统提示信息
    FriendMsg: {},              //当前好友信息
    RoomMsg: {},                  //当前群信息

    RoomMemberList: [],            //当前群成员列表


    //  客服、系统消息、群聊消息、提示控制

    CustomerPrompt: false,    //客服消息提示
    SystemPrompt: false,      //系统消息提示
    RoomPrompt: false,         //群消息提示


    /**  数据库 ***/
    isConnect: false,  // 是否连接数据库
    DB: ""

  },
  mutations: {

    SET_NowChatId(state, str) {
      state.NowChatId = str
    },

    /***数据库之前的 当前单聊信息获取*/
    /*SET_NowChatSessionList(state, obj) {
      if (state.ChatSessionList.length <= 0) {
        state.ChatSessionList.push(
          {
            List: [],
            info: {
              fId: state.NowChatId,
              headPortrait: store.state.login.headPortrait
            }
          }
        );
        state.NowChatSessionList = state.ChatSessionList[state.ChatSessionList.length - 1]

      } else {
        for (let i = 0; i < state.ChatSessionList.length; i++) {
          if (state.ChatSessionList[i].info.fId === state.NowChatId) {
            state.NowChatSessionList = state.ChatSessionList[i]
            break;
          } else {
            if (i === state.ChatSessionList.length - 1) {
              state.ChatSessionList.push(
                {
                  List: [],
                  info: {
                    fId: state.NowChatId,
                    headPortrait: store.state.login.headPortrait
                  }
                }
              );
              state.NowChatSessionList = state.ChatSessionList[state.ChatSessionList.length - 1]
              break;
            }
          }
        }
      }
    },*/

    /****数据库之后 当前单聊信息获取****/
    SET_NewNowChatSessionList(state, list) {
      state.NowChatSessionList = list
    },

    SET_SendChatSessionList(state, obj) {
      state.NowChatSessionList.List.push({
        content: obj.content,
        isSelf: true,
        timestamp: obj.timestamp,
      })
    },

    SET_RoomChatSessionList(state, list) {
      state.RoomChatSessionList = list
    },
    SET_RoomNowChatId(state, str) {
      state.RoomNowChatId = str
    },

    /*数据库之前*/
    /*    SET_RoomNowChatSessionList(state, obj) {
          if (state.RoomChatSessionList.length <= 0) {
            state.RoomChatSessionList.push(
              {
                List: [],
                info: {
                  rId: state.RoomNowChatId,
                }
              }
            );
            state.RoomNowChatSessionList = state.RoomChatSessionList[state.RoomChatSessionList.length - 1]

          } else {
            for (let i = 0; i < state.RoomChatSessionList.length; i++) {
              if (state.RoomChatSessionList[i].info.rId === state.RoomNowChatId) {
                state.RoomNowChatSessionList = state.RoomChatSessionList[i]
                break;
              } else {
                if (i === state.RoomChatSessionList.length - 1) {
                  state.RoomChatSessionList.push(
                    {
                      List: [],
                      info: {
                        rId: state.RoomNowChatId,
                      }
                    }
                  );
                  state.RoomNowChatSessionList = state.RoomChatSessionList[state.RoomChatSessionList.length - 1]

                  break
                }
              }
            }
          }
        },*/

    /*数据库之后*/
    SET_RoomNowChatSessionList(state, list) {
      state.RoomNowChatSessionList = list
    },

    SET_SendRoomChatSession(state, obj) {
      state.RoomNowChatSessionList.List.push({
        content: obj.content,
        isSelf: true,
        timestamp: obj.timestamp,
      })
    },

    SET_CustomerList(state, list) {
      state.CustomerList = list
    },
    SET_SystemHints(state, list) {
      state.SystemHints = list
    },

    SET_FriendMsg(state, obj) {
      state.FriendMsg = obj
    },
    SET_RoomMsg(state, obj) {
      state.RoomMsg = obj
    },

    SET_RoomMemberList(state, list) {
      state.RoomMemberList = list
    },

    SET_ChangeSystemHints(state, obj) {
      state.SystemHints.forEach(res => {
        if (res === obj.item) {
          res.Handle = obj.Handle
        }
      })
      localStorage.setItem("System" + store.state.login.userId, JSON.stringify(state.SystemHints))
    },


    SET_CustomerPrompt(state, str) {
      state.CustomerPrompt = str;
      localStorage.setItem('CustomerPrompt' + store.state.login.userId, str)
    },
    SET_SystemPrompt(state, str) {
      state.SystemPrompt = str;
      localStorage.setItem('SystemPrompt' + store.state.login.userId, str)
    },
    SET_RoomPrompt(state, str) {
      state.RoomPrompt = str;
      localStorage.setItem('RoomPrompt' + store.state.login.userId, str)
    },

    SET_DB(state, obj) {
      state.DB = obj
    },
    SET_isConnect(state, str) {
      state.isConnect = str
    }
  },
  actions: {

    /*** 数据库 连接**/

    DBConnect({state, commit, dispatch}) {
      // alert("连接方法执行 始")
      return new Promise((resolve, reject) => {
        let DB = window.sqlitePlugin.openDatabase({
          name: 'SQ_APPBase.db',
          location: 'default',
        });
        commit('SET_DB', DB)
        // alert("连接方法执行中")
        // if (state.DB !== '') {

        // //  建表
        // dispatch('DB_AddUserInfo')
        // dispatch('DB_friend_userInfo')
        // dispatch('DB_Room_Info')
        // dispatch('DB_dev_List')
        // dispatch('DB_RoomMember_Info')
        // dispatch('DB_friend_msg')
        // dispatch('DB_RoomChat_msg')
        // dispatch('DB_Live_msg')
        // dispatch('DB_broadcast_msg')
        // dispatch('DB_IOTApply_msg')
        // dispatch('DB_friendApply_msg')
        // dispatch('DB_RoomApply_msg')
        // dispatch('DB_customer_msg')
        // dispatch('DB_system_msg')
        //
        // alert('建表完成')
        resolve(true)

        /*   } else {
             resolve(false)
           }*/
      })
    },

    //    IM  信息分类
    /**
     *
     * 信息格式
     * {
     * "comm":"msg",
     * "dtype":"1",
     * "fId":"d69dff519d5c4a37a5dc0c0e4d7903f1",
     * "content":{
     * "headPortrait":"http://romaxdata-1254236539.cosgz.myqcloud.com/20180507/3880212102072320.jpg",
     * "content":"胡说八道"
     * },
     * "timestamp":"1527735746407"}
     *
     * */

    IMMsgHandle({state, commit, dispatch}, arr) {
      // console.log(arr);
      let newsArr = [];   // 私聊信息
      let requsetArr = [];   //提示管理信息
      let roomArr = [];      // 群聊信息
      let CustomerArr = [];   // 客服聊天信息

      //  1  消息分类 升级版
      for (let i = 0; i < arr.length; i++) {
        let response;
        // 消息格式 异常处理
        try {
          response = JSON.parse(arr[i])
        } catch (e) {
          response = {}
        }
        // 消息分类
        if (response.comm === 'fdmg') {
          if (response.dtype === '3') {
            // 好友请求同意
          } else if (response.dtype === '2') {
            // 好友请求拒绝
          } else {
            requsetArr.push(response)
            commit("SET_SystemPrompt", true)
            dispatch("SendNotice", {id: '2', title: '新的系统消息', texts: ''})
          }
        } else if (response.comm === 'msg') {
          if (response.dtype === "1") {
            newsArr.push(response)
            dispatch('SET_addFriendPrompt', response)
            dispatch("SendNotice", {title: '新的好友消息', texts: response.content.content,})
          } else if (response.dtype === "2") {
            roomArr.push(response)
            commit("SET_RoomPrompt", true)
            dispatch("SendNotice", {title: '新的群聊消息', texts: ''})
          }
        } else if (response.comm === "mgmsg") {
          if (response.dtype === "1") {
            requsetArr.push(response)
            commit("SET_SystemPrompt", true)
            dispatch("SendNotice", {title: '新的系统消息', texts: ''})
          } else if (response.dtype === "2") {
            CustomerArr.push(response)
            commit("SET_CustomerPrompt", true)
            dispatch("SendNotice", {title: '新的客服消息', texts: ''})
          }
        } else if (response.comm === "lvmsg") {
          requsetArr.push(response)
          commit("SET_SystemPrompt", true)
          dispatch("SendNotice", {title: '新的系统消息', texts: ''})
        } else if (response.comm === 'rmmg') {
          if (response.dtype === '1') {
            requsetArr.push(response)
            commit("SET_SystemPrompt", true)
            dispatch("SendNotice", {title: '新的系统消息', texts: ''})
          }
        } else if (response.comm === 'dbmg') {
          if (response.dtype === '1') {
            requsetArr.push(response)
            commit("SET_SystemPrompt", true)
            dispatch("SendNotice", {title: '新的系统消息', texts: ''})
          }
        }
        if (JSON.parse(arr[arr.length - 1]).timestamp !== undefined) {
          localStorage.setItem("MSGTIME" + store.state.login.userId, (parseInt(JSON.parse(arr[arr.length - 1]).timestamp) + 1))
        }
      }

      // alert('系统消息完毕：' + JSON.stringify(requsetArr))

      dispatch("SystemMessageFun", requsetArr);
      dispatch("ChatSessionFun", newsArr);
      dispatch("RoomChatSessionFun", roomArr);
      dispatch("CustomerMsgFun", CustomerArr);


      commit("SET_IMSController", true)


    },

    //单聊消息处理   // 存入数据库
    ChatSessionFun({state, commit, dispatch}, list) {

      // alert(JSON.stringify(list))
      /***************数据库引入之前处理方式******************************/
      /*  let chatSession = localStorage.getItem("FriendsChatInformationList" + store.state.login.userId);
        let chatList;
        if (chatSession === null) {
          chatList = []
        } else {
          chatList = JSON.parse(chatSession)
        }
        // console.log(chatList)
        // console.log(list)
        if (chatList.length > 0) {
          if (list.length > 0) {
            let NewList = chatList
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < NewList.length; j++) {
                if (list[i].fId === NewList[j].info.fId) {
                  NewList[j].List.push({
                    content: list[i].content.content,
                    timestamp: list[i].timestamp,
                    isSelf: false
                  });
                  NewList[j].info = {
                    fId: list[i].fId,
                    headPortrait: list[i].content.headPortrait
                  };
                  break
                } else {
                  if (j === NewList.length - 1) {
                    NewList.push({
                      List: [{
                        content: list[i].content.content,
                        timestamp: list[i].timestamp,
                        isSelf: false
                      }],
                      info: {
                        fId: list[i].fId,
                        headPortrait: list[i].content.headPortrait
                      }
                    });
                    break
                  }
                }
              }
            }


            // console.log(NewList)
            localStorage.setItem("FriendsChatInformationList" + store.state.login.userId, JSON.stringify(NewList));

            commit('SET_ChatSessionList', NewList);
            commit('SET_NowChatSessionList')
          }
        } else {
          if (list.length > 0) {
            let NewList = [
              {
                List: [{
                  content: list[0].content.content,
                  timestamp: list[0].timestamp,
                  isSelf: false
                }],
                info: {
                  fId: list[0].fId,
                  headPortrait: list[0].content.headPortrait
                }
              }
            ];
            for (let i = 1; i < list.length; i++) {
              for (let j = 0; j < NewList.length; j++) {
                if (list[i].fId === NewList[j].info.fId) {
                  NewList[j].List.push({
                    content: list[i].content.content,
                    timestamp: list[i].timestamp,
                    isSelf: false
                  })
                  break
                } else {
                  if (j === NewList.length - 1) {
                    NewList.push({
                      List: [{
                        content: list[i].content.content,
                        timestamp: list[i].timestamp,
                        isSelf: false
                      }],
                      info: {
                        fId: list[i].fId,
                        headPortrait: list[i].content.headPortrait
                      }
                    });
                    break
                  }
                }
              }
            }


            // console.log(NewList)

            localStorage.setItem("FriendsChatInformationList" + store.state.login.userId, JSON.stringify(NewList));
            commit('SET_ChatSessionList', NewList);
            commit('SET_NowChatSessionList')
          }
        }*/

      /*******************数据库引入之后的处理************************************
       *
       *
       *  私聊一个表 id  fid  timestamp content
       *
       * ********/
      // store.state.DB.DB.transaction((tx) => {
      state.DB.transaction((tx) => {
        // tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendChat_message (id integer primary key, fid text , data text)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendChat_message (id integer primary key, userId text , fid text , timestamp INTEGER ,content text)')
        // alert('创建表')
        list.forEach((res) => {
          tx.executeSql('INSERT INTO  FriendChat_message (userId,fid,timestamp,content) VALUES (?,?,?,?) ',
            [store.state.login.userId, res.fId, res.timestamp, JSON.stringify(res.content)],
            (tx, res) => {
              // alert('插入数据')
              /*     tx.executeSql('select *  from FriendChat_message', [], (tx, res) => {
                     // let row = res.rows.item(0);
                     // alert('ROW 的值为' + JSON.stringify(row))

                     // alert('查询')

                     let list = []
                     let len = res.rows.length

                     for (let i = 0; i < len; i++) {
                       alert('单个数据：' + JSON.stringify(res.rows.item(i)))
                       // list.push(JSON.parse(JSON.stringify(res.rows.item(i))))
                       let obj = {}
                       obj.id = res.rows.item(i).id
                       obj.timestamp = res.rows.item(i).timestamp
                       obj.content = JSON.parse(res.rows.item(i).content)
                       list.push(obj)
                     }
                   })*/

              let reg = /\S/
              if (reg.test(state.NowChatId)) {
                // alert('获取到当前 ID ')
                dispatch('ChatNowSessionFun', {fid: state.NowChatId})
              }
            })
        })
      })
    },

    // 获取当前单聊好友的聊天信息
    ChatNowSessionFun({state, commit}, obj) {
      // alert('查询当前 聊天信息')
      state.DB.transaction((tx) => {
        // alert('执行打开表 语句')
        tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendChat_message (id integer primary key, userId text, fid text , timestamp INTEGER ,content text)')

        // alert('执行 查询语句')
        tx.executeSql('select timestamp,content  from FriendChat_message where fid = (?) AND userId = (?)',
          [obj.fid, store.state.login.userId],
          (tx, res) => {

            // alert('查询语句执行完毕')

            let list = []
            let len = res.rows.length

            for (let i = 0; i < len; i++) {
              // alert('单个数据：' + JSON.stringify(res.rows.item(i)))
              let obj = {}
              obj.id = res.rows.item(i).id
              obj.timestamp = res.rows.item(i).timestamp
              obj.content = JSON.parse(res.rows.item(i).content)
              list.push(obj)
            }

            // alert('当前单聊信息记录为：' + JSON.stringify(list))

            commit("SET_NewNowChatSessionList", list)
          })
      })
    },


    //群聊消息处理
    RoomChatSessionFun({state, commit, dispatch}, list) {

      /*数据库之前*/
      /* let RoomChatSession = localStorage.getItem("RoomChatInformationList" + store.state.login.userId);
       let RoomChatList;
       if (RoomChatSession === null) {
         RoomChatList = []
       } else {
         RoomChatList = JSON.parse(RoomChatSession)
       }
       if (RoomChatList.length > 0) {
         if (list.length > 0) {
           let NewList = RoomChatList
           for (let i = 0; i < list.length; i++) {
             for (let j = 0; j < NewList.length; j++) {
               if (list[i].rId === NewList[j].info.rId) {
                 NewList[j].List.push({
                   content: list[i].content.content,
                   timestamp: list[i].timestamp,
                   isSelf: false,
                   headPortrait: list[i].content.headPortrait
                 })
                 break
               } else {
                 if (j === NewList.length - 1) {
                   NewList.push({
                     List: [{
                       content: list[i].content.content,
                       timestamp: list[i].timestamp,
                       headPortrait: list[i].content.headPortrait,
                       isSelf: false
                     }],
                     info: {
                       rId: list[i].rId,
                     }
                   });
                   break
                 }
               }
             }
           }
           localStorage.setItem("RoomChatInformationList" + store.state.login.userId, JSON.stringify(NewList))
           commit("SET_RoomChatSessionList", NewList);
           commit("SET_RoomNowChatSessionList")
         } else {
           return []
         }
       } else {
         if (list.length > 0) {
           let NewList = [
             {
               List: [{
                 content: list[0].content.content,
                 timestamp: list[0].timestamp,
                 isSelf: false,
                 headPortrait: list[0].content.headPortrait
               }],
               info: {
                 rId: list[0].rId,
               }
             }
           ];
           for (let i = 1; i < list.length; i++) {
             for (let j = 0; j < NewList.length; j++) {
               if (list[i].rId === NewList[j].info.rId) {
                 NewList[j].List.push({
                   content: list[i].content.content,
                   timestamp: list[i].timestamp,
                   isSelf: false,
                   headPortrait: list[i].content.headPortrait
                 })
                 break
               } else {
                 if (j === NewList.length - 1) {
                   NewList.push({
                     List: [{
                       content: list[i].content.content,
                       timestamp: list[i].timestamp,
                       isSelf: false,
                       headPortrait: list[i].content.headPortrait
                     }],
                     info: {
                       rId: list[i].rId,
                     }
                   });
                   break
                 }
               }
             }
           }
           localStorage.setItem("RoomChatInformationList" + store.state.login.userId, JSON.stringify(NewList))
           commit("SET_RoomChatSessionList", NewList);
           commit("SET_RoomNowChatSessionList")
         } else {
           return []
         }
       }*/

      /*数据库之后*/
      state.DB.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS  GroupChat_message (id integer primary key, userId text , fid text , rid text, timestamp INTEGER ,content text)')

        list.forEach((res) => {
          tx.executeSql('INSERT INTO  GroupChat_message (userId,fid,rid,timestamp,content) VALUES (?,?,?,?,?) ',
            [store.state.login.userId, res.fId, res.rId, res.timestamp, JSON.stringify(res.content)],
            (tx, res) => {
              let reg = /\S/
              if (reg.test(state.RoomNowChatId)) {
                dispatch('RoomChatNowSessionFun', {rid: state.RoomNowChatId})
              }
            })
        })
      })
    },

    //获取当前群聊信息
    RoomChatNowSessionFun({state, commit}, obj) {
      state.DB.transaction((tx) => {
        // alert('执行打开表 语句')
        tx.executeSql('CREATE TABLE IF NOT EXISTS  GroupChat_message (id integer primary key, fid text , rid text, timestamp INTEGER ,content text)')

        // alert('执行 查询语句')
        tx.executeSql('select *  from GroupChat_message where rid = (?)', [obj.rid], (tx, res) => {

          // alert('查询语句执行完毕')

          let list = []
          let len = res.rows.length

          for (let i = 0; i < len; i++) {
            // alert('单个数据：' + JSON.stringify(res.rows.item(i)))
            let obj = {}
            obj.id = res.rows.item(i).id
            obj.fid = res.rows.item(i).fid
            obj.timestamp = res.rows.item(i).timestamp
            obj.content = JSON.parse(res.rows.item(i).content)
            list.push(obj)
          }

          // alert('当前单聊信息记录为：' + JSON.stringify(list))

          commit("SET_RoomNowChatSessionList", list);
        })
      })
    },

    //系统消息 处理
    SystemMessageFun({state, commit}, list) {
      // alert('系统消息 接受数据' + JSON.stringify(list))
      // alert("系统消息处理 方法")

      /*   /!************** 未引入数据库前 处理方式***********************!/
         let SystemList = localStorage.getItem("System" + store.state.login.userId)
         if (SystemList === null) {
           list.forEach(res => {
             if (res.comm === "fdmg") {
               if (res.dtype === "1") {
                 res.Handle = 0
               }
             } else if (res.comm === 'rmmg') {
               if (res.dtype === '1') {
                 res.Handle = 0
               }
             } else if (res.comm === 'dbmg') {
               if (res.dtype === '1') {
                 res.Handle = 0
               }
             }
           });
           state.SystemHints = list
         } else {
           state.SystemHints = JSON.parse(SystemList)
           list.forEach(res => {
             if (res.comm === "fdmg") {
               if (res.dtype === "1") {
                 res.Handle = 0
               }
             } else if (res.comm === 'rmmg') {
               if (res.dtype === '1') {
                 res.Handle = 0
               }
             } else if (res.comm === 'dbmg') {
               if (res.dtype === '1') {
                 res.Handle = 0
               }
             }
             state.SystemHints.unshift(res)
           })
         }
         localStorage.setItem("System" + store.state.login.userId, JSON.stringify(state.SystemHints))*/

      /*************** 引入数据库后 处理****************************/
      state.DB.transaction((tx) => {
        // tx.executeSql('DROP TABLE IF EXISTS system_message');
        tx.executeSql('CREATE TABLE IF NOT EXISTS  system_message (id integer primary key, userId text, data text)');

        // alert('数据库调起')

        if (list.length > 0) {
          list.forEach((res) => {
            if (res.comm === "fdmg") {
              if (res.dtype === "1") {
                res.Handle = 0
              }
            }
            else if (res.comm === 'rmmg') {
              if (res.dtype === '1') {
                res.Handle = 0
              }
            }
            else if (res.comm === 'dbmg') {
              if (res.dtype === '1') {
                res.Handle = 0
              }
            }

            // alert('当前数据：' + JSON.stringify(res))
            // alert('插入数据之前 userid ：' + store.state.login.userId)
            tx.executeSql("INSERT INTO  system_message (userId ,data) VALUES (?,?)",
              [store.state.login.userId, JSON.stringify(res)],
              (tx, res) => {

                // alert('数据插入')
                tx.executeSql("select * from system_message where userId = (?)", [store.state.login.userId], function (tx, res) {
                  // alert("数据查询");
                  /*  let row = res.rows.item(0);
                    alert('RES 的值：' + JSON.stringify(res))
                    alert('RES .ROWS 的值：' + JSON.stringify(res.rows))
                    alert('ROW 的值为' + JSON.stringify(row))*/


                  let lists = []
                  let len = res.rows.length

                  for (let i = 0; i < len; i++) {
                    // alert('单个数据：' + JSON.stringify(res.rows.item(i)))
                    // list.push(JSON.parse(JSON.stringify(res.rows.item(i))))

                    let obj = {}
                    obj.id = res.rows.item(i).id
                    obj.data = JSON.parse(res.rows.item(i).data)
                    lists.push(obj)
                  }
                  // alert('list:' + JSON.stringify(lists))
                  state.SystemHints = lists
                });
              }, function (e) {
                alert("ERROR: " + e.message);
              });
          })
        }
      })

    },

    //客服 消息 处理
    CustomerMsgFun({state, commit}, list) {

      // alert('客服消息开始处理' + JSON.stringify(list))

      /*********************s数据库 引入之前处理***************************************/
      /* let OldList = localStorage.getItem("Customer" + store.state.login.userId)
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
       commit("SET_CustomerList", NewList)
       localStorage.setItem("Customer" + store.state.login.userId, JSON.stringify(NewList))*/


      /***********************数据库引入之后处理*************************************/

      // if (list.length > 0) {

      // alert('有数据')
      state.DB.transaction(function (tx) {
          // tx.executeSql('CREATE TABLE IF NOT EXISTS  customer_message (id integer primary key, data text)');

          tx.executeSql('CREATE TABLE IF NOT EXISTS customer_msg (id integer primary key,' +
            ' userId text ,' +
            ' timestamp INTEGER , ' +
            ' fId text , ' +         //  客服 id
            ' data text  ' +     //  回复内容
            ')')

          // alert("打开 数据库连接")
          list.forEach((res) => {
            tx.executeSql("INSERT INTO  customer_msg (userId,timestamp,fId,data) VALUES (?,?,?,?)",
              [store.state.login.userId, res.timestamp, res.fId, JSON.stringify(res)],
              function (tx, res) {

                // alert("客服消息插入成功")

              }, function (e) {
                alert("ERROR: " + e.message);
              });
          })


          tx.executeSql("select * from customer_msg  where userId = (?)", [store.state.login.userId], function (tx, res) {

            // alert("客服消息 查询成功")

            let list = []
            let len = res.rows.length

            for (let i = 0; i < len; i++) {
              // alert('单个数据：' + JSON.stringify(res.rows.item(i)))
              // list.push(JSON.parse(JSON.stringify(res.rows.item(i))))

              let obj = {}
              obj.id = res.rows.item(i).id
              obj.data = JSON.parse(res.rows.item(i).data)
              list.push(obj)
            }
            // alert('list:' + JSON.stringify(list))
            // state.SystemHints = list
            commit("SET_CustomerList", list)
          });
        }
      );
      // }

    },

    //判断 是否有系统消息、群聊、客服的消息未读
    _CSRMsg({state, commit, dispatch}) {
      let CustomerPrompt = localStorage.getItem('CustomerPrompt' + store.state.login.userId)
      let SystemPrompt = localStorage.getItem('SystemPrompt' + store.state.login.userId)
      let RoomPrompt = localStorage.getItem('RoomPrompt' + store.state.login.userId)

      if (CustomerPrompt === null) {
        commit("SET_CustomerPrompt", false)
      } else {
        commit("SET_CustomerPrompt", JSON.parse(CustomerPrompt))
      }

      if (SystemPrompt === null) {
        commit("SET_SystemPrompt", false)
      } else {
        commit("SET_SystemPrompt", JSON.parse(SystemPrompt))
      }

      if (RoomPrompt === null) {
        commit("SET_RoomPrompt", false)
      } else {
        commit("SET_RoomPrompt", JSON.parse(RoomPrompt))
      }

    },


    /*************数据库 引入之后  新增处理方法*************************/

    //加好友请求 处理方法 及 数据库更新
    SystemFriendHandle({state}, obj) {

      // alert('接受参数为：' + JSON.stringify(obj))

      let data = ''
      state.SystemHints.forEach(res => {
        if (res === obj.item) {
          res.data.Handle = obj.Handle
          data = JSON.stringify(res.data)
        }
      })
      // alert('c处理 data 为：' + data)
      state.DB.transaction(function (tx) {
        tx.executeSql('update system_message set data = (?)  where id = (?)', [data, obj.item.id], function (tx, res) {
          // alert('数据库修改结果' + JSON.stringify(res))
        })
      })
    },

    // 系统消息 数据库查询/初始化
    SystemMsgFind({state}) {
      state.DB.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS  system_message (id integer primary key, userId text, data text)')
        tx.executeSql("select * from system_message", [], function (tx, res) {
          let list = []
          let len = res.rows.length

          for (let i = 0; i < len; i++) {
            let obj = {}
            obj.id = res.rows.item(i).id
            obj.data = JSON.parse(res.rows.item(i).data)
            list.push(obj)
          }
          // alert('list:' + JSON.stringify(list))
          state.SystemHints = list
        })
      })
    },

    // 客服消息 数据库查询 /初始化
    InitializationCustomer({state, commit}) {
      state.DB.transaction((tx) => {
        // tx.executeSql('CREATE TABLE IF NOT EXISTS  customer_message (id integer primary key, data text)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS customer_msg (id integer primary key,' +
          ' userId text,' +
          ' timestamp INTEGER, ' +
          ' fId text , ' +         //  客服 id
          ' content text , ' +     //  回复内容
          ')')
        tx.executeSql("select * from customer_message", [], function (tx, res) {
          let list = []
          let len = res.rows.length

          for (let i = 0; i < len; i++) {
            let obj = {}
            obj.id = res.rows.item(i).id
            obj.data = JSON.parse(res.rows.item(i).data)
            list.push(obj)
          }
          commit("SET_CustomerList", list)
        })

      })
    },

  }
}

export default chat
