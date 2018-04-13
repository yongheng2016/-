// pages/components/AddShoppingCartActionSheet/AddShoppingCartActionSheet.js
var _animation = require('../../../common/js/animation.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        addNumber: {
            type: Number,
            value: 0
        },
        actionSheetShow: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal) {
                var show_translateY = _animation._translateY(-200)  //translateY偏移量
                var show_topAndOpacity = _animation._topAndOpacity(0, 1)  //top偏移量  opacity透明值

                this.setData({
                    animationData: show_translateY.export(),
                    showShade: show_topAndOpacity.export(),
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        animationData: {},
        showShade: {},
        goodsNumber: 1,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _submit() {
            this._emitEvents()
            wx.showToast({
                title: '添加成功',
                icon: 'success',
                mask: true
            })
            this._cancel()
        },
        //向引用此组件的页面提交数据
        _emitEvents() {
            // 所有要带到主页面的数据，都装在eventDetail里面
            var eventDetail = {
                goodsId: 'test',
                goodsNumber: this.data.goodsNumber
            }
            // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
            var eventOption = {
                composed: true
            }
            this.triggerEvent('click_btn', eventDetail, eventOption)
        },
        //添加商品数量
        _addNumber() {
            if (this.data.goodsNumber < 99) {
                this.data.goodsNumber += 1
            }
            this.setData({
                goodsNumber: this.data.goodsNumber
            })
        },
        //减少商品数量
        _subtract() {
            if (this.data.goodsNumber > 1) {
                this.data.goodsNumber -= 1
            }
            this.setData({
                goodsNumber: this.data.goodsNumber
            })
        },
        //隐藏面板
        _cancel() {
            var hide_translateY = _animation._translateY(200)  //translateY偏移量
            var hide_topAndOpacity = _animation._topAndOpacity('auto', 0)  //top偏移量  

            this.setData({
                animationData: hide_translateY.export(),
                showShade: hide_topAndOpacity.export()
            })
        }
    }
})
