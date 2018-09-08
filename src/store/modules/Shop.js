// 商城 模块数据
import store from "../index2"
import axios from "axios"
import Qs from "qs"
import md5 from "js-md5"
import $config from "../../config/index"

let timestamp = Date.parse(new Date())

const Shop = {
  state: {
    ConfirmationOrderList: [],   //确认订单时，商品数据  。含数量
    orderTotal: 0,              // 订单总价

    EvaluationData: {},     // 去评价时 保存的订单对象

    isPur: false,            // 是否 是直接购买

  },
  mutations: {
    SET_ConfirmationOrderList(state, list) {
      state.ConfirmationOrderList = list
    },

    SET_orderTotal(state) {
      state.orderTotal = 0
      state.ConfirmationOrderList.forEach((res, index) => {
        state.orderTotal = (state.orderTotal + (res.CommodityNum * res.price)).toFixed(2)
      })
    },   // 单商品 总价计算
    SET_orderTotals(state) {
      // state.orderTotal = 0
      let total = 0;
      state.ConfirmationOrderList.forEach((res, index) => {
        // state.orderTotal = (parseFloat(state.orderTotal + (res.purchaseCount * res.productInfo.price))).toFixed(2)

        total += (res.purchaseCount * res.productInfo.price)


      })
      state.orderTotal = total.toFixed(2)


    },// 购物车（多商品总价计算）
    SET_EvaluationData(state, obj) {
      state.EvaluationData = obj
    },
    SET_isPur(state, obj) {
      state.isPur = obj
    },
  },
  actions: {
    //******商城系列请求**********************/

    // 首页商品
    ShopHomeProduct({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          page: obj.page,
          pageSize: obj.pageSize
        })
        axios.post($config.bizserverApi + "/mallindexservice/productlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  收货地址添加
    ShopAddAddress({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          userName: obj.name,
          mobilePhoneNo: obj.tel,
          region: obj.province + "-" + obj.city + "-" + obj.county,
          address: obj.address_detail
        })
        axios.post($config.bizserverApi + "/userservice/addrecvaddr", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  收货地址查询
    ShopFindAddress({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
        })
        axios.post($config.bizserverApi + "/userservice/recvaddrlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  收货地址删除
    ShopDelAddress({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          addrId: obj.addrId
        })
        axios.post($config.bizserverApi + "/userservice/delrecvaddr", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  商品详情 查询
    ShopFindProduct({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          productId: obj.productId
        })
        axios.post($config.bizserverApi + "/productservice/productinfo", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  商品评价 查询
    ShopProductEva({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          productId: obj.productId,
          page: obj.page,
          pageSize: obj.pageSize
        })
        axios.post($config.bizserverApi + "/productservice/evaluatelist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  确认订单  单商品
    ShopConfirmOrder({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          productId: obj.productId,
          purchaseCount: obj.purchaseCount,
          postage: obj.postage,
          recvAddrId: obj.recvAddrId
        })
        axios.post($config.bizserverApi + "/orderservice/addorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 确认订单 多商品（购物车）
    ShopConfirmOrders({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          productIds: JSON.stringify(obj.productIds),
          postage: obj.postage,
          recvAddrId: obj.recvAddrId
        })
        axios.post($config.bizserverApi + "/orderservice/addcartorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  微信支付
    ShopWechatPlay({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          orderNo: obj.orderNo,
          payType: "3"
        })
        axios.post($config.bizserverApi + "/orderservice/payorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  订单查询
    ShopMyOrders({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          orderStatus: obj.orderStatus
        })
        axios.post($config.bizserverApi + "/orderservice/buyerorderlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  取消订单
    ShopCancelOrder({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          orderId: obj.orderId
        })
        axios.post($config.bizserverApi + "/orderservice/cancelorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  确认收货
    ShopRecOrder({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          orderId: obj.orderId
        })
        axios.post($config.bizserverApi + "/orderservice/confirmreceipt", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 订单商品评价
    ShopOrderEva({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          orderId: state.EvaluationData.id,
          productId: state.EvaluationData.detailList[0].productInfo.id,
          productScore: obj.productScore + ".0",
          content: obj.content
        });

        axios.post($config.bizserverApi + "/orderservice/evaluateorder", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  分类查询
    ShopFindClassification({state}, obj) {
      return new Promise((resolve, reject) => {
        axios.post($config.bizserverApi + "/productservice/categorylist")
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  商品搜索查询
    ShopSearchProducts({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify(obj)
        axios.post($config.bizserverApi + "/productservice/productlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    /****************购物车模块******************************/

    // 购物车添加 / 编辑商品
    ShopAddShopping({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          productId: obj.productId,
          purchaseCount: obj.purchaseCount
        })
        axios.post($config.bizserverApi + "/orderservice/addtocart", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //  购物车 删除商品
    /****
     *
     * productIds 需要删除的商品 数组id
     * ***/
    ShopRemoveShopping({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
          productIds: JSON.stringify(obj.productIds),
        })
        axios.post($config.bizserverApi + "/orderservice/delfromcart", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    //  购物车商品 查看
    ShopShowShopping({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
        })
        axios.post($config.bizserverApi + "/orderservice/cartlist", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 购物车 计数
    ShopCartNum({state}, obj) {
      return new Promise((resolve, reject) => {
        let data = Qs.stringify({
          userId: store.state.login.userId,
          timestamp: timestamp,
          sign: md5(store.state.login.token + timestamp),
          token: store.state.login.token,
        })
        axios.post($config.bizserverApi + "/orderservice/cartcount", data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


  }
}

export default Shop
