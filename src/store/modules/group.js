/*群 相关 数据*/


const group = {
  state: {
    RoomList: [],  //群列表
    RoomPermissions: 0,    // 我在本群中的角色
  },
  mutations: {
    SET_RoomList(state, list) {
      state.RoomList = list
    },
    SET_RoomPermissions(state, str) {
      state.RoomPermissions = str
    }
  }
}

export default group
