let app = getApp()
var API = require('../../utils/api.js')
Page({
    data: {
        imgUrls: [],
        homeClass: [],
        homeGoods: [],
        indicatorDots: true,
        autoplay: false,
        circular: true,
        interval: 5000,
        duration: 1000
    },
    onLoad() {
        this._requestGoodsAd()
    },
    onReady() {
        console.log('onReady')
        let currentPage = getCurrentPages()  //getCurrentPage
        console.log('currentPage', currentPage)
    },
    onShow() {
        console.log('onShow')
    },
    onHide() {
        console.log('onHide')
    },
    onUnload() {
        console.log('onUnload')
    },
    onPullDownRefresh() {
        this._requestGoodsAd(wx.stopPullDownRefresh())
    },
    onReachBottom() {
        console.log('onReachBottom')
    },
    onShareAppMessage() {
        console.log('onShareAppMessage')
    },
    onPageScroll() {
        console.log('onPageScroll')
    },
    onTabItemTap() {
        console.log('onTabItemTap')
    },
    _requestGoodsAd(callback) {
        let _wx = this
        wx.request({
            url: 'https://m.tamaidan.com/back/Goods/queryAd',
            success(res) {
                _wx.setData({
                    imgUrls: res.data.data.advertising,
                    homeClass: res.data.data.homeClass,
                    homeGoods: res.data.data.homeGoods
                })
                callback && callback()
            }
        })
    }
})