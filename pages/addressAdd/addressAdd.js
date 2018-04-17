// pages/addressAdd/addressAdd.js
let App = getApp()
let { checkPhone } = require('../../common/js/number.js')
let areaData = require('../../common/js/areaData.js')
let provinces = areaData.iosProvinces
let citys = []
let countys = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        personName: 'test',
        personPhone: 15001145400,
        areaArrayIndex: [5, 7, 9],
        region: [],
        areaArray: [provinces, citys, countys],
        areaArrayId: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let addressId = options.addressId || 84
        this._areaDataInit(410000, 410100, 410101)  //初始化省市区在picker中的数据
        //需要根据省市区id计算出索引
        this._areaIndex(provinces, 410000)
        this._areaIndex(citys, 410100)
        this._areaIndex(countys, 410101)

        console.log(this._areaIndex(provinces, 410000))
        console.log(this._areaIndex(citys, 410100))
        console.log(this._areaIndex(countys, 410101))

        this._setPickerValueAndData(15,0,0)  //地区所在数组索引
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
    /**
     * 确认选择后取出对应的省市区值
     * 
     */
    _bindRegionChange(event) {
        console.log(event.detail.value)
        let provinceIndex = event.detail.value[0] || 0
        let cityIndex = event.detail.value[1] || 0
        let countyIndex = event.detail.value[2] || 0

        console.log(provinces[provinceIndex].id)
        console.log(citys[cityIndex].id)
        console.log(countys[countyIndex].id)

        this.setData({
            region: [provinces[provinceIndex].value, citys[cityIndex].value, countys[countyIndex].value]
        })
    },
    /**
     * 单独列滚动后执行省市区数组过滤
     */
    _columnchange(event) {
        let detail = event.detail
        if (event.detail.column === 0) {
            let currentProvinceId = provinces[event.detail.value].id
            citys = this._dataFilter(areaData.iosCitys, currentProvinceId)  //过滤市区数组
            countys = this._dataFilter(areaData.iosCountys, citys[0].id)  //过滤县数组
        }
        if (event.detail.column === 1) {
            let currentCitysId = areaData.iosCitys[event.detail.value].id
            countys = this._dataFilter(areaData.iosCountys, currentCitysId)  //过滤县数组
        }
        this.setData({
            areaArray: [provinces, citys, countys]
        })
    },
    /**
     * 数组过滤
     * datas Array 省市区数组
     * id Number  省市区对应id 
     */
    _dataFilter(datas, id) {
        return datas.filter((item) => {
            if (item.parentId == id) {
                return item
            }
        })
    },
    /**
     * 设置picker的value索引和地区数组数据
     */
    _setPickerValueAndData(provinceIndex, cityIndex, countyIndex) {
        let province = provinces[provinceIndex].value
        let city = citys[cityIndex].value
        let county = countys[countyIndex].value

        this.setData({
            areaArrayIndex: [provinceIndex, cityIndex, countyIndex],
            region: [province, city, county]
        })
    },
    /**
     * 根据传入的省id和市初始化picker省市区数据
     * provinceId Number 省id
     * cityId Number 市id
     */
    _areaDataInit(provinceId, cityId, countyId) {
        citys = areaData.iosCitys.filter((item, index) => {
            if (item.parentId == provinceId) {
                return item
            }
        })
        countys = areaData.iosCountys.filter((item) => {
            if (item.parentId == cityId) {
                return item
            }
        })

        provinces.forEach( (val, index) => {
            if (val.id == provinceId) {
                return index
            }
        })

        this.setData({
            areaArray: [provinces, citys, countys],
            areaArrayId: [provinceId, cityId, countyId]
        })
    },
    _areaIndex(areaData, provinceId) {
        let areaIndex = 0
        provinces.forEach((val, index) => {
            if (val.id == provinceId) {
                areaIndex = index
            }
        })
        return areaIndex
    },
    /**
     * 输入手机号触发事件
     */
    _inputPhone(event) {
        console.log(event.detail)
    },
    /** 
     * 手机输入框失去焦点
     */
    _blurPhone(event) {
        if (!checkPhone(event.detail.value)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'none',
                duration: 800
            })
        }
    },
    /**
     * 保存新增地址
     */
    _addAdress() {
        console.log('save')
        wx.request({
            url: App.baseHost + '/User/UpdateAddress'
        })
    }
})