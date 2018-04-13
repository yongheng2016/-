// pages/orderGoodsDetail/orderGoodsDetail.js
var API = require('../../utils/api.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        orderData: [],  //订单数据
        showDialog: false,  //显示物流面板
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _wx = this
        API.ajax({
            url: '//Order/QueryOrder',
            data: {
                orderId: options.orderId,
                singtrue: "oz4l9w6ZrvGjlf66TMdbVR7atXHo,1523424426,1C1630BE1636549A76B00B312BC45A8F"
            },
            success: function (res) {
                console.log(res)
                _wx.setData({
                    orderData: res.data.data[0]
                })
            }
        })
        console.log(this.data.orderData)
    },
    _call() {
        console.log('a')
        wx.makePhoneCall({
            phoneNumber: '010-82888211' //仅为示例，并非真实的电话号码
        })
    },
    _logisticsShow() {
        this.setData({
            showDialog: !this.data.showDialog
        })
        console.log(this.data.showDialog)
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

    }
})