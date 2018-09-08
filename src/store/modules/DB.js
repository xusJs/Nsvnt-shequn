import store from "../index2"

const SQL = {
    state: {},
    mutations: {},
    actions: {

      /***********数据库 操作************************/

      //  好友列表  数据层更新
      DB_friend_userInfo({state, commit, dispatch}, list) {
        // alert("好友列表" + JSON.stringify(list))
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendsList (id integer primary key,' +
            ' userId text , ' +        // 用户id
            ' friendId text ,' +       // 好友id
            ' realName text ,' +       // 好友名称
            ' headPortrait text ,' +      // 好友头像
            ' nick text ' +             // 好友昵称
            ')',
            [],
            (tx, res) => {
              // alert("好友列表  建表成功")
            })

          tx.executeSql('DELETE FROM FriendsList where userId = (?)',
            [store.state.login.userId],
            (tx, response) => {
              // alert("好友列表  删除已有的好友")

              list.forEach((item, index) => {
                // tx.executeSql('INSERT INTO  FriendsList (userId,friendId,realName,headPortrait,nick) VALUES (?,?,?,?,?)',
                tx.executeSql('INSERT INTO  FriendsList (userId,friendId,realName,headPortrait) VALUES (?,?,?,?)',
                  // [store.state.login.userId, item.friendId, item.realName, item.headPortrait, item.nick],
                  [store.state.login.userId, item.friendId, item.realName, item.headPortrait],
                  (tx, res) => {
                    // alert("好友列表  数据插入 成功")

                    // 更新视图层
                    dispatch("DB_friend_userInfoSelect")
                  })
              })
            })
        })
      },

      //  好友列表  // 视图层更新
      DB_friend_userInfoSelect({state, commit, dispatch}) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendsList (id integer primary key,' +
            ' userId text , ' +        // 用户id
            ' friendId text ,' +       // 好友id
            ' realName text ,' +       // 好友名称
            ' headPortrait text ,' +      // 好友头像
            ' nick text ' +             // 好友昵称
            ')',
            [],
            (tx, res) => {
              tx.executeSql('select *  from FriendsList where userId = (?)',
                [store.state.login.userId],
                (tx, res) => {
                  let list = [];
                  let len = res.rows.length
                  for (let i = 0; i < len; i++) {
                    list.push(res.rows.item(i))
                  }
                  commit("SET_FriendsList", list)
                })
            })
        })
      },

      // 好友列表 版本 // 存储/更新 数据逻辑操作
      DB_FriendVersionEnter({state, commit, dispatch}, obj) {
        // alert('好友本地查询 DB_FriendVersionEnter 方法')
        store.state.chat.DB.transaction(function (tx) {
          /*
                  tx.executeSql('DROP TABLE FriendVersion', [], function (tx, res) {
                    alert('删表语句完毕')
                  })*/
          // alert("删表语句执行完毕")
          // alert('好友本地查询')
          tx.executeSql('CREATE TABLE IF NOT EXISTS  FriendVersion (id integer primary key,' +
            ' userId text ,' +
            ' versionNum text ' +    // 版本
            ')')
          tx.executeSql('select *  from FriendVersion where userId = (?)',
            [store.state.login.userId],
            (tx, res) => {
              // alert('本地数据库 查询')
              let len = res.rows.length
              if (len === 0) {
                tx.executeSql('INSERT INTO  FriendVersion (userId,versionNum) VALUES (?,?) ',
                  [store.state.login.userId, obj.version],
                  (tx, res) => {
                    // alert('本地无版本')
                    dispatch("_FriendsList")
                  })
              } else {
                let Version = res.rows.item(0).versionNum
                // alert('查询版本为：' + Version)
                if (Version != obj.version) {
                  // alert('版本不同')
                  tx.executeSql('UPDATE FriendVersion SET versionNum = (?) where userId = (?)',
                    [obj.version, store.state.login.userId],
                    (tx, res) => {
                      // alert('查询 好友列表 ')
                      dispatch("_FriendsList")
                    })
                } else {
                  // alert('版本相同')
                  dispatch('DB_friend_userInfoSelect')
                }
              }
            })
        })
      },


      // iot设备列表 版本 数据逻辑操作
      DB_IOTVersion({state, commit, dispatch}, obj) {
        store.state.chat.DB.transaction((tx) => {

          /*  tx.executeSql('DROP TABLE IOTVersion', [], function (tx, res) {
              // alert('删表语句完毕')
            })*/

          tx.executeSql('CREATE TABLE IF NOT EXISTS IOTVersion (id integer primary key,' +
            ' userId text,' +
            ' version text ' +    // 版本
            ')')
          tx.executeSql('select *  from  IOTVersion where userId = (?)', [store.state.login.userId], (tx, res) => {
            let len = res.rows.length
            if (len === 0) {
              tx.executeSql('INSERT INTO  IOTVersion (userId,version) VALUES (?,?) ',
                [store.state.login.userId, obj.version],
                (tx, res) => {
                  // alert('本地无版本')
                  dispatch("FindIot")
                })
            } else {
              let Version = res.rows.item(0).version
              if (Version != obj.version) {
                // alert('版本不同')
                tx.executeSql('UPDATE IOTVersion SET version = (?) where userId = (?)',
                  [obj.version, store.state.login.userId],
                  (tx, res) => {
                    // alert('查询 IOT列表 ')
                    dispatch("FindIot")
                  })
              } else {
                // alert('版本相同')
                dispatch('DB_IOTVersionView')
              }
            }

          })


        })
      },

      //  IOT 设备 数据层 更新
      DB_IOTVersionData({state, commit, dispatch}, list) {
        // alert(JSON.stringify(list))
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS DevList (id integer primary key,' +
            ' userId text , ' +
            ' downer text , ' +           //  设备  所属  1主  2共享
            ' devBarcode text , ' +        //  设备 条形码
            ' devQrcode text , ' +         //  设备 二维码
            ' devType text , ' +           //  设备 类型
            ' devid text , ' +             //  设备ID
            ' devname text , ' +           //  设备名称
            ' pic text ' +               //  设备头像
            ')')


          tx.executeSql('DELETE FROM DevList where userId = (?)',
            [store.state.login.userId],
            (tx, response) => {
              // alert("删除已有的iot设备 数据")
              list.forEach((item, index) => {
                tx.executeSql('INSERT INTO  DevList (userId,downer,devBarcode,devQrcode,devType,devid,devname,pic) VALUES (?,?,?,?,?,?,?,?)',
                  [store.state.login.userId, item.downer, item.devBarcode, item.devQrcode, item.devType, item.devid, item.devname, item.pic[0]],
                  (tx, res) => {
                    // alert(" iot数据插入 成功")

                    // 更新视图层
                    dispatch("DB_IOTVersionView")
                  })
              })
            })
        })
      },

      // IOT 设备 视图层更新
      DB_IOTVersionView({state, commit}) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS  DevList (id integer primary key,' +
            ' userId text , ' +
            ' downer text , ' +           //  设备  所属  1主  2共享
            ' devBarcode text , ' +        //  设备 条形码
            ' devQrcode text , ' +         //  设备 二维码
            ' devType text , ' +           //  设备 类型
            ' devid text , ' +             //  设备ID
            ' devname text , ' +           //  设备名称
            ' pic text ' +               //  设备头像
            ')',
            [],
            (tx, res) => {
              tx.executeSql('select *  from  DevList where userId = (?)',
                [store.state.login.userId],
                (tx, res) => {
                  let list = [];
                  let len = res.rows.length
                  for (let i = 0; i < len; i++) {
                    list.push(res.rows.item(i))
                  }
                  commit("SET_IOTEquipmentList", list)

                  // alert('iot 视图数据' + JSON.stringify(list))
                })
            })
        })
      },


      // 群列表 版本  数据逻辑操作
      DB_RoomVersion({state, commit, dispatch}, obj) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomVersion (id integer primary key,' +
            ' userId text,' +
            ' version text' +    // 版本
            ')')
          tx.executeSql('select *  from  RoomVersion where userId = (?)', [store.state.login.userId], (tx, res) => {
            let len = res.rows.length
            if (len === 0) {
              tx.executeSql('INSERT INTO  RoomVersion (userId,version) VALUES (?,?) ',
                [store.state.login.userId, obj.version],
                (tx, res) => {
                  // alert('本地无版本')
                  dispatch("_RoomList")
                })
            } else {
              let Version = res.rows.item(0).version
              if (Version != obj.version) {
                // alert('版本不同')
                tx.executeSql('UPDATE RoomVersion SET version = (?) where userId = (?)',
                  [obj.version, store.state.login.userId],
                  (tx, res) => {
                    // alert('查询 群列表 ')
                    dispatch("_RoomList")
                  })
              } else {
                // alert('版本相同')
                dispatch('DB_RoomVersionView')
              }
            }

          })

        })
      },

      // 群列表 数据层 更新
      DB_RoomVersionData({state, commit, dispatch}, list) {
        // alert(JSON.stringify(list))
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomList (id integer primary key,' +
            ' userId text,' +
            ' owner text,' +           // 是否是群主
            ' admin text,' +           // 是否是管理员
            ' avatar text,' +          // 群头像
            ' description text,' +      // 群说明
            ' naturalName  text,' +     // 群名
            ' subject text,' +          // 群类型
            ' owenerId text,' +         // 群主ID
            ' roomId text' +                //群 ID
            ')')


          tx.executeSql('DELETE FROM RoomList where userId = (?)',
            [store.state.login.userId],
            (tx, response) => {
              // alert("删除已有的iot设备 数据")
              list.forEach((item, index) => {
                tx.executeSql('INSERT INTO  RoomList (userId,owner,admin,avatar,description,naturalName,subject,owenerId,roomId) VALUES (?,?,?,?,?,?,?,?,?)',
                  [store.state.login.userId, item.owner, item.admin, item.avatar, item.description, item.naturalName, item.subject, item.powenerId, item.id],
                  (tx, res) => {
                    // alert(" iot数据插入 成功")

                    // 更新视图层
                    dispatch("DB_RoomVersionView")
                  })
              })
            })


        })
      },

      //群列表  视图层更新
      DB_RoomVersionView({state, commit}) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomList (id integer primary key,' +
            ' userId text,' +
            ' owner text,' +           // 是否是群主
            ' admin text,' +           // 是否是管理员
            ' avatar text,' +          // 群头像
            ' description text,' +      // 群说明
            ' naturalName  text,' +     // 群名
            ' subject text,' +          // 群类型
            ' owenerId text,' +         // 群主ID
            ' id text' +                //群 ID
            ')', [], (tx, res) => {
            tx.executeSql('select *  from  RoomList where userId = (?)',
              [store.state.login.userId],
              (tx, res) => {
                let list = [];
                let len = res.rows.length
                for (let i = 0; i < len; i++) {
                  list.push(res.rows.item(i))
                }
                commit("SET_RoomList", list)

                // alert('群 视图数据' + JSON.stringify(list))
              })
          })
        })
      },


      //  群成员信息 版本 数据逻辑操作
      DB_RoomInfoVersion({state, commit, dispatch}, obj) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomInfoVersion (id integer primary key,' +
            ' rId text, ' +       // 群id
            ' version text ' +    // 群 成员版本
            ')')
          tx.executeSql('select *  from  RoomInfoVersion where rId = (?) and version = (?)', [obj.rId, obj.version], (tx, res) => {
            let len = res.rows.length
            if (len === 0) {
              // alert('本地无版本')
              tx.executeSql('INSERT INTO  RoomInfoVersion (rId,version) VALUES (?,?) ',
                [obj.rId, obj.version],
                (tx, res) => {
                  dispatch("selectRoomMember", {roomId: obj.rId})
                })
            } else {
              let Version = res.rows.item(0).version
              if (Version != obj.version) {
                // alert('版本不同')
                tx.executeSql('UPDATE RoomInfoVersion SET version = (?) where rId = (?)',
                  [obj.version, obj.rId],
                  (tx, res) => {
                    // alert('查询 群列表 ')
                    dispatch("selectRoomMember", {roomId: obj.rId})
                  })
              } else {
                // alert('版本相同')
                dispatch('DB_RoomInfoVersionView', {rId: obj.rId})
              }
            }
          })
        })
      },

      // 群成员信息  数据层 更新
      DB_RoomInfoVersionData({state, commit, dispatch}, obj) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomMember_Info (id integer primary key,' +
            ' rId text, ' +                // 群ID
            ' headPortrait text, ' +      // 群成员 头像
            // ' nick text, ' +               // 群成员 昵称
            ' realName text, ' +         // 群成员 真实名称
            ' userId text ' +              // 群成员ID
            // ' sta text ' +              // 群成员 在群内的身份   1 群主  2 管理员  3群员
            ')')


          tx.executeSql('DELETE FROM RoomMember_Info where rId = (?)',
            [obj.rId],
            (tx, response) => {

              obj.list.forEach((item, index) => {
                tx.executeSql('INSERT INTO  RoomMember_Info (rId,headPortrait,realName,userId) VALUES (?,?,?,?)',
                  [obj.rId, item.headPortrait, item.realName, item.userId],
                  (tx, res) => {
                    // alert(" iot数据插入 成功")

                    // 更新视图层
                    dispatch("DB_RoomInfoVersionView", {rId: obj.rId})
                  })
              })
            })
        })
      },

      //群成员信息 视图层 更新
      DB_RoomInfoVersionView({state, commit, dispatch}, obj) {
        store.state.chat.DB.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS RoomMember_Info (id integer primary key,' +
            ' rId text, ' +                 // 群ID
            ' headPortrait text, ' +      // 群成员 头像
            // ' nick text, ' +               // 群成员 昵称
            ' realName text, ' +         // 群成员 真实名称
            ' uId text ' +              // 群成员ID
            // ' sta text ' +              // 群成员 在群内的身份   1 群主  2 管理员  3群员
            ')')

          tx.executeSql('select *  from  RoomMember_Info where rId = (?)',
            [obj.rId],
            (tx, res) => {
              let list = [];
              let len = res.rows.length
              for (let i = 0; i < len; i++) {
                list.push(res.rows.item(i))
              }

              commit("SET_RoomMemberList", list)

              // alert('群 视图数据' + JSON.stringify(list))
            })


        })
      },


    }
  }
;

export default SQL
