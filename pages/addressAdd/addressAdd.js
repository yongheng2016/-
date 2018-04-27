// pages/addressAdd/addressAdd.js
let App = getApp()
let { checkPhone } = require('../../common/js/number.js')
let areaData = require('../../common/js/areaData.js')
let provinces = areaData.iosProvinces
let citys = areaData.iosCitys.filter((item) => {
    if (item.parentId == 110000) {
        return item
    }
})
let countys = areaData.iosCountys.filter((item) => {
    if (item.parentId == 110001) {
        return item
    }
})

Page({

    /**
     * 页面的初始数据
     */
    data: {
        personName: '',  //姓名
        personPhone: '',  //电话
        addressDetail: '', //详细街道
        addressStatus: 0, //是否为默认地址
        addressId: '',
        pathName: '/User/UpdateAddress',  //默认为更新地址接口，如果是从编辑跳转来即为新增地址接口
        areaArrayIndex: [0, 0, 0],
        region: [],
        areaArray: [provinces, citys, countys],
        areaArrayId: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!options.addressId) {
            this.setData({
                pathName: '/User/insertAddress'
            })
            return
        }
        let addressInfo = JSON.parse(options.addressId)
        this._initPicker(addressInfo)
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
     * 初始化picker组件数据（每列数据，索引）
     */
    _initPicker(addressInfo) {
        console.log(addressInfo)
        //设置姓名、电话
        this.setData({
            personName: addressInfo.cname,
            personPhone: addressInfo.cphone,
            addressDetail: addressInfo.details,
            addressStatus: addressInfo.addressStatus,
            addressId: addressInfo.id,
        })

        //初始化省市区在picker中的数据
        this._areaDataInit(addressInfo.addressProvince, addressInfo.addressCity, addressInfo.addressArea)

        //需要根据省市区id计算出索引
        let provinceIndex = this._areaIndex(provinces, addressInfo.addressProvince)
        let cityIndex = this._areaIndex(citys, addressInfo.addressCity)
        let countyIndex = this._areaIndex(countys, addressInfo.addressArea)

        //地区所在数组索引
        this._setPickerValueAndData(provinceIndex, cityIndex, countyIndex)
    },
    /**
     * 确认选择后取出对应的省市区值
     * 
     */
    _bindRegionChange(event) {
        console.log('确认', event.detail.value)
        let provinceIndex = event.detail.value[0] || 0
        let cityIndex = event.detail.value[1] || 0
        let countyIndex = event.detail.value[2] || 0

        this.setData({
            region: [provinces[provinceIndex].value, citys[cityIndex].value, countys[countyIndex].value],
            areaArrayId: [provinces[provinceIndex].id, citys[cityIndex].id, countys[countyIndex].id]
        })
        console.log(this.data.areaArrayId)
    },
    /**
     * 单独列滚动后执行省市区数组过滤
     */
    _columnchange(event) {
        console.log('picker单列change', event)
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
     * 姓名输入框失去焦点后执行的函数
     */
    _blurName(event) {
        console.log(event.detail.value)
        if (!event.detail.value) return
        this.setData({
            personName: event.detail.value
        })
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
        } else {
            this.setData({
                personPhone: event.detail.value
            })
        }
    },
    /**
     * textarea详细地址输入框blur
     */
    _blurAddressDetail(event) {
        if (!event.detail.value) return
        this.setData({
            addressDetail: event.detail.value
        })
    },
    _switchChange(event) {
        switch (event.detail.value) {
            case true:
                this.setData({
                    addressStatus: 1
                })
                break
            case false:
                this.setData({
                    addressStatus: 0
                })
        }
    },
    /**
     * 校验带提交的数据是否存在或符合格式
     */
    _checkoutData() {
        if (!this.data.areaArrayId.length) {
            wx.showToast({
                title: '请选择收货地址',
                duration: 800,
                icon: 'none'
            })
            return false
        }
        if (!this.data.personName) {
            wx.showToast({
                title: '请填写收件人姓名',
                duration: 800,
                icon: 'none'
            })
            return false
        }
        if (!this.data.personPhone) {
            wx.showToast({
                title: '请填写手机号',
                duration: 800,
                icon: 'none'
            })
            return false
        }
        return true
    },
    /**
     * 保存新增地址
     */
    _addAdress() {
        if (!this._checkoutData()) return
        this._submitAddressData()
    },
    /**
     * 提交数据
     */
    _submitAddressData() {
        let addressData = {
            addressProvince: this.data.areaArrayId[0],
            addressArea: this.data.areaArrayId[2],
            addressCity: this.data.areaArrayId[1],
            addressCname: this.data.personName,
            addressCphone: this.data.personPhone,
            addressDetails: this.data.addressDetail,
            addressStatus: this.data.addressStatus,
            singtrue: wx.getStorageSync('singtrue')
        }
        if (this.data.addressId || this.data.addressId === 0) {
            addressData.addressId = this.data.addressId
        }
        wx.request({
            method: 'POST',
            url: App.globalData.baseHost + this.data.pathName,
            data: addressData,
            success: (res) => {
                if (res.data.status == 200) {
                    wx.showToast({
                        title: '保存成功',
                        duration: 800
                    })
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 800)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 800,
                        mask: true
                    })
                }
            },
            fail: (error) => {
                wx.showToast({
                    title: '保存失败，请稍后重试',
                    icon: 'none',
                    duration: 800,
                    mask: true
                })
            }
        })
    }
})