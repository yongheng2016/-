// pages/components/addaddress/addAddress.js
let App = getApp()
let { _top, _translateY} = require('../../../common/js/animation.js')
let { checkPhone } = require('../../../common/js/number.js')
let areaData = require('../../../common/js/areaData.js')
let provinces = areaData.iosProvinces
let citys = []
let countys = []
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        addressInfo: {
            type: Object,
            value: {},
            observer: function (value) {
                if (!this.properties.addressInfo.id) {
                    return
                }
                var show_top = _top(0)
                var show_translateY = _translateY(0)
                this.setData({
                    showDialog: show_top.export(),
                    showSaveBtn: show_translateY.export()
                })

                console.log(this.properties.addressInfo)
                let addressInfo = this.properties.addressInfo

                //设置姓名、电话
                this.setData({
                    personName: addressInfo.cname,
                    personPhone: addressInfo.cphone
                })

                //初始化省市区在picker中的数据
                this._areaDataInit(addressInfo.addressProvince, addressInfo.addressCity, addressInfo.addressArea)

                //需要根据省市区id计算出索引
                let provinceIndex = this._areaIndex(provinces, addressInfo.addressProvince)
                let cityIndex = this._areaIndex(citys, addressInfo.addressCity)
                let countyIndex = this._areaIndex(countys, addressInfo.addressArea)

                //地区所在数组索引
                this._setPickerValueAndData(provinceIndex, cityIndex, countyIndex)
            }
        }
    },
    data: {
        showDialog: {},
        showSaveBtn: {},
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
    ready: function (options) {
    },

    methods: {
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

            console.log('region', this.data.region)
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

            console.log(provinces[provinceIndex])
            let province = provinces[provinceIndex].value || 'a'
            let city = citys[cityIndex].value
            let county = countys[countyIndex].value
            console.log(province, city, county)


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
            console.log('areaArray', this.data.areaArray)
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
            let hide_top = _top('100%')
            var show_translateY = _translateY('100%')            
            this.setData({
                showDialog: hide_top.export(),
                showSaveBtn: show_translateY.export()          
            })
            wx.request({
                url: App.baseHost + '/User/UpdateAddress'
            })
        }
    }
})
