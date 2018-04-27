// pages/goodsDetail/goodsDetail.js
var common = require('../../common/js/imgUrl.js')
var _animation = require('../../common/js/animation.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: [],  //产品参数
        adImg: '',  //轮播图片
        detailsImg: '',  //介绍图片
        goodsStandard: [], //产品规格
        goodsStandardStatus: false,
        actionSheetShow: false,
        addshoppingInfo: {}, //AddShoppingCartActionSheet传来的商品数据
        animationPanel: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _wx = this
        let goodsId = options.goodsId
        wx.request({
            // url: `https://m.tamaidan.com/backtest/Goods/queryGoods?GoodsId=${goodsId}`,
            url: `https://m.tamaidan.com/backtest/Goods/queryGoods?GoodsId=3001`,
            success(res) {
                _wx.setData({
                    goodsDetail: res.data.data,
                    adImg: res.data.data.GoodsImg,
                    detailsImg: res.data.data.GoodsDetails
                })
            }
        })
        wx.request({
            // url: `https://m.tamaidan.com/backtest/Goods/queryStandard?' + 'GoodsId=${goodsId}`,
            url: `https://m.tamaidan.com/backtest/Goods/queryStandard?GoodsId=3001`,
            success(res) {
                let goodsStandard = JSON.parse(res.data.data.goodsStandard)[0].params
                console.log(goodsStandard)
                _wx.setData({
                    goodsStandard: goodsStandard
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    _showPanel() {
        this.setData({
            goodsStandardStatus: !this.data.goodsStandardStatus,
        }, function () {
            // if (this.data.goodsStandardStatus){
            //     let show_height = _animation._height(100)
            //     this.setData({
            //         animationPanel: show_height.export()
            //     })
            // }else{
            //     let show_height = _animation._height(0)
            //     this.setData({
            //         animationPanel: show_height.export()
            //     })             
            // }
        })
    },
    showActionSheet() {
        this.setData({
            actionSheetShow: !this.data.actionSheetShow
        })
    },
    main_page_mehod(eventDetail) {
        this.setData({
            addshoppingInfo: eventDetail.detail
        })
    },
    _viewShoppingCart() {
        wx.navigateTo({
            url: `../logs/logs?goodsId=${this.data.addshoppingInfo.goodsId}&goodsNumber=${this.data.addshoppingInfo.goodsNumber}`
        })
    },
    _payfor() {
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})