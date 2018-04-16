var API = require('../../utils/api.js')
Page({
    data: {
        tabText: ['全部', '待付款', '待支付', '已支付'],
        orderData: [],
        currentIndex: 0,
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 300,
        current: 0
    },
    onLoad(options) {
        this.setData({
            currentIndex: options.id,
            current: options.id
        })
        let _wx = this
        API.ajax({
            url: '/Order/QueryOrder',
            data: {},
            success: function (res) {
                _wx.setData({
                    orderData: res.data.data
                })
            },
            fail: function (error) {
                console.log(error)
            }
        })
    },
    onShow(query) {
        console.log('query', query)
    },
    change(event) {
        this.setData({
            currentIndex: event.detail.current
        })
    },
    _checkoutTab(event) {
        let index = event.currentTarget.id.split('-')[1]
        this.setData({
            current: index
        })
    },
    scrollToLower(event) {
        console.log('ordergoods-scrollToLower', event)
    }
})