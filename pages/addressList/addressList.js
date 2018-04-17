// pages/address/address.js
let App = getApp()
let baseHost = App.globalData.baseHost
let singtrue = wx.getStorageSync('singtrue') || ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [],
        defaultId: 0,
        editAddressInfo: {}  //传入
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._requestAdress()
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
    _addressDefault(event) {
        wx.request({
            method: 'POST',
            url: baseHost + '/User/UpdateAddress',
            data: {
                addressId: event.currentTarget.id,
                addressStatus: 1,
                singtrue
            },
            success: () => {
                this.setData({
                    defaultId: event.currentTarget.id
                })
                wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration: 600
                })
            },
            fail: () => {
                wx.showToast({
                    title: '操作失败，请稍后重试',
                    icon: 'none',
                    duration: 600
                })
            }
        })
    },
    _addressDelete(event) {
        let addressId = event.currentTarget.id
        wx.request({
            method: 'POST',
            url: baseHost + '/User/deleteAddress',
            data: {
                addressId,
                singtrue
            },
            success: () =>{
                this._requestAdress()
            }
        })
    },
    _requestAdress() {
        wx.request({
            method: 'POST',
            url: baseHost + '/User/ListAddress',
            data: {
                singtrue
            },
            success: (res) => {
                this.setData({
                    addressList: res.data.data
                })
            }
        })
    },
    _editAddress(event) {
        this.setData({
            editAddressInfo: event.currentTarget.dataset.address
        })
    }
})