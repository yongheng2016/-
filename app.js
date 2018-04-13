//app.js
App({
    Test: {
        name: 'yang'
    },
    globalData: {
        userInfo: {},
        hasUserInfo: false
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        // wx.login({
        //   success: res => {
        //     console.log(res.code)
        //     if (res.code){
        //       wx.request({
        //           url:  'https://m.tamaidan.com/backtest/WXPay/ObtainOpenid?code=' + res.code,
        //         success: (response) => {
        //           console.log(response)
        //         }
        //       })
        //     }
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })
        //   wx.login({
        //       success: function (res) {
        //           if (res.code) {
        //               console.log(res.code)
        //               发起网络请求
        //               wx.request({
        //                   url: 'https://test.com/onLogin',
        //                   data: {
        //                       code: res.code
        //                   }
        //               })
        //           } else {
        //               console.log('登录失败！' + res.errMsg)
        //           }
        //       }
        //   });


        // wx.getUserInfo({
        //     success: function (res) {
        //         console.log(res)
        //         var userInfo = res.userInfo
        //         var nickName = userInfo.nickName
        //         var avatarUrl = userInfo.avatarUrl
        //         var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //         var province = userInfo.province
        //         var city = userInfo.city
        //         var country = userInfo.country
        //         var singtrue = res.signature
        //         wx.request({
        //             url: 'https://m.tamaidan.com/backtest/Order/QueryOrder',
        //             data: {
        //                 orderStatusId: 0,
        //                 page: 1,
        //                 rows: 10
        //             },
        //             success: function (response) {
        //                 console.log(response)
        //             }
        //         })

        //         var WXBizDataCrypt = require('./utils/WXBizDataCrypt')

        //         var appId = 'wx213dd7e437f332f8'
        //         var sessionKey = res.signature
        //         var encryptedData = res.encryptedData
        //         var iv = res.iv

        //         var pc = new WXBizDataCrypt(appId, sessionKey)

        //         var data = pc.decryptData(encryptedData, iv)

        //         console.log('解密后 data: ', data)

        //     }
        // })

        // 获取用户信息
        // wx.getSetting({
        //   success: res => {
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //       wx.getUserInfo({
        //         success: res => {
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo

        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //           }
        //         }
        //       })
        //     }
        //   }
        // })
    },
})