//首页数据

import store from "../index2"

const community = {
  state: {
    communityList: [],   //首页数据
    carouselList: [],      //首页轮播列表
    FriendsList: [],        //好友列表
    BrandCenterIndex: 0,   // 品牌中心下三个路由的选择索引
    homeName: "社群",
    HomeIndex: 1
  },
  mutations: {
    SET_communityDataList(state, list) {
      state.communityList = list
    },
    SET_carouselList(state, list) {
      state.carouselList = list
    },
    SET_FriendsList(state, list) {
      state.FriendsList = list
    },
    SET_BrandCenterIndex(state, str) {
      state.BrandCenterIndex = str
    },
    SET_homeName(state, str) {
      state.homeName = str
    },
    SET_HomeIndex(state, str) {
      state.HomeIndex = str
    },
  },
  actions: {
    // 增加好友信息提示
    SET_addFriendPrompt({state, commit, dispatch}, obj) {
      // console.log(obj)
      if (obj === undefined) {
      } else {
        state.FriendsList.forEach(function (item, index) {
          if (item.friendId === obj.fId) {
            item.isNewMsg = true
          }
        })
        // dispatch('_FriendListPreservation')
      }
    },
    //  取消好友消息提示
    _deleteFriendPrompt({state, commit, dispatch}) {
      // console.log(obj)
      state.FriendsList.forEach(function (item, index) {
        if (item.friendId === store.state.chat.NowChatId) {
          item.isNewMsg = false
        }
      })
      dispatch('_FriendListPreservation')
    },

    /* //  好友列表 的 保存
     _FriendListPreservation({state}) {
       localStorage.setItem('FriendList' + store.state.login.userId, JSON.stringify(state.FriendsList))
     },*/
  }
};
export default community
