import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from "@/components/register"
import setting from "@/components/setting"
import home from "@/components/home"

/**
 *
 * 首页下的四个 子路由
 *
 *  Community 首页 社群
 *  Contacts  联系人
 *  Find    发现
 *  BrandCenter 品牌中心
 * */

import Community from "../components/home/Community"
import Contacts from "../components/home/Contacts"
import Find from "../components/home/Find"
import BrandCenter from "../components/home/BrandCenter"

//群列表
import myRoomList from "../components/myRoomList"
//发布项目
import ReleaseProject from "../components/ReleaseProject"
//申请企业播客
import ApplicationEnterprises from "../components/ApplicationEnterprises"


// 品牌中心下的三个路由 个人 企业 社团
import Personal from "../components/home/brand/Personal"
import enterprise from "../components/home/brand/enterprise"
import association from "../components/home/brand/association"


// 添加新IOT设备 （扫一扫）
import addIOT from "../components/addIOT"

//  个人中心 与 个人设置

import PersonalCenter from "../components/PersonalCenter"
import PersonalSetting from "../components/PersonalSetting"


/*********个人中心下的区块链钱包 路由********/

// 区块链 主页面
import BlockChain from "../components/BlockChain/BlockChain"

// 登录
import BlockChainLogin from "../components/BlockChain/BlockChainLogin"
// 新账户
import BlockChainNewUser from "../components/BlockChain/BlockChainNewUser"
// 确认密码
import BlockChainConfirm from "../components/BlockChain/BlockChainConfirm"
// 个人中心
import BlockChainHome from "../components/BlockChain/BlockChainHome"
// 联系人
import BlockChainContacts from "../components/BlockChain/BlockChainContacts"
// 受托人
import BlockChainClient from "../components/BlockChain/BlockChainClient"
// 交易
import BlockChainTransaction from "../components/BlockChain/BlockChainTransaction"

// 设置支付密码
import BlockChainSetPwd from "../components/BlockChain/BlockChainSetPwd"

// 设置用户名
import BlockChainUsername from "../components/BlockChain/BlockChainUsername"

// 发送 STU
import BlockChainSend from "../components/BlockChain/BlockChainSend"

// 受托人 注册
import BlockChainClientReg from "../components/BlockChain/BlockChainClientReg"

// 受托人 列表 已入围/候选
import BlockChainClientList from "../components/BlockChain/BlockChainClientList"

// 添加联系人
import BlockChainAddContact from "../components/BlockChain/BlockChainAddContact"

// 待处理联系人

/**********************区块链钱包 路由结束**********************************************/


/**************app 商城路由******开始*****************************************/

import Shop from "../components/shop/Shop"

//  商城首页
import ShopHome from "../components/shop/ShopHome"

//  商城分类
import ShopClassification from "../components/shop/ShopClassification"

//  个人中心
import ShopPersonalCenter from "../components/shop/ShopPersonalCenter"

//  商品详情
import ShopCommodityDetails from "../components/shop/ShopCommodityDetails"

//  确认订单
import ShopConfirmationOrder from "../components/shop/ShopConfirmationOrder"

//  商品搜索
import ShopSearchProduct from "../components/shop/ShopSearchProduct"

// 我的购物车
import ShopCart from "../components/shop/ShopCart"

//  我的订单
import ShopMyOrder from "../components/shop/ShopMyOrder"

//地址管理
import ShopAddress from "../components/shop/ShopAddress"

// 新增地址
import ShopAddAddress from "../components/shop/ShopAddAddress"

// 评价
import ShopCommodityEva from "../components/shop/ShopCommodityEva"


/*****************app 商城路由******结束*******************************************************/


// 项目详情

import ProjectDetails from "../components/ProjectDetails"


//申请 社团
import ApplicationClub from "../components/ApplicationClub"


//申请加群
import ApplicationGroup from "../components/ApplicationGroup"


// 个人信息
import Personalinformation from "../components/Personalinformation"

//客服
import Customer from "../components/Customer"

// 直播间
import liveRoom from "../components/liveRoom"

//找回密码
import Retrievepwd from "../components/Retrievepwd"

// 二维码 扫描 页
import QRcode from "../components/QRcode"

// 我的钱包
import MyWallet from "../components/MyWallet"

//充值页
import Recharge from "../components/Recharge"

// 设备市场
import shop from "../components/shop/ShopHome"

//交易记录
import TransactionRecord from "../components/TransactionRecord"

//我的订单
import MyOrder from "../components/MyOrder"

//  提现 申请
import ApplicationPresentation from "../components/ApplicationPresentation"

//历史记录
import HistoricalRecords from "../components/HistoricalRecords"

// wifi 二维码
import WifiQrCode from "../components/WifiQrCode"

// 项目展示页
import ProjectDisplay from "../components/ProjectDisplay"


// ***************** IOT设备类型 控制      ****************************

//音乐
import IOTMusic from "../components/IOTMusic"
//照相
import IOTPhoto from "../components/IOTPhoto"
//锁
import IOTLock from "../components/IOTLock"
// 寻找
import IOTSearch from "../components/IOTSearch"
// 温度
import IOTTemperature from "../components/IOTtemperature"

/**
 *
 * 新增路由结束
 * */


import chat from "@/components/chat"
import IOTDetails from "@/components/IOTDetails"
import addF from "@/components/addF"
import sysmsgs from "@/components/sysmsgs"
import namecard from "@/components/namecard"
import addR from "@/components/addR"
import roomchat from "@/components/roomchat"
import roomcard from "@/components/roomcard"
import roomMemberManagement from "@/components/roomMemberManagement"
import alterRoomMsg from "@/components/alterRoomMsg"
import AboutMe from "@/components/AboutMe"


import test from "@/components/test"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/setting",
      name: "setting",
      component: setting
    },
    {
      path: "/chat/:id",
      name: "chat",
      component: chat
    },
    {
      path: "/IOTDetails/:devid",
      name: "IOTDetails",
      component: IOTDetails,
    },
    {
      path: 'IOTMusic',
      name: "IOTMusic",
      component: IOTMusic
    },
    {
      path: 'IOTPhoto',
      name: "IOTPhoto",
      component: IOTPhoto
    },
    {
      path: 'IOTLock',
      name: "IOTLock",
      component: IOTLock
    },
    {
      path: '/IOTSearch',
      name: "IOTSearch",
      component: IOTSearch
    },
    {
      path: '/IOTTemperature',
      name: "IOTTemperature",
      component: IOTTemperature
    },
    {
      path: "/addF",
      name: "addF",
      component: addF
    },
    {
      path: "/sysmsgs",
      name: "sysmsgs",
      component: sysmsgs
    },
    {
      path: '/namecard/:id',
      name: "namecard",
      component: namecard
    },
    {
      path: "/addR",
      name: "addR",
      component: addR
    },
    {
      path: "/roomchat/:rid",
      name: "roomchat",
      component: roomchat
    },
    {
      path: "/roomcard/:rid",
      name: "roomcard",
      component: roomcard
    },
    {
      path: "/roomMemberManagement/:operation",
      name: "roomMemberManagement",
      component: roomMemberManagement
    },
    {
      path: "/alterRoomMsg",
      name: "alterRoomMsg",
      component: alterRoomMsg
    },
    {
      path: "/myRoomList",
      name: "myRoomList",
      component: myRoomList
    },
    {
      path: "/ReleaseProject",
      name: "ReleaseProject",
      component: ReleaseProject
    },
    {
      path: "/ApplicationEnterprises",
      name: "ApplicationEnterprises",
      component: ApplicationEnterprises
    },
    {
      path: "/addIOT",
      name: "addIOT",
      component: addIOT
    },
    {
      path: "/PersonalCenter",
      name: "PersonalCenter",
      component: PersonalCenter,
    },
    {
      path: '/BlockChain',
      name: "BlockChain",
      component: BlockChain,
      children: [
        {
          path: 'BlockChainLogin',
          name: "BlockChainLogin",
          component: BlockChainLogin
        },
        {
          path: 'BlockChainNewUser',
          name: "BlockChainNewUser",
          component: BlockChainNewUser
        },
        {
          path: 'BlockChainConfirm',
          name: "BlockChainConfirm",
          component: BlockChainConfirm
        },
        {
          path: 'BlockChainHome',
          name: "BlockChainHome",
          component: BlockChainHome
        },
        {
          path: 'BlockChainContacts',
          name: "BlockChainContacts",
          component: BlockChainContacts
        },
        {
          path: 'BlockChainClient',
          name: "BlockChainClient",
          component: BlockChainClient
        },
        {
          path: 'BlockChainTransaction',
          name: "BlockChainTransaction",
          component: BlockChainTransaction
        },
        {
          path: 'BlockChainSetPwd',
          name: "BlockChainSetPwd",
          component: BlockChainSetPwd
        },
        {
          path: 'BlockChainUsername',
          name: "BlockChainUsername",
          component: BlockChainUsername
        },
        {
          path: 'BlockChainSend/:addressId',
          name: "BlockChainSend",
          component: BlockChainSend
        },
        {
          path: 'BlockChainClientReg',
          name: "BlockChainClientReg",
          component: BlockChainClientReg
        },
        {
          path: 'BlockChainClientList/:type',
          name: "BlockChainClientList",
          component: BlockChainClientList
        },
        {
          path: 'BlockChainAddContact/:addressId',
          name: "BlockChainAddContact",
          component: BlockChainAddContact
        },
      ]
    },
    {
      path: "/PersonalSetting",
      name: "PersonalSetting",
      component: PersonalSetting
    },
    {
      path: "/ProjectDetails/:ProjectId/:ProjectType",
      name: "ProjectDetails",
      component: ProjectDetails
    },
    {
      path: "/ApplicationClub",
      name: "ApplicationClub",
      component: ApplicationClub
    },
    {
      path: "/ApplicationGroup",
      name: "ApplicationGroup",
      component: ApplicationGroup
    },
    {
      path: "/Personalinformation/:uid",
      name: "Personalinformation",
      component: Personalinformation
    },
    {
      path: "/Customer",
      name: "Customer",
      component: Customer
    },
    {
      path: "/liveRoom/:liveId",
      name: "liveRoom",
      component: liveRoom
    },
    {
      path: "/Retrievepwd",
      name: "Retrievepwd",
      component: Retrievepwd
    },
    {
      path: "/QRcode",
      name: "QRcode",
      component: QRcode
    },
    {
      path: "/MyWallet",
      name: "MyWallet",
      component: MyWallet
    },
    {
      path: "/Recharge",
      name: "Recharge",
      component: Recharge
    },
    {
      path: "/shop",
      name: "shop",
      component: shop
    },
    {
      path: "/TransactionRecord",
      name: "TransactionRecord",
      component: TransactionRecord
    },
    {
      path: "/MyOrder",
      name: "MyOrder",
      component: MyOrder
    },
    {
      path: "/ApplicationPresentation",
      name: "ApplicationPresentation",
      component: ApplicationPresentation
    },
    {
      path: "/HistoricalRecords/:uid",
      name: "HistoricalRecords",
      component: HistoricalRecords
    },
    {
      path: "/WifiQrCode",
      name: "WifiQrCode",
      component: WifiQrCode
    },
    {
      path: "/ProjectDisplay",
      name: "ProjectDisplay",
      component: ProjectDisplay
    },
    {
      path: "/",
      name: "home",
      component: home,
      children: [
        {
          path: '',
          name: "Community",
          component: Community,
        },
        {
          path: 'Contacts',
          name: "Contacts",
          component: Contacts
        },
        {
          path: 'Find',
          name: "Find",
          component: Find
        },
        {
          path: 'BrandCenter',
          name: "BrandCenter",
          component: BrandCenter,
          children: [
            {
              path: "",
              name: "Personal",
              component: Personal
            },
            {
              path: "enterprise",
              name: "enterprise",
              component: enterprise
            },
            {
              path: "association",
              name: "association",
              component: association
            }
          ]
        }
      ]
    },
    {
      path: "AboutMe",
      name: "AboutMe",
      component: AboutMe
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop,
      children: [
        {
          path: 'ShopHome',
          name: 'ShopHome',
          component: ShopHome,
        },
        {
          path: 'ShopClassification',
          name: "ShopClassification",
          component: ShopClassification,
        },
        {
          path: 'ShopPersonalCenter',
          name: "ShopPersonalCenter",
          component: ShopPersonalCenter,
        },
        {
          path: 'ShopCommodityDetails/:ShopPid',
          name: "ShopCommodityDetails",
          component: ShopCommodityDetails,
        },
        {
          path: 'ShopConfirmationOrder',
          name: "ShopConfirmationOrder",
          component: ShopConfirmationOrder,
        },
        {
          path: 'ShopSearchProduct/:cid',
          name: "ShopSearchProduct",
          component: ShopSearchProduct,
        },
        {
          path: 'ShopMyOrder/:isIndex',
          name: "ShopMyOrder",
          component: ShopMyOrder,
        },
        {
          path: 'ShopAddress',
          name: "ShopAddress",
          component: ShopAddress,
        },
        {
          path: 'ShopAddAddress',
          name: "ShopAddAddress",
          component: ShopAddAddress,
        },
        {
          path: 'ShopCommodityEva',
          name: "ShopCommodityEva",
          component: ShopCommodityEva,
        },
        {
          path: 'ShopCart',
          name: "ShopCart",
          component: ShopCart,
        },
      ]
    },
    {
      path: "*",
      name: "error",
      component: test
    }
  ]
})
