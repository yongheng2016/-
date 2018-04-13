// pages/received/received.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adImgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
        url: `https://m.tamaidan.com/backtest/CollecUse/index`,
        success: (res) => {
            if (res.status = 200){
                this.setData({
                    adImgs: res.data.data
                })
            }
        }
    })
    wx.request({
        url: 'https://m.tamaidan.com/backtest/Goods/queryGoods',
        data: {
            GoodsId: 1001
        },
        success: (res) => {
            if (res.data.status === 200){
                console.log(res.data.data)
            }
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
  
  }
})