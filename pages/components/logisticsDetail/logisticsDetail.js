// pages/components/logisticsDetail/logisticsDetail.js
var _animation = require('../../../common/js/animation.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      showDialog: {
          type: Boolean,
          value: false,
          observer: function () {
              var show_top = _animation._top(0).step()
              this.setData({
                  dialogShow: show_top.export()
              })
          }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      dialogShow: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
